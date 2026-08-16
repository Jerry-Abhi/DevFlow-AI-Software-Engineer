"use client";

import React from "react";
import { X, FileCode } from "lucide-react";

interface FileChange {
  path: string;
  status: "M" | "A" | "D" | string;
  additions: number;
  deletions: number;
  diff?: string;
}
import { cn } from "@/lib/utils";

interface DiffViewerModalProps {
  file: FileChange | null;
  onClose: () => void;
}

export const DiffViewerModal: React.FC<DiffViewerModalProps> = ({
  file,
  onClose,
}) => {
  if (!file) return null;

  const lines = (file.diff || "").split("\n");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800 bg-zinc-950/60">
          <div className="flex items-center gap-3">
            <FileCode className="w-5 h-5 text-indigo-400" />
            <span className="font-mono text-xs font-semibold text-zinc-100">
              {file.path}
            </span>
            <span className="font-mono text-xs text-emerald-400">
              +{file.additions}
            </span>
            <span className="font-mono text-xs text-rose-400">
              -{file.deletions}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Diff Content Box */}
        <div className="flex-1 p-4 overflow-y-auto bg-zinc-950 font-mono text-xs leading-relaxed select-text">
          {lines.map((line, idx) => {
            const isAddition = line.startsWith("+");
            const isDeletion = line.startsWith("-");
            const isHeader = line.startsWith("@@");

            return (
              <div
                key={idx}
                className={cn(
                  "flex items-start px-3 py-0.5 rounded font-mono",
                  isAddition && "bg-emerald-500/10 text-emerald-300",
                  isDeletion && "bg-rose-500/10 text-rose-300",
                  isHeader && "text-indigo-400 bg-indigo-500/10 font-bold my-1"
                )}
              >
                <span className="w-8 text-zinc-600 select-none text-[10px] shrink-0 pt-0.5">
                  {idx + 1}
                </span>
                <span className="w-4 select-none shrink-0 font-bold">
                  {isAddition ? "+" : isDeletion ? "-" : " "}
                </span>
                <pre className="whitespace-pre-wrap break-all flex-1 font-mono">
                  {isAddition || isDeletion ? line.slice(1) : line}
                </pre>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-zinc-800 bg-zinc-950/60">
          <span className="text-xs text-zinc-400 font-mono">
            DevFlow Automated Patch Preview
          </span>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors"
          >
            Close Diff
          </button>
        </div>
      </div>
    </div>
  );
};
