const { expect } = require("chai");
const { ethers } = require("hardhat");

// Test Declaratia112 contract
async function testDeclaratia112() {
  console.log("\n🧪 Testing Declaratia112 contract...");
  
  try {
    const [owner, firma1, firma2] = await ethers.getSigners();
    
    // Deploy contract
    const Declaratia112 = await ethers.getContractFactory("Declaratia112");
    const declaratia112 = await Declaratia112.deploy();
    await declaratia112.waitForDeployment();
    
    // Test deployment
    expect(declaratia112.target).to.be.properAddress;
    
    // Test initial state
    expect(await declaratia112.firmaAmount(firma1.address)).to.equal(0);
    
    // Test payment functionality
    const amount = ethers.parseEther("100");
    await declaratia112.payForDeclaratia112(firma1.address, amount);
    expect(await declaratia112.firmaAmount(firma1.address)).to.equal(amount);
    
    // Test accumulation
    const amount2 = ethers.parseEther("50");
    await declaratia112.payForDeclaratia112(firma1.address, amount2);
    expect(await declaratia112.firmaAmount(firma1.address)).to.equal(amount + amount2);
    
    // Test multiple firms
    await declaratia112.payForDeclaratia112(firma2.address, amount);
    expect(await declaratia112.firmaAmount(firma2.address)).to.equal(amount);
    
    console.log("✅ Declaratia112 tests passed");
    return true;
  } catch (error) {
    console.error("❌ Declaratia112 test failed:", error.message);
    return false;
  }
}

// Test Declaratia300 contract
async function testDeclaratia300() {
  console.log("\n🧪 Testing Declaratia300 contract...");
  
  try {
    const [owner, firma1, firma2] = await ethers.getSigners();
    
    // Deploy contract
    const Declaratia300 = await ethers.getContractFactory("Declaratia300");
    const declaratia300 = await Declaratia300.deploy();
    await declaratia300.waitForDeployment();
    
    // Test deployment
    expect(declaratia300.target).to.be.properAddress;
    
    // Test initial state
    expect(await declaratia300.firmaAmount(firma1.address)).to.equal(0);
    
    // Test payment functionality
    const amount = ethers.parseEther("200");
    await declaratia300.payForDeclaratia300(firma1.address, amount);
    expect(await declaratia300.firmaAmount(firma1.address)).to.equal(amount);
    
    // Test accumulation
    const amount2 = ethers.parseEther("75");
    await declaratia300.payForDeclaratia300(firma1.address, amount2);
    expect(await declaratia300.firmaAmount(firma1.address)).to.equal(amount + amount2);
    
    // Test multiple firms
    await declaratia300.payForDeclaratia300(firma2.address, amount);
    expect(await declaratia300.firmaAmount(firma2.address)).to.equal(amount);
    
    console.log("✅ Declaratia300 tests passed");
    return true;
  } catch (error) {
    console.error("❌ Declaratia300 test failed:", error.message);
    return false;
  }
}

// Test Declaratia394 contract
async function testDeclaratia394() {
  console.log("\n🧪 Testing Declaratia394 contract...");
  
  try {
    const [owner, firma1, firma2] = await ethers.getSigners();
    
    // Deploy contract
    const Declaratia394 = await ethers.getContractFactory("Declaratia394");
    const declaratia394 = await Declaratia394.deploy();
    await declaratia394.waitForDeployment();
    
    // Test deployment
    expect(declaratia394.target).to.be.properAddress;
    
    // Test initial state
    expect(await declaratia394.firmaAmount(firma1.address)).to.equal(0);
    
    // Test payment functionality
    const amount = ethers.parseEther("300");
    await declaratia394.payForDeclaratia394(firma1.address, amount);
    expect(await declaratia394.firmaAmount(firma1.address)).to.equal(amount);
    
    // Test accumulation
    const amount2 = ethers.parseEther("100");
    await declaratia394.payForDeclaratia394(firma1.address, amount2);
    expect(await declaratia394.firmaAmount(firma1.address)).to.equal(amount + amount2);
    
    // Test multiple firms
    await declaratia394.payForDeclaratia394(firma2.address, amount);
    expect(await declaratia394.firmaAmount(firma2.address)).to.equal(amount);
    
    console.log("✅ Declaratia394 tests passed");
    return true;
  } catch (error) {
    console.error("❌ Declaratia394 test failed:", error.message);
    return false;
  }
}

// Test Declartia100 contract
async function testDeclartia100() {
  console.log("\n🧪 Testing Declartia100 contract...");
  
  try {
    const [owner, firma1, firma2] = await ethers.getSigners();
    
    // Deploy contract
    const Declartia100 = await ethers.getContractFactory("Declartia100");
    const declartia100 = await Declartia100.deploy();
    await declartia100.waitForDeployment();
    
    // Test deployment
    expect(declartia100.target).to.be.properAddress;
    
    // Test initial state
    expect(await declartia100.firmaAmount(firma1.address)).to.equal(0);
    
    // Test payment functionality
    const amount = ethers.parseEther("400");
    await declartia100.payForDeclartia100(firma1.address, amount);
    expect(await declartia100.firmaAmount(firma1.address)).to.equal(amount);
    
    // Test accumulation
    const amount2 = ethers.parseEther("125");
    await declartia100.payForDeclartia100(firma1.address, amount2);
    expect(await declartia100.firmaAmount(firma1.address)).to.equal(amount + amount2);
    
    // Test multiple firms
    await declartia100.payForDeclartia100(firma2.address, amount);
    expect(await declartia100.firmaAmount(firma2.address)).to.equal(amount);
    
    console.log("✅ Declartia100 tests passed");
    return true;
  } catch (error) {
    console.error("❌ Declartia100 test failed:", error.message);
    return false;
  }
}

// Test all contracts together
async function testAllContracts() {
  console.log("\n🧪 Testing all contracts together...");
  
  try {
    const [owner, firma1, firma2, firma3, firma4] = await ethers.getSigners();
    
    // Deploy all contracts
    const Declaratia112 = await ethers.getContractFactory("Declaratia112");
    const Declaratia300 = await ethers.getContractFactory("Declaratia300");
    const Declaratia394 = await ethers.getContractFactory("Declaratia394");
    const Declartia100 = await ethers.getContractFactory("Declartia100");
    
    const declaratia112 = await Declaratia112.deploy();
    const declaratia300 = await Declaratia300.deploy();
    const declaratia394 = await Declaratia394.deploy();
    const declartia100 = await Declartia100.deploy();
    
    await declaratia112.waitForDeployment();
    await declaratia300.waitForDeployment();
    await declaratia394.waitForDeployment();
    await declartia100.waitForDeployment();
    
    // Test that all contracts have different addresses
    const addresses = [
      declaratia112.target,
      declaratia300.target,
      declaratia394.target,
      declartia100.target
    ];
    const uniqueAddresses = new Set(addresses);
    expect(uniqueAddresses.size).to.equal(4);
    
    // Test cross-contract functionality
    const amounts = [
      ethers.parseEther("100"),
      ethers.parseEther("200"),
      ethers.parseEther("300"),
      ethers.parseEther("400")
    ];
    
    await declaratia112.payForDeclaratia112(firma1.address, amounts[0]);
    await declaratia300.payForDeclaratia300(firma1.address, amounts[1]);
    await declaratia394.payForDeclaratia394(firma1.address, amounts[2]);
    await declartia100.payForDeclartia100(firma1.address, amounts[3]);
    
    // Verify amounts in each contract
    expect(await declaratia112.firmaAmount(firma1.address)).to.equal(amounts[0]);
    expect(await declaratia300.firmaAmount(firma1.address)).to.equal(amounts[1]);
    expect(await declaratia394.firmaAmount(firma1.address)).to.equal(amounts[2]);
    expect(await declartia100.firmaAmount(firma1.address)).to.equal(amounts[3]);
    
    console.log("✅ All contracts integration tests passed");
    return true;
  } catch (error) {
    console.error("❌ All contracts test failed:", error.message);
    return false;
  }
}

// Main test runner
async function runComprehensiveTests() {
  console.log("🚀 Starting comprehensive test suite for all Declaratia contracts...\n");
  
  const results = [];
  
  // Run individual contract tests
  const test112Result = await testDeclaratia112();
  results.push({ name: "Declaratia112", passed: test112Result });
  
  const test300Result = await testDeclaratia300();
  results.push({ name: "Declaratia300", passed: test300Result });
  
  const test394Result = await testDeclaratia394();
  results.push({ name: "Declaratia394", passed: test394Result });
  
  const test100Result = await testDeclartia100();
  results.push({ name: "Declartia100", passed: test100Result });
  
  // Run integration tests
  const allContractsResult = await testAllContracts();
  results.push({ name: "All Contracts Integration", passed: allContractsResult });
  
  // Print summary
  console.log("\n📊 Comprehensive Test Summary:");
  console.log("=".repeat(60));
  
  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  
  results.forEach(result => {
    const status = result.passed ? "✅" : "❌";
    console.log(`${status} ${result.name}: ${result.passed ? "PASSED" : "FAILED"}`);
  });
  
  console.log(`\n📈 Results: ${passed} passed, ${failed} failed`);
  
  if (failed > 0) {
    console.log("\n❌ Some tests failed!");
    process.exit(1);
  } else {
    console.log("\n🎉 All comprehensive tests passed successfully!");
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runComprehensiveTests().catch(error => {
    console.error("❌ Comprehensive test runner failed:", error);
    process.exit(1);
  });
}

module.exports = {
  runComprehensiveTests,
  testDeclaratia112,
  testDeclaratia300,
  testDeclaratia394,
  testDeclartia100,
  testAllContracts
}; 