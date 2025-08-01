# ContaPrima - Romanian Tax Declaration Payment System

## 📋 Project Overview

ContaPrima is a blockchain-based system for managing Romanian tax declarations and payments. The system allows users to pay for different types of tax declarations (Declaratia) using RON tokens on the blockchain.

## 🏗️ Architecture

The project consists of several smart contracts that work together to provide a comprehensive tax declaration payment system:

### Core Contracts

1. **`ContaPrima.sol`** - Main contract that orchestrates all operations
2. **`ERC20RON.sol`** - RON token implementation for payments
3. **`Declaratia112.sol`** - Contract for Declaratia 112 payments
4. **`Declaratia300.sol`** - Contract for Declaratia 300 payments
5. **`Declaratia394.sol`** - Contract for Declaratia 394 payments
6. **`Declartia100.sol`** - Contract for Declaratia 100 payments

## 🎯 Purpose

This system digitizes the Romanian tax declaration payment process by:
- Allowing users to pay for tax declarations using RON tokens
- Tracking payments for different declaration types
- Providing transparency and immutability through blockchain
- Automating the payment approval and transfer process

## 📊 Contract Functions

### ContaPrima.sol (Main Contract)

#### Constructor
```solidity
    constructor() {
        declaratia112 = new Declaratia112();
        declartia100 = new Declartia100();
        declaratia300 = new Declaratia300();
        declaratia394 = new Declaratia394();
        erc20ron = new ERC20RON();
    }
```
- Deploys all four Declaratia contracts
- Deploys the ERC20RON token contract
- Sets up the complete system infrastructure

#### Payment Functions

**`payForDeclaratia112(uint256 amount)`**
- Allows users to pay for Declaratia 112
- Automatically approves and transfers RON tokens
- Updates the user's payment record for Declaratia 112
- Calls the corresponding Declaratia112 contract

**`payForDeclaratia300(uint256 amount)`**
- Allows users to pay for Declaratia 300
- Automatically approves and transfers RON tokens
- Updates the user's payment record for Declaratia 300
- Calls the corresponding Declaratia300 contract

**`payForDeclaratia394(uint256 amount)`**
- Allows users to pay for Declaratia 394
- Automatically approves and transfers RON tokens
- Updates the user's payment record for Declaratia 394
- Calls the corresponding Declaratia394 contract

**`payForDeclartia100(uint256 amount)`**
- Allows users to pay for Declaratia 100
- Automatically approves and transfers RON tokens
- Updates the user's payment record for Declaratia 100
- Calls the corresponding Declartia100 contract

#### State Variables

**`declaratiaAmount[address][Declaratia]`**
- Mapping that tracks how much each user has paid for each declaration type
- Structure: `user address => declaration type => amount paid`

### ERC20RON.sol (RON Token)

**`mint(address to, uint256 amount)`**
- Allows minting new RON tokens to any address
- Used for testing and initial token distribution

**Standard ERC20 Functions**
- `transfer(address to, uint256 amount)` - Transfer tokens
- `approve(address spender, uint256 amount)` - Approve spending
- `transferFrom(address from, address to, uint256 amount)` - Transfer from approved address
- `balanceOf(address account)` - Check token balance

### Individual Declaratia Contracts

Each Declaratia contract (112, 300, 394, 100) has the same structure:

**`payForDeclaratiaXXX(address firma, uint256 amount)`**
- Records payment for a specific firm/address
- Accumulates amounts for the same firm
- Stores data in `firmaAmount` mapping

**`firmaAmount(address firma)`**
- Returns the total amount paid by a specific firm
- Returns 0 for firms that haven't made any payments

## 🔄 Workflow

1. **Token Setup**: Users must have RON tokens in their wallet
2. **Payment Process**:
   - User calls the appropriate payment function
   - System automatically approves token spending
   - Tokens are transferred from user to contract
   - Payment is recorded in the corresponding Declaratia contract
   - User's payment record is updated in the main contract
3. **Verification**: Users can check their payment history and balances

## 🧪 Testing

The project includes comprehensive tests for all contracts:

### Running Tests

```bash
# Run comprehensive test suite
node test/comprehensive-test-runner.js

# Run simple test runner
node test/test-runner.js

# Run individual contract tests
npx hardhat test test/Declaratia112.test.js
npx hardhat test test/Declaratia300.test.js
npx hardhat test test/Declaratia394.test.js
npx hardhat test test/Declartia100.test.js
npx hardhat test test/AllDeclaratia.test.js
```

### Test Coverage

- ✅ Contract deployment verification
- ✅ Payment functionality testing
- ✅ Token transfer and approval testing
- ✅ State management verification
- ✅ Edge cases and error handling
- ✅ Gas optimization testing
- ✅ Integration testing across all contracts

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed
- Hardhat development environment
- OpenZeppelin contracts (for ERC20 implementation)

### Installation

```bash
# Install dependencies
npm install

# Compile contracts
npx hardhat compile

# Run tests
node test/comprehensive-test-runner.js
```

### Development Commands

```bash
# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Start local node
npx hardhat node


## 📁 Project Structure

```
ContaPrima/
├── contracts/
│   ├── ContaPrima.sol          # Main contract
│   ├── ERC20RON.sol            # RON token
│   ├── Declaratia112.sol       # Declaratia 112 contract
│   ├── Declaratia300.sol       # Declaratia 300 contract
│   ├── Declaratia394.sol       # Declaratia 394 contract
│   └── Declartia100.sol        # Declaratia 100 contract
├── test/
│   ├── comprehensive-test-runner.js  # Full test suite
│   ├── test-runner.js               # Simple test runner
│   ├── Declaratia112.test.js        # Individual contract tests
│   ├── Declaratia300.test.js
│   ├── Declaratia394.test.js
│   ├── Declartia100.test.js
│   └── AllDeclaratia.test.js        # Integration tests
├── ignition/
│   └── modules/
├── hardhat.config.js
└── package.json
```

## 🔧 Technical Details

### Smart Contract Features

- **Modular Design**: Each Declaratia type has its own contract
- **Token Integration**: Uses ERC20 RON tokens for payments
- **State Management**: Tracks payments per user and declaration type
- **Automated Approvals**: Handles token approvals automatically
- **Gas Optimization**: Efficient storage and function design

### Security Features

- **Access Control**: Anyone can make payments (public functions)
- **Token Safety**: Uses standard ERC20 transfer mechanisms
- **State Isolation**: Each contract maintains separate state
- **Overflow Protection**: Uses SafeMath (built into Solidity 0.8+)

## 📈 Use Cases

1. **Individual Taxpayers**: Pay for personal tax declarations
2. **Businesses**: Pay for corporate tax declarations
3. **Tax Consultants**: Manage multiple client payments
4. **Government**: Track and verify tax payments transparently

## 🔮 Future Enhancements

- Multi-signature approval for large payments
- Integration with Romanian tax authority APIs
- Mobile application for easy payment
- Advanced reporting and analytics
- Support for additional declaration types

## 📞 Support

For questions or issues:
- Check the test files for usage examples
- Review the contract comments for implementation details
- Run the comprehensive test suite to verify functionality

---

**Note**: This is a demonstration project for blockchain-based tax declaration payments. In production use, additional security measures and regulatory compliance would be required.
