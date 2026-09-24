import React from 'react';
import { useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from "@react-three/fiber";

import PlushieController from "./love_room_components/PlushieController";
import Note01 from "./love_room_components/Note01";
import Note02 from "./love_room_components/Note02";
import Heart from "./love_room_components/Heart";

import colorImage from '../../assets/imgs/home_01.png'
import depthImage from '../../assets/imgs/home_01_depth_01.png'

/* eslint-disable import/no-webpack-loader-syntax */
import vertexShader from "!!raw-loader!../../assets/shaders/home_01_vertex_shader.glsl";
import fragmentShader from "!!raw-loader!../../assets/shaders/home_01_fragment_shader.glsl";

const LoveRoom = (props) => {
    const materialRef = useRef();
    const color = useTexture(colorImage);
    const depth = useTexture(depthImage);

    useFrame((state) => {
        const mouse_state = state.pointer;
        materialRef.current.uniforms.uMouse.value.x = mouse_state.x
        materialRef.current.uniforms.uMouse.value.y = mouse_state.y
    });

    return (
        <group {...props}>
            <mesh>
                <planeGeometry args={[16, 9, 300, 170]} />
                <shaderMaterial
                    ref={materialRef}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={{
                        uColorTexture: { value: color },
                        uDepthTexture: { value: depth },
                        uDepthScale: { value: 0.4 },
                        uMouse: { value: { x: 0, y: 0 } },
                    }}
                />
            </mesh>
            <PlushieController />
            <Note01/>
            <Note02/>
            <Heart />
        </group>
    );
}

export default LoveRoom;