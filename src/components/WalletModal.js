// src/components/WalletModal.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaMagic } from 'react-icons/fa'; // Usar íconos genéricos
import '../index.css';
import { SolanaConnect } from "solana-connect";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import Web3Methods from './Web3Methods.js';
export default function WalletModal({ isOpen, onClose }) {
  let RPCMethods = Web3Methods.getInstance();
  const [solConnect, setSolConnect] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if(!solConnect){
      let tmp = new SolanaConnect();
      tmp.onWalletChange(async (adapter) => {
        if(adapter){
          let cartera = adapter.publicKey.toString();
          setWallet(cartera);
          let flanBalance = await RPCMethods.getTokenAccountsByOwner(cartera);
          setBalance(flanBalance);
          //let price = await getFlanPrice();
          console.log("cartera: ", cartera);
          console.log("balance", flanBalance)
        }
      });
      
      tmp.onVisibilityChange((isOpen) => {
        //console.log("menu visible:", isOpen);
      });

      setSolConnect(tmp);
    }
  }, [])
  const openConnect = () => {
    withReactContent(Swal).fire({
      title: "Input your exact Flancraft's username",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Set username",
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        setUsername(login);
      }
    }).then((result) => {
      console.log(result);
      if(result.isConfirmed && result.value != undefined && result.value != null && result.value != ''){
        solConnect.openMenu();
      }
    });
    
  }
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
        <h3 style={{ color: '#fff', marginBottom: '15px', fontSize: '16px' }} >Conectar Wallet</h3>
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
            openConnect();
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
