import React from "react";
import { useState } from "react"
import { Html } from "@react-three/drei";

const Note01 = () => {
  const [ hovered, setHovered ] = useState(0);

  return (
    <group>
        <mesh
          visible={false} 
          position={[-0.75, 2.1, 0]}
          onPointerEnter={() => setHovered(1)}
          onPointerLeave={() => setHovered(0)}
        >
            <planeGeometry args={[1.25, 1.5]} />
            <meshBasicMaterial color={'#c39d6b'} />
        </mesh>
        <Html position={[-7.79, 4.2, 0]}>
          <div style={{
            display:'flex',
            flexDirection: 'column',
            width: '100vw',
            height:'100vh',
            alignItems: 'center',
            justifyContent:'center',
            backgroundColor:'rgb(0 0 0 / 60%)',
            backdropFilter: 'blur(12px)',
            color: '#ffb6c9',
            whiteSpace: 'nowrap',
            opacity: hovered ? 1: 0,
            transition: "opacity 0.3s ease",
            fontFamily: 'Allura',
            fontSize: 50,
          }}>
            <p>Thank you</p>
            <p>for being you.</p>
            <p>I love you ♡</p>
          </div>
        </Html>
    </group>
  )
}

export default Note01;