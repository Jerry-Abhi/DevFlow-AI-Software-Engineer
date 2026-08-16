"use client";

import React, { useState } from "react";
import { Terminal as TerminalIcon, Copy, Check, Maximize2, Minimize2 } from "lucide-react";

interface TerminalLog {
  id: string;
  type: "command" | "info" | "success" | "error" | "output";
  text: string;
}
import { cn } from "@/lib/utils";

interface TerminalProps {
  logs: TerminalLog[];
  className?: string;
}

export const Terminal: React.FC<TerminalProps> = ({ logs, className }) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = () => {
    const fullText = logs.map((l) => l.text).join("\n");
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLogStyle = (type: TerminalLog["type"], text: string) => {
    if (type === "command" || text.startsWith("$")) {
      return "text-indigo-400 font-semibold";
    }
    if (type === "error" || text.includes("FAIL") || text.includes("Error")) {
      return "text-rose-400 bg-rose-500/10 px-1 rounded";
    }
    if (type === "success" || text.includes("PASS") || text.includes("passed")) {
      return "text-emerald-400 font-medium";
    }
    if (type === "info" || text.startsWith("[INFO]")) {
      return "text-sky-300/90";
    }
    return "text-zinc-300";
  };

  return (
    <div
      className={cn(
        "flex flex-col bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl font-mono text-xs transition-all duration-300",
        expanded ? "fixed inset-4 z-50 h-auto max-h-none" : "h-[380px]",
        className
      )}
    >
      {/* Terminal Titlebar Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800/80 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <TerminalIcon className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-xs text-zinc-300 font-sans font-medium">
            devflow-agent-terminal
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-800/60 hover:bg-zinc-800 text-[11px] text-zinc-400 hover:text-zinc-200 transition-colors"
            title="Copy logs"
          >
            {copied ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>

          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 rounded bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
            title={expanded ? "Minimize" : "Expand"}
          >
            {expanded ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Terminal Log Output Window */}
      <div className="flex-1 p-4 overflow-y-auto space-y-1.5 bg-zinc-950/90 text-zinc-300 font-mono text-[12px] leading-relaxed select-text">
        {logs.map((log, index) => (
          <div key={log.id || index} className="flex items-start gap-3 group">
            <span className="text-zinc-600 text-[10px] select-none w-6 text-right shrink-0 pt-0.5 font-mono">
              {index + 1}
            </span>
            <pre className={cn("whitespace-pre-wrap break-all flex-1 font-mono", getLogStyle(log.type, log.text))}>
              {log.text}
            </pre>
          </div>
        ))}

        {/* Live Blinking Cursor */}
        <div className="flex items-center gap-2 pt-2">
          <span className="text-indigo-400">$</span>
          <span className="w-2 h-4 bg-indigo-400 animate-pulse inline-block" />
        </div>
      </div>
    </div>
  );
};
