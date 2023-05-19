import { createContext, useContext, useEffect, useState } from 'react';
import Web3 from 'web3';

const Web3Context = createContext();

export const useWeb3 = () => {
  return useContext(Web3Context);
};

export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const connectWeb3 = async () => {
      if (window.ethereum) {
        try {
          const _web3 = new Web3(window.ethereum);
          setWeb3(_web3);

          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccount(accounts[0]);
        } catch (error) {
          console.error('Error connecting to Web3:', error);
        }
      } else {
        console.log('No Ethereum provider detected. Please install MetaMask.');
      }
    };

    connectWeb3();
  }, []);

  return <Web3Context.Provider value={{ web3, account }}>{children}</Web3Context.Provider>;
};
