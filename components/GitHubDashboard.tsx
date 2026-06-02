"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Code2, GitCommitVertical, Github, Star, Users } from "lucide-react";
import * as THREE from "three";
import { profile } from "@/data/portfolio";
import { SectionTitle } from "@/components/SectionTitle";

type GitHubStats = {
  repos: number;
  stars: number;
  followers: number;
  languages: string[];
  recentRepos: string[];
  commits: number | string;
};

const fallbackStats: GitHubStats = {
  repos: 0,
  stars: 0,
  followers: 0,
  languages: ["Python", "JavaScript", "React"],
  recentRepos: ["Aiba AI Virtual Assistant", "AI Birthday Experience", "Restaurant Recommendation System"],
  commits: "Live"
};

function OrbitDashboardScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.25 + pointer.x * 0.16;
    groupRef.current.rotation.x = -0.15 + pointer.y * 0.08;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.68, 48, 48]} />
        <meshStandardMaterial
          color="#0b1220"
          emissive="#55f3ff"
          emissiveIntensity={0.18}
          metalness={0.55}
          roughness={0.22}
          wireframe
        />
      </mesh>
      {[0.9, 1.18, 1.48].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2.4, index * 0.55, index * 0.25]}>
          <torusGeometry args={[radius, 0.01, 12, 160]} />
          <meshBasicMaterial
            color={index === 0 ? "#55f3ff" : index === 1 ? "#a855f7" : "#48f1a8"}
            transparent
            opacity={0.36}
          />
        </mesh>
      ))}
      {Array.from({ length: 18 }).map((_, index) => {
        const angle = (index / 18) * Math.PI * 2;
        return (
          <mesh
            key={index}
            position={[Math.cos(angle) * 1.48, Math.sin(angle * 2) * 0.25, Math.sin(angle) * 1.48]}
          >
            <boxGeometry args={[0.08, 0.08, 0.08]} />
            <meshStandardMaterial
              color={index % 3 === 0 ? "#ffb86b" : "#55f3ff"}
              emissive={index % 3 === 0 ? "#ffb86b" : "#55f3ff"}
              emissiveIntensity={0.45}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function ContributionGrid() {
  return (
    <div className="grid grid-cols-12 gap-1">
      {Array.from({ length: 72 }).map((_, index) => {
        const intensity = (index * 17 + 13) % 5;
        const colors = [
          "bg-white/[0.06]",
          "bg-plasma/20",
          "bg-aurora/30",
          "bg-violet/35",
          "bg-ember/45"
        ];
        return (
          <span
            key={index}
            className={`aspect-square rounded-[2px] ${colors[intensity]}`}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}

export function GitHubDashboard() {
  const [stats, setStats] = useState<GitHubStats>(fallbackStats);

  useEffect(() => {
    let mounted = true;

    fetch("/api/github")
      .then((response) => response.json())
      .then((data: GitHubStats) => {
        if (mounted) setStats(data);
      })
      .catch(() => {
        if (mounted) setStats(fallbackStats);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const metricCards = [
    { label: "Repositories", value: stats.repos, icon: Github },
    { label: "Stars", value: stats.stars, icon: Star },
    { label: "Followers", value: stats.followers, icon: Users },
    { label: "Commits", value: stats.commits, icon: GitCommitVertical }
  ];

  return (
    <section id="github" className="relative px-5 py-24 sm:px-8 lg:px-12">
      <SectionTitle
        eyebrow="Live GitHub"
        title="A holographic dashboard for public engineering activity."
        copy="Public repositories, language signals, stars, recent work, and contribution rhythm in one compact engineering view."
      />

      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-panel holo-edge h-[410px] overflow-hidden rounded-lg"
        >
          <Canvas
            camera={{ position: [0, 0, 4.4], fov: 44 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, preserveDrawingBuffer: true }}
          >
            <color attach="background" args={["#070a14"]} />
            <ambientLight intensity={0.55} />
            <pointLight position={[2, 3, 4]} intensity={14} color="#55f3ff" />
            <pointLight position={[-3, -1, 3]} intensity={8} color="#ffb86b" />
            <OrbitDashboardScene />
          </Canvas>
        </motion.div>

        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-4">
            {metricCards.map((metric) => (
              <div key={metric.label} className="glass-panel rounded-lg p-4">
                <metric.icon className="mb-4 h-5 w-5 text-plasma" />
                <p className="text-2xl font-semibold text-white">{metric.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-steel">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-[.9fr_1.1fr]">
            <div className="glass-panel rounded-lg p-5">
              <div className="mb-4 flex items-center gap-3">
                <Code2 className="h-5 w-5 text-aurora" />
                <h3 className="font-semibold text-white">Languages & AI Stack</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {stats.languages.map((language) => (
                  <span
                    key={language}
                    className="rounded-full border border-white/12 bg-white/[0.045] px-3 py-1.5 text-xs font-medium text-steel"
                  >
                    {language}
                  </span>
                ))}
              </div>
              <a
                href={`https://github.com/${profile.github}`}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex text-sm font-semibold text-plasma transition hover:text-white"
              >
                github.com/{profile.github}
              </a>
            </div>

            <div className="glass-panel rounded-lg p-5">
              <h3 className="mb-4 font-semibold text-white">Contribution Graph</h3>
              <ContributionGrid />
              <div className="mt-5 space-y-2">
                {stats.recentRepos.slice(0, 3).map((repo) => (
                  <p key={repo} className="truncate text-sm text-steel">
                    <span className="text-plasma">/</span> {repo}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
