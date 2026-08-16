import React from "react";
import { TimelineStep } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { CheckCircle2, Loader2, Clock, AlertCircle } from "lucide-react";

interface AgentTimelineProps {
  steps: TimelineStep[];
}

export const AgentTimeline: React.FC<AgentTimelineProps> = ({ steps }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono">
          Agent Activity Timeline
        </h3>
        <span className="text-[11px] font-mono text-zinc-500">
          {steps.filter((s) => s.status === "completed").length} / {steps.length} Steps
        </span>
      </div>

      <div className="relative pl-3 space-y-4 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-zinc-800">
        {steps.map((step, index) => {
          const isCompleted = step.status === "completed";
          const isRunning = step.status === "running";
          const isFailed = step.status === "failed";
          const isPending = step.status === "pending";

          return (
            <div key={step.id || index} className="relative flex items-start gap-3 group">
              {/* Step indicator node */}
              <div
                className={cn(
                  "relative z-10 flex items-center justify-center w-6 h-6 rounded-full border text-xs shrink-0 transition-colors",
                  isCompleted && "bg-emerald-500/10 text-emerald-400 border-emerald-500/40",
                  isRunning && "bg-amber-500/10 text-amber-400 border-amber-500/40 ring-4 ring-amber-500/10",
                  isFailed && "bg-rose-500/10 text-rose-400 border-rose-500/40",
                  isPending && "bg-zinc-900 text-zinc-600 border-zinc-800"
                )}
              >
                {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                {isRunning && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {isFailed && <AlertCircle className="w-3.5 h-3.5" />}
                {isPending && <Clock className="w-3 h-3" />}
              </div>

              {/* Step Content */}
              <div className="flex-1 min-w-0 bg-zinc-900/40 border border-zinc-800/60 rounded-lg p-3 group-hover:border-zinc-700/60 transition-colors">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span
                    className={cn(
                      "text-xs font-semibold font-mono",
                      isCompleted && "text-zinc-200",
                      isRunning && "text-amber-300 font-bold",
                      isFailed && "text-rose-300",
                      isPending && "text-zinc-500"
                    )}
                  >
                    {step.name}
                  </span>

                  {step.timestamp && (
                    <span className="text-[10px] font-mono text-zinc-500">
                      {step.timestamp}
                    </span>
                  )}
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
