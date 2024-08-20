import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../index.css'; // Asegúrate de que la ruta sea correcta
import { useWallet } from '@solana/wallet-adapter-react'; // Si estás usando @solana/wallet-adapter
 
export default function Modal(props) {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const { wallet, connect, connected } = useWallet();
 
  useEffect(() => {
    // Este efecto revisa si hay una wallet conectada cada vez que se monta el componente
    if (connected) {
      setShowWalletModal(false); // Si la wallet está conectada, no mostrar el modal
    }
  }, [connected]);
 
  if (!props.isOpen) return null;
 
  const handlePurchase = () => {
    var wallet = props.getWalletData();
    if (!connected && wallet == null) {
      setShowWalletModal(true); // Mostrar el modal si la wallet no está conectada
    } else {
      // Lógica para realizar la compra si la wallet está conectada
      alert(`Comprando ${props.nft.name}`);
    }
  };
  const openSolConnect = async (value) => {
    props.openSolConnect(value);
  }
  const handleWalletModalClose = () => {
    setShowWalletModal(false);
  };
 
  const handleWalletConnectAndPurchase = async () => {
    try {
      if (!connected) {
        //await connect(); // Conectar la wallet usando la API de Solana
        await openSolConnect(false);
        setShowWalletModal(false);
      }
      if (connected) {
        alert(`Comprando ${props.nft.name}`);
        setShowWalletModal(false); // Cerrar el modal si la wallet está conectada después de la compra
      }
    } catch (error) {
      console.error("Error al conectar la wallet:", error);
    }
  };
 
  return (
    <>
      <div
        className="modal-overlay"
        onClick={props.onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          zIndex: 1000,
        }}
      >
        <motion.div
          className="modal-content"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
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
              backgroundImage: `url(/images/compra.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          {/* Lado derecho con la información y vista previa de la carta */}
          <div style={{ flex: '60%', padding: '20px', display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                flex: '1',
                backgroundColor: '#101214',
                color: '#fff',
                padding: '20px',
                borderBottom: '1px solid #333',
              }}
            >
              <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{props.nft.name}</h2>
              <p style={{ fontSize: '1.25rem' }}>{props.nft.description}</p>
            </div>
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
                src={props.nft.image}
                alt={props.nft.name}
                style={{
                  width: '100%',
                  maxWidth: '150px',
                  borderRadius: '12px',
                  marginBottom: '10px',
                  objectFit: 'cover',
                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handlePurchase}
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
                Comprar por {props.nft.price}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
 
      {/* Modal de aviso para conectar la wallet */}
      {showWalletModal && (
        <div
          className="wallet-modal-overlay"
          onClick={handleWalletModalClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <motion.div
            className="wallet-modal-content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '90%',
              maxWidth: '500px',
              padding: '20px',
              backgroundColor: '#2D2F36',
              color: '#fff',
              borderRadius: '12px',
              textAlign: 'center',
              border: '4px solid #4CAF50',
              boxShadow: '0px 0px 15px #333',
            }}
          >
            <h2
              style={{
                fontSize: '2rem',
                marginBottom: '20px',
                textShadow: '2px 2px #333',
                color: '#FFD700',
              }}
            >
              Conecta tu Wallet
            </h2>
            <p style={{ fontSize: '1.25rem', marginBottom: '20px', color: '#FFFFFF' }}>
              Para comprar este artículo, primero necesitas conectar tu wallet.
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={handleWalletConnectAndPurchase}
              style={{
                padding: '10px 20px',
                backgroundColor: '#5E67EE',
                color: '#fff',
                border: '2px solid #333',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: 'bold',
                textShadow: '1px 1px #000',
                marginTop: '10px',
                transition: 'transform 0.3s ease',
                boxShadow: '0px 0px 10px #555',
              }}
            >
              Conectar Wallet
            </motion.button>
          </motion.div>
        </div>
      )}
    </>
  );
}