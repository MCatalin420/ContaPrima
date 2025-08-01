const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("All Declaratia Contracts", function () {
  let declaratia112, declaratia300, declaratia394, declartia100;
  let owner, firma1, firma2, firma3, firma4;

  beforeEach(async function () {
    // Get signers
    [owner, firma1, firma2, firma3, firma4] = await ethers.getSigners();

    // Deploy all contracts
    const Declaratia112 = await ethers.getContractFactory("Declaratia112");
    const Declaratia300 = await ethers.getContractFactory("Declaratia300");
    const Declaratia394 = await ethers.getContractFactory("Declaratia394");
    const Declartia100 = await ethers.getContractFactory("Declartia100");

    declaratia112 = await Declaratia112.deploy();
    declaratia300 = await Declaratia300.deploy();
    declaratia394 = await Declaratia394.deploy();
    declartia100 = await Declartia100.deploy();

    await declaratia112.waitForDeployment();
    await declaratia300.waitForDeployment();
    await declaratia394.waitForDeployment();
    await declartia100.waitForDeployment();
  });

  describe("Contract Deployment", function () {
    it("Should deploy all contracts successfully", async function () {
      expect(declaratia112.target).to.be.properAddress;
      expect(declaratia300.target).to.be.properAddress;
      expect(declaratia394.target).to.be.properAddress;
      expect(declartia100.target).to.be.properAddress;
    });

    it("Should have different contract addresses", async function () {
      const addresses = [
        declaratia112.target,
        declaratia300.target,
        declaratia394.target,
        declartia100.target
      ];
      
      // Check that all addresses are unique
      const uniqueAddresses = new Set(addresses);
      expect(uniqueAddresses.size).to.equal(4);
    });
  });

  describe("Cross-Contract Functionality", function () {
    it("Should handle payments across all contracts for the same firm", async function () {
      const amounts = [
        ethers.parseEther("100"),
        ethers.parseEther("200"),
        ethers.parseEther("300"),
        ethers.parseEther("400")
      ];

      // Pay for the same firm across all contracts
      await declaratia112.payForDeclaratia112(firma1.address, amounts[0]);
      await declaratia300.payForDeclaratia300(firma1.address, amounts[1]);
      await declaratia394.payForDeclaratia394(firma1.address, amounts[2]);
      await declartia100.payForDeclartia100(firma1.address, amounts[3]);

      // Verify amounts in each contract
      expect(await declaratia112.firmaAmount(firma1.address)).to.equal(amounts[0]);
      expect(await declaratia300.firmaAmount(firma1.address)).to.equal(amounts[1]);
      expect(await declaratia394.firmaAmount(firma1.address)).to.equal(amounts[2]);
      expect(await declartia100.firmaAmount(firma1.address)).to.equal(amounts[3]);
    });

    it("Should handle multiple firms across all contracts", async function () {
      const firmData = [
        { firm: firma1, amount: ethers.parseEther("100") },
        { firm: firma2, amount: ethers.parseEther("200") },
        { firm: firma3, amount: ethers.parseEther("300") },
        { firm: firma4, amount: ethers.parseEther("400") }
      ];

      // Assign each firm to a different contract
      await declaratia112.payForDeclaratia112(firmData[0].firm.address, firmData[0].amount);
      await declaratia300.payForDeclaratia300(firmData[1].firm.address, firmData[1].amount);
      await declaratia394.payForDeclaratia394(firmData[2].firm.address, firmData[2].amount);
      await declartia100.payForDeclartia100(firmData[3].firm.address, firmData[3].amount);

      // Verify each firm's amount in their respective contract
      expect(await declaratia112.firmaAmount(firmData[0].firm.address)).to.equal(firmData[0].amount);
      expect(await declaratia300.firmaAmount(firmData[1].firm.address)).to.equal(firmData[1].amount);
      expect(await declaratia394.firmaAmount(firmData[2].firm.address)).to.equal(firmData[2].amount);
      expect(await declartia100.firmaAmount(firmData[3].firm.address)).to.equal(firmData[3].amount);
    });
  });

  describe("Contract Isolation", function () {
    it("Should maintain separate state for each contract", async function () {
      const amount = ethers.parseEther("100");

      // Pay the same amount to the same firm in all contracts
      await declaratia112.payForDeclaratia112(firma1.address, amount);
      await declaratia300.payForDeclaratia300(firma1.address, amount);
      await declaratia394.payForDeclaratia394(firma1.address, amount);
      await declartia100.payForDeclartia100(firma1.address, amount);

      // Each contract should have the amount independently
      expect(await declaratia112.firmaAmount(firma1.address)).to.equal(amount);
      expect(await declaratia300.firmaAmount(firma1.address)).to.equal(amount);
      expect(await declaratia394.firmaAmount(firma1.address)).to.equal(amount);
      expect(await declartia100.firmaAmount(firma1.address)).to.equal(amount);

      // Add more to one contract and verify others remain unchanged
      await declaratia112.payForDeclaratia112(firma1.address, amount);
      
      expect(await declaratia112.firmaAmount(firma1.address)).to.equal(amount * 2n);
      expect(await declaratia300.firmaAmount(firma1.address)).to.equal(amount);
      expect(await declaratia394.firmaAmount(firma1.address)).to.equal(amount);
      expect(await declartia100.firmaAmount(firma1.address)).to.equal(amount);
    });
  });

  describe("Gas Efficiency Comparison", function () {
    it("Should use similar gas across all contracts", async function () {
      const amount = ethers.parseEther("100");
      const gasUsed = [];

      // Test gas usage for each contract
      const tx1 = await declaratia112.payForDeclaratia112(firma1.address, amount);
      const receipt1 = await tx1.wait();
      gasUsed.push(receipt1.gasUsed);

      const tx2 = await declaratia300.payForDeclaratia300(firma2.address, amount);
      const receipt2 = await tx2.wait();
      gasUsed.push(receipt2.gasUsed);

      const tx3 = await declaratia394.payForDeclaratia394(firma3.address, amount);
      const receipt3 = await tx3.wait();
      gasUsed.push(receipt3.gasUsed);

      const tx4 = await declartia100.payForDeclartia100(firma4.address, amount);
      const receipt4 = await tx4.wait();
      gasUsed.push(receipt4.gasUsed);

      // All should use reasonable gas (less than 100k)
      gasUsed.forEach(gas => {
        expect(gas).to.be.lessThan(100000);
      });

      // Gas usage should be similar across contracts (within 20% of each other)
      const avgGas = gasUsed.reduce((a, b) => a + b, 0n) / 4n;
      gasUsed.forEach(gas => {
        const diff = gas > avgGas ? gas - avgGas : avgGas - gas;
        const percentage = (Number(diff) / Number(avgGas)) * 100;
        expect(percentage).to.be.lessThan(20);
      });
    });
  });

  describe("Stress Testing", function () {
    it("Should handle multiple concurrent operations", async function () {
      const firms = [firma1, firma2, firma3, firma4];
      const contracts = [declaratia112, declaratia300, declaratia394, declartia100];
      const functions = [
        'payForDeclaratia112',
        'payForDeclaratia300', 
        'payForDeclaratia394',
        'payForDeclartia100'
      ];

      // Create multiple transactions
      const promises = [];
      for (let i = 0; i < 4; i++) {
        const amount = ethers.parseEther((100 + i * 50).toString());
        const contract = contracts[i];
        const firm = firms[i];
        
        promises.push(contract[functions[i]](firm.address, amount));
      }

      // Execute all transactions
      await Promise.all(promises);

      // Verify all amounts are correct
      for (let i = 0; i < 4; i++) {
        const expectedAmount = ethers.parseEther((100 + i * 50).toString());
        const actualAmount = await contracts[i].firmaAmount(firms[i].address);
        expect(actualAmount).to.equal(expectedAmount);
      }
    });
  });

  describe("Error Handling", function () {
    it("Should handle invalid function calls gracefully", async function () {
      // These should not throw errors but should not affect state
      const amount = ethers.parseEther("100");
      
      // Try to call with zero address
      await declaratia112.payForDeclaratia112(ethers.ZeroAddress, amount);
      expect(await declaratia112.firmaAmount(ethers.ZeroAddress)).to.equal(amount);

      // Try to call with zero amount
      await declaratia300.payForDeclaratia300(firma1.address, 0);
      expect(await declaratia300.firmaAmount(firma1.address)).to.equal(0);
    });
  });

  describe("Integration Scenarios", function () {
    it("Should simulate real-world usage patterns", async function () {
      // Simulate a scenario where multiple firms pay for different declarations
      const scenarios = [
        { firm: firma1, contract: declaratia112, amount: ethers.parseEther("150") },
        { firm: firma2, contract: declaratia300, amount: ethers.parseEther("250") },
        { firm: firma3, contract: declaratia394, amount: ethers.parseEther("350") },
        { firm: firma4, contract: declartia100, amount: ethers.parseEther("450") },
        { firm: firma1, contract: declaratia300, amount: ethers.parseEther("100") }, // Same firm, different contract
        { firm: firma2, contract: declaratia394, amount: ethers.parseEther("200") },
      ];

      // Execute all scenarios
      for (const scenario of scenarios) {
        if (scenario.contract === declaratia112) {
          await scenario.contract.payForDeclaratia112(scenario.firm.address, scenario.amount);
        } else if (scenario.contract === declaratia300) {
          await scenario.contract.payForDeclaratia300(scenario.firm.address, scenario.amount);
        } else if (scenario.contract === declaratia394) {
          await scenario.contract.payForDeclaratia394(scenario.firm.address, scenario.amount);
        } else if (scenario.contract === declartia100) {
          await scenario.contract.payForDeclartia100(scenario.firm.address, scenario.amount);
        }
      }

      // Verify final amounts
      expect(await declaratia112.firmaAmount(firma1.address)).to.equal(ethers.parseEther("150"));
      expect(await declaratia300.firmaAmount(firma1.address)).to.equal(ethers.parseEther("100"));
      expect(await declaratia300.firmaAmount(firma2.address)).to.equal(ethers.parseEther("250"));
      expect(await declaratia394.firmaAmount(firma2.address)).to.equal(ethers.parseEther("200"));
      expect(await declaratia394.firmaAmount(firma3.address)).to.equal(ethers.parseEther("350"));
      expect(await declartia100.firmaAmount(firma4.address)).to.equal(ethers.parseEther("450"));
    });
  });
}); 