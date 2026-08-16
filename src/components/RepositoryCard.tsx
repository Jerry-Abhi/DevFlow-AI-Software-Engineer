import React from "react";
import Link from "next/link";
import { RepositoryItem } from "@/types/api";
import { StatusBadge } from "@/components/StatusBadge";
import { GitBranch, Star, CircleDot, Clock, ChevronRight } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";

interface RepositoryCardProps {
  repo: RepositoryItem & {
    stars?: number;
    lastActivity?: string;
    language?: string;
    status?: "connected" | "syncing" | "disconnected";
  };
}

export const RepositoryCard: React.FC<RepositoryCardProps> = ({ repo }) => {
  return (
    <div className="group relative bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700/80 rounded-xl p-5 transition-all duration-200 flex flex-col justify-between">
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 font-mono text-sm font-semibold text-zinc-100 group-hover:text-indigo-400 transition-colors">
            <GithubIcon className="w-4 h-4 text-zinc-400 shrink-0" />
            <span className="text-zinc-500 font-normal">{repo.owner ?? "devflow"} /</span>
            <span className="truncate">{repo.name}</span>
          </div>
          <StatusBadge status={repo.status ?? "connected"} />
        </div>

        <p className="text-xs text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
          {repo.description ?? "Repository overview"}
        </p>
      </div>

      {/* Meta Footer */}
      <div>
        <div className="grid grid-cols-3 gap-2 py-3 border-t border-zinc-800/60 text-xs font-mono text-zinc-400 mb-4">
          <div className="flex items-center gap-1.5">
            <GitBranch className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            <span className="truncate text-zinc-300">{repo.branch ?? "main"}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <CircleDot className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="text-zinc-200 font-semibold">{repo.issuesCount ?? 0}</span>
            <span className="text-[10px] text-zinc-500 hidden sm:inline">issues</span>
          </div>

          <div className="flex items-center gap-1.5 justify-end">
            <Star className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
            <span>{repo.stars ?? 0}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1 text-[11px] text-zinc-500">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-zinc-500" />
            {repo.lastActivity ?? "Recently"}
          </span>

          <Link
            href={`/issues?repo=${repo.name}`}
            className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
          >
            <span>View Issues</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
