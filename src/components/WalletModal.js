// src/components/WalletModal.js
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaMagic } from 'react-icons/fa'; // Usar íconos genéricos
import '../index.css';

export default function WalletModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains('wallet-modal-overlay')) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="wallet-modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1001,
      }}
    >
      <motion.div
        className="wallet-modal-content"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()} // Evita que hacer clic dentro del modal lo cierre
        style={{
          position: 'absolute',
          top: '80px', // Justo debajo del botón
          right: '10px', // Cerca del borde derecho
          backgroundColor: '#1E1F22',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          width: '250px',
        }}
      >
        <h3 style={{ color: '#fff', marginBottom: '15px', fontSize: '16px' }}>Conectar Wallet</h3>
        <button
          style={{
            backgroundColor: '#2C2F3E', // Color Solana
            color: '#fff',
            padding: '10px 15px',
            marginBottom: '10px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            textAlign: 'left',
            display: 'flex', // Asegura que el icono y el texto estén alineados
            alignItems: 'center',
          }}
          onClick={() => {
            alert('Conectar con Solflare');
            onClose();
          }}
        >
          <FaExternalLinkAlt style={{ marginRight: '8px' }} /> {/* Ícono genérico */}
          Conectar con Solflare
        </button>
        <button
          style={{
            backgroundColor: '#2C2F3E', // Color Solana
            color: '#fff',
            padding: '1px 15px',
            marginBottom: '10px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            textAlign: 'left',
            display: 'flex', // Asegura que el icono y el texto estén alineados
            alignItems: 'center',
          }}
          onClick={() => {
            alert('Conectar con Phantom');
            onClose();
          }}
        >
          <FaExternalLinkAlt style={{ marginRight: '8px' }} /> {/* Ícono genérico */}
          Conectar con Phantom
        </button>
        <button
          style={{
            backgroundColor: '#2C2F3E', // Color Solana
            color: '#fff',
            padding: '10px 15px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            textAlign: 'left',
          }}
          onClick={() => {
            alert('Conectar con otra wallet');
            onClose();
          }}
        >
          Conectar con otra Wallet
        </button>
      </motion.div>
    </div>
  );
}
