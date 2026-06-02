"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  ArrowDown,
  BrainCircuit,
  Download,
  Mail,
  Play,
  Sparkles
} from "lucide-react";
import { profile, highlights, techMarquee } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { AboutSection } from "@/components/AboutSection";
import { AssistantAvatar } from "@/components/AssistantAvatar";
import { ContactSection } from "@/components/ContactSection";
import { GitHubDashboard } from "@/components/GitHubDashboard";
import { Navigation } from "@/components/Navigation";
import { Preloader } from "@/components/Preloader";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { SkillsSection } from "@/components/SkillsSection";
import { TimelineSection } from "@/components/TimelineSection";
import { ExperienceEffects } from "@/components/ExperienceEffects";
import { FloatingCode } from "@/components/FloatingCode";
import { TypewriterRoles } from "@/components/TypewriterRoles";

const CyberScene = dynamic(() => import("@/components/CyberScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-ink" />
});

export default function Home() {
  return (
    <>
      <Preloader />
      <ExperienceEffects />
      <Navigation />
      <main className="relative z-10">
        <section
          id="home"
          className="relative flex min-h-[92vh] items-center overflow-hidden px-5 pb-16 pt-28 sm:px-8 lg:px-12"
        >
          <CyberScene />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink" />
          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.02fr_1.08fr_.9fr]">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 2.1 }}
              className="relative"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-plasma/30 bg-plasma/10 px-4 py-2 text-sm text-plasma shadow-neon-cyan">
                <BrainCircuit className="h-4 w-4" />
                AI Engineer / Software Developer
              </div>
              <h1 className="max-w-[11ch] text-balance text-5xl font-semibold leading-[0.96] tracking-normal text-white sm:text-6xl lg:text-7xl">
                Muhammad Hafeez
              </h1>
              <div className="mt-5 min-h-8 text-xl font-medium text-steel sm:text-2xl">
                <TypewriterRoles roles={profile.shortRoles} />
              </div>
              <p className="mt-6 max-w-xl text-base leading-8 text-steel sm:text-lg">
                Designing intelligent products, responsive systems, and AI-powered
                interfaces with a builder&apos;s pace and an engineer&apos;s precision.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href="#projects">
                    View Projects
                    <ArrowDown className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <a href="/Muhammad-Hafeez-CV.pdf" target="_blank" rel="noreferrer">
                    Open CV
                    <Download className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <a href="#contact">
                    Contact Me
                    <Mail className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 2.35 }}
              className="pointer-events-none hidden min-h-[560px] lg:block"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 2.45 }}
              className="hidden space-y-4 md:block"
            >
              <FloatingCode />
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {highlights.map((item) => (
                  <div
                    key={item.text}
                    className="glass-panel holo-edge rounded-lg px-4 py-4"
                  >
                    <item.icon className="mb-3 h-5 w-5 text-aurora" />
                    <p className="text-sm font-medium text-white">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-white/10 bg-white/[0.025] py-4">
          <div className="flex w-max animate-marquee gap-4 text-sm font-semibold uppercase tracking-[0.18em] text-steel">
            {[...techMarquee, ...techMarquee, ...techMarquee].map((tech, index) => (
              <span
                key={`${tech}-${index}`}
                className="inline-flex items-center gap-4 px-3"
              >
                <Sparkles className="h-3.5 w-3.5 text-plasma" />
                {tech}
              </span>
            ))}
          </div>
        </section>

        <AboutSection />
        <SkillsSection />
        <ProjectShowcase />
        <TimelineSection />
        <GitHubDashboard />
        <ContactSection />
      </main>
      <AssistantAvatar />
      <a
        href="#about"
        className="fixed bottom-6 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-steel backdrop-blur-xl transition hover:border-plasma/50 hover:text-white md:flex"
      >
        <Play className="h-3.5 w-3.5 fill-plasma text-plasma" />
        Enter Portfolio
      </a>
    </>
  );
}
