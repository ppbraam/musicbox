import React, { FC, ReactElement, useState } from 'react';
import './MusicBox.scss';
import Canvas from '../../components/Canvas/Canvas';

interface MusicBoxType {
  midiFile: string;
}

const MusicBox: FC<MusicBoxType> = ({ midiFile }): ReactElement => {
  const [speed, setSpeed] = useState(0);

  return (
    <div className="music-box">
      <Canvas onWheelTurn={setSpeed} />
      { midiFile }
      { speed }
    </div>
  );
};

export default MusicBox;
