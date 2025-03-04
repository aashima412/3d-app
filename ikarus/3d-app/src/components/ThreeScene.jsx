import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";


const ThreeScene = ({ modelUrl }) => {
  return (
    <Canvas style={{ height: "500px", width: "100%", background: "#f0f0f0" }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <Suspense fallback={<span>Loading...</span>}>
      <Model url="/models/air1.glb" />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

export default ThreeScene;
