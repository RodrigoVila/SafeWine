// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./MainContract.sol";

contract SWToken is ERC721URIStorage, Ownable, MainContract {
    using Counters for Counters.Counter;

    //Variables
    Counters.Counter private _tokenIds;
    Token[] public tokens;
    mapping(uint256 => string) private tokenURIs;
    mapping(uint256 => address) private tokenToOwner;
    mapping(address => uint256) private ownedTokensCount;
    mapping(address => bool) public isAvailable;
    mapping(address => mapping(address => bool)) private _operatorApprovals; // ??
    mapping(uint256 => Transaction[]) private TokenTransactions;

    //Structs
    struct Token {
        uint256 id;
        string title;
        string description;
        string mintedAt;
        address currentOwner;
        string tokenURI;
        bool isAvailable;
    }

    struct Transaction {
        uint256 id;
        address seller;
        address buyer;
        uint256 txnDate;
        uint256 status;
    }

    //Events
    event LogTokenSold(uint256 tokenId, address currentOwner, address newOwner);

    event LogTokenCreate(
        address mintedBy,
        uint256 tokenId,
        string title,
        string description,
        string mintedAt,
        string tokenURI
    );

    event LogTokenTransfer(uint256 _tokenId, address _from, address _to);

    //Constructor
    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {}

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

    //Functions
    function mint(
        string memory _title,
        string memory _description,
        string memory _mintedAt,
        string memory _tokenURI
    ) public payable onlyCellar returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();

        Token memory newToken = Token({
            id: newItemId,
            title: _title,
            description: _description,
            mintedAt: _mintedAt,
            currentOwner: msg.sender,
            tokenURI: _tokenURI,
            isAvailable: true
        });
        tokens.push(newToken);
        _setTokenURI(newItemId, _tokenURI);
        _mint(msg.sender, newItemId);
        tokenToOwner[newItemId] = msg.sender;

        emit LogTokenCreate(
            msg.sender,
            newItemId,
            _title,
            _description,
            _mintedAt,
            _tokenURI
        );

        return newItemId;
    }

    function sellToken(
        uint256 _tokenId,
        address _from,
        address _to
    ) public returns (uint256) {
        emit LogTokenSold(_tokenId, _from, _to);

        return _tokenId;
    }

    function transferToken(
        uint256 _tokenId,
        address _from,
        address _to
    ) public returns (uint256) {
        emit LogTokenTransfer(_tokenId, _from, _to);

        return _tokenId;
    }

    function getTokensByAddress(address _address)
        public
        returns (Token[] memory)
    {}
}
