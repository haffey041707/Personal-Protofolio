"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Github } from "lucide-react";
import { navItems, profile } from "@/data/portfolio";
import { Button } from "@/components/ui/button";

export function Navigation() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 2.15 }}
      className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-lg border border-white/12 bg-ink/62 px-4 py-3 shadow-2xl backdrop-blur-2xl">
        <a href="#home" className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-plasma/35 bg-plasma/10 text-plasma shadow-neon-cyan">
            <BrainCircuit className="h-5 w-5" />
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block truncate text-sm font-semibold text-white">
              {profile.name}
            </span>
            <span className="block truncate text-xs text-steel">
              AI Engineer / Software Developer
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-steel transition hover:bg-white/[0.08] hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <Button asChild variant="ghost" size="md">
          <a href={`https://github.com/${profile.github}`} target="_blank" rel="noreferrer">
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </Button>
      </nav>
    </motion.header>
  );
}
