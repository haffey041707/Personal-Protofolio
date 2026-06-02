"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { timeline } from "@/data/portfolio";
import { SectionTitle } from "@/components/SectionTitle";

export function TimelineSection() {
  return (
    <section id="timeline" className="relative px-5 py-24 sm:px-8 lg:px-12">
      <SectionTitle
        eyebrow="Education Timeline"
        title="A software engineering path with momentum."
        copy="Formal education paired with practical builds, AI experimentation, and product-minded execution."
      />

      <div className="mx-auto max-w-4xl">
        <div className="relative">
          <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-plasma via-violet to-aurora sm:left-1/2" />
          {timeline.map((item, index) => (
            <motion.div
              key={`${item.year}-${item.title}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className={`relative mb-8 flex gap-6 sm:items-center ${
                index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
              }`}
            >
              <div className="absolute left-0 top-7 z-10 grid h-10 w-10 place-items-center rounded-md border border-plasma/40 bg-ink text-plasma shadow-neon-cyan sm:left-1/2 sm:-translate-x-1/2">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div className="hidden sm:block sm:w-1/2" />
              <article className="glass-panel holo-edge ml-16 rounded-lg p-6 sm:ml-0 sm:w-1/2">
                <p className="font-mono text-sm font-semibold text-aurora">{item.year}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-sm font-medium text-plasma">{item.institution}</p>
                <p className="mt-4 text-sm leading-7 text-steel">{item.detail}</p>
              </article>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
