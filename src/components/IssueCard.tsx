import React from "react";
import Link from "next/link";
import { IssueItem } from "@/types/api";
import { StatusBadge } from "@/components/StatusBadge";
import {
  CircleDot,
  Bot,
  ArrowUpRight,
  GitBranch,
  Tag,
  AlertTriangle,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface IssueCardProps {
  issue: {
    id: string;
    number: number;
    title: string;
    repository: string;
    label?: "bug" | "feature" | "chore" | "enhancement";
    priority?: "low" | "medium" | "high" | "critical";
    status?: "open" | "in_progress" | "completed" | "failed";
    runId?: string;
    createdAt?: string;
    author?: string;
    description?: string;
  };
  onAskDevFlow?: (issue: IssueItem) => void;
}

export const IssueCard: React.FC<IssueCardProps> = ({ issue, onAskDevFlow }) => {
  const getPriorityStyle = (priority: NonNullable<IssueCardProps["issue"]["priority"]> = "medium") => {
    switch (priority) {
      case "critical":
        return "bg-rose-500/10 text-rose-400 border-rose-500/30";
      case "high":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "medium":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "low":
      default:
        return "bg-zinc-800 text-zinc-400 border-zinc-700/50";
    }
  };

  const getLabelStyle = (label: NonNullable<IssueCardProps["issue"]["label"]> = "feature") => {
    switch (label) {
      case "bug":
        return "bg-rose-950/40 text-rose-300 border-rose-800/40";
      case "feature":
        return "bg-indigo-950/40 text-indigo-300 border-indigo-800/40";
      case "chore":
      default:
        return "bg-zinc-900 text-zinc-400 border-zinc-800";
    }
  };

  return (
    <div className="group relative bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700/80 rounded-xl p-4 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Main Issue Info */}
      <div className="flex items-start gap-3 min-w-0 flex-1">
        <div className="mt-1 flex items-center justify-center w-7 h-7 rounded-lg bg-zinc-800/80 border border-zinc-700/50 text-indigo-400 shrink-0">
          <CircleDot className="w-4 h-4" />
        </div>

        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-mono text-xs font-semibold text-zinc-400">
              #{issue.number}
            </span>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-800/60 text-zinc-300 border border-zinc-700/50 flex items-center gap-1">
              <GitBranch className="w-3 h-3 text-zinc-500" />
              {issue.repository}
            </span>
            <span
              className={cn(
                "text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border capitalize",
                getPriorityStyle(issue.priority)
              )}
            >
              {issue.priority ?? "medium"}
            </span>
            <span
              className={cn(
                "text-[10px] font-mono px-2 py-0.5 rounded-full border capitalize",
                getLabelStyle(issue.label ?? "feature")
              )}
            >
              {issue.label ?? "feature"}
            </span>
          </div>

          <h3 className="text-sm font-medium text-zinc-100 group-hover:text-indigo-300 transition-colors line-clamp-1">
            {issue.title}
          </h3>

          <div className="flex items-center gap-3 mt-2 text-[11px] text-zinc-500 font-mono">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" /> {issue.author}
            </span>
            <span>•</span>
            <span>{issue.createdAt}</span>
          </div>
        </div>
      </div>

      {/* Action / Status Section */}
      <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
        {issue.runId ? (
          <Link
            href={`/runs/${issue.runId}`}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700 transition-colors"
          >
            <StatusBadge status={(issue.status ?? "open") as any} showIcon={true} />
            <span className="font-mono text-[11px] text-zinc-400">View Run</span>
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => onAskDevFlow?.({ id: issue.id, number: issue.number, title: issue.title, repository: issue.repository, status: issue.status ?? "open", label: issue.label ?? "feature", priority: issue.priority ?? "medium", body: issue.description ?? "" })}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium shadow-md shadow-indigo-950/50 hover:shadow-indigo-900/50 transition-all border border-indigo-500/50"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Ask DevFlow</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
          </button>
        )}
      </div>
    </div>
  );
};
