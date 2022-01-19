// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract MainContract is AccessControl {

    // struct Bottle {
    //     address mintedBy;
    //     uint64 mintedAt;
    //     string name;
    //     string description;
    //     address currentOwner;
    //     string imgHash;
    //     bool available;
    // }

    struct Cellar {
        string name;
        string description;
    }

    struct Shop {
        string name;
        string description;
    }

    bytes32 public constant CELLAR_ROLE = keccak256("CELLAR_ROLE");
    bytes32 public constant SHOP_ROLE = keccak256("SHOP_ROLE");

    mapping (address => Cellar) public cellars;
    mapping (address => Shop) public shops;

    // Bottle[] bottleList;
    // mapping(string => bool) _bottleExists;

    // constructor() ERC721("Wine", "WINE") {}


    modifier onlyCellar() {
        require(hasRole(CELLAR_ROLE, msg.sender), "Only Cellar");
        _;
    }

    modifier onlyShop() {
        require(hasRole(SHOP_ROLE, msg.sender), "Only Shop");
        _;
    }

// ERC721 and AccessControl includes "supportsInterface" so in order to commpile we need to override it. 
// https://forum.openzeppelin.com/t/derived-contract-must-override-function-supportsinterface/6315

    // function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
    //     return super.supportsInterface(interfaceId);
    // }

    function addNewCellar(string memory _name, string memory _description) public returns(bool) {
        cellars[msg.sender].name = _name;
        cellars[msg.sender].description = _description;
        _setupRole(CELLAR_ROLE, msg.sender);
        return true;
    }

    function addNewShop(string memory _name, string memory _description) public returns(bool) {
        shops[msg.sender].name = _name;
        shops[msg.sender].description = _description;
        _setupRole(SHOP_ROLE, msg.sender);
        return true;
    }

    function getCellarByAddress(address _address) public view returns(Cellar memory){
        return cellars[_address];
    }

    function getCellar() public view returns(Cellar memory){
        return cellars[msg.sender];
    }

    // function getBottleInfo(uint _tokenid) public view returns(Bottle memory) {
    //     return  bottleList[_tokenid];
    // }

//     function mint(string memory brand, string memory model) public {
//         address newBottle = address(new WineAsset(brand, model, msg.sender));            
//         require(!_bottleExist[newBottle]);
//         uint _id = wineList.push(newBottle);
//         _mint(msg.sender, _id);
//         _bottleExists[newBottle] = true;
//    }
}
