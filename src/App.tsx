import React from 'react';
import MusicBox from './MusicBox/MusicBox';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <MusicBox file="./espanja.mid" />
    </div>
  );
}

export default App;
