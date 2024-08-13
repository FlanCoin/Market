// src/App.js

import React from 'react';
import Navbar from './pages/Navbar';
import NFTCard from './pages/NFTCard';
import HomePage from './pages/HomePage'; // Asegúrate de que sea la exportación por defecto


function App() {
    return (
      <div className="App">
        <HomePage />
      </div>
    );
  }
  
  export default App;