// src/pages/Navbar.js
import React, { useState } from 'react';
import { FaWallet } from 'react-icons/fa';
import WalletModal from '../components/WalletModal'; // Importa el nuevo modal

function Navbar() {
  const [isWalletModalOpen, setWalletModalOpen] = useState(false);
  const [isWalletConnected, setWalletConnected] = useState(false); // Estado para conectar la wallet
  const [flanAmount, setFlanAmount] = useState(0); // Estado para almacenar la cantidad de FLAN

  const handleToggleWalletModal = () => {
    setWalletModalOpen((prev) => !prev);
  };

  const handleWalletConnect = () => {
    // Simular la conexión de la wallet y actualizar el estado
    setWalletConnected(true);
    setFlanAmount(500); // Simular la cantidad de FLAN que el usuario tiene
    handleToggleWalletModal();
  };

  return (
    <header className="bg-green-800 text-white flex items-center p-4 relative">
      {/* Logo izquierdo */}
      <a href="/" className="absolute left-4 flex items-center">
        <img
          src="/logo-left.png" // Ruta al primer logo en la carpeta public
          alt="Flancraft Logo Left"
          className="h-15 w-auto" // Ajusta el tamaño del logo aquí
        />
      </a>

      {/* Logo central */}
      <a href="/" className="flex items-center mx-auto">
        <img
          src="/logo-center.png" // Ruta al segundo logo en la carpeta public
          alt="Flancraft Logo Center"
          className="h-15 w-auto" // Ajusta el tamaño del logo aquí
        />
      </a>

      {/* Opciones de la barra de navegación */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <button
          onClick={handleToggleWalletModal}
          className="flex items-center bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
        >
          <FaWallet className="mr-2" />
          Conectar Wallet
        </button>
        
        {/* Mostrar el recuadro de FLANs solo si la wallet está conectada */}
        {isWalletConnected && (
          <div
            style={{
              backgroundColor: '#0E321A',
              color: '#fff',
              padding: '10px',
              borderRadius: '8px',
              marginTop: '10px',
              position: 'absolute',
              top: '60px', // Justo debajo del botón
              right: '10px', // Cerca del borde derecho
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              zIndex: 1002,
            }}
          >
            <h4 style={{ margin: 0, fontSize: '16px' }}>FLAN:</h4>
            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>{flanAmount}</p>
          </div>
        )}
      </div>

      {/* Modal de Conectar Wallet */}
      <WalletModal isOpen={isWalletModalOpen} onClose={handleToggleWalletModal} />
    </header>
  );
}

export default Navbar;
