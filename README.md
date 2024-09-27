# Inventory Management System

The Inventory Management System is a decentralized application that allows users to manage and interact with an inventory of items through an Ethereum-based smart contract. Users can connect their MetaMask wallet to add, remove, update quantities, and view items in the inventory. This application provides a simple interface to manage digital assets stored in a smart contract using Ethereum blockchain technology.

## Description

This application simulates a basic inventory management system where users can connect to the Ethereum blockchain through MetaMask and interact with a smart contract. Users can:

Add new items to the inventory.
Remove existing items.
Update the quantity of an item.
View the list of items currently in the inventory.
The application uses the Ethereum blockchain to ensure secure, transparent, and immutable inventory records.
## Getting Started

### Prerequisites

Node.js: Ensure Node.js is installed on your machine. You can download it from nodejs.org.
MetaMask: Install and configure MetaMask. You can get it from metamask.io.

### Installing

-Clone the repository:

git clone https://github.com/YourUsername/InventoryManagementSystem.git

-Navigate to the project directory:

cd InventoryManagementSystem

-Install dependencies:

npm install

### Executing program

-Open a terminal and start the Hardhat local Ethereum node:

npx hardhat node

-Open a second terminal and deploy the smart contract to the local network:

npx hardhat run --network localhost scripts/deploy.js

-Open a third terminal and start the front-end development server:

npm run dev

-Visit the application in your browser:

Open http://localhost:3000 to interact with the Inventory Management System.

Ensure MetaMask is connected to the application.

## Features

View the list of all items in the inventory.
Add new items with a unique ID, name, and quantity.
Update the quantity of an existing item.
Remove items from the inventory.
Real-time interaction with Ethereum smart contracts through MetaMask.

## Code Breakdown

Key Components

MetaMask Integration: The application connects to MetaMask to retrieve the user's account and Ethereum provider.
Smart Contract Interaction: The app interacts with an Inventory smart contract using Ethers.js to call functions like addItem, removeItem, updateItemQuantity, and getAllItems.
State Management: React useState is used to manage the state of the connected wallet, account details, item details, and the inventory list.

## Smart Contract Methods
addItem: Adds a new item to the inventory by specifying an item ID, name, and quantity.

removeItem: Removes an item from the inventory using its unique ID.

updateItemQuantity: Updates the quantity of an existing item.

getAllItems: Fetches and displays the list of all items currently stored in the inventory contract.

## Help 

If you encounter any issues, make sure:

MetaMask is properly installed and configured.
Your Ethereum wallet has sufficient funds for transactions and gas fees.
You are connected to the correct network.
For additional support, refer to MetaMask's official documentation.

## Authors

Sakshi Sankhala
## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
