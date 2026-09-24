import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const HEART_COUNT = 300;

const Heart = () => {
  const [hovered, setHovered] = useState(false);
  const heartsRef = useRef([]);
  const spawnTimer = useRef(0);

  // Create heart shape
  const heartShape = new THREE.Shape();

  heartShape.moveTo(0, -0.25);
  heartShape.bezierCurveTo(
    -0.5, -0.7,
    -0.9, -0.1,
    -0.45, 0.35
  );

  heartShape.bezierCurveTo(
    -0.2, 0.65,
    0, 0.55,
    0, 0.35
  );

  heartShape.bezierCurveTo(
    0, 0.55,
    0.2, 0.65,
    0.45, 0.35
  );

  heartShape.bezierCurveTo(
    0.9, -0.1,
    0.5, -0.7,
    0, -0.25
  );

  const heartGeometry = new THREE.ShapeGeometry(
    heartShape
  );

  // const heartMaterial = new THREE.MeshBasicMaterial({
  //   color: "#ff6f91",
  //   transparent: true,
  //   side: THREE.DoubleSide,
  //   depthTest: false,
  // });
  const heartMaterial = new THREE.MeshStandardMaterial({
    color: '#ff6f91',              // Base surface color (keep dark for neon)
    emissive: '#ff6f91',           // The color of the glow
    emissiveIntensity: 2.0,       // Boost intensity past 1 for HDR bloom
    roughness: 0.1,
    metalness: 0.1
  });

  // Launch one heart
  const spawnHeart = (heart) => {
    if (!heart) return;

    heart.visible = true;

    // Start at the plane
    heart.position.set(
      0,
      0,
      0.1
    );

    // Random direction
    heart.userData.velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 0.25,
      (Math.random() - 0.5) * 0.25,
      (Math.random() - 0.5) * 0.1
    );

    // Speed
    heart.userData.speed =
      0.7 + Math.random() * 1.5;

    // Size
    const size =
      0.03 + Math.random() * 0.35;

    heart.userData.size = size;

    heart.scale.set(
      size,
      size,
      size
    );

    // Random rotation
    heart.rotation.z =
      Math.random() * Math.PI * 2;

    heart.userData.rotationSpeed =
      (Math.random() - 0.5) * 0.08;

    // Lifetime
    heart.userData.life =
      1 + Math.random() * 1.5;

    heart.userData.age = 0;

    heart.userData.active = true;
  };

  useFrame((_, delta) => {

    // =================================
    // SPAWN NEW HEARTS WHILE HOVERING
    // =================================

    if (hovered) {
      spawnTimer.current += delta;

      // Spawn roughly every 0.05 seconds
      if (spawnTimer.current >= 0.05) {

        spawnTimer.current = 0;

        // Find an inactive heart
        const heart =
          heartsRef.current.find(
            (heart) =>
              heart &&
              !heart.userData.active
          );

        if (heart) {
          spawnHeart(heart);
        }
      }
    }

    // =================================
    // UPDATE HEARTS
    // =================================

    heartsRef.current.forEach((heart) => {

      if (!heart) return;

      const data = heart.userData;

      if (!data.active) return;

      data.age += delta;

      // Move
      heart.position.x +=
        data.velocity.x *
        data.speed *
        delta *
        60;

      heart.position.y +=
        data.velocity.y *
        data.speed *
        delta *
        60;

      heart.position.z +=
        data.velocity.z *
        data.speed *
        delta *
        60;

      // Gravity
      data.velocity.y -=
        0.0008;

      // Rotation
      heart.rotation.z +=
        data.rotationSpeed *
        delta *
        60;

      // Fade out
      const progress =
        data.age / data.life;

      if (progress > 0.7) {

        const fade =
          1 -
          (progress - 0.7) / 0.3;

        const scale =
          data.size * fade;

        heart.scale.set(
          scale,
          scale,
          scale
        );
      }

      // Heart finished
      if (data.age >= data.life) {

        data.active = false;

        heart.visible = false;

        heart.scale.set(
          0,
          0,
          0
        );
      }
    });
  });

  return (
    <group position={[-4, -1.5, 0]}>

      {/* Hover area */}
      <mesh
        onPointerEnter={() => {
          setHovered(true);
        }}
        onPointerLeave={() => {
          setHovered(false);
        }}
      >
        <circleGeometry
          args={[1.35, 30]}
        />

        <meshBasicMaterial
          transparent
          opacity={0}
        />
      </mesh>

      {/* Hearts */}
      {Array.from({
        length: HEART_COUNT,
      }).map((_, index) => (

        <mesh
          key={index}
          ref={(mesh) => {
            heartsRef.current[index] =
              mesh;
          }}
          geometry={heartGeometry}
          material={heartMaterial}
          visible={false}
        />

      ))}

    </group>
  );
};

export default Heart;