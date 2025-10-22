# EncryptedRally Championship - Test Suite

## Overview

This directory contains unit tests for the EncryptedRallyChampionship smart contract.

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests with gas reporting
```bash
REPORT_GAS=true npm test
```

### Run tests with coverage
```bash
npx hardhat coverage
```

## Test Structure

### EncryptedRallyChampionship.test.js

#### 1. Deployment Tests
- ✅ Verifies correct owner is set
- ✅ Checks initial state (totalDrivers = 0)

#### 2. Driver Registration Tests
- ✅ Tests successful driver registration
- ✅ Verifies registration status check
- ✅ Prevents double registration
- ✅ Supports multiple driver registrations
- ✅ Emits DriverRegistered event

#### 3. Driver Profile Tests
- ✅ Returns correct profile after registration
- ✅ Returns empty profile for unregistered drivers
- ✅ Tracks registration timestamp
- ✅ Tracks driver tier (Rookie initially)

#### 4. Car Setup Update Tests
- ✅ Prevents unregistered drivers from updating setup
- ✅ Emits CarSetupUpdated event
- ✅ Updates car model (plaintext)
- ✅ Stores encrypted parameters (requires FHE on testnet)

#### 5. Access Control Tests
- ✅ Verifies owner permissions
- ✅ Tests onlyRegistered modifier
- ✅ Tests custom error messages

#### 6. View Function Tests
- ✅ Tests totalDrivers counter
- ✅ Tests isRegistered function
- ✅ Tests getDriverProfile function

## Important Notes

### FHE Testing Limitations

The tests in this file are designed for **local Hardhat network** which does not support actual FHE operations.

For FHE-specific testing:
1. Mock encrypted values are used (ethers.ZeroHash)
2. InputProof validation is skipped in local environment
3. Actual FHE encryption must be tested on **Sepolia testnet** with deployed contracts

### Testing on Sepolia

To test FHE functionality on Sepolia:

1. Deploy contract:
   ```bash
   npm run deploy
   ```

2. Use frontend to test:
   - Navigate to http://localhost:8084
   - Connect wallet (Sepolia network)
   - Register as driver
   - Select car and parts
   - Submit encrypted setup

3. Verify on Etherscan:
   - Check transaction details
   - Verify encrypted parameters are stored
   - Confirm events are emitted

## Test Coverage Goals

- **Deployment**: 100%
- **Driver Registration**: 100%
- **Car Setup**: 80% (limited by FHE mock)
- **Access Control**: 100%
- **View Functions**: 100%

## Adding New Tests

When adding new functionality:

1. Add test file in `test/` directory
2. Follow naming convention: `ContractName.test.js`
3. Group tests by functionality
4. Use descriptive test names
5. Add comments for complex assertions

Example:
```javascript
describe("NewFeature", function () {
  it("Should perform expected behavior", async function () {
    // Arrange
    const expectedValue = 100;

    // Act
    const result = await contract.newFunction();

    // Assert
    expect(result).to.equal(expectedValue);
  });
});
```

## Common Test Patterns

### Testing Events
```javascript
await expect(contract.someFunction())
  .to.emit(contract, "EventName")
  .withArgs(arg1, arg2);
```

### Testing Reverts
```javascript
await expect(contract.someFunction())
  .to.be.revertedWithCustomError(contract, "ErrorName");
```

### Testing State Changes
```javascript
const before = await contract.someValue();
await contract.changeValue();
const after = await contract.someValue();
expect(after).to.be.gt(before);
```

## Debugging Tests

### Enable console logs
```bash
npx hardhat test --logs
```

### Run specific test file
```bash
npx hardhat test test/EncryptedRallyChampionship.test.js
```

### Run specific test
```bash
npx hardhat test --grep "Should allow a new driver to register"
```

## CI/CD Integration

Tests are automatically run on:
- Pull requests
- Pushes to main branch
- Before deployment

### GitHub Actions Workflow
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm test
```

## Resources

- [Hardhat Testing Guide](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)
- [Chai Matchers](https://hardhat.org/hardhat-chai-matchers/docs/overview)
- [Zama FHE Documentation](https://docs.zama.ai/)
