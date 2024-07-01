import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [lastTransaction, setLastTransaction] = useState({ amount: 0, type: "" });
  const [transactionStatus, setTransactionStatus] = useState(false);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (account) => {
    if (account.length > 0) {
      console.log("Account connected: ", account[0]);
      setAccount(account[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait();
      setLastTransaction({ amount: 1, type: "Deposit" });
      setTransactionStatus(true);
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait();
      setLastTransaction({ amount: 1, type: "Withdrawal" });
      setTransactionStatus(true);
      getBalance();
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask to use this ATM.</p>;
    }

    if (!account) {
      return <button className="btn" onClick={connectAccount}>Connect MetaMask Wallet</button>;
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p><strong>Account:</strong> {account}</p>
        <p><strong>Balance:</strong> {balance} ETH</p>
        <p><strong>Last Transaction:</strong> {lastTransaction.amount} ETH {lastTransaction.type}</p>
        <p><strong>Transaction Status:</strong> {transactionStatus ? "Success" : "Failed"}</p>
        <button className="btn" onClick={deposit}>Deposit 1 ETH</button>
        <button className="btn" onClick={withdraw}>Withdraw 1 ETH</button>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  useEffect(() => {
    if (atm) {
      atm.on("Deposit", (amount) => {
        console.log("Deposit event: ", amount.toNumber());
        setLastTransaction({ amount: amount.toNumber(), type: "Deposit" });
        setTransactionStatus(true);
        getBalance();
      });

      atm.on("Withdraw", (amount) => {
        console.log("Withdraw event: ", amount.toNumber());
        setLastTransaction({ amount: amount.toNumber(), type: "Withdrawal" });
        setTransactionStatus(true);
        getBalance();
      });

      return () => {
        atm.removeAllListeners();
      };
    }
  }, [atm]);

  return (
    <main className="container">
      <header>
        <h1>Welcome to the Metacrafters ATM!</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
          padding: 2rem;
          background: linear-gradient(135deg, #ff69b4, #ff0000);
          color: #333;
          font-family: Arial, sans-serif;
          min-height: 100vh;
        }
        header {
          margin-bottom: 2rem;
        }
        .btn {
          display: inline-block;
          margin: 0.5rem;
          padding: 0.5rem 1rem;
          font-size: 1rem;
          color: #fff;
          background-color: #4caf50;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .btn:hover {
          background-color: #45a049;
        }
        p {
          font-size: 1.1rem;
        }
      `}</style>
    </main>
  );
}
