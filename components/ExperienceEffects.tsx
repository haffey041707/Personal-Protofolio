"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";

export function ExperienceEffects() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <>
      <div className="noise" />
      <div className="fixed right-5 top-1/2 z-50 hidden h-48 w-px -translate-y-1/2 overflow-hidden rounded-full bg-white/10 md:block">
        <div
          className="w-full rounded-full bg-gradient-to-b from-plasma via-violet to-aurora"
          style={{ height: `${progress}%` }}
        />
      </div>
    </>
  );
}
