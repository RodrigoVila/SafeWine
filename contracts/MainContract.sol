// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract MainContract is AccessControl {
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

    mapping(address => Cellar) public cellars;
    mapping(address => Shop) public shops;

    modifier onlyCellar() {
        require(hasRole(CELLAR_ROLE, msg.sender), "Only Cellar");
        _;
    }

    modifier onlyShop() {
        require(hasRole(SHOP_ROLE, msg.sender), "Only Shop");
        _;
    }

    function addNewCellar(string memory _name, string memory _description)
        public
        returns (Cellar memory)
    {
        require(!checkIfCellarExist(msg.sender), "Cellar Already Exist");
        cellars[msg.sender].name = _name;
        cellars[msg.sender].description = _description;
        _setupRole(CELLAR_ROLE, msg.sender);
        return getCellarByAddress(msg.sender);
    }

    function addNewShop(string memory _name, string memory _description)
        public
        returns (Shop memory)
    {
        require(!checkIfShopExist(msg.sender), "Shop Already Exist");
        shops[msg.sender].name = _name;
        shops[msg.sender].description = _description;
        _setupRole(SHOP_ROLE, msg.sender);
        return getShopByAddress(msg.sender);
    }

    function getCellarByAddress(address _address)
        public
        view
        returns (Cellar memory)
    {
        return cellars[_address];
    }

    function getShopByAddress(address _address)
        public
        view
        returns (Shop memory)
    {
        return shops[_address];
    }

    function checkIfCellarExist(address _address) public view returns (bool) {
        return bytes(cellars[_address].name).length > 0;
    }

    function checkIfShopExist(address _address) public view returns (bool) {
        return bytes(shops[_address].name).length > 0;
    }
    
}
