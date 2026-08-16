import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, AlertCircle, Loader2 } from "lucide-react";

export type StatusType =
  | "completed"
  | "running"
  | "pending"
  | "failed"
  | "cancelled"
  | "connected"
  | "syncing"
  | "disconnected"
  | "open"
  | "in_progress";

interface StatusBadgeProps {
  status: StatusType | string;
  className?: string;
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className,
  showIcon = true,
}) => {
  const normalized = String(status || "pending").toLowerCase();

  const getStatusConfig = () => {
    switch (normalized) {
      case "completed":
        return {
          label: "Completed",
          icon: CheckCircle2,
          color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          dotColor: "bg-emerald-400",
        };
      case "running":
      case "in_progress":
      case "syncing":
        return {
          label: normalized === "in_progress" ? "In Progress" : normalized === "syncing" ? "Syncing" : "Running",
          icon: Loader2,
          color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
          dotColor: "bg-amber-400 animate-pulse",
          spin: true,
        };
      case "failed":
      case "disconnected":
        return {
          label: normalized === "disconnected" ? "Disconnected" : "Failed",
          icon: AlertCircle,
          color: "bg-rose-500/10 text-rose-400 border-rose-500/20",
          dotColor: "bg-rose-400",
        };
      case "cancelled":
        return {
          label: "Cancelled",
          icon: AlertCircle,
          color: "bg-zinc-800 text-zinc-300 border-zinc-700/50",
          dotColor: "bg-zinc-500",
        };
      case "connected":
        return {
          label: "Connected",
          icon: CheckCircle2,
          color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          dotColor: "bg-emerald-400",
        };
      case "open":
        return {
          label: "Open",
          icon: Clock,
          color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
          dotColor: "bg-blue-400",
        };
      case "pending":
      default:
        return {
          label: "Pending",
          icon: Clock,
          color: "bg-zinc-800 text-zinc-400 border-zinc-700/50",
          dotColor: "bg-zinc-500",
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors",
        config.color,
        className
      )}
    >
      {showIcon && (
        <Icon
          className={cn(
            "w-3 h-3 shrink-0",
            config.spin && "animate-spin"
          )}
        />
      )}
      <span>{config.label}</span>
    </span>
  );
};
