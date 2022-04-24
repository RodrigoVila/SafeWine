# SafeWine: Bottle anti-counterfeiting system

## Description

More than 20% of the world's wine is counterfeit, causing consumers to lose confidence in important brands.
Through blockchain technology, SafeWine offers the possibility of creating a single immutable record for each bottle produced, restoring cellars and consumers confidence.

## How?

Every time a bottle is created, a Non Fungible Token (NFT) with an associated QR Code is generated. This token can be transferred to a new owner, or it can be sold invalidating it.
In the future, the QR could be replaced by an NFC tag to prevent the code from being copypasted and open up the opportunity to trace bottles and making an efficient supply chain.

## Technologies involved:

* React JS
* Typescript
* Solidity
* Truffle
* Ganache
* Web3

## How to use?
1) Clone this repo `git clone git@github.com:RodrigoVila/SafeWine.git` or `git clone https://github.com/RodrigoVila/SafeWine.git`
2) Go to project folder `cd safewine`
3) Go to frontend folder `cd frontend`
5) Install dependencies `npm install` or `yarn install`
6) Run app `npm start`

or...

## Use the live demo
https://safe-wine.vercel.app/

## Important Info
1) Metamask is required
2) This app works only in ROPSTEN network
3) Test (fake) ethers are required to sign transactions, 1 should be more than enough. 


#### [How to install Metamask, setup Ropsten Network and get test ethers](https://devtonight.com/posts/metamask-testnet-wallet-setup-for-blockchain-development#:~:text=Add%20Custom%20Testnet%20Networks%20To,%2C%20RPC%20URL%2C%20chain%20ID)

## Inside the app
1) Login with Metamask
2) Create Cellar or Shop account (They have different permissions.
3) Try minting, transfering and selling bottles.

### Cellar account can:
* Mint Token
* Transfer Token

### Shop account can:
* Sell Token (Same as transfer but also invalidates it)

