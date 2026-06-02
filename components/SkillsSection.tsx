"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Sparkles } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { skillGroups } from "@/data/portfolio";
import { SectionTitle } from "@/components/SectionTitle";

type OrbitSkill = {
  name: string;
  level: number;
  angle: number;
  radius: number;
  height: number;
  speed: number;
  color: string;
};

const colors = ["#55f3ff", "#a855f7", "#48f1a8", "#ffb86b", "#ff5c93"];

function SkillSphere({ skill }: { skill: OrbitSkill }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime() * skill.speed + skill.angle;
    meshRef.current.position.x = Math.cos(time) * skill.radius;
    meshRef.current.position.z = Math.sin(time) * skill.radius;
    meshRef.current.position.y = skill.height + Math.sin(time * 1.7) * 0.08;
    meshRef.current.scale.setScalar(hovered ? 1.22 : 1);
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.11 + skill.level / 1000, 28, 28]} />
      <meshStandardMaterial
        color={skill.color}
        emissive={skill.color}
        emissiveIntensity={hovered ? 0.8 : 0.32}
        metalness={0.35}
        roughness={0.2}
      />
      <Html center distanceFactor={8}>
        <div className="whitespace-nowrap rounded-full border border-white/15 bg-ink/76 px-2.5 py-1 text-[10px] font-semibold text-white shadow-xl backdrop-blur-xl">
          {skill.name}
        </div>
      </Html>
    </mesh>
  );
}

function SkillsGalaxyCanvas() {
  const groupRef = useRef<THREE.Group>(null);
  const skills = useMemo<OrbitSkill[]>(() => {
    const flattened = skillGroups.flatMap((group) => group.skills);
    return flattened.map((skill, index) => ({
      ...skill,
      angle: (index / flattened.length) * Math.PI * 2,
      radius: 1.05 + (index % 4) * 0.38,
      height: (index % 5) * 0.18 - 0.36,
      speed: 0.18 + (index % 6) * 0.018,
      color: colors[index % colors.length]
    }));
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.08 + pointer.x * 0.12;
    groupRef.current.rotation.x = pointer.y * 0.05;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[0.42, 3]} />
        <meshStandardMaterial
          color="#111827"
          emissive="#55f3ff"
          emissiveIntensity={0.42}
          metalness={0.62}
          roughness={0.16}
          wireframe
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.78, 0.01, 12, 160]} />
        <meshBasicMaterial color="#55f3ff" transparent opacity={0.32} />
      </mesh>
      <mesh rotation={[0.7, 0.3, 0]}>
        <torusGeometry args={[1.48, 0.008, 12, 160]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.28} />
      </mesh>
      {skills.map((skill) => (
        <SkillSphere key={skill.name} skill={skill} />
      ))}
    </group>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="relative overflow-hidden px-5 py-24 sm:px-8 lg:px-12">
      <SectionTitle
        eyebrow="Skills Galaxy"
        title="Core technologies orbiting one AI product mindset."
        copy="A practical stack for building assistants, APIs, web products, recommendations, automation, and polished user experiences."
      />

      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_.95fr]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.75 }}
          className="glass-panel holo-edge relative h-[520px] overflow-hidden rounded-lg"
        >
          <Canvas
            camera={{ position: [0, 0.15, 5.1], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, preserveDrawingBuffer: true }}
          >
            <color attach="background" args={["#070a14"]} />
            <ambientLight intensity={0.58} />
            <pointLight position={[3, 4, 4]} intensity={18} color="#55f3ff" />
            <pointLight position={[-3, -2, 4]} intensity={8} color="#ffb86b" />
            <Sparkles count={120} scale={[5, 3, 4]} size={2} speed={0.28} color="#48f1a8" />
            <SkillsGalaxyCanvas />
          </Canvas>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: groupIndex * 0.08 }}
              className="glass-panel rounded-lg p-5"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-md border border-plasma/25 bg-plasma/10 text-plasma">
                  <group.icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-semibold text-white">{group.label}</h3>
              </div>
              <div className="space-y-4">
                {group.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                      <span className="font-medium text-white">{skill.name}</span>
                      <span className="font-mono text-xs text-steel">{skill.level}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/[0.08]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.1 }}
                        className="h-full rounded-full bg-gradient-to-r from-plasma via-aurora to-ember"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
