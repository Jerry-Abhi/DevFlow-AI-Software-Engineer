"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { IssueCard } from "@/components/IssueCard";
import { IssueItem } from "@/types/api";
import { CircleDot, Search } from "lucide-react";

export default function IssuesPage() {
  const router = useRouter();
  const [repositoryFilter, setRepositoryFilter] = useState("");
  const [issues, setIssues] = useState<IssueItem[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    setRepositoryFilter(params?.get("repo") ?? "");
  }, []);

  useEffect(() => {
    async function loadIssues() {
      try {
        setIsLoading(true);
        setError(null);
        const query = repositoryFilter ? `?repository=${encodeURIComponent(repositoryFilter)}` : "";
        const data = await api<IssueItem[]>(`/issues${query}`);
        setIssues(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load issues.");
      } finally {
        setIsLoading(false);
      }
    }

    loadIssues();
  }, [repositoryFilter]);

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      const matchesSearch =
        issue.title.toLowerCase().includes(search.toLowerCase()) ||
        issue.repository.toLowerCase().includes(search.toLowerCase()) ||
        issue.number.toString().includes(search);

      const matchesStatus = filterStatus === "all" || (issue.status ?? "open") === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [issues, search, filterStatus]);

  const handleAskDevFlow = async (issue: IssueItem) => {
    try {
      const created = await api<{ id: string; status: string }>("/runs", {
        method: "POST",
        body: JSON.stringify({ issueId: issue.id }),
      });
      router.push(`/runs/${created.id}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      alert(message);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
        <div>
          <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
            <CircleDot className="w-5 h-5 text-indigo-400" />
            <span>Repository Issues</span>
          </h2>
          <p className="text-xs text-zinc-400">Select an issue and trigger DevFlow to automatically plan, code, test, and submit a PR.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-xs font-mono">
          {['all', 'open', 'in_progress', 'completed', 'failed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${
                filterStatus === status ? 'bg-zinc-800 text-zinc-100 font-semibold border border-zinc-700/60 shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search issues by title, number, or repository..."
            className="w-full h-9 pl-9 pr-4 text-xs bg-zinc-900/60 border border-zinc-800 rounded-lg text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-zinc-400 text-sm">Loading issues...</div>
      ) : error ? (
        <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-rose-300 text-sm">Something went wrong. Please try again.</div>
      ) : filteredIssues.length === 0 ? (
        <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-zinc-400 text-sm">No issues found.</div>
      ) : (
        <div className="space-y-3">
          {filteredIssues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={{
                id: issue.id,
                number: issue.number,
                title: issue.title,
                repository: issue.repository,
                label: (issue.label as "bug" | "feature" | "chore" | "enhancement") ?? "feature",
                priority: (issue.priority as "low" | "medium" | "high" | "critical") ?? "medium",
                status: (issue.status as "open" | "in_progress" | "completed" | "failed") ?? "open",
                createdAt: "Recently",
                author: "devflow",
                description: issue.body ?? "",
              }}
              onAskDevFlow={handleAskDevFlow}
            />
          ))}
        </div>
      )}
    </div>
  );
}
