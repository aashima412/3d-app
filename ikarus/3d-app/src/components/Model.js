import React from "react";
import { useGLTF } from "@react-three/drei";

const Model = ({ url }) => {
  const { scene } = useGLTF(url);

  scene.scale.set(15, 15, 15); // Scale model
  scene.position.set(0, 0, 0); // Center model

  return <primitive object={scene} />;
};

export default Model;
