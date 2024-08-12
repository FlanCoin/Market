// src/context/WalletContext.js

import React, { createContext, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

export const WalletContext = createContext();

const WalletContextProvider = ({ children }) => {
    const network = WalletAdapterNetwork.Devnet;

    const wallets = useMemo(() => [
        new PhantomWalletAdapter(),
    ], [network]);

    return (
        <ConnectionProvider endpoint={'https://api.devnet.solana.com'}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default WalletContextProvider;
