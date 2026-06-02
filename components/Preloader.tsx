"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const round = (value: number) => Number(value.toFixed(4));

const nodes = Array.from({ length: 34 }, (_, index) => {
  const angle = (index / 34) * Math.PI * 2;
  const radius = index % 3 === 0 ? 72 : index % 2 === 0 ? 54 : 92;
  return {
    id: index,
    x: round(Math.cos(angle) * radius + (index % 5) * 3),
    y: round(Math.sin(angle) * radius * 0.72),
    delay: index * 0.028
  };
});

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressTimer = window.setInterval(() => {
      setProgress((value) => Math.min(value + 4, 100));
    }, 70);

    const closeTimer = window.setTimeout(() => {
      setVisible(false);
    }, 2200);

    return () => {
      window.clearInterval(progressTimer);
      window.clearTimeout(closeTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-ink"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(85,243,255,.16),transparent_34rem)]" />
          <div className="absolute inset-x-0 top-0 h-1/2 animate-scan bg-gradient-to-b from-transparent via-plasma/12 to-transparent" />
          <div className="relative flex w-full max-w-lg flex-col items-center px-6">
            <div className="relative h-64 w-64">
              <motion.div
                initial={{ scale: 0.82, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-12 rounded-full border border-plasma/30 shadow-neon-cyan"
              />
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, ease: "linear", duration: 8 }}
                className="absolute inset-8 rounded-full border border-dashed border-violet/40"
              />
              <svg
                viewBox="-130 -110 260 220"
                className="absolute inset-0 h-full w-full overflow-visible"
                aria-hidden="true"
              >
                {nodes.map((node) => (
                  <motion.circle
                    key={node.id}
                    cx={node.x}
                    cy={node.y}
                    r={node.id % 4 === 0 ? 3.7 : 2.4}
                    fill={node.id % 5 === 0 ? "#48f1a8" : "#55f3ff"}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0.25, 1, 0.5], scale: 1 }}
                    transition={{
                      duration: 1.4,
                      delay: node.delay,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                ))}
                {nodes.slice(0, 28).map((node, index) => {
                  const next = nodes[(index * 3 + 5) % nodes.length];
                  return (
                    <motion.line
                      key={`${node.id}-${next.id}`}
                      x1={node.x}
                      y1={node.y}
                      x2={next.x}
                      y2={next.y}
                      stroke="rgba(85,243,255,.34)"
                      strokeWidth="1"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.025 }}
                    />
                  );
                })}
              </svg>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-mono text-sm uppercase tracking-[0.32em] text-plasma"
            >
              Muhammad Hafeez
            </motion.p>
            <div className="mt-6 h-2 w-full overflow-hidden rounded-full border border-white/10 bg-white/5">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-plasma via-violet to-aurora shadow-neon-cyan"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.28em] text-steel">
              Welcome {progress}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
