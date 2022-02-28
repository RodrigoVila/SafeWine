// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;

    /*** Data Types ***/

    struct Token {
        uint256 id;
        string tokenURI;
        uint256 mintedAt;
        address mintedBy; //This could be cellar name inherited from main contract
    }

    /*** Storage ***/

    //Token ID count
    Counters.Counter private _tokenIds;

    //Tracks tokens (TODO: Is this necessary? Already tracking tokens in next mapping)
    Token[] tokens;

    //Tracks tokens 
    mapping(uint256 => Token) private indexToToken;

    //Ownership by token id
    mapping(uint256 => address) private tokenIndexToOwner;

    //How many tokens owner has
    mapping(address => uint256) ownershipTokenCount;

    //Token validity (Used to know if bottle is authentic or not).
    mapping(uint256 => bool) public tokenIndexIsValid;

    /*** Events ***/

    event Mint(uint256 id, string tokenURI, uint256 mintedAt, address mintedBy);
    event Sell(address seller, address to, uint256 id);

    /*** Constructor ***/

    constructor() ERC721("WineBottle", "WINE") {}

    /*** Methods ***/

    //Return owner address by token ID
    function getOwnerOf(uint256 _tokenId) public view returns (address) {
        return super.ownerOf(_tokenId);
    }

    //Return token count
    function getBalance(address _address) public view returns (uint256) {
        return super.balanceOf(_address);
    }

    //Return token total supply
    function totalSupply() public view returns (uint256) {
        return tokens.length;
    }

    //Return token validity (Sold wine = Invalid token)
    function isValidToken(uint256 _tokenId) public view returns (bool) {
        return tokenIndexIsValid[_tokenId];
    }

    // TODO: Find a better way to do this. If token amount increases, this will lead
    // to a problem.
    //Return array of token owned IDs
    function tokensOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 balance = balanceOf(_owner);

        if (balance == 0) {
            return new uint256[](0);
        } else {
            //Memory arrays needs to have a fixed size
            uint256[] memory result = new uint256[](balance);
            uint256 maxTokenId = totalSupply();
            uint256 idx = 0;
            uint256 tokenId;
            
            for (tokenId = 1; tokenId <= maxTokenId; tokenId++) {
                if (tokenIndexToOwner[tokenId] == _owner) {
                    result[idx] = tokenId;
                    idx++;
                }
            }
            return result;
        }
    }

    // Given an id, returns token data 
    function getTokenById(uint256 _tokenId) public view returns (uint256, string memory, uint256, bool) {
        uint256 id = indexToToken[_tokenId].id;
        string memory uri = indexToToken[_tokenId].tokenURI;
        uint256 mintedAt = indexToToken[_tokenId].mintedAt;
        bool isValid = tokenIndexIsValid[_tokenId];

        return (id, uri, mintedAt, isValid);
   }

    function mint(string memory _tokenURI) public returns (uint256) {
        _tokenIds.increment();

        //Token count increment before creation to avoid index 0
        uint256 newItemId = _tokenIds.current();

        Token memory token = Token({
            id: newItemId,
            tokenURI: _tokenURI,
            mintedAt: block.timestamp,
            mintedBy: msg.sender
        });
        tokens.push(token);
        indexToToken[newItemId] = token;
        tokenIndexToOwner[newItemId] = msg.sender;
        tokenIndexIsValid[newItemId] = true;
        ownershipTokenCount[msg.sender]++;

        super._mint(msg.sender, newItemId);
        super._setTokenURI(newItemId, _tokenURI);

        emit Mint(newItemId, _tokenURI, block.timestamp, msg.sender);

        return newItemId;
    }

    function transfer(uint256 _tokenId, address _to)
        public
        returns (uint256)
    {
        address seller = ownerOf(_tokenId);
        require(seller == msg.sender, "Only owner of this token can transfer");

        ownershipTokenCount[_to]++;
        ownershipTokenCount[seller]--;
        tokenIndexToOwner[_tokenId] = _to;

        transferFrom(seller, _to, _tokenId);

        emit Transfer(seller, _to, _tokenId);

        return _tokenId;
    }

    function sell(uint256 _tokenId, address _to)
        public
        returns (uint256)
    {        
        address seller = ownerOf(_tokenId);
        require(seller == msg.sender, "Only owner of this token can sell");

        ownershipTokenCount[_to]++;
        ownershipTokenCount[seller]--;
        tokenIndexToOwner[_tokenId] = _to;
        tokenIndexIsValid[_tokenId] = false;

        transferFrom(seller, _to, _tokenId);

        emit Sell(seller, _to, _tokenId);

        return _tokenId;
    }
}
