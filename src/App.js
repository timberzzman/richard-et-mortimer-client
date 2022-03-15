import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Router from './Router';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Navbar />
          <Router />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
