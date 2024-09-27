import { useState, useEffect } from "react";
import { ethers } from "ethers";
import inventory_abi from "../artifacts/contracts/Inventory.sol/Inventory.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [inventory, setInventory] = useState(undefined);
  const [items, setItems] = useState([]);
  const [itemId, setItemId] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Error message state

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Update with your contract address
  const inventoryABI = inventory_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      setAccount(account[0]);
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    getInventoryContract();
  };

  const getInventoryContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const inventoryContract = new ethers.Contract(contractAddress, inventoryABI, signer);
    setInventory(inventoryContract);
  };

  const getAllItems = async () => {
    if (inventory) {
      const allItems = await inventory.getAllItems();
      const formattedItems = allItems.map((item) => ({
        id: item.id.toString(),
        name: item.name,
        quantity: item.quantity.toString(), // Convert BigNumber to string
      }));
      setItems(formattedItems);
    }
  };

  const addItem = async () => {
    if (inventory && itemId && itemName && itemQuantity > 0) {
      const quantity = ethers.BigNumber.from(itemQuantity); // Convert to BigNumber
  
      try {
        await inventory.addItem(itemId, itemName, quantity);
        getAllItems(); // Refresh the item list
      } catch (error) {
        // Show a popup alert with the error message
        if (error.reason) {
          window.alert(`Error: ${error.reason}`); // Display error from smart contract
        } else {
          window.alert("An unknown error occurred"); // General error message
        }
      }
    }
  };  

  const removeItem = async () => {
    if (inventory && itemId) {
      await inventory.removeItem(itemId);
      getAllItems();
    }
  };

  const updateItemQuantity = async () => {
    if (inventory && itemId && itemQuantity > 0) {
      await inventory.updateItemQuantity(itemId, itemQuantity);
      getAllItems();
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask in order to use this Inventory Management System.</p>;
    }

    if (!account) {
      return <button style={styles.button} onClick={connectAccount}>Please connect your MetaMask wallet</button>;
    }

    return (
      <>
        <div style={styles.content}>
          <h2>Connected Account: {account}</h2>
          <button style={styles.button} onClick={getAllItems}>Get Inventory Items</button>

          <div style={styles.form}>
            <div>
              <h3>Add or Update Item:</h3>
            </div>
            <input
              type="number"
              placeholder="Item ID"
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Item Quantity"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(Number(e.target.value))}
              style={styles.input}
            />

            <button style={styles.button} onClick={addItem}>Add Item</button>
            <button style={styles.button} onClick={updateItemQuantity}>Update Quantity</button>
            <button style={styles.button} onClick={removeItem}>Remove Item</button>
          </div>

          <h3>Inventory Items:</h3>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th>Item ID</th>
                <th>Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} style={styles.tableRow}>
                  <td style={styles.tableCell}>{item.id}</td>
                  <td style={styles.tableCell}>{item.name}</td>
                  <td style={styles.tableCell}>{item.quantity} units</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  const styles = {
    container: {
      border: "4px solid #0e106c",
      textAlign: "center",
      height: "93vh",
      margin: "20px 50px",
    },
    header: {
      backgroundColor: "#0e106c",
      color: "white",
      padding: "10px",
      fontSize: "24px",
    },
    content: {
      textAlign: "left",
      margin: "20px",
    },
    button: {
      backgroundColor: "#0e106c",
      color: "white",
      padding: "10px 20px",
      margin: "10px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "15px",
    },
    table: {
      width: "80%",
      margin: "20px auto",
      borderCollapse: "collapse",
    },
    tableHeader: {
      backgroundColor: "#f2f2f2",
      fontSize: "18px",
      borderBottom: "1px solid #ddd",
      textAlign: "center",
    },
    tableRow: {
      borderBottom: "1px solid #ddd",
    },
    tableCell: {
      padding: "8px",
      textAlign: "center",
    },
    form: {
      margin: "20px auto",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
    },
    input: {
      padding: "10px",
      margin: "5px",
      fontSize: "16px",
      width: "150px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    errorMessage: {
      color: "red",
      fontWeight: "bold",
      margin: "10px 0",
    },
  };

  return (
    <main style={styles.container}>
      <header style={styles.header}>
        <h1>Welcome to the Inventory Management System!</h1>
      </header>
      <div style={styles.elements}>
        {initUser()}
      </div>
    </main>
  );
}
