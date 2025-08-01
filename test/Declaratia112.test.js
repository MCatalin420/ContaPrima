const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Declaratia112", function () {
  let declaratia112;
  let owner;
  let firma1;
  let firma2;
  let firma3;

  beforeEach(async function () {
    // Get signers
    [owner, firma1, firma2, firma3] = await ethers.getSigners();

    // Deploy the contract
    const Declaratia112 = await ethers.getContractFactory("Declaratia112");
    declaratia112 = await Declaratia112.deploy();
    await declaratia112.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should deploy successfully", async function () {
      expect(declaratia112.target).to.be.properAddress;
    });

    it("Should have correct initial state", async function () {
      // Check that initial amounts are zero
      expect(await declaratia112.firmaAmount(firma1.address)).to.equal(0);
      expect(await declaratia112.firmaAmount(firma2.address)).to.equal(0);
    });
  });

  describe("payForDeclaratia112", function () {
    it("Should allow payment for a firm", async function () {
      const amount = ethers.parseEther("100");
      
      await declaratia112.payForDeclaratia112(firma1.address, amount);
      
      expect(await declaratia112.firmaAmount(firma1.address)).to.equal(amount);
    });

    it("Should accumulate payments for the same firm", async function () {
      const amount1 = ethers.parseEther("50");
      const amount2 = ethers.parseEther("75");
      
      await declaratia112.payForDeclaratia112(firma1.address, amount1);
      await declaratia112.payForDeclaratia112(firma1.address, amount2);
      
      expect(await declaratia112.firmaAmount(firma1.address)).to.equal(amount1 + amount2);
    });

    it("Should handle multiple firms independently", async function () {
      const amount1 = ethers.parseEther("100");
      const amount2 = ethers.parseEther("200");
      
      await declaratia112.payForDeclaratia112(firma1.address, amount1);
      await declaratia112.payForDeclaratia112(firma2.address, amount2);
      
      expect(await declaratia112.firmaAmount(firma1.address)).to.equal(amount1);
      expect(await declaratia112.firmaAmount(firma2.address)).to.equal(amount2);
    });

    it("Should handle zero amount", async function () {
      await declaratia112.payForDeclaratia112(firma1.address, 0);
      
      expect(await declaratia112.firmaAmount(firma1.address)).to.equal(0);
    });

    it("Should handle large amounts", async function () {
      const largeAmount = ethers.parseEther("1000000");
      
      await declaratia112.payForDeclaratia112(firma1.address, largeAmount);
      
      expect(await declaratia112.firmaAmount(firma1.address)).to.equal(largeAmount);
    });

    it("Should allow anyone to call the function", async function () {
      const amount = ethers.parseEther("100");
      
      // Call from different signer
      await declaratia112.connect(firma1).payForDeclaratia112(firma2.address, amount);
      
      expect(await declaratia112.firmaAmount(firma2.address)).to.equal(amount);
    });

    it("Should handle multiple payments in sequence", async function () {
      const amounts = [
        ethers.parseEther("10"),
        ethers.parseEther("20"),
        ethers.parseEther("30"),
        ethers.parseEther("40")
      ];
      
      let total = 0n;
      for (let i = 0; i < amounts.length; i++) {
        await declaratia112.payForDeclaratia112(firma1.address, amounts[i]);
        total += amounts[i];
        expect(await declaratia112.firmaAmount(firma1.address)).to.equal(total);
      }
    });
  });

  describe("firmaAmount mapping", function () {
    it("Should return zero for unregistered firms", async function () {
      expect(await declaratia112.firmaAmount(firma3.address)).to.equal(0);
    });

    it("Should persist amounts across transactions", async function () {
      const amount = ethers.parseEther("150");
      
      await declaratia112.payForDeclaratia112(firma1.address, amount);
      
      // Check immediately after
      expect(await declaratia112.firmaAmount(firma1.address)).to.equal(amount);
      
      // Check after some time (simulate block mining)
      await ethers.provider.send("evm_mine", []);
      expect(await declaratia112.firmaAmount(firma1.address)).to.equal(amount);
    });
  });

  describe("Edge cases", function () {
    it("Should handle maximum uint256 values", async function () {
      const maxAmount = ethers.MaxUint256;
      
      await declaratia112.payForDeclaratia112(firma1.address, maxAmount);
      
      expect(await declaratia112.firmaAmount(firma1.address)).to.equal(maxAmount);
    });

    it("Should handle address(0)", async function () {
      const amount = ethers.parseEther("100");
      
      await declaratia112.payForDeclaratia112(ethers.ZeroAddress, amount);
      
      expect(await declaratia112.firmaAmount(ethers.ZeroAddress)).to.equal(amount);
    });
  });

  describe("Gas optimization", function () {
    it("Should use reasonable gas for payments", async function () {
      const amount = ethers.parseEther("100");
      
      const tx = await declaratia112.payForDeclaratia112(firma1.address, amount);
      const receipt = await tx.wait();
      
      // Gas should be reasonable (less than 100k for simple operation)
      expect(receipt.gasUsed).to.be.lessThan(100000);
    });
  });
}); 