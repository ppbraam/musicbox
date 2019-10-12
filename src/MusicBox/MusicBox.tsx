import React, { Component } from 'react';
import MidiPlayer from 'midi-player-js';

const Player = new MidiPlayer.Player((e: any) => {
  console.log(e);
});

interface Props {
  file: string,
}

interface State {

}

export class MusicBox extends Component<Props, State> {
  componentDidMount() {
    const { file } = this.props;
    Player.loadFile(file);
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
