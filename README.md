# SafeWine: Bottle anti-counterfeiting system

## Description

More than 20% of the world's wine is counterfeit, causing consumers to lose confidence in important brands.
Through blockchain technology, SafeWine offers the possibility of creating a single immutable record for each bottle produced, restoring cellars and consumers confidence.

## How?

Every time a bottle is created, a Non Fungible Token (NFT) with an associated QR Code is generated. This token can be transferred to a new owner, or it can be sold invalidating it.

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

or if you preffer...

## Use the live demo
https://safe-wine.vercel.app/

## Inside the app
1) Connect to Metamask (Metamask required)
2) Create an account (Shop or Cellar)

### Cellar account can:
* Add Token
* Transfer Token

### Shop account can:
* Sell Token (Same as transfer but also invalidates it)

