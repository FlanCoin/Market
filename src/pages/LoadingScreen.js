// src/pages/LoadingScreen.js

import React, { useState, useEffect } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import joystickAnimation from '../assets/joystick.json'; // Asegúrate de que la ruta sea correcta
import './LoadingScreen.css'; // Importa el archivo CSS para los estilos

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3000; // Duración total de la animación en ms
    const interval = 30; // Intervalo en ms para actualizar el progreso
    const totalSteps = duration / interval;

    let step = 0;
    const updateProgress = () => {
      step += 1;
      const progress = Math.min((step / totalSteps) * 100, 100);
      setProgress(progress);

      if (progress < 100) {
        setTimeout(updateProgress, interval);
      }
    };

    updateProgress();

    return () => clearTimeout(updateProgress); // Limpia el intervalo si el componente se desmonta
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
