import React, { FC, Component, useState } from 'react';
import MidiPlayer from 'midi-player-js';

// Initialize player and register event handler
const Player = new MidiPlayer.Player((e) => {
  console.log(e);
});

interface Props {
  file: string,
  el: HTMLDivElement,
}

interface State {

}

export class MusicBox extends Component<Props, State> {
  componentDidMount() {
    Player.loadFile('./espanja.mid');
    Player.play();
  }

  render() {
    return (
      <div className="music-box">

      </div>
    );
  }
}

export default MusicBox;
