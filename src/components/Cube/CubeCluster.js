import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

const RotatingCube = ({ position }) => {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01));
  return (
    <mesh ref={ref} position={position}>
      <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
      <meshStandardMaterial attach='material' color='hotpink' />
    </mesh>
  );
};

const CubeCluster = () => {
  const positions = useMemo(() => [
    [-3, -1, 0],  // adjust these positions
    [-1, -1, 0],  // to move the cubes
    [-3, -3, 0],  // down and to the left
    [-1, -3, 0]   // (subtract from x for left, subtract from y for down)
  ], []);

  const lines = positions.map((p, i) => [
    new Vector3(...p),
    new Vector3(...positions[(i+1)%positions.length])
  ]);

  return (
    <>
      {positions.map((pos, idx) => (
        <RotatingCube position={pos} key={idx} />
      ))}
      {lines.map((line, idx) => (
        <line key={idx}>
          <bufferGeometry attach="geometry">
            <bufferAttribute
              attachObject={['attributes', 'position']}
              count={2}
              array={new Float32Array(line.flat())}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial attach="material" color="white" />
        </line>
      ))}
    </>
  );
};

export default CubeCluster;