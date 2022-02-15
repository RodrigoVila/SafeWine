// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.0;

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
        require(!checkIfCellarExist(), "Cellar Already Exist");
        cellars[msg.sender].name = _name;
        cellars[msg.sender].description = _description;
        _setupRole(CELLAR_ROLE, msg.sender);
        return getCurrentCellar();
    }

    function addNewShop(string memory _name, string memory _description)
        public
        returns (Shop memory)
    {
        require(!checkIfShopExist(), "Shop Already Exist");
        shops[msg.sender].name = _name;
        shops[msg.sender].description = _description;
        _setupRole(SHOP_ROLE, msg.sender);
        return getCurrentShop();
    }

    function getCurrentCellar() public view returns (Cellar memory) {
        return cellars[msg.sender];
    }

    function getCurrentShop() public view returns (Shop memory) {
        return shops[msg.sender];
    }

    function checkIfCellarExist() public view returns (bool) {
        return bytes(cellars[msg.sender].name).length > 0;
    }

    function checkIfShopExist() public view returns (bool) {
        return bytes(shops[msg.sender].name).length > 0;
    }

    function getSender() public view returns (address) {
        return msg.sender;
    }
}
