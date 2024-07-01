# Metacrafters ATM

A React component that integrates with MetaMask to interact with a smart contract for depositing and withdrawing ETH.

## Description

The `HomePage` React component provides a user interface to interact with a smart contract deployed on Ethereum using MetaMask. It allows users to connect their MetaMask wallet, check their ETH balance, deposit ETH into the contract, withdraw ETH from the contract, and view transaction history. The component uses ethers.js for Ethereum interaction and integrates event listeners to update the UI in real-time based on contract events.

## Getting Started

### Prerequisites

- Ensure you have MetaMask installed in your browser and connected to the Ethereum network.

### Installing

1. Clone the repository or create a new React project.
2. Copy the `HomePage` component code into a new or existing React component file.

### Executing program

1. **Start the React Application:**
   - Run `npm start` or `yarn start` in your terminal to start the development server.

2. **Open the Application in Browser:**
   - Navigate to `http://localhost:3000` or the port specified in your terminal.

3. **Connect MetaMask:**
   - Ensure MetaMask is unlocked and connected to the Ethereum network.

4. **Interact with the Component:**
   - Click the "Connect MetaMask Wallet" button to connect your wallet.
   - Once connected, you can:
     - View your account address and ETH balance.
     - Perform transactions such as depositing or withdrawing 1 ETH.

## Help

For common issues:
- Ensure MetaMask is properly configured and connected to the correct Ethereum network.
- Check the browser console for any error messages related to MetaMask interactions.

For additional help, you can refer to the [MetaMask documentation](https://metamask.io/docs/) and the [React documentation](https://reactjs.org/docs/getting-started.html).

## Authors

Sakshi Sankhala
## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
