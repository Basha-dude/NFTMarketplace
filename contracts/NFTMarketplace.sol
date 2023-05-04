// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Uncomment this line to use console.log
   //import "hardhat/console.sol";

contract NFTMarketplace is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    
     uint256 public  listingPrice = 0.0001 ether;
     address payable public  owner;
      uint256 public newTokenId;


     mapping (uint256 => MarketItem ) private  idToMarketItem;

     struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
     }

     event MarketItemCreated (
        uint256 indexed tokenId,
        address  seller,
        address  owner,
        uint256 price,
        bool sold
     );

     modifier onlyOwner {
        require(msg.sender == owner,
        "only owner can change"
        );
        _;
     }



    constructor () ERC721("Metaverse Tokens", "METT") {
        owner = payable(msg.sender);
    }

    function updatingListingPrice(uint256 _listingPrice) public  onlyOwner  {
      require(owner == msg.sender);
        listingPrice = _listingPrice;
    }
   function getListingPrice() public view returns (uint256 ) {
         return listingPrice;
   }
   function createToken(string  memory tokenURI, uint256 price)   public returns(uint256)  {
         _tokenIds.increment(); 
           newTokenId = _tokenIds.current();
         _mint(msg.sender,newTokenId);
         _setTokenURI(newTokenId, tokenURI);
         createMarketItem(newTokenId,price);
         return newTokenId;
      
   }

   function createMarketItem( uint256 tokenId, uint256 price ) public {
      
   }

   
    
}
