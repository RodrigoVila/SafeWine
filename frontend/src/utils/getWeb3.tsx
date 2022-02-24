import Web3 from "web3";

//Version 08/02
const getWeb3 = async (isFirstLoad: boolean) => {
  const { ethereum, web3: windowWeb3 } = window as any;

  try {
    let web3: Web3;
    if (ethereum) {
      web3 = new Web3(ethereum);
      // Ask User permission to connect to Metamask
      if (!isFirstLoad) {
        try {
          await ethereum.enable();
        } catch (err) {
          console.log("Transaction rejected by user:", err);
        }
      }
    } else if (windowWeb3) {
      web3 = new Web3(windowWeb3.currentProvider);
    } else {
      alert("Non-Ethereum browser detected. Please install MetaMask plugin");
      return;
    }

    return web3;

    // ...
  } catch (err) {
    console.log("Error in Web3.tsx -> getWeb3(): ", err);
  }
};

export default getWeb3;
