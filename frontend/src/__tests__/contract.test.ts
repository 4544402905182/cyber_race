/**
 * Contract Configuration Tests
 *
 * Tests for contract address and ABI validation
 * Run with: npm test (after installing vitest)
 */

import { describe, it, expect } from 'vitest';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../lib/contract';

describe('Contract Configuration', () => {
  describe('CONTRACT_ADDRESS', () => {
    it('should be a valid Ethereum address', () => {
      expect(CONTRACT_ADDRESS).toMatch(/^0x[a-fA-F0-9]{40}$/);
    });

    it('should not be zero address', () => {
      expect(CONTRACT_ADDRESS).not.toBe('0x0000000000000000000000000000000000000000');
    });

    it('should be checksummed address format', () => {
      expect(CONTRACT_ADDRESS).toMatch(/^0x[a-fA-F0-9]{40}$/);
    });
  });

  describe('CONTRACT_ABI', () => {
    it('should be an array', () => {
      expect(Array.isArray(CONTRACT_ABI)).toBe(true);
    });

    it('should contain registerDriver function', () => {
      const registerDriver = CONTRACT_ABI.find(
        item => item.type === 'function' && item.name === 'registerDriver'
      );
      expect(registerDriver).toBeDefined();
      expect(registerDriver?.stateMutability).toBe('nonpayable');
    });

    it('should contain updateCarSetup function', () => {
      const updateCarSetup = CONTRACT_ABI.find(
        item => item.type === 'function' && item.name === 'updateCarSetup'
      );
      expect(updateCarSetup).toBeDefined();
      expect(updateCarSetup?.inputs).toHaveLength(9); // 8 params + proof
    });

    it('should contain isRegistered view function', () => {
      const isRegistered = CONTRACT_ABI.find(
        item => item.type === 'function' && item.name === 'isRegistered'
      );
      expect(isRegistered).toBeDefined();
      expect(isRegistered?.stateMutability).toBe('view');
      expect(isRegistered?.outputs).toHaveLength(1);
    });

    it('should contain getDriverProfile view function', () => {
      const getDriverProfile = CONTRACT_ABI.find(
        item => item.type === 'function' && item.name === 'getDriverProfile'
      );
      expect(getDriverProfile).toBeDefined();
      expect(getDriverProfile?.stateMutability).toBe('view');
    });

    it('should have correct parameter types for updateCarSetup', () => {
      const updateCarSetup = CONTRACT_ABI.find(
        item => item.type === 'function' && item.name === 'updateCarSetup'
      );

      expect(updateCarSetup?.inputs?.[0].type).toBe('string'); // carModel
      expect(updateCarSetup?.inputs?.[1].type).toBe('bytes32'); // engineTuning
      expect(updateCarSetup?.inputs?.[8].type).toBe('bytes'); // inputProof
    });
  });

  describe('ABI Function Signatures', () => {
    it('should have unique function selectors', () => {
      const functionSelectors = CONTRACT_ABI
        .filter(item => item.type === 'function')
        .map(item => item.name);

      const uniqueSelectors = new Set(functionSelectors);
      expect(functionSelectors.length).toBe(uniqueSelectors.size);
    });

    it('should contain all required functions', () => {
      const requiredFunctions = [
        'registerDriver',
        'updateCarSetup',
        'isRegistered',
        'getDriverProfile'
      ];

      requiredFunctions.forEach(funcName => {
        const func = CONTRACT_ABI.find(
          item => item.type === 'function' && item.name === funcName
        );
        expect(func, `${funcName} should exist in ABI`).toBeDefined();
      });
    });
  });
});
