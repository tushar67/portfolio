"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

function Shape() {
  const mesh = useRef<any>(null);

  useFrame(({ clock }) => {
    mesh.current.rotation.y = clock.getElapsedTime() * 0.5;
    mesh.current.rotation.x = clock.getElapsedTime() * 0.3;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.3, 1]} />
      <meshStandardMaterial color="#ff7b00" wireframe />
    </mesh>
  );
}

export default function ThreeScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6] }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} />
      <Shape />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}