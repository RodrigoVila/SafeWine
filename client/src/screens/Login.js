import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

import LoginForm from '../components/LoginForm';

const LoginScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [provider, setProvider] = useState(null);

  const onChangeUser = user => setUserName(user);

  const onChangePassword = passwd => setPassword(passwd);

  const onSubmit = async () => {
    if (!userName || !password) {
      setErrorMessage('Ingrese usuario y contraseña');
      return;
    }

    setIsLoading(true);

    setIsLoading(false);
  };

  const checkConnectedWallet = () => {
    if (window.localStorage) {
      const userData = JSON.parse(window.localStorage.getItem('userAccount'));
      if (userData != null) {
        setUserInfo(userData);
        setIsConnected(true);
      }
    }
  };

  const detectCurrentProvider = () => {
    if (window.ethereum) {
      setProvider(window.ethereum);
    } else if (window.web3) {
      setProvider(window.web3.currentProvider);
    } else {
      console.error('Non-Ethereum browser detected.');
    }
  };

  const onConnect = async () => {
    try {
      if (provider) {
        await provider.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(provider);
        const userAccount = await web3.eth.getAccounts();
        const chainId = await web3.eth.getChainId();
        const account = userAccount[0];
        let ethBalance = await web3.eth.getBalance(account); // Get wallet balance
        ethBalance = web3.utils.fromWei(ethBalance, 'ether'); //Convert balance to wei
        setUserInfo({ ethBalance, account, chainId });
        if (userAccount.length === 0) {
          console.log('Please connect to meta mask');
        }
      }
    } catch (err) {
      console.log(
        'There was an error fetching your accounts. Make sure your Ethereum client is configured correctly.',
      );
    }
  };

  const onDisconnect = () => {
    window.localStorage.removeItem('userAccount');
    setUserInfo({});
    setIsConnected(false);
  };

  useEffect(() => {
    checkConnectedWallet();
    detectCurrentProvider();
  }, []);

  return (
    <LoginForm
      onChangeUser={onChangeUser}
      onChangePassword={onChangePassword}
      onSubmit={onSubmit}
      errorMessage={errorMessage}
      isLoading={isLoading}
      onConnect={onConnect}
    />
  );
};

export default LoginScreen;
