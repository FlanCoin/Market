// src/pages/LoadingScreen.js

import React, { useState, useEffect } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import joystickAnimation from '../assets/joystick.json'; // Asegúrate de que la ruta sea correcta
import './LoadingScreen.css'; // Importa el archivo CSS para los estilos

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = performance.now(); // Marca el tiempo de inicio

    const updateProgress = (duration) => {
      const elapsedTime = performance.now() - startTime;
      const progress = Math.min((elapsedTime / duration) * 100, 100);
      setProgress(progress);

      if (progress < 100) {
        requestAnimationFrame(() => updateProgress(duration));
      }
    };

    window.onload = () => {
      const totalLoadTime = performance.now() - startTime;
      const duration = totalLoadTime > 3000 ? totalLoadTime : 3000; // Garantizar que la animación dure al menos 3 segundos
      updateProgress(duration);
    };

    return () => {};
  }, []);

  return (
    <div className="loading-screen">
      <Player
        autoplay
        loop
        src={joystickAnimation}
        style={{ height: '300px', width: '300px' }} // Ajusta el tamaño según sea necesario
      />
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
        <span className="progress-text">{Math.round(progress)}%</span>
      </div>
    </div>
  );
}
