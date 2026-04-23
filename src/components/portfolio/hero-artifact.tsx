"use client";

import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function InstrumentAssembly() {
  const groupRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const spindleRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current || !outerRingRef.current || !innerRingRef.current) {
      return;
    }

    const targetX = state.pointer.y * 0.26 - 0.14;
    const targetY = state.pointer.x * 0.45 + state.clock.elapsedTime * 0.12;

    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetX,
      4,
      delta
    );
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetY,
      4,
      delta
    );

    outerRingRef.current.rotation.z += delta * 0.18;
    innerRingRef.current.rotation.x -= delta * 0.28;

    if (spindleRef.current) {
      spindleRef.current.rotation.y += delta * 0.42;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, -1.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.8, 72]} />
        <meshStandardMaterial color="#e7ebf0" metalness={0.06} roughness={0.94} />
      </mesh>

      <mesh ref={outerRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.32, 1.5, 96]} />
        <meshStandardMaterial color="#5e79a3" metalness={0.46} roughness={0.22} />
      </mesh>

      <mesh ref={innerRingRef} rotation={[0.65, 0.18, 0.46]}>
        <torusGeometry args={[0.96, 0.045, 18, 96]} />
        <meshStandardMaterial color="#89a0bc" metalness={0.54} roughness={0.2} />
      </mesh>

      <mesh rotation={[0.28, 0.6, Math.PI / 4]}>
        <boxGeometry args={[1.42, 0.08, 0.26]} />
        <meshStandardMaterial color="#5a8c91" metalness={0.2} roughness={0.5} />
      </mesh>

      <mesh ref={spindleRef}>
        <cylinderGeometry args={[0.16, 0.16, 1.4, 28]} />
        <meshStandardMaterial color="#c8d2dd" metalness={0.14} roughness={0.46} />
      </mesh>

      <mesh position={[0, 0.82, 0]}>
        <icosahedronGeometry args={[0.18, 0]} />
        <meshStandardMaterial color="#274f87" metalness={0.24} roughness={0.34} />
      </mesh>

      <mesh position={[0, -0.82, 0]}>
        <icosahedronGeometry args={[0.18, 0]} />
        <meshStandardMaterial color="#5a8c91" metalness={0.18} roughness={0.36} />
      </mesh>

      <mesh position={[0.94, 0.26, -0.16]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#274f87" emissive="#274f87" emissiveIntensity={0.22} />
      </mesh>

      <mesh position={[-0.94, -0.2, 0.22]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#5a8c91" emissive="#5a8c91" emissiveIntensity={0.18} />
      </mesh>
    </group>
  );
}

export function HeroArtifact() {
  return (
    <div
      aria-label="Interactive 3D scene"
      className="h-[18rem] w-full overflow-hidden rounded-[1.5rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.5),rgba(232,238,245,0.92))]"
    >
      <Canvas camera={{ position: [0, 0.25, 4.8], fov: 34 }} dpr={[1, 2]}>
        <color attach="background" args={["#eef2f6"]} />
        <ambientLight intensity={0.95} />
        <directionalLight position={[4, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, -1, 2]} intensity={0.35} color="#9cb5c1" />
        <pointLight position={[0, 2.2, 1.2]} intensity={0.35} color="#5a8c91" />
        <InstrumentAssembly />
      </Canvas>
    </div>
  );
}
