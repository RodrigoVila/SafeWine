import Router from "next/router";
import { useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import MainContract from "../build/contracts/MainContract.json";
import useLocalStorage from "./useLocalStorage";

//TODO: If network is NOT ropsten (or localhost for testing) then connect button must change
//TODO: Success Screen
//TODO: Error Screen
//TODO: ERC721 Contract + Front

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    const { ethereum, web3 } = window as any;
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      if (ethereum) {
        const web3 = new Web3(ethereum);
        try {
          // Request account access if needed
          await ethereum.enable();
          // Accounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (web3) {
        // Use Mist/MetaMask's provider.
        const web3Instance = web3;
        resolve(web3Instance);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider(
          "http://127.0.0.1:9545"
        );
        const web3Instance = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3Instance);
      }
    });
  });

const initialState = { address: "", name: "", description: "" };

const useWeb3 = () => {
  const [web3Instance, setWeb3Instance] = useState<any>();
  const [mainContractInstance, setMainContractInstance] = useState<any>();
  const [address, setAddress] = useState("");
  const [currentAccount, setCurrentAccount, clearLocalStorage] =
    useLocalStorage("@SW_ACC", initialState);

  const getAcounts = async () => {
    const web3: any = await getWeb3();
    const accounts = await web3.requestAccounts();
    setAddress(accounts[0]);
  };

  const clearStorage = () => {
    clearLocalStorage();
    Router.push("./");
  };

  const createCellarAccount = async (name: string, description: string) => {
    await mainContractInstance.methods
      .addNewCellar(name, description)
      .send({ from: currentAccount.address });
  };

  const createShopAccount = async (name: string, description: string) => {
    await mainContractInstance.methods
      .addNewShop(name, description)
      .send({ from: currentAccount.address });
  };

  const handleAccountChange = async (account: string) => {
    if (!account) {
      clearLocalStorage();
      setCurrentAccount(initialState);
    }
    if (mainContractInstance) {
      const cellarExists = await mainContractInstance.methods
        .checkIfCellarExist(account)
        .call()
        .then((bool: boolean) => bool);

      const shopExists = await mainContractInstance.methods
        .checkIfShopExist(account)
        .call()
        .then((bool: boolean) => bool);

      (await cellarExists) &&
        (await mainContractInstance.methods
          .getCellarByAddress(account)
          .call()
          .then((data: any) => {
            if (data.name !== "") {
              setCurrentAccount({
                address: account,
                name: data.name,
                type: "cellar",
              });
            }
          }));

      shopExists &&
        (await mainContractInstance.methods
          .getShopByAddress(account)
          .call()
          .then((data: any) => {
            if (data.name !== "") {
              setCurrentAccount({
                address: account,
                name: data.name,
                type: "shop",
              });
            }
          }));

      !cellarExists &&
        !shopExists &&
        setCurrentAccount({
          address: account,
          name: "",
          type: "",
        });
    }
  };

  useEffect(() => {
    const load = async () => {
      const web3: any = await getWeb3();

      const netID = await web3.eth.net.getId();
      const deployedNet = await MainContract.networks[netID];
      const MainContractInstance = new web3.eth.Contract(
        MainContract.abi,
        deployedNet && deployedNet.address
      );
      const accounts = await web3.eth.requestAccounts();
      console.log("haaaaaaa", MainContractInstance);
      setWeb3Instance(web3);
      setMainContractInstance(MainContractInstance);
      setAddress(accounts[0]);
    };

    load();
  }, []);

  useEffect(() => {
    const getAccount = async () => {
      handleAccountChange(address);
    };

    address && mainContractInstance && getAccount();
  }, [address, mainContractInstance]);

  useEffect(() => {
    const { ethereum } = window as any;

    if (ethereum) {
      ethereum.on("accountsChanged", (accounts: string[]) => {
        handleAccountChange(accounts[0]);
      });
      !ethereum.isConnected() && clearLocalStorage();
    }

    return () => {
      if (ethereum) {
        ethereum.on("accountsChanged", (accounts: string[]) => {
          handleAccountChange(accounts[0]);
        });
        !ethereum.isConnected() && clearLocalStorage();
      }
    };
    //eslint-disable-next-line
  }, []);

  return {
    currentAccount,
    createCellarAccount,
    createShopAccount,
    getAcounts,
  };
};

export default useWeb3;
