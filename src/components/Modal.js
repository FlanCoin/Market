// src/components/Modal.js

import React from 'react';
import { motion } from 'framer-motion';
import '../index.css'; // Asegúrate de que la ruta sea correcta

export default function Modal({ isOpen, onClose, nft }) {
  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo oscuro
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        zIndex: 1000, // Asegura que el modal esté encima de otros elementos
      }}
    >
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()} // Evitar que el clic en el contenido cierre el modal
        style={{
          display: 'flex',
          width: '80%',
          maxWidth: '800px',
          backgroundColor: '#1E1F22',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Lado izquierdo con la imagen de compra */}
        <div
          style={{
            flex: '40%',
            backgroundImage: `url(/images/compra.png)`, // Imagen de compra.png
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Lado derecho con la información y vista previa de la carta */}
        <div style={{ flex: '60%', padding: '20px', display: 'flex', flexDirection: 'column' }}>
          {/* Parte superior con descripción */}
          <div
            style={{
              flex: '1',
              backgroundColor: '#101214',
              color: '#fff',
              padding: '20px',
              borderBottom: '1px solid #333',
            }}
          >
            <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{nft.name}</h2>
            <p style={{ fontSize: '1.25rem' }}>{nft.description}</p> {/* Descripción del NFT */}
          </div>
          {/* Parte inferior con vista previa de la carta y botón */}
          <div
            style={{
              flex: '1',
              backgroundColor: '#101214',
              color: '#fff',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={nft.image}
              alt={nft.name}
              style={{
                width: '100%',
                maxWidth: '150px', // Vista previa más pequeña de la carta
                borderRadius: '12px',
                marginBottom: '10px',
                objectFit: 'cover',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
              }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }} // Animación de zoom al hacer hover
              onClick={() => {
                // Lógica para comprar el lote
                alert(`Comprando ${nft.name}`);
              }}
              style={{
                padding: '10px 20px',
                backgroundColor: '#5E67EE',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                transition: 'background-color 0.3s ease',
              }}
            >
              Comprar por {nft.price}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
