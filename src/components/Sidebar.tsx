"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  GitBranch,
  CircleDot,
  PlaySquare,
  Settings,
  Bot,
  ChevronLeft,
  ChevronRight,
  UserCheck,
} from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navItems: NavItem[] = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Repositories", href: "/repositories", icon: GitBranch, badge: 4 },
    { name: "Issues", href: "/issues", icon: CircleDot, badge: 5 },
    { name: "Agent Runs", href: "/runs/run_001", icon: PlaySquare, badge: 3 },
  ];

  return (
    <aside
      className={cn(
        "relative flex flex-col h-screen bg-zinc-950 border-r border-zinc-800/80 transition-all duration-300 z-30 shrink-0",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-14 px-4 border-b border-zinc-800/80">
        <Link href="/dashboard" className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-tight text-zinc-100">
                DevFlow
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">
                AI ENGINEER
              </span>
            </div>
          )}
        </Link>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href.startsWith("/runs") && pathname.startsWith("/runs"));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors group relative",
                isActive
                  ? "bg-zinc-900 text-zinc-100 border border-zinc-800"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 shrink-0 transition-colors",
                  isActive ? "text-indigo-400" : "text-zinc-400 group-hover:text-zinc-200"
                )}
              />
              {!collapsed && (
                <span className="flex-1 truncate">{item.name}</span>
              )}

              {!collapsed && item.badge !== undefined && (
                <span
                  className={cn(
                    "px-1.5 py-0.5 text-[10px] font-mono font-medium rounded-full border",
                    isActive
                      ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                      : "bg-zinc-900 text-zinc-500 border-zinc-800"
                  )}
                >
                  {item.badge}
                </span>
              )}

              {/* Tooltip for collapsed mode */}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-zinc-900 text-zinc-200 text-xs rounded border border-zinc-800 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="p-2 border-t border-zinc-800/80 space-y-1">
        <button
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50 transition-colors group relative"
          )}
        >
          <Settings className="w-4 h-4 shrink-0 text-zinc-400 group-hover:text-zinc-200" />
          {!collapsed && <span className="flex-1 truncate text-left">Settings</span>}
          {collapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-zinc-900 text-zinc-200 text-xs rounded border border-zinc-800 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
              Settings
            </div>
          )}
        </button>

        {/* User Profile */}
        <div
          className={cn(
            "flex items-center gap-3 p-2 rounded-md bg-zinc-900/40 border border-zinc-800/60 mt-2",
            collapsed && "justify-center p-2"
          )}
        >
          <div className="relative shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xs font-semibold">
              A
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-zinc-950" />
          </div>

          {!collapsed && (
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-medium text-zinc-200 truncate">
                Abhishek Anand
              </span>
              <span className="text-[10px] text-zinc-500 truncate flex items-center gap-1 font-mono">
                <GithubIcon className="w-2.5 h-2.5" /> @Jerry-Abhi
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
