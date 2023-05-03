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

  describe("minting NFTs", () => {
   
      it('should pass the listing price', async () => {
        const initialListingPrice = await nftMarketplace.listingPrice();
        console.log("Initial Listing Price is not string: ", initialListingPrice);
        console.log("Initial Listing Price: ", initialListingPrice.toString());
        console.log("Expected Listing Price: ", ethers.utils.parseEther("0.0001").toString());
        expect(initialListingPrice.toString()).to.equal(ethers.utils.parseEther("0.0001").toString());
      
    })
  })
  describe("for owner in constructor", () => {
    it("Should set the owner address correctly", async  () => {
      expect(await nftMarketplace.owner()).to.equal(owner.address);
    });
    })
    
    describe("Updating listing price", () => {
      let transaction, result,listingPrice
      describe("Success",() => {
        beforeEach(async () => {
          listingPrice = ethers.utils.parseEther("0.0002")
          transaction = await nftMarketplace.updatingListingPrice(listingPrice)
          result = await transaction.wait()
          
        })
  
        it("should update the listing price",async () => {
          expect(await nftMarketplace.listingPrice()).to.equal(ethers.utils.parseEther("0.0002"))
          console.log("Initial Listing Price: ", listingPrice.toString());
          console.log("Expected Listing Price: ", ethers.utils.parseEther("0.0002"));
        })
      })

       describe("Failure", async () => {
        it("should revert if called by a non-owner", async () => {
          await expect(nftMarketplace.connect(addr1).updatingListingPrice(listingPrice)).to.be.revertedWith("only owner can change");
        });
      })
       describe('Get listing price function', () => { 
        let transaction
        beforeEach(async ()=> {
          transaction = await nftMarketplace.getListingPrice()
          
        }) 
        it("should pass the get listing price",async () => {
          expect( await nftMarketplace.getListingPrice()).to.equal(await nftMarketplace.listingPrice())
          console.log("GETTING PRICE :",transaction)
          console.log("RETURN LISTING  PRICE :",await nftMarketplace.listingPrice())

        })

       })
    })
  })


