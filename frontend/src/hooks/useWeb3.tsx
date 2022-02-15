import Router from "next/router";
import { useEffect, useState } from "react";
import MainContract from "../build/contracts/MainContract.json";
import TokenContract from "../build/contracts/NFT.json";
import useLocalStorage from "./useLocalStorage";
import getWeb3 from "../utils/getWeb3";

//TODO: If network is NOT ropsten (or localhost for testing) then connect button must change
//TODO: Success Screen
//TODO: Error Screen
//TODO: ERC721 Contract + Front

type Token = {
  id: string;
  name: string;
  description: string;
  uri: string;
  isAvailable: boolean;
  mintedAt: string;
};

const initialState = { address: "", name: "", description: "", type: "" };

const useWeb3 = () => {
  const [web3Instance, setWeb3Instance] = useState<any>();
  const [mainContractInstance, setMainContractInstance] = useState<any>();
  const [nftContractInstance, setNftContractInstance] = useState<any>();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [currentAccount, setCurrentAccount, clearLocalStorage] =
    useLocalStorage("@SW_ACC", initialState);

  //Shared methods

  const connectToMetamask = async () => {
    const { ethereum } = window as any;
    console.log("hola5");
    console.log("hola6");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    console.log("hola7: ", accounts);

    setCurrentAccount({
      address: accounts[0],
      name: "",
      type: "",
    });
    console.log("hola7.1, currentAccount: ", currentAccount);
  };

  // const hasCellarAccount = await cellarExists();
  // const hasShopAccount = await shopExists();
  // if (hasCellarAccount) {
  //   setCurrentAccount({
  //     address: accounts[0],
  //     name: "",
  //     type: "cellar",
  //   });
  // } else if (hasShopAccount) {
  //   setCurrentAccount({
  //     address: accounts[0],
  //     name: "",
  //     type: "shop",
  //   });
  // } else {
  //   setCurrentAccount({
  //     address: accounts[0],
  //     name: "",
  //     type: "",
  //   });

  const clearStorage = () => {
    setCurrentAccount(initialState);
    clearLocalStorage();
  };

  //Main Contract methods

  const cellarExists = async () => {
    return await mainContractInstance.methods
      .checkIfCellarExist()
      .call({ from: currentAccount.address })
      .then((hasCellarAccount: boolean) => hasCellarAccount);
  };

  const shopExists = async () => {
    return await mainContractInstance.methods
      .checkIfShopExist()
      .call({ from: currentAccount.address })
      .then((hasShopAccount: boolean) => hasShopAccount);
  };

  const handleAccountChange = async (account: string) => {
    console.log("hola7.5");
    if (mainContractInstance && account) {
      console.log("hola8, handleAccountChange");
      if (await cellarExists()) {
        mainContractInstance.methods
          .getCurrentCellar()
          .call({ from: currentAccount.address })
          .then((data: any) => {
            console.log("hola10");
            if (data.name !== "") {
              console.log("hola11, CELLARdata.name?: ", data.name);
              setCurrentAccount({
                address: account,
                name: data.name,
                type: "cellar",
              });
              // window.location.reload();
            }
          });
      }

      if (currentAccount.type === "cellar") return;

      if (await shopExists()) {
        mainContractInstance.methods
          .getCurrentShop()
          .call({ from: currentAccount.address })
          .then((data: any) => {
            console.log("hola13");
            if (data.name !== "") {
              console.log("hola14, SHOPdata.name?: ", data.name);
              setCurrentAccount({
                address: account,
                name: data.name,
                type: "shop",
              });
              // window.location.reload();
            }
          });
      }
    }
  };

  const createCellarAccount = (name: string, description: string) => {
    console.log("hola15");
    if (mainContractInstance) {
      console.log(
        "hola16, mainContractInstance: ",
        mainContractInstance,
        "localstorage acc: ",
        currentAccount.address
      );
      mainContractInstance.methods
        .addNewCellar(name, description)
        .send({ from: currentAccount.address })
        .then((receipt: any) => {
          console.log("hola17, receipt: ", receipt);
          receipt && handleAccountChange(currentAccount.address);
        });
    }
  };

  const createShopAccount = async (name: string, description: string) => {
    console.log("hola18");
    if (mainContractInstance) {
      console.log("hola19mainContractInstance ", mainContractInstance);
      await mainContractInstance.methods
        .addNewShop(name, description)
        .send({ from: currentAccount.address })
        .then((receipt: any) => {
          console.log("hola20, receipt: ", receipt);
          receipt && handleAccountChange(currentAccount.address);
        });
    }
  };

  // Maybe delete after test
  const getInstances = () =>
    console.log("!!mainContract", mainContractInstance);

  const getCellar = async () => {
    await mainContractInstance.methods
      .getCurrentCellar()
      .call({ from: currentAccount.address })
      .then((cellar: any) => {
        console.log("hola20, cellar!: ", cellar);
      });
  };

  const getSender = async () => {
    await mainContractInstance.methods
      .getSender()
      .call({ from: currentAccount.address })
      .then((sender: string) => {
        console.log("!msg.sender: ", sender);
      });
  };

  const loadTokens = async (instance) => {
    instance &&
      (await instance.methods
        .getTokens()
        .call({ from: currentAccount.address })
        .then((tokens: any) => {
          tokens.map((token: any) => {
            const newToken = {
              id: token.id,
              name: token.name,
              description: token.description,
              uri: token.tokenURI,
              isAvailable: token.isAvailable,
              mintedAt: token.mintedAt,
            };
            setTokens((tokens) => [...tokens, newToken]);
          });
        }));
  };

  //Token Contract methods

  const mintNFT = async (
    name: string,
    description: string,
    tokenURI: string
  ) => {
    nftContractInstance &&
      (await nftContractInstance.methods
        .mint(name, description, tokenURI)
        .send({
          from: currentAccount.address,
          gas: 1000000,
        }));
  };

  useEffect(() => {
    const load = async () => {
      console.log("hola0");
      const web3: any = await getWeb3(true);
      console.log("hola1, web3: ", web3);

      const MainContractInstance = new web3.eth.Contract(
        MainContract.abi,
        // deployedNet && deployedNet.address
        "0x02d390fc160f899973bdc8fd440cc7edb62182cc"
      );
      console.log("hola3");
      const NFTContractInstance = new web3.eth.Contract(
        TokenContract.abi,
        // deployedNet && deployedNet.address
        "0x02d390fc160f899973bdc8fd440cc7edb62182cc"
      );
      console.log("hola4");
      setWeb3Instance(web3);
      setMainContractInstance(MainContractInstance);
      setNftContractInstance(NFTContractInstance);
      loadTokens(NFTContractInstance);
    };
    load();
  }, []);

  useEffect(() => {
    const { ethereum } = window as any;

    if (ethereum && currentAccount.address) {
      ethereum.on("accountsChanged", (accounts: string[]) => {
        accounts.length > 0 ? handleAccountChange(accounts[0]) : clearStorage();
      });
      ethereum.on("chainChanged", (/*chainId*/) => {
        window.location.reload();
      });

      !ethereum.isConnected() && clearStorage();
    }

    return () => {
      if (ethereum) {
        ethereum.removeListener("accountsChanged", (accounts: string[]) => {
          accounts.length > 0
            ? handleAccountChange(accounts[0])
            : clearStorage();
        });
        ethereum.removeListener("chainChanged", (/*chainId*/) => {
          window.location.reload();
        });
      }
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log("!web3Instance", web3Instance);
  }, [web3Instance]);

  useEffect(() => {
    console.log("!maincontractinstance", mainContractInstance);
  }, [mainContractInstance]);

  useEffect(() => {
    console.log("!nftContractInstance", nftContractInstance);
  }, [nftContractInstance]);

  useEffect(() => {
    console.log("!currentAccount", currentAccount);
  }, [currentAccount]);

  // useEffect(() => {
  //   console.log("!tokens", tokens);
  // }, [tokens]);

  return {
    currentAccount,
    tokens,
    createCellarAccount,
    createShopAccount,
    connectToMetamask,
    mintNFT,
    getInstances,
    cellarExists,
    shopExists,
    getCellar,
    getSender,
  };
};

export default useWeb3;
