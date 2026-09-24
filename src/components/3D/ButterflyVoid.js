import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AdditiveBlending } from 'three'

/* eslint-disable import/no-webpack-loader-syntax */
import vertexShader from "!!raw-loader!../../assets/shaders/butterfly_00_vertex_shader.glsl";
import fragmentShader from "!!raw-loader!../../assets/shaders/butterfly_00_fragment_shader.glsl";

const ButterflyVoid = (props) => {
  const { nodes, materials } = useGLTF('./3D/butterfly_00.glb')
  const materialButterflyRef = useRef();

    useFrame((state) => {
        if (!materialButterflyRef.current) return
        materialButterflyRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    })

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        position={[0, 2, -10]}
        rotation={[Math.PI/3, -Math.PI/2.5, 0]}
        scale={1}
      >
        <shaderMaterial
            ref={materialButterflyRef}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            blending={AdditiveBlending}
            side={THREE.DoubleSide}
            uniforms={{
                glowColor: {value : new THREE.Color('#11aff3')},
                falloff: { value: 0.8},
                glowSharpness: {value: 1},
                glowInternalRadius: {value: 0.1},
                opacity: {value: 1},
                uTime:{value:0}
            }}
            transparent={true}
            depthTest={false}
            depthWrite={false}
        />
      </mesh>
    </group>
  )
}

useGLTF.preload('./3D/butterfly_00.glb')

export default ButterflyVoid;