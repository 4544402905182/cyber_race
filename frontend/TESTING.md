# Frontend Testing Guide

## Quick Start

### Install Dependencies

Fix NPM permissions first:
```bash
sudo chown -R 501:20 "/Users/songsu/.npm"
```

Then install test dependencies:
```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom
```

### Run Tests

```bash
npm test              # Run all tests
npm test -- --watch   # Watch mode
npm run test:ui       # Interactive UI
npm run test:coverage # Coverage report
```

## Test Files

- **contract.test.ts** - Contract configuration (ABI, address validation)
- **cars.test.ts** - Car data and parts validation

## Configuration

Tests are configured in:
- `vite.config.ts` - Vitest settings (jsdom environment)
- `src/__tests__/setup.ts` - Global test setup

## Writing Tests

### Example Test

```typescript
import { describe, it, expect } from 'vitest';

describe('MyFeature', () => {
  it('should work correctly', () => {
    expect(true).toBe(true);
  });
});
```

## Known Limitations

- **FHE Encryption** - Cannot test actual FHE in unit tests (requires Sepolia)
- **Wallet Connections** - Mock wagmi hooks for wallet-dependent tests

## Troubleshooting

**Issue**: "Cannot find module @testing-library/react"
**Solution**: Run `npm install` after fixing NPM permissions

**Issue**: "window is not defined"
**Solution**: Ensure `environment: 'jsdom'` in vite.config.ts

---

For more details, see [project README](../README.md)
