# Declaratia Contracts Test Suite

This directory contains comprehensive tests for all Declaratia contracts in the ContaPrima project.

## 📁 Test Files

### Individual Contract Tests
- **`Declaratia112.test.js`** - Tests for the Declaratia112 contract
- **`Declaratia300.test.js`** - Tests for the Declaratia300 contract  
- **`Declaratia394.test.js`** - Tests for the Declaratia394 contract
- **`Declartia100.test.js`** - Tests for the Declartia100 contract

### Integration Tests
- **`AllDeclaratia.test.js`** - Comprehensive tests that verify interactions between all contracts

### Test Runner
- **`run-tests.js`** - Custom test runner for running all tests or specific test files
- **`test-runner.js`** - Simple test runner that works without hardhat command
- **`comprehensive-test-runner.js`** - Comprehensive test runner for all contracts

## 🚀 Running Tests

### Using npm scripts (Recommended)

```bash
# Run all tests
npm run test

# Run all tests with custom runner
npm run test:all

# Run simple test runner (works without hardhat command)
npm run test:simple

# Run comprehensive test runner (tests all contracts)
npm run test:comprehensive

# Run individual contract tests
npm run test:112    # Declaratia112
npm run test:300    # Declaratia300
npm run test:394    # Declaratia394
npm run test:100    # Declartia100

# Run integration tests
npm run test:integration

# Run with coverage
npm run test:coverage
```

### Using Hardhat directly

```bash
# Run all tests
npx hardhat test

# Run specific test file
npx hardhat test test/Declaratia112.test.js
npx hardhat test test/AllDeclaratia.test.js

# Run with verbose output
npx hardhat test --verbose
```

### Using the custom test runner

```bash
# Run all tests
node test/run-tests.js

# Run specific test file
node test/run-tests.js Declaratia112.test.js
node test/run-tests.js AllDeclaratia.test.js

# Show help
node test/run-tests.js --help
```

## 🧪 Test Coverage

Each contract test file includes the following test categories:

### Deployment Tests
- ✅ Contract deployment verification
- ✅ Initial state validation

### Functionality Tests
- ✅ Basic payment functionality
- ✅ Payment accumulation for same firm
- ✅ Multiple firms handling
- ✅ Zero amount handling
- ✅ Large amount handling
- ✅ Authorization (anyone can call)

### State Management Tests
- ✅ Mapping state persistence
- ✅ Unregistered firm handling
- ✅ Cross-transaction state persistence

### Edge Cases
- ✅ Maximum uint256 values
- ✅ Zero address handling
- ✅ Multiple sequential payments

### Gas Optimization
- ✅ Gas usage verification
- ✅ Reasonable gas consumption

### Integration Tests (AllDeclaratia.test.js)
- ✅ Cross-contract functionality
- ✅ Contract isolation verification
- ✅ Gas efficiency comparison
- ✅ Stress testing with concurrent operations
- ✅ Real-world usage pattern simulation

## 📊 Test Structure

Each test file follows this structure:

```javascript
describe("ContractName", function () {
  // Setup
  beforeEach(async function () {
    // Deploy contract and setup signers
  });

  describe("Deployment", function () {
    // Deployment tests
  });

  describe("FunctionName", function () {
    // Function-specific tests
  });

  describe("State Management", function () {
    // State verification tests
  });

  describe("Edge Cases", function () {
    // Edge case handling
  });

  describe("Gas Optimization", function () {
    // Gas usage tests
  });
});
```

## 🔧 Test Configuration

The tests use:
- **Hardhat**: For blockchain simulation and contract deployment
- **Ethers.js**: For contract interaction and transaction handling
- **Chai**: For assertions and test expectations
- **Mocha**: For test framework and structure

## 📈 Test Metrics

Each test suite verifies:
- **Functionality**: All contract functions work as expected
- **Security**: No unauthorized access or unexpected behavior
- **Gas Efficiency**: Operations use reasonable amounts of gas
- **State Management**: Contract state is properly maintained
- **Edge Cases**: Handles boundary conditions gracefully

## 🐛 Debugging Tests

If tests fail:

1. **Check contract compilation**:
   ```bash
   npx hardhat compile
   ```

2. **Run with verbose output**:
   ```bash
   npx hardhat test --verbose
   ```

3. **Run individual test**:
   ```bash
   npx hardhat test test/Declaratia112.test.js
   ```

4. **Check for specific errors**:
   ```bash
   npx hardhat test --grep "Should deploy successfully"
   ```

## 📝 Adding New Tests

To add tests for a new contract:

1. Create a new test file: `NewContract.test.js`
2. Follow the existing test structure
3. Include all test categories mentioned above
4. Update `run-tests.js` to include the new file
5. Add npm scripts to `package.json`

Example test file structure:
```javascript
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NewContract", function () {
  let newContract;
  let owner, user1, user2;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    const NewContract = await ethers.getContractFactory("NewContract");
    newContract = await NewContract.deploy();
    await newContract.waitForDeployment();
  });

  // Add your tests here...
});
```

## 🤝 Contributing

When adding new tests:
- Follow the existing naming conventions
- Include comprehensive test coverage
- Add appropriate comments
- Update this README if needed
- Ensure all tests pass before submitting

## 📋 Test Checklist

Before running tests, ensure:
- [ ] All contracts are compiled
- [ ] Hardhat is properly configured
- [ ] Dependencies are installed
- [ ] Test environment is clean

After running tests, verify:
- [ ] All tests pass
- [ ] No warnings or errors
- [ ] Gas usage is reasonable
- [ ] Coverage is adequate 