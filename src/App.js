import React from 'react';
import logo from './logo.svg';
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
        <img src={logo} className="App-logo" alt="logo" />
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
