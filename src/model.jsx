import { React, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import lerp from "lerp";

export default function Vial({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/vaccine-vial.glb");
  const colorMap = useLoader(TextureLoader, "label-texture.png");
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.z = -0.2 - (1 + Math.sin(t)) / 20;
    group.current.position.y = Math.cos(t) / 10;
    // group.current.rotation.x = Math.cos(t / 4) / 8;
    // group.current.rotation.y = Math.sin(t / 4) / 8;
  });

  useFrame(
    ({ pointer }) =>
      (group.current.rotation.x = lerp(
        group.current.rotation.x,
        pointer.y * (-Math.PI / 7),
        0.025
      ))
  );
  useFrame(
    ({ pointer }) =>
      (group.current.rotation.y = lerp(
        group.current.rotation.y,
        pointer.x * (Math.PI / 7),
        0.025
      ))
  );

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Vial.geometry} rotation={[-3.05, 0, -3.2]}>
        <meshPhysicalMaterial
          attach="material"
          color="white"
          transmission={1}
          roughness={0.1}
          thickness={1}
          ior={1.5}
        />
      </mesh>
      <mesh geometry={nodes.Plastic.geometry} rotation={[-3.05, 0, -3.2]}>
        <meshPhysicalMaterial
          attach="material"
          color="#3b3b3b"
          opacity={0.5}
          transparent={true}
          roughness={0}
          metalness={0}
          clearcoat={1}
          envMapIntensity={1}
        />
      </mesh>
      <mesh
        geometry={nodes.Label.geometry}
        material={materials.Label}
        position={[0, 0, -0.04]}
        rotation={[-3.05, -0.04, -3.2]}
      >
        <meshPhysicalMaterial
          attach="material"
          map={colorMap}
          opacity={0.5}
          transparent={true}
          roughness={0}
          metalness={0}
          clearcoat={1}
          envMapIntensity={1}
        />
      </mesh>
      <mesh
        geometry={nodes.Cap.geometry}
        material={materials.Cap}
        rotation={[-3.05, 0, -3.2]}
      />
      <mesh
        geometry={nodes.Liquid.geometry}
        material={materials.Virus}
        rotation={[-3.05, 0, -3.2]}
        scale={0.98}
        material-color={"purple"}
      />
      <mesh
        geometry={nodes.Paper.geometry}
        material={materials.v2_Vial}
        rotation={[-3.05, 0, -3.2]}
      />
    </group>
  );
}

/* <meshPhysicalMaterial
          attach="material"
          color="white"
          transmission={1}
          roughness={0.1}
          thickness={1}
          ior={1.5}/> */

{
  /* <meshPhysicalMaterial
          attach="material"
          color="white"
          opacity={0.5}
          transparent={true}
          roughness={0}
          metalness={0}
          clearcoat={1}
          envMapIntensity={1}
        /> */
}
