import React, { FC, ReactElement, useCallback } from 'react';
import { useEffectOnce } from 'react-use';
import * as THREE from 'three';
import './Canvas.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CanvasType {
  onWheelTurn(speed: number): void;
}

const Canvas: FC<CanvasType> = ({ onWheelTurn }): ReactElement => {
  const ref = React.createRef<HTMLDivElement>();

  const handleClick = useCallback(
    () => onWheelTurn(5),
    [onWheelTurn],
  );

  useEffectOnce(() => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const camera = new THREE.PerspectiveCamera(70, 300 / 400, 0.01, 10);
    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    camera.position.z = 1;
    scene.add(cube);

    if (!ref.current) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height);
    ref.current.appendChild(renderer.domElement);
    renderer.render(scene, camera);
  });

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div className="canvas" ref={ref} onClick={handleClick} />
  );
};

export default Canvas;
