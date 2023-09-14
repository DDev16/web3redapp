// Import Web3.js and other dependencies if needed
import Web3 from 'web3';

// Import the JSON ABI of your deployed smart contract
import contractAbiJson from '../../components/Utils/abi.json'; // Replace with the actual path to your contract ABI JSON file

// Initialize Web3.js (You may want to move this to a separate Web3.js setup file)
const web3 = new Web3(window.ethereum);

// Replace 'YourContractAddress' with your actual contract address on the Ethereum network
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

// Parse the contract ABI from the JSON
const contractAbi = contractAbiJson;

// Function to get the connected Ethereum account
async function getConnectedAccount() {
  try {
    // Request permission to access the user's Ethereum account
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    // Get the selected account
    const accounts = await web3.eth.getAccounts();
    return accounts[0]; // Return the first connected account
  } catch (error) {
    throw new Error('Error connecting to Ethereum account: ' + error.message);
  }
}

export { web3, contractAbi, contractAddress, getConnectedAccount };
