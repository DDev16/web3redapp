import React from 'react';
import { Web3OnboardProvider, init } from '@web3-onboard/react';
import injectedModule from '@web3-onboard/injected-wallets';
import coinbaseWalletModule from '@web3-onboard/coinbase'; // Import the Coinbase Wallet module

const web3Onboard = init({
  wallets: [
    injectedModule(),
    coinbaseWalletModule() // Add the Coinbase Wallet module to the list of wallets
  ],
  chains: [
    {
      id: '0x1', // Chain ID for Ethereum Mainnet
      token: 'ETH', // Token symbol for the chain
      label: 'Ethereum Mainnet', // Label for display
      rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID' // Replace with your Infura project ID
    },
    {
      id: '0xE', // Chain ID for Ethereum Mainnet
      token: 'FLR', // Token symbol for the chain
      label: 'Flare Networks', // Label for display
      rpcUrl: 'https://rpc.viri.uk/flrhttp' 
    },
    {
      id: '0x13', // Chain ID for Ethereum Mainnet
      token: 'SGB', // Token symbol for the chain
      label: 'Songbird Networks', // Label for display
      rpcUrl: 'https://rpc.viri.uk/http' 
    },
    // Add other chains as needed
  ],
  appMetadata: {
    name: 'Dentralized AreoStay',
    icon: '<svg>App Icon</svg>',
    description: 'A demo of Web3-Onboard.'
  }
});

const Web3OnboardProviderWrapper = ({ children }) => {
  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      {children}
    </Web3OnboardProvider>
  );
};

export default Web3OnboardProviderWrapper;