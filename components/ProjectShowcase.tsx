"use client";

import { motion } from "framer-motion";
import { Github, Layers3 } from "lucide-react";
import { projects } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/SectionTitle";

export function ProjectShowcase() {
  return (
    <section id="projects" className="relative px-5 py-24 sm:px-8 lg:px-12">
      <SectionTitle
        eyebrow="Project Vault"
        title="Holographic builds with AI, automation, and full-stack logic."
        copy="Each project is shaped around practical interaction: assistants that act, experiences that feel personal, and systems that support decisions."
      />

      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 28, rotateX: 8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: index * 0.12 }}
            whileHover={{ y: -8, rotateX: 2, rotateY: index === 1 ? 0 : index === 0 ? -3 : 3 }}
            className="glass-panel holo-edge group perspective-1200 relative flex min-h-[460px] flex-col overflow-hidden rounded-lg p-6"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-plasma to-transparent opacity-70" />
            <div className="absolute right-5 top-5 grid h-16 w-16 place-items-center rounded-md border border-white/12 bg-white/[0.045] text-plasma transition group-hover:border-plasma/45 group-hover:shadow-neon-cyan">
              <project.icon className="h-8 w-8" />
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-aurora">
              {project.badge}
            </p>
            <h3 className="mt-6 max-w-[12ch] text-3xl font-semibold leading-tight text-white">
              {project.title}
            </h3>
            <p className="mt-5 flex-1 text-sm leading-7 text-steel">{project.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.045] px-3 py-1.5 text-xs font-medium text-steel"
                >
                  <Layers3 className="h-3.5 w-3.5 text-ember" />
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="ghost" size="md">
                <a href={project.github} target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
