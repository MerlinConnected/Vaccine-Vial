import { React, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, Lightformer } from "@react-three/drei";
import Vial from "./model";

function Zoom() {
  useFrame((state) => {
    state.camera.position.lerp({ x: 0, y: 0, z: 75 }, 0.025);
    state.camera.lookAt(0, 0, 0);
  });
}

export default function App() {
  return (
    <Canvas camera={{ fov: 12 }}>
      <Suspense>
        <Environment intensity={1} preset="warehouse">
          {/* Ceiling */}
          <Lightformer
            intensity={9}
            rotation-x={Math.PI / 2}
            position={[0, 5, -9]}
            scale={[10, 10, 1]}
          />
          {/* Sides */}
          <Lightformer
            intensity={30}
            rotation-y={Math.PI / 2}
            position={[-5, 2, -1]}
            scale={[20, 1, 1]}
          />
          <Lightformer
            intensity={30}
            rotation-y={-Math.PI / 2}
            position={[10, 1, 0]}
            scale={[20, 1, 1]}
          />
        </Environment>
        <ambientLight intensity={0.5} />
        <Vial />
        <Zoom />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
}
