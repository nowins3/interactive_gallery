import React from 'react'
import { useGLTF, useTexture} from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

import pictureMazeData from '../../data/maze_picture_data';
import config from "../../data/config";

function randLoc(min, max) {
  return Math.random() * (max - min) + min;
}

const PictureMaze = (props) => {
  const { nodes, materials } = useGLTF('./3D/polaroid_updated.glb');
  const polaroidCoupleRefs = useRef([]);
  const mazeCoupleTextures = useTexture(pictureMazeData.couple.map(item => item.texture));
  mazeCoupleTextures.forEach((texture) => {
      texture.flipY = false;
      texture.needsUpdate = true;
  });
  const polaroidDaigeRefs = useRef([]);
  const mazeDaigeTextures = useTexture(pictureMazeData.daige.map(item => item.texture));
  mazeDaigeTextures.forEach((texture) => {
      texture.flipY = false;
      texture.needsUpdate = true;
  });

  return (
    <group>
      <group {...props} dispose={null} >
          {pictureMazeData.couple.map((item, index) => (
              <group 
                  ref={(el) => (polaroidCoupleRefs.current[index] = el)}
                  key={index}
                  position={[item.position.x, item.position.y, item.position.z]}
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
                  <meshBasicMaterial map={mazeCoupleTextures[index]} side={THREE.DoubleSide}/>
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
      <group {...props} dispose={null} >
          {pictureMazeData.daige.map((item, index) => (
              <group 
                  ref={(el) => (polaroidDaigeRefs.current[index] = el)}
                  key={index}
                  position={[item.position.x, item.position.y, item.position.z]}
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
                  <meshBasicMaterial map={mazeDaigeTextures[index]} side={THREE.DoubleSide}/>
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
    </group>
  )
}

useGLTF.preload('./3D/polaroid_photo_sample.glb')

export default PictureMaze