"use client";

import React from "react";
import { Search, Bell, Command, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = "Dashboard" }) => {
  return (
    <header className="flex items-center justify-between h-14 px-6 bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-800/80 sticky top-0 z-20">
      {/* Title / Breadcrumb */}
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-semibold text-zinc-100">{title}</h1>
        <span className="text-zinc-600 text-xs">/</span>
        <span className="text-xs text-zinc-400 font-mono">devflow-workspace</span>
      </div>

      {/* Center Search bar */}
      <div className="flex-1 max-w-md mx-8 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search repositories, issues, or agent runs..."
            className="w-full h-8 pl-9 pr-12 text-xs bg-zinc-900/60 border border-zinc-800 rounded-md text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-400 font-mono">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* GitHub indicator */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-zinc-400 hover:text-zinc-200 bg-zinc-900/80 border border-zinc-800 rounded-md transition-colors"
        >
          <GithubIcon className="w-3.5 h-3.5" />
          <span>GitHub</span>
          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
        </a>

        {/* Notifications */}
        <button className="relative p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 rounded-md transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full" />
        </button>

        {/* Avatar */}
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold ring-1 ring-zinc-800">
          A
        </div>
      </div>
    </header>
  );
};
