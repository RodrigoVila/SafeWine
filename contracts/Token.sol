// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Token is ERC721 {

    struct Bottle {
        address mintedBy;
        uint64 mintedAt;
        string name;
        string description;
        address currentOwner;
        string imgHash;
        bool available;
    }

    mapping (address => Bottle) public bottleList;

    // mapping(string => bool) _bottleExists;

    constructor() ERC721("Wine", "WINE") {}


// ERC721 and AccessControl includes "supportsInterface" so in order to commpile we need to override it. 
// https://forum.openzeppelin.com/t/derived-contract-must-override-function-supportsinterface/6315

    // function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
    //     return super.supportsInterface(interfaceId);
    // }


    // function getBottleInfo(uint _tokenid) public view returns(Bottle memory) {
    //     return  bottleList[_tokenid];
    // }

    function mint(string memory brand, string memory model) public {
//         address newBottle = address(new WineAsset(brand, model, msg.sender));            
//         require(!_bottleExist[newBottle]);
//         uint _id = wineList.push(newBottle);
//         _mint(msg.sender, _id);
//         _bottleExists[newBottle] = true;
    }
}
