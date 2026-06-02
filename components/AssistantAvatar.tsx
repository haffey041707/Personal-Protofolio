"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Mic2, X } from "lucide-react";
import { profile } from "@/data/portfolio";
import { Button } from "@/components/ui/button";

const intro =
  "Muhammad Hafeez is an AI Engineer and Software Developer building intelligent assistants, modern web applications, automation systems, and polished user experiences.";

export function AssistantAvatar() {
  const [open, setOpen] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const speak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(intro);
    utterance.rate = 0.92;
    utterance.pitch = 0.9;
    utterance.onend = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const close = () => {
    setOpen(false);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  return (
    <div className="fixed bottom-20 right-5 z-50 md:bottom-5">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            className="glass-panel holo-edge mb-3 w-[min(calc(100vw-2.5rem),22rem)] rounded-lg p-4"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-plasma">
                  AI Companion
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">{profile.name}</h3>
              </div>
              <button
                type="button"
                onClick={close}
                className="grid h-9 w-9 place-items-center rounded-md border border-white/12 bg-white/[0.045] text-steel transition hover:text-white"
                aria-label="Close assistant"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm leading-7 text-steel">{intro}</p>
            <Button onClick={speak} variant="secondary" className="mt-5 w-full">
              <Mic2 className="h-4 w-4" />
              {speaking ? "Playing Voice Intro" : "Listen About Muhammad Hafeez"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="relative grid h-14 w-14 place-items-center rounded-md border border-plasma/45 bg-plasma/15 text-plasma shadow-neon-cyan transition hover:scale-105 hover:bg-plasma/22"
        aria-label="Open AI assistant"
      >
        <span className="absolute inset-0 animate-pulse-ring rounded-md border border-plasma/40" />
        <Bot className="relative h-6 w-6" />
      </button>
    </div>
  );
}
