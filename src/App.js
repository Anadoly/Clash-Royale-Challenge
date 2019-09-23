import React from 'react';
import { Logo } from '@images';
import './App.css';
import components from '@components';
import { GlobalStyles } from '@utilities';
import scenes from '@scenes';

function App() {
  console.log(scenes, components);
  return (
    <div className="App">
      <GlobalStyles />
      <header className="App-header">
        <img src={Logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
