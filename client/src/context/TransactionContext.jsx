import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { constantABI, contractAddress } from "../utils/constant";

export const TransactionContext = React.createContext();
const { ethereum } = window;

const getEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    constantABI,
    signer
  );
  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState('');
  const [formData, setFormData] = useState({addressTo: '', amount: '', keyword: '', message: ''});

  function handleFormChange(e, name){
    setFormData((prevState)=>({...prevState, [name]: e.target.value}));
  }

  async function checkIfWalletConnected() {
    try {
      if (!ethereum) {
        return alert("Please install  metamask");
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });
      // console.log(accounts)
      if (accounts.length > 0) {
        setConnectedAccount(accounts[0]);
      } else {
        console.log("no account found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object found");
    }
  }

  async function connectToAccount() {
    try {
      if (!ethereum) {
        return alert("Please install metamask");
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setConnectedAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object found");
    }
  }

  async function sendTransaction() {
    try {
      if (!ethereum) {
        return alert("Please install metamask");
      }
      const {addressTo, amount, keyword, message} = formData;

      const transactionContract = await getEthereumContract();
      // console.log(transactionContract)
      const parsedAmount = ethers.parseUnits(amount,"ether");
      // console.log()
      // console.log(ethers);
      // console.log(await transactionContract)
      // console.log(parsedAmount)

      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: connectedAccount,
            to: addressTo,
            gas: '0x76c0',
            value: "0x"+parsedAmount.toString()
          }
        ]
      });
     const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
     console.log(`Loading .. ${transactionHash.hash}`);
     await transactionHash.wait();
     console.log(`Success .. ${transactionHash.hash}`);

    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object found");
    }
  }

  useEffect(function () {
    checkIfWalletConnected();
  }, []);

  return (
    <TransactionContext.Provider value={{ connectToAccount, connectedAccount, formData, setFormData, handleFormChange, sendTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};
