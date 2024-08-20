// src/pages/Navbar.js
import React, { useState, useEffect } from 'react';
import { FaWallet, FaTimes } from 'react-icons/fa';
import Web3Methods from '../components/Web3Methods.js';
import { SolanaConnect } from 'solana-connect';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function Navbar(props) {
  const [isWalletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [flanAmount, setFlanAmount] = useState(0);
  const [username, setUsername] = useState('');
  const [solConnect, setSolConnect] = useState(null);
  const RPCMethods = Web3Methods.getInstance();

  useEffect(() => {
    if (solConnect) {
      const handleWalletChange = async (adapter) => {
        if (adapter) {
          const cartera = adapter.publicKey.toString();
          setWalletAddress(cartera);
          const flanBalance = await RPCMethods.getTokenAccountsByOwner(cartera);
          setFlanAmount(flanBalance);
          setWalletConnected(true);
          var user = await requestUsername(); // Solicita el nombre de usuario al conectar
          var jsonData = {
            'username': user,
            'wallet': cartera,
            'balance': flanBalance
          };
          props.setWalletDataInHomeView(jsonData);
          //localStorage.setItem('walletJsonData', JSON.stringify(jsonData));
        } else {
          // Resetea los datos cuando se desconecta
          setWalletConnected(false);
          setWalletAddress('');
          setFlanAmount(0);
          setUsername('');
          props.setWalletDataInHomeView(null);
          //localStorage.removeItem('walletJsonData');
        }
      };

      solConnect.onWalletChange(handleWalletChange);

      return () => {
        solConnect.offWalletChange && solConnect.offWalletChange(handleWalletChange);
      };
    }
  }, [solConnect, RPCMethods]);

  const handleWalletConnect = async () => {
    if (!solConnect) {
      const tmp = new SolanaConnect();
      setSolConnect(tmp);
      tmp.openMenu();
    } else {
      solConnect.openMenu();
    }
  };

  const handleDisconnectWallet = async () => {
    if (solConnect) {
      solConnect.openMenu();
    }
  };

  const requestUsername = async () => {
    const MySwal = withReactContent(Swal);
    const { value } = await MySwal.fire({
      title: "Input your exact Flancraft's username",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Set username",
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        setUsername(login);
        return login;
      },
      customClass: {
        popup: 'minecraft-popup',
        title: 'minecraft-title',
        confirmButton: 'minecraft-button',
      }
    });
    if (value) {
      setUsername(value);
      return value;
    }
  };

  const formatWalletAddress = (address) => {
    if (address.length > 6) {
      return `${address.slice(0, 3)}...${address.slice(-3)}`;
    }
    return address;
  };

  return (
    <header className="bg-green-800 text-white flex items-center p-4 relative">
      {/* Logo izquierdo */}
      <a href="/" className="absolute left-4 flex items-center">
        <img
          src="/logo-left.png"
          alt="Flancraft Logo Left"
          className="h-15 w-auto"
        />
      </a>

      {/* Logo central */}
      <a href="/" className="flex items-center mx-auto">
        <img
          src="/logo-center.png"
          alt="Flancraft Logo Center"
          className="h-15 w-auto"
        />
      </a>

      {/* Opciones de la barra de navegación */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        {!isWalletConnected ? (
          <button id="walletConnect"
            onClick={handleWalletConnect}
            className="flex items-center bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
          >
            <FaWallet className="mr-2" />
            Conectar Wallet
          </button>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#2C2F3E',
              color: '#fff',
              padding: '10px 15px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              zIndex: 1002,
              width: '200px', // Ampliar el cuadro si es necesario
              position: 'relative',
            }}
          >
            <span style={{ flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {formatWalletAddress(walletAddress)}
            </span>
            <button
              onClick={handleDisconnectWallet}
              style={{
                backgroundColor: '#FF4D4D',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'absolute',
                top: '10px',
                right: '10px',
              }}
            >
              <FaTimes />
            </button>
          </div>
        )}

        {/* Mostrar el recuadro de FLANs solo si la wallet está conectada y el nombre de usuario está establecido */}
        {isWalletConnected && username && (
          <div
            style={{
              backgroundColor: '#0E321A',
              color: '#fff',
              padding: '10px',
              borderRadius: '8px',
              marginTop: '10px',
              position: 'absolute',
              top: '60px',
              right: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              zIndex: 1002,
              width: '300px', // Asegúrate de que el cuadro es lo suficientemente ancho
            }}
          >
            <h4 style={{ margin: 0, fontSize: '16px' }}>{username || 'Set Username'}</h4>
            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>FLAN:</p>
            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>{flanAmount}</p>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
