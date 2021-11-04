import React from 'react';
import logo from './logo.svg';
import { Button } from 'rsuite';
import './App.css';
import 'rsuite/dist/rsuite.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button className="App-link" href="https://rsuitejs.com" target="_blank">
          React Suite
        </Button>
      </header>
    </div>
  );
}

export default App;
