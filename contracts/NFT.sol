// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./MainContract.sol";

contract NFT is ERC721URIStorage, MainContract {
    using Counters for Counters.Counter;

    //Structs

    struct Token {
        uint256 id;
        string name;
        string description;
        string tokenURI;
        uint256 mintedAt;
        bool isAvailable;
    }

    //Storage

    Counters.Counter private _tokenIds;
    Token[] tokens;
    mapping(uint256 => Token) private idToToken;
    mapping(uint256 => string) private tokenURIs;
    mapping(address => uint256[]) private ownedTokensByAddress;

    //Events

    event LogTokenSold(uint256 tokenId, address currentOwner, address newOwner);

    event LogTokenCreate(
        uint256 id,
        string name,
        string description,
        string tokenURI,
        uint256 mintedAt,
        address mintedBy
    );

    event LogTokenTransfer(uint256 _tokenId, address _from, address _to);

    //Constructor

    constructor() ERC721("Wine", "WNE") {}

    //Cellar functions

    function mint(
        string memory _name,
        string memory _description,
        string memory _tokenURI
    ) public onlyCellar returns (uint256) {
        _tokenIds.increment();

        uint newItemId =_tokenIds.current();
        //Token count increment before creation to avoid index 0
        Token memory token = Token({        
            id:newItemId,
            name: _name,
            description: _description,
            tokenURI: _tokenURI,
            mintedAt: block.timestamp,
            isAvailable: true
        });
        idToToken[newItemId] = token;
        tokens.push(token);

        super._mint(msg.sender, newItemId);
        super._setTokenURI(newItemId, _tokenURI);

        ownedTokensByAddress[msg.sender].push(newItemId);

        emit LogTokenCreate(
            newItemId,
            _name,
            _description,
            _tokenURI,
            block.timestamp,
            msg.sender
        );

        return newItemId;
    }

    //getTokens funciona bien en Remix. Probar hacer deploy en Ropsten para ver como llegan los datos en React
    //Luego seguir con transfer/sell token. Problema = Como modifico items del array ownedTokensByAddress.

    function getTokens() public view returns (Token[] memory) {
        uint256[] memory ownedTokens = getTokenIDsByAddress(msg.sender);
        Token[] memory tokenArray = new Token[](ownedTokens.length);
        uint counter = 0;

        for(uint i=0; i < ownedTokens.length; i++){
            tokenArray[counter].id = idToToken[ownedTokens[i]].id;
            tokenArray[counter].name = idToToken[ownedTokens[i]].name;
            tokenArray[counter].description =idToToken[ownedTokens[i]].description;
            tokenArray[counter].tokenURI =idToToken[ownedTokens[i]].tokenURI;
            tokenArray[counter].mintedAt = idToToken[ownedTokens[i]].mintedAt;
            tokenArray[counter].isAvailable = idToToken[ownedTokens[i]].isAvailable;
            counter++;
        }
        return tokenArray;
    }

    // function transferToken(
    //     uint256 _tokenId,
    //     address _from,
    //     address _to
    // ) public onlyCellar returns (uint256) {
    //    idToToken[_tokenId].currentOwner = _to;

    //     uint256[] memory currentOwnerTokens = getTokenIDsByAddress(_from);
    //     uint256[] memory newOwnerTokens = getTokenIDsByAddress(_to);

    //     for(uint i=0; i < currentOwnerTokens.length; i++){
    //         tokenArray[counter].id = idToToken[currentOwnerTokens[i]].id;
    //         tokenArray[counter].name = idToToken[currentOwnerTokens[i]].name;
    //         tokenArray[counter].description =idToToken[currentOwnerTokens[i]].description;
    //         tokenArray[counter].tokenURI =idToToken[currentOwnerTokens[i]].tokenURI;
    //         tokenArray[counter].mintedAt = idToToken[currentOwnerTokens[i]].mintedAt;
    //         tokenArray[counter].isAvailable = idToToken[currentOwnerTokens[i]].isAvailable;
    //         counter++;
    //     }
    //     emit LogTokenTransfer(_tokenId, _from, _to);
    //     return _tokenId;
    // }

    // //Cellar - Shop

    // function sellToken(
    //     uint256 _tokenId,
    //     address _from,
    //     address _to
    // ) public onlyShop onlyCellar returns (uint256) {
    //     tokens[_tokenId].isAvailable = false;
    //     tokens[_tokenId].currentOwner = _to;
    //     emit LogTokenSold(_tokenId, _from, _to);
    //     return _tokenId;
    // }


    function getTokenIDsByAddress(address _address) public view returns (uint256 [] memory) {
        return ownedTokensByAddress[_address];
    }

    //As both ERC721 and AccessControl include supportsInterface we need to override both
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
