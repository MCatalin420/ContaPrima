const { expect } = require("chai");
const { ethers } = require("hardhat");

// Simple test to verify the setup works
async function runSimpleTest() {
  console.log("🧪 Running simple test...");
  
  try {
    // Test basic functionality
    expect(1 + 1).to.equal(2);
    expect("hello").to.be.a("string");
    expect([1, 2, 3]).to.have.lengthOf(3);
    
    console.log("✅ Basic assertions work");
    
    // Test ethers functionality
    const amount = ethers.parseEther("100");
    expect(amount).to.be.a("bigint");
    expect(amount).to.equal(ethers.parseEther("100"));
    
    console.log("✅ Ethers.js functionality works");
    
    // Test signers
    const [signer1, signer2] = await ethers.getSigners();
    expect(signer1.address).to.be.a("string");
    expect(signer2.address).to.be.a("string");
    expect(signer1.address).to.not.equal(signer2.address);
    
    console.log("✅ Signers work correctly");
    
    console.log("🎉 All simple tests passed!");
    return true;
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    return false;
  }
}

// Test contract deployment
async function testContractDeployment() {
  console.log("\n🏗️  Testing contract deployment...");
  
  try {
    const [owner] = await ethers.getSigners();
    
    // Try to deploy Declaratia112
    const Declaratia112 = await ethers.getContractFactory("Declaratia112");
    const declaratia112 = await Declaratia112.deploy();
    await declaratia112.waitForDeployment();
    
    expect(declaratia112.target).to.be.properAddress;
    console.log("✅ Declaratia112 deployed successfully");
    
    // Test basic functionality
    const amount = ethers.parseEther("100");
    await declaratia112.payForDeclaratia112(owner.address, amount);
    
    const storedAmount = await declaratia112.firmaAmount(owner.address);
    expect(storedAmount).to.equal(amount);
    
    console.log("✅ Contract functionality works");
    return true;
  } catch (error) {
    console.error("❌ Contract deployment failed:", error.message);
    return false;
  }
}

// Main test runner
async function runAllTests() {
  console.log("🚀 Starting test suite...\n");
  
  const results = [];
  
  // Run simple tests
  const simpleTestResult = await runSimpleTest();
  results.push({ name: "Simple Tests", passed: simpleTestResult });
  
  // Run contract deployment tests
  const contractTestResult = await testContractDeployment();
  results.push({ name: "Contract Deployment", passed: contractTestResult });
  
  // Print summary
  console.log("\n📊 Test Summary:");
  console.log("=".repeat(50));
  
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
    console.log("\n🎉 All tests passed successfully!");
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests().catch(error => {
    console.error("❌ Test runner failed:", error);
    process.exit(1);
  });
}

module.exports = { runAllTests, runSimpleTest, testContractDeployment }; 