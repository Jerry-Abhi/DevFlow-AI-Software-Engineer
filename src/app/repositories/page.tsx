"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { RepositoryCard } from "@/components/RepositoryCard";
import { ConnectRepoModal } from "@/components/ConnectRepoModal";
import { RepositoryItem } from "@/types/api";
import { GitBranch, Plus, Search } from "lucide-react";

export default function RepositoriesPage() {
  const [repos, setRepos] = useState<RepositoryItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRepositories() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await api<RepositoryItem[]>("/repositories");
        setRepos(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load repositories.");
      } finally {
        setIsLoading(false);
      }
    }

    loadRepositories();
  }, []);

  const filteredRepos = repos.filter((r) => {
    const matchesSearch = `${r.name} ${r.description ?? ""}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const handleConnect = (repoName: string) => {
    const newRepo: RepositoryItem = {
      id: `repo_${Date.now()}`,
      name: repoName,
      owner: "abhishek",
      branch: "main",
      issuesCount: 3,
      status: "connected",
      description: "Connected GitHub repository",
    };
    setRepos((current) => [newRepo, ...current]);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
        <div>
          <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-indigo-400" />
            <span>Connected Repositories</span>
          </h2>
          <p className="text-xs text-zinc-400">Manage your connected GitHub repositories for autonomous engineering.</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-all shadow-lg shadow-indigo-950/50 border border-indigo-500/50 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Connect Repository</span>
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter repositories by name or description..."
            className="w-full h-9 pl-9 pr-4 text-xs bg-zinc-900/60 border border-zinc-800 rounded-lg text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-zinc-400 text-sm">Loading repositories...</div>
      ) : error ? (
        <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-rose-300 text-sm">
          Unable to load repositories.
          <button onClick={() => window.location.reload()} className="ml-2 underline text-indigo-300">Retry</button>
        </div>
      ) : filteredRepos.length === 0 ? (
        <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-zinc-400 text-sm">
          No repositories connected. Connect GitHub to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRepos.map((repo) => (
            <RepositoryCard key={repo.id} repo={{
              id: repo.id,
              name: repo.name,
              owner: repo.owner,
              branch: repo.branch,
              issuesCount: repo.issuesCount ?? 0,
              status: (repo.status as "connected" | "syncing" | "disconnected") ?? "connected",
              stars: repo.stars ?? 0,
              lastActivity: repo.lastActivity ?? "Recently",
              description: repo.description ?? "",
              language: repo.language ?? "TypeScript",
            }} />
          ))}
        </div>
      )}

      <ConnectRepoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConnect={handleConnect} />
    </div>
  );
}
