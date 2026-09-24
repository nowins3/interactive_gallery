import React from 'react'
import { Html } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

import '../../assets/css/lumi.css';
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

const Message = () => {
  const messageRefs = useRef([]);
  const { camera } = useThree();

  useFrame(({pointer}) => {
    const [ blend, cycle ] = calculateRepeatingBlend(camera.position.z);
    const smoothBlend = THREE.MathUtils.smoothstep(blend, 0, 1);

    messageRefs.current.forEach((group, index) => {
      if(!group) return

      let opacity = 0;

      if (index === cycle) {
          opacity = 1 - smoothBlend;
          group.firstChild.style.opacity = THREE.MathUtils.lerp(group.firstChild.style.opacity, opacity, 0.14);;
      } else if (index === cycle + 1) {
          opacity = smoothBlend;
          group.firstChild.style.opacity = THREE.MathUtils.lerp(group.firstChild.style.opacity, opacity, 0.14);
      } else {
        group.firstChild.style.opacity = 0
      }
    })

  });

  return (
    <group>
      <Html fullscreen>
        {picturePlaneData.map((item, index) => (
          <group ref={(el) => (messageRefs.current[index] = el)} >
            <div className="photo-comment" style={{color: item.accentColor, opacity:1,
                                                  left: item.position.x === -2? '50%': '15%',
                                                  top:`${35 - index * 8}%`}}>
                <h3
                  style={{color: item.accentColor}}
                >You, effortlessly you</h3>
                <div className="comment-line" style={{background: item.accentColor}} />

                <p
                  style={{color: item.accentColor}}
                >
                    This is one of my favorite photos of you.
                    <br />
                    Your little pout, your eyes, your energy...
                    <br />
                </p>

                <div className="comment-heart"
                  style={{color: item.accentColor}}
                >♡</div>
                <span className="comment-signature" 
                  style={{color: item.accentColor}}
                >— Taku</span>
            </div>
          </group>
        ))};
      </Html>
    </group>
  )
}

export default Message