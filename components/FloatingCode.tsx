"use client";

import { motion } from "framer-motion";

const snippets = [
  {
    title: "assistant.pipeline",
    code: ["intent = ai.listen()", "tools.run(intent)", "voice.reply(result)"]
  },
  {
    title: "recommendation.model",
    code: ["features = vectorize(user)", "ranked = model.predict(features)", "return top_tables"]
  },
  {
    title: "portfolio.api",
    code: ["POST /api/contact", "prisma.message.create()", "notify.recruiter()"]
  }
];

export function FloatingCode() {
  return (
    <div className="perspective-1200 space-y-4">
      {snippets.map((snippet, index) => (
        <motion.div
          key={snippet.title}
          initial={{ opacity: 0, rotateY: -16, y: 18 }}
          animate={{ opacity: 1, rotateY: -8 + index * 3, y: 0 }}
          transition={{ duration: 0.7, delay: 2.35 + index * 0.12 }}
          whileHover={{ rotateY: 0, scale: 1.025 }}
          className="glass-panel holo-edge preserve-3d rounded-lg p-4"
          style={{ transform: `translateZ(${index * 12}px)` }}
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-plasma">
              {snippet.title}
            </p>
            <span className="h-2 w-2 rounded-full bg-aurora shadow-[0_0_18px_rgba(72,241,168,.8)]" />
          </div>
          <div className="space-y-2 font-mono text-xs text-steel">
            {snippet.code.map((line) => (
              <p key={line}>
                <span className="text-violet">&gt;</span> {line}
              </p>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
