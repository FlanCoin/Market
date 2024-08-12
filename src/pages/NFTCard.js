// src/components/NFTCard.js

import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { motion } from 'framer-motion';

export function NFTCard({ nft }) {
  // Definir los colores de rareza
  const rarityColor = {
    Common: '#cccccc',
    Uncommon: '#4caf50',
    Rare: '#2196f3',
    Epic: '#9c27b0',
    Legendary: '#ff9800',
  };

  // Estado para controlar si la tarjeta está volteada
  const [flipped, setFlipped] = useState(false);

  // Asignar el color de rareza
  const rarityColorStyle = { color: rarityColor[nft.rarity] || '#cccccc' };

  // Función para manejar el giro de la tarjeta
  const handleFlip = () => {
    setFlipped(!flipped);
  };

  // Variantes de animación para el giro
  const cardVariants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 },
  };

  return (
    <motion.div
      className="nft-card"
      style={{ perspective: 1000 }} // Necesario para el efecto 3D
      onClick={handleFlip}
    >
      <motion.div
        className="nft-card-inner"
        animate={flipped ? 'back' : 'front'}
        variants={cardVariants}
        transition={{ duration: 0.3 }} // Animación más rápida
        style={{
          transformStyle: 'preserve-3d',
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        {/* Parte frontal de la tarjeta */}
        <div
          className="nft-card-front"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            backgroundColor: '#333',
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
            cursor: 'pointer',
          }}
        >
          <div className="nft-header p-4 flex justify-between items-center">
            <div className="rarity" style={rarityColorStyle}>
              {nft.rarity}
            </div>
            <div className="price">{nft.price}</div>
          </div>
          <div className="nft-image">
            <img
              src={nft.image}
              alt={nft.name}
              className="w-full h-60 object-cover rounded-t-lg shadow-inner"
            />
          </div>
          <div className="nft-footer p-4 flex flex-col justify-center">
            <h3 className="font-bold text-lg mb-2 text-center">{nft.name}</h3>
            <button className="buy-now-button">
              <FaShoppingCart className="mr-2" />
              Buy Now
            </button>
          </div>
        </div>

        {/* Parte trasera de la tarjeta */}
        <div
          className="nft-card-back"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            backgroundColor: '#444',
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
            padding: '16px',
          }}
        >
          <div className="nft-info text-center">
            <p className="description text-sm text-gray-300">
              {nft.description}
            </p>
            <div className="separator my-4"></div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
