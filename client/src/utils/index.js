import { Alert } from 'react-native';
import * as Mnemonic from 'bitcore-mnemonic'; //A module for bitcore that implements Mnemonic code for generating deterministic keys.
import { hdkey } from 'ethereumjs-wallet'; //A lightweight wallet implementation. At the moment it supports key creation and conversion between various formats.
import * as bip39 from 'bip39'; //Mnemonic code for generating deterministic keys
import * as util from 'ethereumjs-util'; //A collection of utility functions for Ethereum
import { Transaction } from 'ethereumjs-tx'; //A simple module for creating, manipulating and signing Ethereum transactions
import * as CryptoJS from 'crypto-js'; //JavaScript library of crypto standards.
import Web3 from 'web3';

export const encryptCredentials = (seed, password) => {
  !Mnemonic.isValid(seed) && Alert.alert('Invalid seeds');

  CryptoJS.AES.encrypt(seed, password).toString();
};
