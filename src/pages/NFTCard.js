// src/pages/NFTCard.js

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from '../components/Modal'; // Asegúrate de que la ruta sea correcta
import '../index.css'; // Asegúrate de que la ruta sea correcta

// Estilos de rareza
const rarityStyles = {
  Common: {
    color: '#cccccc',
    gradient: 'linear-gradient(135deg, rgba(200,200,200,0.2), rgba(0,0,0,0))',
  },
  Uncommon: {
    color: '#4caf50',
    gradient: 'linear-gradient(135deg, rgba(76,175,80,0.2), rgba(0,0,0,0))',
  },
  Rare: {
    color: '#2196f3',
    gradient: 'linear-gradient(135deg, rgba(33,150,243,0.2), rgba(0,0,0,0))',
  },
  Epic: {
    color: '#9c27b0',
    gradient: 'linear-gradient(135deg, rgba(156,39,176,0.2), rgba(0,0,0,0))',
  },
  Legendary: {
    color: '#ff9800',
    gradient: 'linear-gradient(135deg, rgba(255,152,0,0.2), rgba(0,0,0,0))',
  },
};

export default function NFTCard(props) {
  const [isHovered, setHovered] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [walletData, setWalletData] = useState(null);
  const handleHover = () => setHovered(true);
  const handleLeave = () => setHovered(false);

  const rarity = props.nft.rarity;
  const { color, gradient } = rarityStyles[rarity] || rarityStyles.Common;

  const handleBuyClick = () => {
    var walletDataFromHome = props.getWalletValues();
    setWalletData(walletDataFromHome);
    setModalOpen(true);
  };

  const getWalletData = () => {
    return props.getWalletValues();
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const openSolConnect = (value) => {
    props.openSolConnect(value);
  }

  return (
    <>
      <motion.div
        className="nft-card"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05, boxShadow: `0 0 10px ${color}` }} // Restaurar efecto de borde de rareza
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        style={{
          position: 'relative',
          margin: '20px auto',
          width: '300px',
          height: '420px', // Altura ajustada para permitir espacio suficiente para la imagen y el botón
          borderRadius: '16px',
          overflow: 'hidden',
          cursor: 'pointer',
          backgroundColor: 'transparent',
          border: `2px solid #111214`,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ flex: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={props.nft.image}
            alt={props.nft.name}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px',
            }}
          />
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: '#1E1F22',
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
            position: 'relative',
            backgroundImage: gradient,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#D5D7DA',
              textAlign: 'center',
            }}
          >
            {props.nft.name}
          </div>
          {!isHovered && (
            <div style={{ fontSize: '16px', color: '#fff', marginTop: '5px' }}>
              <span style={{ color: '#F7A102' }}>💰</span> ${props.nft.price}
            </div>
          )}
          {isHovered && (
            <button
              className="buy-now-button"
              style={{
                padding: '8px 16px',
                backgroundColor: '#5E67EE',
                color: '#fff',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                marginTop: '10px',
                transition: 'background-color 0.3s ease',
                boxShadow: 'none',
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4A53C7'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#5E67EE'}
              onClick={handleBuyClick}
            >
              Comprar ahora por ${props.nft.price}
            </button>
          )}
        </div>
        <div
          className="availability"
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '8px',
            padding: '5px 10px',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#fff',
          }}
        >
          {props.nft.availability}/{props.nft.initialAvailability}
        </div>
      </motion.div>

      {/* Mostrar el modal si isModalOpen es true */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        nft={props.nft}
        openSolConnect={openSolConnect}
        getWalletData={getWalletData}
      />
    </>
  );
}
