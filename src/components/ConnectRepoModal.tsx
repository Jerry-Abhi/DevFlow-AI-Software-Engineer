"use client";

import React, { useState } from "react";
import { X, Check, Plus, Search } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";

interface ConnectRepoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (repoName: string) => void;
}

export const ConnectRepoModal: React.FC<ConnectRepoModalProps> = ({
  isOpen,
  onClose,
  onConnect,
}) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  if (!isOpen) return null;

  const availableRepos = [
    { name: "analytics-worker", branch: "main", isPrivate: true },
    { name: "mobile-app-ios", branch: "develop", isPrivate: true },
    { name: "docs-site", branch: "main", isPrivate: false },
    { name: "notification-service", branch: "main", isPrivate: true },
  ].filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));

  const handleConnect = () => {
    if (selected) {
      onConnect(selected);
      setSelected(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 bg-zinc-950/60">
          <div className="flex items-center gap-2.5">
            <GithubIcon className="w-5 h-5 text-zinc-100" />
            <h2 className="text-sm font-semibold text-zinc-100">
              Connect GitHub Repository
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your GitHub repositories..."
              className="w-full h-9 pl-9 pr-4 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto">
            {availableRepos.map((repo) => (
              <div
                key={repo.name}
                onClick={() => setSelected(repo.name)}
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                  selected === repo.name
                    ? "bg-indigo-600/10 border-indigo-500/50 text-indigo-300"
                    : "bg-zinc-950/40 border-zinc-800 text-zinc-300 hover:bg-zinc-950"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <GithubIcon className="w-4 h-4 text-zinc-400" />
                  <span className="text-xs font-mono font-medium">
                    abhishek / {repo.name}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                    {repo.branch}
                  </span>
                  {selected === repo.name && (
                    <Check className="w-4 h-4 text-indigo-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-zinc-800 bg-zinc-950/60">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={!selected}
            onClick={handleConnect}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-medium transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Connect Selected</span>
          </button>
        </div>
      </div>
    </div>
  );
};
