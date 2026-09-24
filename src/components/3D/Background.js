import { useRef} from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from "three";
import '../../assets/css/lumi.css';

import picturePlaneData from '../../data/picture_data';
import config from "../../data/config";

/* eslint-disable import/no-webpack-loader-syntax */
import vertexShader from "!!raw-loader!../../assets/shaders/background_vertex_shader.glsl";
import fragmentShader from "!!raw-loader!../../assets/shaders/background_fragment_shader.glsl";

const current_config = {
    'baseBlobRadius': 0.65,
    'secondaryBlobRadiusRatio':0.78,
    'baseBlobStrength':0.9,
    'depthToRadiusAmount':0.08,
    'velocityToStrengthAmount':0.1,
    'motionSmoothing':0.1,
    'motionDepthProgress':0,
    'motionVelocityIntensity':0,
    'smoothedDepthProgress':0,
    'smoothedVelocityIntensity':0,
    'noiseStrength':0.04,
}

const update = (time = 0, materialRef) => {
    current_config.smoothedDepthProgress = THREE.MathUtils.lerp(
      current_config.smoothedDepthProgress,
      current_config.motionDepthProgress,
      current_config.motionSmoothing
    )
    current_config.smoothedVelocityIntensity = THREE.MathUtils.lerp(
      current_config.smoothedVelocityIntensity,
      current_config.motionVelocityIntensity,
      current_config.motionSmoothing
    )

    if (materialRef) {
        materialRef.current.uniforms.uTime.value = time
        materialRef.current.uniforms.uVelocityIntensity.value = current_config.smoothedVelocityIntensity
    }

    applyMotionToBlob()
}

const applyMotionToBlob = () => {
    const nextBlobRadius = current_config.baseBlobRadius + current_config.smoothedDepthProgress * current_config.depthToRadiusAmount
    const nextBlobStrength = current_config.baseBlobStrength + current_config.smoothedVelocityIntensity * current_config.velocityToStrengthAmount

    current_config.blobRadius = THREE.MathUtils.clamp(nextBlobRadius, 0.05, 1)
    current_config.blobStrength = THREE.MathUtils.clamp(nextBlobStrength, 0, 1)

    // Remember to update using react
  }

const setMotionResponse = (depthProgress, velocityIntensity) => {
    current_config.motionDepthProgress = THREE.MathUtils.clamp(depthProgress, 0, 1);
    current_config.motionVelocityIntensity = THREE.MathUtils.clamp(velocityIntensity, 0, 1)
}
const calculateRepeatingBlend = (cameraZ, spacing = config.gallery.spacing) => {
  const startZ = config.gallery.startZ;
  
  if (cameraZ < startZ){
    const distanceTraveled = startZ - cameraZ;
    const raw_blend = (distanceTraveled % spacing)/spacing
    const cycle = Math.floor(distanceTraveled / spacing)

    return [raw_blend, cycle];
  }else{
    return [0, 0]
  }
};

const Background = (props) => {
    const scroll = useScroll();
    const backgroundMaterialRef = useRef();
    let currentThemeIndex = 0
    let nextThemeIndex = currentThemeIndex + 1
    const { camera } = useThree();
    let currentTheme = picturePlaneData[currentThemeIndex];
    let nextTheme = picturePlaneData[nextThemeIndex];
    const startZ = config.gallery.startZ;
    const endZ = startZ + -(config.gallery.spacing * (config.gallery.pictureCount + 1));
    const previousOffset = useRef(0);

    useFrame((state) => {
        const currentOffset = scroll.offset
        const velocity = currentOffset - previousOffset.current;
        previousOffset.current = currentOffset;

        const time = state.clock.getElapsedTime() 
        const travelProgress = ((startZ - camera.position.z)/ (startZ - endZ))
        const depthProgress = THREE.MathUtils.clamp(travelProgress, 0, 1);

        const velocityIntensity = THREE.MathUtils.clamp(
            Math.abs(velocity) * 50,
            0,
            1
        )

        const [ blend, cycle ] = calculateRepeatingBlend(camera.position.z);
        const distanceFromBlendCenter = Math.abs(blend - 0.5) * 2;
        const transitionStability = THREE.MathUtils.smoothstep(distanceFromBlendCenter, 0.35, 1);
        const stabilizedVelocityIntensity = velocityIntensity * transitionStability;

        setMotionResponse(depthProgress, stabilizedVelocityIntensity)
        update(time, backgroundMaterialRef);
        backgroundMaterialRef.current.uniforms.uBlobRadius.value = current_config.blobRadius
        backgroundMaterialRef.current.uniforms.uBlobRadiusSecondary.value = current_config.blobRadius * current_config.secondaryBlobRadiusRatio
        backgroundMaterialRef.current.uniforms.uBlobStrength.value = current_config.blobStrength
        backgroundMaterialRef.current.uniforms.uNoiseStrength.value = current_config.noiseStrength

        /* Blending Color for Transition */
        currentThemeIndex = cycle
        nextThemeIndex = currentThemeIndex + 1
        if (currentThemeIndex <= config.gallery.pictureCount){
            currentTheme = picturePlaneData[currentThemeIndex];
        }else{
            currentThemeIndex = config.gallery.pictureCount
            currentTheme = picturePlaneData[currentThemeIndex]
        }
        if (nextThemeIndex <= config.gallery.pictureCount){
            nextTheme = picturePlaneData[nextThemeIndex];
        }else{
            nextTheme = currentTheme
        }
        const safeBlend = THREE.MathUtils.clamp(blend ?? 0, 0, 1)
        if (!nextTheme || safeBlend <= 0) {
            backgroundMaterialRef.current.uniforms.uBackgroundColor.value = new THREE.Color(currentTheme.backgroundColor)
            backgroundMaterialRef.current.uniforms.uBlob1Color.value = new THREE.Color(currentTheme.blob1Color)
            backgroundMaterialRef.current.uniforms.uBlob2Color.value = new THREE.Color(currentTheme.blob2Color)
        }
        
        backgroundMaterialRef.current.uniforms.uBackgroundColor.value = (new THREE.Color(currentTheme.backgroundColor)).lerp(new THREE.Color(nextTheme.backgroundColor), safeBlend);
        backgroundMaterialRef.current.uniforms.uBlob1Color.value = (new THREE.Color(currentTheme.blob1Color)).lerp(new THREE.Color(nextTheme.blob1Color), safeBlend);
        backgroundMaterialRef.current.uniforms.uBlob2Color.value = (new THREE.Color(currentTheme.blob2Color)).lerp(new THREE.Color(nextTheme.blob2Color), safeBlend);
    });

    return (
        <mesh renderOrder={-100} {...props}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial ref={backgroundMaterialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                depthWrite={false}
                depthTest={false}
                uniforms={{
                    uBackgroundColor: { value: new THREE.Color(currentTheme.backgroundColor) },
                    uBlob1Color: { value: new THREE.Color(currentTheme.blob1Color) },
                    uBlob2Color: { value: new THREE.Color(currentTheme.blob2Color) },
                    uNoiseStrength: { value: currentTheme.noiseStrength },
                    uBlobRadius: { value: currentTheme.blobRadius },
                    uBlobRadiusSecondary: { value: currentTheme.blobRadius * currentTheme.secondaryBlobRadiusRatio },
                    uBlobStrength: { value: currentTheme.blobStrength },
                    uTime: { value: 0 },
                    uVelocityIntensity: { value: 0 },
                }}
            />
        </mesh>
    )
};

export default Background;