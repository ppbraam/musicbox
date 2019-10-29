import React, {
  FC, ReactElement, useCallback, useState,
} from 'react';
import { useEffectOnce } from 'react-use';
import * as THREE from 'three';
import './Canvas.scss';

interface CanvasType {
  onWheelTurn(speed: number): void;
}

interface MousePos {
  x: number;
  y: number;
}

const Canvas: FC<CanvasType> = ({ onWheelTurn }): ReactElement => {
  const ref = React.createRef<HTMLDivElement>();
  const [mouseStartPos, setMouseStartPos] = useState<MousePos>({ x: 0, y: 0 });
  const [mouseAngle, setMouseAngle] = useState(0);

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

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    setMouseStartPos({ x: e.pageX, y: e.pageY });
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const resultX = e.pageX - mouseStartPos.x;
      const resultY = e.pageY - mouseStartPos.y;
      const angle = (Math.atan2(resultY, resultX) * 180) / Math.PI;
      const speed = angle - mouseAngle;

      setMouseAngle(angle);
      onWheelTurn(speed);
    },
    [onWheelTurn, mouseStartPos, setMouseAngle, mouseAngle],
  );

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div className="canvas" ref={ref} onMouseMove={handleMouseMove} onMouseDown={handleMouseDown} />
  );
};

export default Canvas;
