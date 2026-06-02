"use client";

import { motion } from "framer-motion";

export function SectionTitle({
  eyebrow,
  title,
  copy
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65 }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.32em] text-plasma">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-balance text-3xl font-semibold tracking-normal text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-steel">{copy}</p>
    </motion.div>
  );
}
