const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarketplace", function () {
  let NFTMarketplace;
  let nftMarketplace;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    nftMarketplace = await NFTMarketplace.deploy();
    await nftMarketplace.deployed();
  });

  describe("minting NFTs", function () {
    it('should pass the listing price', async () => {
      const initialListingPrice = await nftMarketplace.listingPrice();
      console.log("Initial Listing Price: ", initialListingPrice.toString());
      console.log("Expected Listing Price: ", ethers.utils.parseEther("0.0001").toString());
      expect(initialListingPrice.toString()).to.equal(ethers.utils.parseEther("0.0001").toString());
    });
  });
});
