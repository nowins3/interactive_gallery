import React from "react";
import { useState } from "react"
import { Html } from "@react-three/drei";

const Note02 = () => {
  const [ hovered, setHovered ] = useState(0);

  return (
    <group>
        <mesh 
          visible={false} 
          position={[4.55, 1.65, 0]}
          rotation={[0, 0, 0.57]}
          onPointerEnter={() => setHovered(1)}
          onPointerLeave={() => setHovered(0)}
        >
            <planeGeometry args={[2.2, 2.25]} />
            <meshBasicMaterial color={'red'} />
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
            transition: "opacity 0.4s ease",
            fontFamily: 'Allura',
            fontSize: 50,
          }}>
            <p>click what</p>
            <p>i first gave</p>
            <p>you</p>
          </div>
        </Html>
    </group>
  )
}

export default Note02;