"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { StatusBadge } from "@/components/StatusBadge";
import { RepositoryItem, AgentRunResponse } from "@/types/api";
import {
  GitBranch,
  PlaySquare,
  GitPullRequest,
  ArrowUpRight,
  Sparkles,
  Bot,
  CircleDot,
} from "lucide-react";

export default function DashboardPage() {
  const [repos, setRepos] = useState<RepositoryItem[]>([]);
  const [runs, setRuns] = useState<AgentRunResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setIsLoading(true);
        setError(null);
        const [reposData, runsData] = await Promise.all([
          api<RepositoryItem[]>("/repositories"),
          api<AgentRunResponse[]>("/runs"),
        ]);
        setRepos(reposData || []);
        setRuns(runsData || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const summaryRuns = runs.slice(0, 5);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-indigo-950/40 border border-zinc-800/80 relative overflow-hidden">
        <div className="space-y-1 z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DEVFLOW AI ACTIVE</span>
          </div>
          <h2 className="text-xl font-bold text-zinc-100 tracking-tight">
            Good evening, Developer 👋
          </h2>
          <p className="text-xs text-zinc-400">
            Connect your repository and let DevFlow handle the engineering workflow.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <Link
            href="/issues"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-all shadow-lg shadow-indigo-950/50 border border-indigo-500/50"
          >
            <Bot className="w-4 h-4" />
            <span>Ask DevFlow to Fix Issue</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-zinc-400 font-mono">Connected Repos</span>
            <div className="text-2xl font-bold text-zinc-100 font-mono">{isLoading ? "-" : repos.length}</div>
          </div>
          <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <GitBranch className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-zinc-400 font-mono">Agent Runs</span>
            <div className="text-2xl font-bold text-zinc-100 font-mono">{isLoading ? "-" : runs.length}</div>
          </div>
          <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <PlaySquare className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-zinc-400 font-mono">PRs Created</span>
            <div className="text-2xl font-bold text-zinc-100 font-mono">{isLoading ? "-" : runs.filter((run) => run.prUrl).length}</div>
          </div>
          <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <GitPullRequest className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PlaySquare className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-semibold text-zinc-100">Recent Agent Runs</h3>
            </div>
            <Link href="/runs/run_001" className="text-xs font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {isLoading ? (
              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-zinc-400 text-sm">Loading runs...</div>
            ) : error ? (
              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-rose-300 text-sm">{error}</div>
            ) : summaryRuns.length === 0 ? (
              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-zinc-400 text-sm">No runs yet.</div>
            ) : (
              summaryRuns.map((run) => (
                <Link
                  key={run.id}
                  href={`/runs/${run.id}`}
                  className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700/80 transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-zinc-800/80 border border-zinc-700/50 text-zinc-300 group-hover:text-indigo-400 transition-colors">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-zinc-400">#{run.issue?.number ?? "-"}</span>
                        <h4 className="text-xs font-medium text-zinc-100 group-hover:text-indigo-300 transition-colors truncate">
                          {run.issue?.title ?? "Agent run"}
                        </h4>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-[11px] font-mono text-zinc-500">
                        <span>{run.issue?.repository ?? "Repository"}</span>
                        <span>•</span>
                        <span>{run.duration ?? "In progress"}</span>
                      </div>
                    </div>
                  </div>

                  <StatusBadge status={run.status} />
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-semibold text-zinc-100">Connected Repositories</h3>
            </div>
            <Link href="/repositories" className="text-xs font-mono text-indigo-400 hover:text-indigo-300">Manage</Link>
          </div>

          <div className="space-y-2.5">
            {isLoading ? (
              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-zinc-400 text-sm">Loading repositories...</div>
            ) : repos.length === 0 ? (
              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-zinc-400 text-sm">No repositories connected.</div>
            ) : (
              repos.slice(0, 3).map((repo) => (
                <div key={repo.id} className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-zinc-200">{repo.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">{repo.branch}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                    <span className="flex items-center gap-1">
                      <CircleDot className="w-3 h-3 text-indigo-400" />
                      {(repo.issuesCount ?? 0)} issues
                    </span>
                    <StatusBadge status={repo.status ?? "connected"} showIcon={false} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
