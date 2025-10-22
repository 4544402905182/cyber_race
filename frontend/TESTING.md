# Frontend Testing Guide

## Overview

This project uses **Vitest** for unit testing React components and utility functions. Test files are located in `src/__tests__/`.

## Current Test Files

- **contract.test.ts** - Contract configuration validation (ABI, address, functions)
- **cars.test.ts** - Car data and parts validation (models, pricing, tiers)

## Prerequisites

Due to NPM cache permission issues, you need to fix permissions before installing test dependencies:

```bash
sudo chown -R 501:20 "/Users/songsu/.npm"
```

Then install required dependencies:

```bash
cd /Users/songsu/Desktop/zama/EncryptedRally-Championship/frontend
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom @vitest/ui @vitest/coverage-v8
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm test -- --watch
```

### Run tests with UI
```bash
npm run test:ui
```

### Run tests with coverage
```bash
npm run test:coverage
```

## Test Structure

### Contract Tests (`contract.test.ts`)

Validates contract configuration:
- ✅ CONTRACT_ADDRESS is valid Ethereum address
- ✅ CONTRACT_ABI is properly formatted
- ✅ Required functions exist (registerDriver, updateCarSetup)
- ✅ Function signatures match expected parameters

### Cars Data Tests (`cars.test.ts`)

Validates car models and parts data:
- ✅ All 9 performance cars are present
- ✅ Car structures have required fields
- ✅ Base stats are within valid ranges (0-100)
- ✅ Pricing follows ETH format
- ✅ Parts have 3 tiers with progressive pricing
- ✅ All 6 part categories have entries

## Writing New Tests

### Example Component Test

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import YourComponent from '../components/YourComponent';

describe('YourComponent', () => {
  it('should render correctly', () => {
    render(<YourComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### Example Utility Test

```typescript
import { describe, it, expect } from 'vitest';
import { yourUtilFunction } from '../lib/utils';

describe('yourUtilFunction', () => {
  it('should return expected value', () => {
    const result = yourUtilFunction('input');
    expect(result).toBe('expected output');
  });
});
```

## Configuration

### vite.config.ts

```typescript
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: './src/__tests__/setup.ts',
}
```

### Test Setup (`src/__tests__/setup.ts`)

- Imports `@testing-library/jest-dom/vitest` for additional matchers
- Configures automatic cleanup after each test

## Best Practices

1. **Test Isolation** - Each test should be independent
2. **Descriptive Names** - Use clear `it()` descriptions
3. **Arrange-Act-Assert** - Structure tests with setup, action, and verification
4. **Mock External Dependencies** - Mock contract calls, API requests, etc.
5. **Coverage Goals** - Aim for >80% coverage on critical paths

## Known Limitations

- **FHE Encryption** - Cannot test actual FHE encryption in unit tests (requires Sepolia)
- **Wallet Connections** - Mock wagmi hooks for wallet-dependent tests
- **Contract Interactions** - Use `viem` test clients for contract call simulation

## Troubleshooting

### Issue: "Cannot find module @testing-library/react"
**Solution**: Run `npm install` after fixing NPM cache permissions

### Issue: "ReferenceError: window is not defined"
**Solution**: Ensure `environment: 'jsdom'` is set in vite.config.ts

### Issue: Tests hang indefinitely
**Solution**: Check for async operations without proper awaits or cleanup

## Next Steps

1. **Component Tests** - Add tests for Customize, Home, Dashboard pages
2. **Hook Tests** - Test custom React hooks with `@testing-library/react-hooks`
3. **Integration Tests** - Test complete user flows
4. **E2E Tests** - Consider Playwright for full application testing

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library React](https://testing-library.com/docs/react-testing-library/intro/)
- [Viem Testing](https://viem.sh/docs/contract/testing.html)
