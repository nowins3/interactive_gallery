import React from 'react'
import { useTexture, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
// import { useControls } from 'leva';
import * as THREE from 'three';

import picturePlaneData from '../../data/picture_data';
import config from "../../data/config";

const calculateRepeatingBlend = (cameraZ, spacing = config.gallery.spacing) => {
  const startZ = config.gallery.startZ;
  
  if (cameraZ < startZ){
    const distanceTraveled = startZ - cameraZ;
    const raw_blend = (distanceTraveled % spacing)/spacing
    const cycle = Math.floor(distanceTraveled / spacing)
    const blend = THREE.MathUtils.smoothstep( raw_blend, 0, 1);

    return [blend, cycle];
  }else{
    return [0, 0]
  }
};

const Gallery = (props) => {
    const { nodes, materials } = useGLTF('./3D/polaroid_updated.glb');
    const polaroidRefs = useRef([]);
    const galleryTextures = useTexture(picturePlaneData.map(item => item.texture));
    galleryTextures.forEach((texture) => {
        texture.flipY = false;
        texture.needsUpdate = true;
    });
    const { camera } = useThree();

    useFrame(({ pointer }) => {
        const [ blend, cycle ] = calculateRepeatingBlend(camera.position.z);
        const smoothBlend = THREE.MathUtils.smoothstep(blend, 0, 1);

        polaroidRefs.current.forEach((group, index) => {
            if (!group) return;

            let opacity = 0;

            if (index === cycle) {
                opacity = 1 - smoothBlend;
            } else if (index === cycle + 1) {
                opacity = smoothBlend;
            }

            group.traverse((child) => {
                if (!child.material) return;

                child.material.transparent = true;
                child.material.opacity = THREE.MathUtils.lerp(child.material.opacity, opacity, 0.14);
            });
        });
        polaroidRefs.current.forEach((group, index) => {
            const xDisplacementFromPointCenter = (0 - pointer.x);
            const yDisplacementFromPointCenter = (0 - pointer.y);
            group.position.x = picturePlaneData[index].position.x + (-xDisplacementFromPointCenter) * 0.2
            group.position.y = picturePlaneData[index].position.y + (-yDisplacementFromPointCenter) * 0.2
        });
    });

  return (
    <group {...props} dispose={null} >
        {picturePlaneData.map((item, index) => (
            <group 
                ref={(el) => (polaroidRefs.current[index] = el)}
                key={index}
                position={[item.position.x, item.position.y, -(((index + 1) * config.gallery.spacing) - ((config.gallery.spacing/2) - 3 ))]}
                rotation={[Math.PI/2, 0, Math.PI]}
                scale={8}
            >
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polaroid_frame.geometry}
                material={materials.paper_rigid.clone()}
                position={[0, 0.083, 0]}
                scale={1}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.picture.geometry}
                position={[0, 0.083, 0]}
                scale={1}

            >
                <meshBasicMaterial map={galleryTextures[index]} side={THREE.DoubleSide}/>
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.polaroid_film.geometry}
                material={materials.polaroid_film.clone()}
                position={[0, 0.084, 0]}
                scale={1}
            />
            </group>
        ))}
    </group>
  )
}

useGLTF.preload('./3D/polaroid_updated.glb');

export default Gallery
