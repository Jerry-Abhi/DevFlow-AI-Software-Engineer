import React from "react";
import Link from "next/link";
import { Bot, ArrowRight, ShieldCheck, Zap, GitPullRequest } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-indigo-500/30">
      {/* Top minimal header */}
      <header className="flex items-center justify-between p-6 max-w-6xl w-full mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Bot className="w-5 h-5" />
          </div>
          <span className="font-semibold text-base tracking-tight">DevFlow</span>
        </div>

        <Link
          href="/dashboard"
          className="text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          Demo Dashboard →
        </Link>
      </header>

      {/* Main Hero Card */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center">
        <div className="max-w-md w-full p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 shadow-2xl backdrop-blur-sm space-y-6">
          {/* Logo badge */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 mx-auto shadow-inner">
            <Bot className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
              DevFlow
            </h1>
            <p className="text-sm text-zinc-400 font-medium">
              Your Autonomous AI Software Engineer
            </p>
          </div>

          {/* Primary Action Button */}
          <div className="space-y-3 pt-2">
            <Link
              href="/dashboard"
              className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-950/60 hover:shadow-indigo-900/60 border border-indigo-500/50 group"
            >
              <GithubIcon className="w-5 h-5" />
              <span>Continue with GitHub</span>
              <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <p className="text-xs text-zinc-500 leading-relaxed px-2">
              Connect your repository and let DevFlow handle the engineering workflow.
            </p>
          </div>

          {/* Feature Highlights Footer */}
          <div className="grid grid-cols-3 gap-2 pt-6 border-t border-zinc-800/60 text-[11px] text-zinc-500 font-mono">
            <div className="flex flex-col items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              <span>Autonomous</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sandboxed</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <GitPullRequest className="w-3.5 h-3.5 text-purple-400" />
              <span>Auto PRs</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-zinc-600 font-mono">
        DevFlow AI Engineer • Powered by Agentic Architecture
      </footer>
    </div>
  );
}
