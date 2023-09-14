import React from 'react';
import { useConnectWallet } from '@web3-onboard/react';
import './connect.css'; // Import your CSS file

const ConnectWalletButton = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  return (
    <div>
      <button className={`wallet-button ${connecting ? 'connecting' : wallet ? 'disconnect' : 'connect'}`} disabled={connecting} onClick={() => (wallet ? disconnect(wallet) : connect())}>
        {connecting ? 'Connecting' : wallet ? 'Disconnect' : 'Connect'}
      </button>
    </div>
  );
};

export default ConnectWalletButton;
