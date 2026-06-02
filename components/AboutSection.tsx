"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Cpu, Sparkles } from "lucide-react";
import { contactLinks, profile, stats } from "@/data/portfolio";
import { CountUp } from "@/components/CountUp";
import { SectionTitle } from "@/components/SectionTitle";

export function AboutSection() {
  return (
    <section id="about" className="relative px-5 py-24 sm:px-8 lg:px-12">
      <SectionTitle
        eyebrow="Identity Matrix"
        title="AI engineering with full-stack execution."
        copy="A profile built around useful intelligence, clean systems, and interfaces that feel precise from the first interaction."
      />

      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, rotateX: 16, rotateY: -18, y: 24 }}
          whileInView={{ opacity: 1, rotateX: 0, rotateY: 0, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="perspective-1200"
        >
          <div className="glass-panel holo-edge preserve-3d relative overflow-hidden rounded-lg p-6 sm:p-8">
            <div className="absolute right-6 top-6 grid h-16 w-16 place-items-center rounded-md border border-plasma/25 bg-plasma/10 text-plasma shadow-neon-cyan">
              <BrainCircuit className="h-8 w-8" />
            </div>
            <div className="absolute -left-8 top-10 h-24 w-24 rotate-45 border border-violet/30" />

            <p className="font-mono text-xs uppercase tracking-[0.28em] text-aurora">
              Holographic Profile
            </p>
            <h3 className="mt-5 max-w-[11ch] text-4xl font-semibold leading-tight text-white sm:text-5xl">
              {profile.name}
            </h3>
            <p className="mt-3 text-lg font-medium text-plasma">{profile.role}</p>
            <p className="mt-8 max-w-xl text-base leading-8 text-steel">
              {profile.description}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-md border border-white/10 bg-white/[0.045] p-4 transition hover:border-plasma/45 hover:bg-plasma/10"
                >
                  <link.icon className="mb-3 h-5 w-5 text-plasma" />
                  <p className="text-xs uppercase tracking-[0.22em] text-steel">
                    {link.label}
                  </p>
                  <p className="mt-1 break-words text-sm font-semibold text-white">
                    {link.value}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="glass-panel rounded-lg p-5"
              >
                <p className="text-3xl font-semibold text-white">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm leading-6 text-steel">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-panel holo-edge rounded-lg p-6"
          >
            <div className="flex flex-wrap gap-3">
              {[
                "AI-based projects",
                "Modern web apps",
                "API integrations",
                "Database-backed products",
                "Animated interfaces"
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.045] px-4 py-2 text-sm text-steel"
                >
                  <Sparkles className="h-3.5 w-3.5 text-aurora" />
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div>
                <Cpu className="mb-4 h-6 w-6 text-ember" />
                <h4 className="text-lg font-semibold text-white">Engineering Focus</h4>
                <p className="mt-3 text-sm leading-7 text-steel">
                  Python automation, Flask backends, intelligent assistants, and
                  responsive frontends that can move from prototype to production.
                </p>
              </div>
              <div>
                <BrainCircuit className="mb-4 h-6 w-6 text-plasma" />
                <h4 className="text-lg font-semibold text-white">AI Direction</h4>
                <p className="mt-3 text-sm leading-7 text-steel">
                  Model-assisted experiences, practical ML tooling, and prompt systems
                  tuned for clear user outcomes.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
