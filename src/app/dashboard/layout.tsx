"use client";

import React from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname.startsWith("/repositories")) return "Repositories";
    if (pathname.startsWith("/issues")) return "Issues";
    if (pathname.startsWith("/runs")) return "Agent Runs";
    return "Dashboard";
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden selection:bg-indigo-500/30">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Header title={getTitle()} />

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
