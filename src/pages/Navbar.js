// src/pages/Navbar.js
import React, { useState } from 'react';
import { FaWallet } from 'react-icons/fa';
import WalletModal from '../components/WalletModal'; // Importa el nuevo modal

function Navbar() {
  const [isWalletModalOpen, setWalletModalOpen] = useState(false);

  const handleToggleWalletModal = () => {
    setWalletModalOpen((prev) => !prev);
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
      </div>

      {/* Modal de Conectar Wallet */}
      <WalletModal isOpen={isWalletModalOpen} onClose={handleToggleWalletModal} />
    </header>
  );
}

export default Navbar;
