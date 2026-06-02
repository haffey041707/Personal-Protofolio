"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Stars } from "@react-three/drei";
import * as THREE from "three";

function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function BrainParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  const { positions, colors, linePositions } = useMemo(() => {
    const random = seededRandom(42);
    const count = 1200;
    const positionArray = new Float32Array(count * 3);
    const colorArray = new Float32Array(count * 3);
    const lineArray = new Float32Array(180 * 6);

    for (let index = 0; index < count; index += 1) {
      const lobe = index % 2 === 0 ? -0.52 : 0.52;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      const radius = 0.72 + random() * 0.24;
      const fold = Math.sin(theta * 5 + phi * 2) * 0.08;

      let x = lobe + Math.sin(phi) * Math.cos(theta) * (radius + fold);
      let y = Math.cos(phi) * (0.76 + random() * 0.16);
      let z = Math.sin(phi) * Math.sin(theta) * (0.78 + fold);

      if (index > count * 0.84) {
        const stem = (index - count * 0.84) / (count * 0.16);
        x = (random() - 0.5) * 0.36;
        y = -0.66 - stem * 0.8;
        z = (random() - 0.5) * 0.28;
      }

      positionArray[index * 3] = x;
      positionArray[index * 3 + 1] = y;
      positionArray[index * 3 + 2] = z;

      const mix = random();
      colorArray[index * 3] = mix > 0.72 ? 0.65 : 0.25;
      colorArray[index * 3 + 1] = mix > 0.36 ? 0.95 : 0.4;
      colorArray[index * 3 + 2] = 1;
    }

    for (let index = 0; index < 180; index += 1) {
      const from = Math.floor(random() * count);
      const to = Math.floor(random() * count);
      lineArray[index * 6] = positionArray[from * 3];
      lineArray[index * 6 + 1] = positionArray[from * 3 + 1];
      lineArray[index * 6 + 2] = positionArray[from * 3 + 2];
      lineArray[index * 6 + 3] = positionArray[to * 3];
      lineArray[index * 6 + 4] = positionArray[to * 3 + 1];
      lineArray[index * 6 + 5] = positionArray[to * 3 + 2];
    }

    return { positions: positionArray, colors: colorArray, linePositions: lineArray };
  }, []);

  useFrame(({ clock, pointer }) => {
    const elapsed = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = elapsed * 0.18 + pointer.x * 0.22;
      groupRef.current.rotation.x = -0.1 + pointer.y * 0.08;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.z = Math.sin(elapsed * 0.7) * 0.045;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.1, 0]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.022}
          vertexColors
          transparent
          opacity={0.88}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#55f3ff" transparent opacity={0.11} />
      </lineSegments>
      {[0.98, 1.18, 1.42].map((scale, index) => (
        <mesh key={scale} rotation={[Math.PI / 2.2, index * 0.72, 0]} scale={scale}>
          <torusGeometry args={[1.18, 0.006, 12, 160]} />
          <meshBasicMaterial
            color={index === 1 ? "#a855f7" : "#48f1a8"}
            transparent
            opacity={0.28}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

function CodePanels() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = -0.32 + pointer.x * 0.15;
    groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.7) * 0.07;
  });

  return (
    <group ref={groupRef} position={[2.75, 0.15, -0.35]} rotation={[0.02, -0.36, 0]}>
      {[0, 1, 2].map((item) => (
        <mesh key={item} position={[0, 0.72 - item * 0.72, item * -0.12]}>
          <boxGeometry args={[1.34, 0.42, 0.018]} />
          <meshStandardMaterial
            color={item === 1 ? "#172036" : "#101827"}
            emissive={item === 2 ? "#48f1a8" : "#55f3ff"}
            emissiveIntensity={0.14}
            roughness={0.28}
            metalness={0.38}
            transparent
            opacity={0.66}
          />
        </mesh>
      ))}
    </group>
  );
}

function DeveloperEarth() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.22;
      meshRef.current.rotation.x = -0.18;
    }
  });

  return (
    <Float speed={1.4} floatIntensity={0.18}>
      <mesh ref={meshRef} position={[-3.05, -1.65, -0.5]}>
        <sphereGeometry args={[0.34, 48, 48]} />
        <meshStandardMaterial
          color="#101827"
          emissive="#55f3ff"
          emissiveIntensity={0.09}
          metalness={0.5}
          roughness={0.2}
          wireframe
        />
      </mesh>
    </Float>
  );
}

export default function CyberScene() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" data-render="cyber-scene">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 46 }}
        dpr={[1, 1.65]}
        gl={{ antialias: true, preserveDrawingBuffer: true }}
      >
        <color attach="background" args={["#050711"]} />
        <ambientLight intensity={0.62} />
        <pointLight position={[3, 3, 4]} intensity={14} color="#55f3ff" />
        <pointLight position={[-4, -2, 3]} intensity={8} color="#a855f7" />
        <Stars radius={80} depth={36} count={1300} factor={3.4} fade speed={0.5} />
        <Sparkles count={150} scale={[7, 4, 5]} size={2.2} speed={0.35} color="#55f3ff" />
        <BrainParticles />
        <CodePanels />
        <DeveloperEarth />
      </Canvas>
    </div>
  );
}
