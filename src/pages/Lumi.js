import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import {PerspectiveCamera, ScrollControls } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import '../assets/css/lumi.css';
//import LoveRoom from "../components/3D/LoveRoom";
import Background from "../components/3D/Background";
import ScrollController from "../components/3D/ScrollController";
import Gallery from '../components/3D/Gallery';
import PictureMaze from "../components/3D/PictureMaze";
//import ButterflyVoid from "../components/3D/ButterflyVoid";
import Message from "../components/3D/Message";

gsap.registerPlugin(ScrollTrigger);

const Lumi = () => {
    const cameraRef = useRef();
    console.log('nei');


  return (
    <div className="lumi" >
        <Canvas className="canvas" style={{ background: 'white' }}>
            <Suspense fallback={null}>
                <ScrollControls pages={3} damping={0.1}>
                    <ambientLight intensity={0.1}/>
                    <directionalLight position={[0, 0, 1]} intensity={2} />
                    <PerspectiveCamera makeDefault position={[0, 0, -1]}  ref={cameraRef} >
                        <Background position={[0, 0, -100]} />
                    </PerspectiveCamera>
                    <ScrollController />
                    {/* <Gallery /> */}
                    {/* <Message /> */}
                    {/* <PictureMaze /> */}
                    {/* <LoveRoom  position={[0, 0, 0]} /> */}
                    {/* <ButterflyVoid /> */}
                </ ScrollControls>
            </Suspense>
        </Canvas>
    </div>
  )
}

export default Lumi;