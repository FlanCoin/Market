// src/index.js

import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import WalletContextProvider from './context/WalletContext';
import './App.css';
import '@fontsource/press-start-2p';  // Asegúrate de que este paquete esté instalado


ReactDOM.render(
  <React.StrictMode>
    <WalletContextProvider>
      <App />
    </WalletContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
