import React from 'react';
import './App.css';

import Header from './components/Header';
import Countries from './components/Countries';
import Routes from './routes';

function App() {
  return (
    <div className="App">
      <Header title="Where in the world?"></Header>
      <Routes />
    </div>
  );
}

export default App;
