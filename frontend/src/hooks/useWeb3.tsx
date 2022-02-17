import { useEffect, useState } from 'react';
import MainContract from '../build/contracts/MainContract.json';
import TokenContract from '../build/contracts/NFT.json';
import useLocalStorage from './useLocalStorage';
import getWeb3 from '../utils/getWeb3';
import { useLocation } from 'react-router-dom';

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
    const [web3Instance, setWeb3Instance] = useState<any>();
    const [mainContractInstance, setMainContractInstance] = useState<any>(null);
    const [nftContractInstance, setNftContractInstance] = useState<any>(null);
    const [tokens, setTokens] = useState<Token[]>([]);
    const [currentAccount, setCurrentAccount, clearLocalStorage] =
        useLocalStorage('@SW_ACC', initialState);

    const location = useLocation();

    //Wallet connection

    const connectToMetamask = async () => {
        const { ethereum } = window as any;
        if (!ethereum) {
            alert(
                'Non-Ethereum browser detected. Please install MetaMask plugin'
            );
            return;
        }
        console.log('hola5');
        console.log('hola6');
        const accounts = await ethereum.request({
            method: 'eth_requestAccounts',
        });
        console.log('hola7: ', accounts);

        setCurrentAccount({
            address: accounts[0],
            name: '',
            type: '',
        });
        console.log('hola7.1, currentAccount: ', currentAccount);
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
        console.log('hola7.5. Account: ', account);
        if (mainContractInstance && account) {
            console.log('hola8, handleAccountChange');
            const cellarExist = await checkIfCellarExist();
            console.log('hola8.1, ', cellarExist);
            if (cellarExist) {
                console.log('hola8.5, handleAccountChange');
                mainContractInstance.methods
                    .getCurrentCellar()
                    .call({ from: currentAccount.address })
                    .then((data: any) => {
                        console.log('hola10');
                        if (data.name !== '') {
                            console.log(
                                'hola11, CELLARdata.name?: ',
                                data.name
                            );
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
                        console.log('hola13');
                        if (data.name !== '') {
                            console.log('hola14, SHOPdata.name?: ', data.name);
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
        console.log('hola15');
        if (mainContractInstance) {
            console.log(
                'hola16, mainContractInstance: ',
                mainContractInstance,
                'localstorage acc: ',
                currentAccount.address
            );
            mainContractInstance.methods
                .addNewCellar(name, description)
                .send({ from: currentAccount.address })
                .then((receipt: any) => {
                    console.log('hola17, receipt: ', receipt);
                    if (receipt) {
                        handleAccountChange(currentAccount.address);
                        return receipt;
                    }
                });
        }
    };

    const createShopAccount = async (name: string, description: string) => {
        console.log('hola18');
        if (mainContractInstance) {
            console.log('hola19mainContractInstance ', mainContractInstance);
            await mainContractInstance.methods
                .addNewShop(name, description)
                .send({ from: currentAccount.address })
                .then((receipt: any) => {
                    console.log('hola20, receipt: ', receipt);
                    receipt && handleAccountChange(currentAccount.address);
                });
        }
    };

    const getSender = async () => {
        await mainContractInstance.methods
            .getSender()
            .call({ from: currentAccount.address })
            .then((sender: string) => {
                console.log('!msg.sender: ', sender);
            });
    };

    //NFT Contract methods

    const loadTokens = async () => {
        console.log('!hola yy');
        if (nftContractInstance) {
            console.log('!111', nftContractInstance);
            await nftContractInstance.methods
                .tokensOfOwner(currentAccount.address)
                .call({ from: currentAccount.address })
                .then((data) => console.log('!!tokens: ', data));

            // tokens &&
            //     tokens.map(async (tokenID: number, index: number) => {
            //         const token =
            //             await nftContractInstance.methods.getTokenById(tokenID);
            //         console.log(
            //             `!loadedtoken!. Index: ${index}. Token: ${token} `
            //         );
            //         // const newToken = {
            //         // id: token.id,
            //         // name: token.name,
            //         // description: token.description,
            //         // uri: token.tokenURI,
            //         // isAvailable: token.isAvailable,
            //         // mintedAt: token.mintedAt,
            //         // };
            //         // setTokens((tokens) => [...tokens, newToken]);
            //     });
        }
    };

    const mintNFT = async (tokenURI: string) => {
        nftContractInstance &&
            (await nftContractInstance.methods.mint(tokenURI).send({
                from: currentAccount.address,
                gas: 1000000,
            }));
    };

    /** EFFECTS **/

    // Load Web3 and contracts instances

    useEffect(() => {
        const load = async () => {
            const { ethereum } = window as any;
            if (!ethereum) {
                alert(
                    'Non-Ethereum browser detected. Please install MetaMask plugin'
                );
                return;
            }
            console.log('hola0');
            const web3: any = await getWeb3(true);
            console.log('hola1, web3: ', web3);

            const MainContractInstance = new web3.eth.Contract(
                MainContract.abi,
                // deployedNet && deployedNet.address
                '0xc513e47e971b1a1179622475e6ca76359551d74c'
            );
            console.log('hola3');
            const NFTContractInstance = new web3.eth.Contract(
                TokenContract.abi,
                // deployedNet && deployedNet.address
                '0xc513e47e971b1a1179622475e6ca76359551d74c'
            );
            console.log('hola4');
            setWeb3Instance(web3);
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
            ethereum.on('chainChanged', (/*chainId*/) => {
                window.location.reload();
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
                ethereum.removeListener('chainChanged', (/*chainId*/) => {
                    window.location.reload();
                });
            }
        };
        //eslint-disable-next-line
    }, []);

    //Token loading on dashboard screen. Wallet must be connected first
    useEffect(() => {
        currentAccount.address &&
            nftContractInstance &&
            location.pathname === '/dashboard' &&
            loadTokens();
        //eslint-disable-next-line
    }, [currentAccount?.address, nftContractInstance]);

    useEffect(() => {
        console.log('!web3Instance', web3Instance);
    }, [web3Instance]);

    useEffect(() => {
        console.log('!maincontractinstance', mainContractInstance);
    }, [mainContractInstance]);

    useEffect(() => {
        console.log('!nftContractInstance', nftContractInstance);
    }, [nftContractInstance]);

    useEffect(() => {
        console.log('!currentAccount', currentAccount);
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
        checkIfCellarExist,
        checkIfShopExist,
        getSender,
    };
};

export default useWeb3;
