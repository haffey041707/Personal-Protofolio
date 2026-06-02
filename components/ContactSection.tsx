"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Mail, Send, ShieldCheck } from "lucide-react";
import { contactLinks, profile } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/SectionTitle";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  subject: "",
  message: ""
};

export function ContactSection() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(data.message ?? "Transmission failed. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(data.message ?? "Message transmitted.");
      setForm(initialForm);
    } catch {
      setStatus("error");
      setMessage("Transmission failed. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative px-5 pb-28 pt-24 sm:px-8 lg:px-12">
      <SectionTitle
        eyebrow="Contact Uplink"
        title="Let’s build something intelligent, useful, and memorable."
        copy="Send a project brief, collaboration idea, recruiter note, or partnership message."
      />

      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[.82fr_1.18fr]">
        <motion.aside
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="glass-panel holo-edge rounded-lg p-6"
        >
          <Mail className="h-10 w-10 text-plasma" />
          <h3 className="mt-6 text-3xl font-semibold text-white">{profile.name}</h3>
          <p className="mt-3 text-base leading-8 text-steel">{profile.role}</p>
          <div className="mt-8 space-y-3">
            {contactLinks.slice(0, 3).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.045] p-4 transition hover:border-plasma/45 hover:bg-plasma/10"
              >
                <link.icon className="h-5 w-5 shrink-0 text-aurora" />
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-[0.2em] text-steel">
                    {link.label}
                  </span>
                  <span className="block truncate text-sm font-semibold text-white">
                    {link.value}
                  </span>
                </span>
              </a>
            ))}
          </div>
          <div className="mt-8 rounded-md border border-aurora/25 bg-aurora/10 p-4">
            <ShieldCheck className="mb-3 h-5 w-5 text-aurora" />
            <p className="text-sm leading-7 text-steel">
              Available for AI assistants, modern web apps, automation systems,
              and full-stack product builds.
            </p>
          </div>
        </motion.aside>

        <motion.form
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          onSubmit={submit}
          className="glass-panel holo-edge rounded-lg p-5 sm:p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-white">Name</span>
              <input
                required
                minLength={2}
                value={form.name}
                onChange={(event) => setForm((state) => ({ ...state, name: event.target.value }))}
                className="h-12 w-full rounded-md border border-white/12 bg-white/[0.045] px-4 text-sm text-white outline-none transition placeholder:text-steel/60 focus:border-plasma/60 focus:ring-2 focus:ring-plasma/20"
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-white">Email</span>
              <input
                required
                type="email"
                value={form.email}
                onChange={(event) => setForm((state) => ({ ...state, email: event.target.value }))}
                className="h-12 w-full rounded-md border border-white/12 bg-white/[0.045] px-4 text-sm text-white outline-none transition placeholder:text-steel/60 focus:border-plasma/60 focus:ring-2 focus:ring-plasma/20"
                placeholder="you@example.com"
              />
            </label>
          </div>
          <label className="mt-4 block">
            <span className="mb-2 block text-sm font-semibold text-white">Subject</span>
            <input
              required
              minLength={3}
              value={form.subject}
              onChange={(event) => setForm((state) => ({ ...state, subject: event.target.value }))}
              className="h-12 w-full rounded-md border border-white/12 bg-white/[0.045] px-4 text-sm text-white outline-none transition placeholder:text-steel/60 focus:border-plasma/60 focus:ring-2 focus:ring-plasma/20"
              placeholder="Project, role, or collaboration"
            />
          </label>
          <label className="mt-4 block">
            <span className="mb-2 block text-sm font-semibold text-white">Message</span>
            <textarea
              required
              minLength={10}
              rows={8}
              value={form.message}
              onChange={(event) => setForm((state) => ({ ...state, message: event.target.value }))}
              className="w-full resize-none rounded-md border border-white/12 bg-white/[0.045] px-4 py-3 text-sm leading-7 text-white outline-none transition placeholder:text-steel/60 focus:border-plasma/60 focus:ring-2 focus:ring-plasma/20"
              placeholder="Tell Muhammad what you want to build."
            />
          </label>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button type="submit" size="lg" disabled={status === "sending"}>
              {status === "sending" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Send Message
            </Button>
            <AnimatePresence mode="wait">
              {message && (
                <motion.p
                  key={message}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className={`inline-flex items-center gap-2 text-sm ${
                    status === "success" ? "text-aurora" : "text-rosefire"
                  }`}
                >
                  {status === "success" && <CheckCircle2 className="h-4 w-4" />}
                  {message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
