"use client";

import React, { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { StatusBadge } from "@/components/StatusBadge";
import { AgentTimeline } from "@/components/AgentTimeline";
import { Terminal } from "@/components/Terminal";
import { FileList } from "@/components/FileList";
import { DiffViewerModal } from "@/components/DiffViewerModal";
import { AgentRunResponse } from "@/types/api";
import {
  Bot,
  GitBranch,
  GitPullRequest,
  RotateCcw,
  Eye,
  CheckCircle2,
  ExternalLink,
  ChevronLeft,
  Share2,
} from "lucide-react";

export default function AgentRunPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const runId = resolvedParams.id;

  const [agentRun, setAgentRun] = useState<AgentRunResponse | null>(null);
  const [selectedFile, setSelectedFile] = useState<{ path: string; status: string; additions: number; deletions: number; diff?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(true);

  useEffect(() => {
    async function fetchRun() {
      try {
        setLoading(true);
        const data = await api<AgentRunResponse>(`/runs/${runId}`);
        setAgentRun(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load run.");
      } finally {
        setLoading(false);
      }
    }

    fetchRun();
  }, [runId]);

  useEffect(() => {
    if (!agentRun || !["PENDING", "RUNNING"].includes(agentRun.status) || !isPolling) {
      return;
    }

    const timer = setInterval(async () => {
      try {
        const data = await api<AgentRunResponse>(`/runs/${runId}`);
        setAgentRun(data);
        if (["COMPLETED", "FAILED", "CANCELLED"].includes(data.status)) {
          setIsPolling(false);
        }
      } catch {
        setIsPolling(false);
      }
    }, 2500);

    return () => clearInterval(timer);
  }, [agentRun, isPolling, runId]);

  const steps = useMemo(() => {
    return (agentRun?.steps ?? []).map((step, index) => ({
      id: step.id || `step-${index}`,
      name: step.name,
      status: (step.status || "PENDING").toLowerCase() as "pending" | "running" | "completed" | "failed",
      timestamp: step.createdAt ?? "",
      description: step.output ?? "",
    }));
  }, [agentRun]);

  const logs = useMemo(() => {
    return (agentRun?.logs ?? []).map((text, index) => ({
      id: `${index}-${text}`,
      type: (text.includes("FAIL") || text.includes("Error") ? "error" : text.includes("PASS") ? "success" : "info") as "command" | "info" | "success" | "error" | "output",
      text,
    }));
  }, [agentRun]);

  const files = useMemo(() => {
    return (agentRun?.files ?? []).map((file) => ({
      path: file.path,
      status: file.status,
      additions: file.additions ?? 0,
      deletions: file.deletions ?? 0,
      diff: file.diff ?? "",
    }));
  }, [agentRun]);

  const handleRetry = async () => {
    if (!agentRun?.issueId) return;
    const created = await api<{ id: string; status: string }>("/runs", {
      method: "POST",
      body: JSON.stringify({ issueId: agentRun.issueId }),
    });
    window.location.href = `/runs/${created.id}`;
  };

  const handleCancel = async () => {
    if (!runId) return;
    await api(`/runs/${runId}/cancel`, { method: "POST" });
    setIsPolling(false);
    const data = await api<AgentRunResponse>(`/runs/${runId}`);
    setAgentRun(data);
  };

  const prCreated = Boolean(agentRun?.prUrl);

  if (loading && !agentRun) {
    return <div className="max-w-7xl mx-auto p-4 text-zinc-400">Loading run...</div>;
  }

  if (error || !agentRun) {
    return <div className="max-w-7xl mx-auto p-4 text-rose-300">Something went wrong. Please try again.</div>;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-3">
        <Link href="/issues" className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors w-fit font-mono">
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Issues</span>
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm">
          <div className="space-y-1.5 min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-zinc-400">
              <span className="text-indigo-400 font-semibold">#{agentRun.issue?.number ?? "-"}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-zinc-300">
                <GitBranch className="w-3.5 h-3.5 text-zinc-500" />
                {agentRun.issue?.repository ?? "Repository"}
              </span>
              <span>•</span>
              <span>Duration: {agentRun.duration ?? "0m 00s"}</span>
            </div>

            <h1 className="text-lg font-bold text-zinc-100 truncate">{agentRun.issue?.title ?? "Agent run"}</h1>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <StatusBadge status={agentRun.status} />
            <button onClick={() => navigator.clipboard.writeText(window.location.href)} className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors" title="Share run URL">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 shadow-xl">
          <AgentTimeline steps={steps} />
        </div>

        <div className="lg:col-span-7 flex flex-col gap-4">
          <Terminal logs={logs} />
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 shadow-xl space-y-4">
        <FileList files={files} onSelectFile={(file) => setSelectedFile(file)} />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 sticky bottom-4 z-20 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <Bot className="w-4 h-4 text-indigo-400" />
          <span>Status: <strong className="text-zinc-200 uppercase">{agentRun.status}</strong></span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {files.length > 0 && (
            <button onClick={() => setSelectedFile(files[0])} className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700 transition-colors">
              <Eye className="w-4 h-4" />
              <span>View Diff</span>
            </button>
          )}

          <button onClick={handleRetry} className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700 transition-colors">
            <RotateCcw className="w-4 h-4 text-zinc-400" />
            <span>Retry Run</span>
          </button>

          <button onClick={handleCancel} className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700 transition-colors">
            <span>Cancel</span>
          </button>

          {prCreated ? (
            <a href={agentRun.prUrl || "https://github.com"} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium shadow-lg transition-all">
              <CheckCircle2 className="w-4 h-4" />
              <span>PR #{agentRun.prNumber || 52} Created</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          ) : (
            <button className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium shadow-lg shadow-indigo-950/50 border border-indigo-500/50 transition-all">
              <GitPullRequest className="w-4 h-4" />
              <span>Create Pull Request</span>
            </button>
          )}
        </div>
      </div>

      <DiffViewerModal file={selectedFile} onClose={() => setSelectedFile(null)} />
    </div>
  );
}
