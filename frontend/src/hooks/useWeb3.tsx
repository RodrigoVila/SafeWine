import { useEffect, useState } from 'react';
import MainContract from '../build/contracts/MainContract.json';
import TokenContract from '../build/contracts/NFT.json';
import useLocalStorage from './useLocalStorage';
import getWeb3 from '../utils/getWeb3';
import { getMetadata } from '../services';

//TODO: If network is NOT ropsten (or localhost for testing) then connect button must change

type Token = {
    id: string;
    name: string;
    description: string;
    uri: string;
    isAvailable: boolean;
    mintedAt: string;
};

const initialState = { address: '', name: '', description: '', type: '' };

const useWeb3 = () => {
    const [mainContractInstance, setMainContractInstance] = useState<any>(null);
    const [nftContractInstance, setNftContractInstance] = useState<any>(null);
    const [chainError, setChainError] = useState(false);
    const [tokens, setTokens] = useState<Token[]>([]);
    const [currentAccount, setCurrentAccount, clearLocalStorage] =
        useLocalStorage('@SW_ACC', initialState);

    //Wallet connection

    const connectToMetamask = async () => {
        const { ethereum } = window as any;
        if (!ethereum) {
            alert(
                'Non-Ethereum browser detected. Please install MetaMask plugin'
            );
            return;
        }

        const accounts = await ethereum.request({
            method: 'eth_requestAccounts',
        });

        setCurrentAccount({
            address: accounts[0],
            name: '',
            type: '',
        });
    };

    const clearStorage = () => {
        setCurrentAccount(initialState);
        clearLocalStorage();
    };

    //Main Contract methods

    const checkIfCellarExist = async () => {
        return await mainContractInstance.methods
            .checkIfCellarExist()
            .call({ from: currentAccount.address })
            .then((hasCellarAccount: boolean) => hasCellarAccount);
    };

    const checkIfShopExist = async () => {
        return await mainContractInstance.methods
            .checkIfShopExist()
            .call({ from: currentAccount.address })
            .then((hasShopAccount: boolean) => hasShopAccount);
    };

    const handleAccountChange = async (account: string) => {
        if (mainContractInstance && account) {
            const cellarExist = await checkIfCellarExist();
            if (cellarExist) {
                mainContractInstance.methods
                    .getCurrentCellar()
                    .call({ from: currentAccount.address })
                    .then((data: any) => {
                        if (data.name !== '') {
                            setCurrentAccount({
                                address: account,
                                name: data.name,
                                type: 'cellar',
                            });
                        }
                    });
            }

            if (currentAccount.type === 'cellar') return;

            const shopExist = await checkIfShopExist();

            if (shopExist) {
                mainContractInstance.methods
                    .getCurrentShop()
                    .call({ from: currentAccount.address })
                    .then((data: any) => {
                        if (data.name !== '') {
                            setCurrentAccount({
                                address: account,
                                name: data.name,
                                type: 'shop',
                            });
                        } else {
                            setCurrentAccount({
                                address: account,
                                name: '',
                                type: '',
                            });
                        }
                    });
            }
        } else {
            setCurrentAccount({
                address: account,
                name: '',
                type: '',
            });
        }
    };

    const createCellarAccount = (name: string, description: string) => {
        if (mainContractInstance) {
            mainContractInstance.methods
                .addNewCellar(name, description)
                .send({ from: currentAccount.address })
                .then((receipt: any) => {
                    if (receipt) {
                        handleAccountChange(currentAccount.address);
                        return receipt;
                    }
                });
        }
    };

    const createShopAccount = async (name: string, description: string) => {
        if (mainContractInstance) {
            await mainContractInstance.methods
                .addNewShop(name, description)
                .send({ from: currentAccount.address })
                .then((receipt: any) => {
                    receipt && handleAccountChange(currentAccount.address);
                });
        }
    };

    //NFT Contract methods

    const clearTokens = () => setTokens([]);

    const isValidToken = async (_tokenid: string) => {
        return await nftContractInstance?.methods
            .isValidToken(_tokenid)
            .call({ from: currentAccount.address })
            .then((valid: boolean) => valid);
    };

    const getTokenByID = (tokenID: string) => {
        return nftContractInstance.methods
            .getTokenById(parseInt(tokenID))
            .call({ from: currentAccount.address })
            .then((token) => {
                const uri = token[1];
                getMetadata(uri).then((data) => {
                    const newToken = {
                        id: token[0],
                        name: data.name,
                        description: data.description,
                        uri: data.fileURI,
                        mintedAt: token[2],
                        isAvailable: token[3],
                    };

                    return newToken;
                });
            });
    };

    const loadTokens = async () => {
        clearTokens();
        if (nftContractInstance) {
            await nftContractInstance.methods
                .tokensOfOwner(currentAccount.address)
                .call({ from: currentAccount.address })
                .then((tokens) => {
                    tokens.map((tokenID: string) => {
                        return nftContractInstance.methods
                            .getTokenById(parseInt(tokenID))
                            .call({ from: currentAccount.address })
                            .then((token) => {
                                const uri = token[1];
                                getMetadata(uri).then((data) => {
                                    const newToken = {
                                        id: token[0],
                                        name: data.name,
                                        description: data.description,
                                        uri: data.fileURI,
                                        mintedAt: token[2],
                                        isAvailable: token[3],
                                    };
                                    setTokens((tokens) => [
                                        ...tokens,
                                        newToken,
                                    ]);
                                });
                            });
                    });
                });
        }
    };

    const mint = async (tokenURI: string) => {
        nftContractInstance &&
            (await nftContractInstance.methods.mint(tokenURI).send({
                from: currentAccount.address,
                gas: 1000000,
            }));
    };

    const transfer = async (tokenID: string, to: string) => {
        nftContractInstance &&
            (await nftContractInstance.methods
                .transfer(tokenID, to)
                .send({
                    from: currentAccount.address,
                    gas: 1000000,
                })
                .then((data) => console.log('!Transfer OK: ', data)));
    };

    const sell = async (tokenID: string, to: string) => {
        nftContractInstance &&
            (await nftContractInstance.methods
                .sell(tokenID, to)
                .send({
                    from: currentAccount.address,
                    gas: 1000000,
                })
                .then((data) => console.log('!Sell OK: ', data)));
    };

    /** EFFECTS **/

    // Load Web3 and contracts instances

    useEffect(() => {
        const load = async () => {
            const MainContractAddress =
                '0x64e9df92f5810efc16ee280c9bafceb3eab95b60';
            const NFTContractAddress =
                '0xd72331afeb36d033cd0d9b4ecc1aa22d010fb5bf';

            const { ethereum } = window as any;

            if (!ethereum) {
                alert(
                    'Non-Ethereum browser detected. Please install MetaMask plugin'
                );
                return;
            }
            const web3: any = await getWeb3(true);

            const MainContractInstance = new web3.eth.Contract(
                MainContract.abi,
                MainContractAddress
            );
            const NFTContractInstance = new web3.eth.Contract(
                TokenContract.abi,
                NFTContractAddress
            );
            setMainContractInstance(MainContractInstance);
            setNftContractInstance(NFTContractInstance);
        };
        load();
    }, []);

    //Events

    useEffect(() => {
        const { ethereum } = window as any;

        if (ethereum) {
            ethereum.on('accountsChanged', (accounts: string[]) => {
                accounts.length > 0
                    ? handleAccountChange(accounts[0])
                    : clearStorage();
            });
            ethereum.on('chainChanged', (chainId) => {
                chainId === '0x3'
                    ? window.location.reload()
                    : setChainError(true);
            });

            !ethereum.isConnected() && clearStorage();
        }

        return () => {
            if (ethereum) {
                ethereum.removeListener(
                    'accountsChanged',
                    (accounts: string[]) => {
                        accounts.length > 0
                            ? handleAccountChange(accounts[0])
                            : clearStorage();
                    }
                );
                ethereum.removeListener('chainChanged', (chainId) => {
                    chainId === '0x3'
                        ? window.location.reload()
                        : setChainError(true);
                });
            }
        };
        //eslint-disable-next-line
    }, []);

    //Token loading on dashboard screen. Wallet must be connected first
    useEffect(() => {
        if (currentAccount.address) {
            handleAccountChange(currentAccount.address);
            if (nftContractInstance) {
                loadTokens();
            }
        }
        //eslint-disable-next-line
    }, [currentAccount?.address, nftContractInstance]);

    return {
        currentAccount,
        tokens,
        chainError,
        connectToMetamask,
        createCellarAccount,
        createShopAccount,
        checkIfCellarExist,
        checkIfShopExist,
        mint,
        transfer,
        sell,
        loadTokens,
        isValidToken,
        getTokenByID,
    };
};

export default useWeb3;
