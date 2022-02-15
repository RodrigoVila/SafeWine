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

//Version original
// const getWeb3 = async () =>
//   await new Promise((resolve, reject) => {
//     const { ethereum, web3 } = window as any;
//     // Wait for loading completion to avoid race conditions with web3 injection timing.
//     window.addEventListener("load", async () => {
//       // Modern dapp browsers...
//       if (ethereum) {
//         const web3 = new Web3(ethereum);
//         try {
//           resolve(web3);
//         } catch (error) {
//           reject(error);
//         }
//       }
//       // Legacy dapp browsers...
//       else if (web3) {
//         // Use Mist/MetaMask's provider.
//         const web3Instance = web3;
//         resolve(web3Instance);
//       }
//       // Fallback to localhost; use dev console port by default...
//       else {
//         const provider = new Web3.providers.HttpProvider(
//           "http://127.0.0.1:7545"
//         );
//         const web3Instance = new Web3(provider);
//         console.log("No web3 instance injected, using Local web3.");
//         resolve(web3Instance);
//       }
//     });
//   });

// export default getWeb3;
