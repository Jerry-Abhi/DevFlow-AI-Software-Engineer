import React from "react";
import { cn } from "@/lib/utils";

interface FileChange {
  path: string;
  status: "M" | "A" | "D" | string;
  additions: number;
  deletions: number;
  diff?: string;
}
import { FileCode, Eye } from "lucide-react";

interface FileListProps {
  files: FileChange[];
  onSelectFile?: (file: FileChange) => void;
}

export const FileList: React.FC<FileListProps> = ({ files, onSelectFile }) => {
  const getStatusBadge = (status: FileChange["status"]) => {
    switch (status) {
      case "A":
        return {
          label: "A",
          bg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
          title: "Added",
        };
      case "D":
        return {
          label: "D",
          bg: "bg-rose-500/10 text-rose-400 border-rose-500/30",
          title: "Deleted",
        };
      case "M":
      default:
        return {
          label: "M",
          bg: "bg-amber-500/10 text-amber-400 border-amber-500/30",
          title: "Modified",
        };
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono">
          Changed Files ({files.length})
        </h3>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-emerald-400">
            +
            {files.reduce((acc, f) => acc + f.additions, 0)}
          </span>
          <span className="text-rose-400">
            -
            {files.reduce((acc, f) => acc + f.deletions, 0)}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {files.map((file, index) => {
          const badge = getStatusBadge(file.status);

          return (
            <div
              key={file.path || index}
              className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800/60 hover:border-zinc-700/60 transition-colors group"
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <span
                  className={cn(
                    "w-5 h-5 rounded text-[11px] font-mono font-bold flex items-center justify-center border shrink-0",
                    badge.bg
                  )}
                  title={badge.title}
                >
                  {badge.label}
                </span>

                <FileCode className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 shrink-0 transition-colors" />

                <span className="text-xs font-mono text-zinc-200 group-hover:text-indigo-300 transition-colors truncate">
                  {file.path}
                </span>
              </div>

              <div className="flex items-center gap-3 shrink-0 font-mono text-xs">
                <div className="flex items-center gap-1.5 text-[11px]">
                  <span className="text-emerald-400">+{file.additions}</span>
                  <span className="text-rose-400">-{file.deletions}</span>
                </div>

                {onSelectFile && file.diff && (
                  <button
                    onClick={() => onSelectFile(file)}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] font-sans transition-colors"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Diff</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
