import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from 'gsap';
import * as THREE from 'three';
import { useRef, useState, useEffect } from 'react';

import config from "../../data/config";
import pictureMazeData from '../../data/maze_picture_data';

const ScrollController = () => {
    const { camera } = useThree();
    const scroll = useScroll();

    // Gallery SCroll
    const galleryStartZ = config.gallery.startZ

    // Maze Scroll 
    const mazeStartZ = 0;
    const [index, setIndex] = useState(0);
    const isAnimating = useRef(false);
    const reachedEnd = useRef(false);

    useEffect(() => {
      const handleMazeScroll = (event) => {
        if (isAnimating.current){return};

        // Onscroll animation
        if(event.deltaY > 0) {
          if (index !== config.maze.couplePictureCount - 1){
            setIndex(prevIndex => prevIndex + 1);
          }
          else {
            reachedEnd.current = true;
          }
        }else if (event.deltaY < 0) {
          if (index !== 0){
            setIndex(prevIndex => prevIndex - 1);
          }
        }

        isAnimating.current = true;
        setTimeout(() => {
          isAnimating.current = false;
        }, 3000)
      }

      window.addEventListener('wheel', handleMazeScroll);
       return () => {
        window.removeEventListener('wheel', handleMazeScroll);
      };
    }, [index]);

    useFrame(() => {
      if (camera.position.z <= galleryStartZ){
        camera.position.z = galleryStartZ - scroll.offset * (config.gallery.spacing * (config.gallery.pictureCount + 1));
      }
      // if (camera.position.z <= mazeStartZ + 4.5 && camera.position.z >= config.maze.zboundMax){
      //   console.log()
      //   let targetX = 0
      //   if (index % 2 === 0 ) {
      //     targetX = pictureMazeData.couple[index].position.x + 2;
      //   } else {
      //     targetX = pictureMazeData.couple[index].position.x - 2;
      //   }
      //   if (!reachedEnd.current){
      //     const targetPosition = new THREE.Vector3(targetX,
      //                                             pictureMazeData.couple[index].position.y,
      //                                             pictureMazeData.couple[index].position.z + 4.5);
      //      camera.position.lerp(targetPosition, 0.05);
      //   }
      //   else {
      //     const targetPosition = new THREE.Vector3(0,
      //                                   0,
      //                                   50);
      //     camera.position.lerp(targetPosition, 0.05);
      //   }
      // }
    });
       
  return (
    null
  );
}

export default ScrollController;