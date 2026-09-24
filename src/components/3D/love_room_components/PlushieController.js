import React from 'react';
import { useState } from "react";

import { useThree } from '@react-three/fiber';
import gsap from 'gsap';

const PlushieController = () => {
  const [ hovered, setHovered ] = useState(0);
  const { camera } = useThree();
  console.log(hovered)

  return (
    <group>
      <mesh 
        visible={false} 
        position={[-6, -3, 0]}
        onPointerEnter={() => setHovered(1)}
        onPointerLeave={() => setHovered(0)}
        onClick={() => 
          gsap.to(camera.position, {
            z:-100,
            y:0,
            duration: 0.6,
            ease:'power1.out'
          })
        }
      >
          <planeGeometry args={[3.5, 2.5]} />
          <meshBasicMaterial color={'red'} />
      </mesh>
    </group>
  )
}

export default PlushieController;