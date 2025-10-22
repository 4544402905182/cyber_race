/**
 * Cars Data Tests
 *
 * Tests for car models and parts data validation
 */

import { describe, it, expect } from 'vitest';
import { cars, carParts } from '../data/cars';

describe('Cars Data', () => {
  describe('Car Models', () => {
    it('should have at least one car', () => {
      expect(cars.length).toBeGreaterThan(0);
    });

    it('should have exactly 9 performance cars', () => {
      expect(cars).toHaveLength(9);
    });

    it('should have valid car structure', () => {
      cars.forEach(car => {
        expect(car).toHaveProperty('id');
        expect(car).toHaveProperty('brand');
        expect(car).toHaveProperty('model');
        expect(car).toHaveProperty('baseStats');
        expect(car).toHaveProperty('image');
        expect(car).toHaveProperty('price');
      });
    });

    it('should have unique car IDs', () => {
      const ids = cars.map(car => car.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it('should have valid base stats', () => {
      cars.forEach(car => {
        expect(car.baseStats.speed).toBeGreaterThan(0);
        expect(car.baseStats.acceleration).toBeGreaterThan(0);
        expect(car.baseStats.handling).toBeGreaterThan(0);
        expect(car.baseStats.durability).toBeGreaterThan(0);

        // Stats should be reasonable numbers (not too high)
        expect(car.baseStats.speed).toBeLessThanOrEqual(100);
        expect(car.baseStats.acceleration).toBeLessThanOrEqual(100);
        expect(car.baseStats.handling).toBeLessThanOrEqual(100);
        expect(car.baseStats.durability).toBeLessThanOrEqual(100);
      });
    });

    it('should include BMW, Mercedes-AMG, Honda, and Porsche brands', () => {
      const brands = cars.map(car => car.brand);
      expect(brands).toContain('BMW');
      expect(brands).toContain('Mercedes-AMG');
      expect(brands).toContain('Honda');
      expect(brands).toContain('Porsche');
    });

    it('should have valid price format', () => {
      cars.forEach(car => {
        expect(car.price).toMatch(/^\d+(\.\d+)?\s+ETH$/);
      });
    });
  });

  describe('Car Parts', () => {
    it('should have parts for all categories', () => {
      const categories = ['engine', 'transmission', 'suspension', 'wheels', 'body', 'exhaust'];
      categories.forEach(category => {
        const partsInCategory = carParts.filter(part => part.category === category);
        expect(partsInCategory.length).toBeGreaterThan(0);
      });
    });

    it('should have valid part structure', () => {
      carParts.forEach(part => {
        expect(part).toHaveProperty('id');
        expect(part).toHaveProperty('name');
        expect(part).toHaveProperty('category');
        expect(part).toHaveProperty('tier');
        expect(part).toHaveProperty('boost');
        expect(part).toHaveProperty('price');
      });
    });

    it('should have unique part IDs', () => {
      const ids = carParts.map(part => part.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it('should have valid tier values', () => {
      const validTiers = [1, 2, 3];
      carParts.forEach(part => {
        expect(validTiers).toContain(part.tier);
      });
    });

    it('should have boost values for all parts', () => {
      carParts.forEach(part => {
        expect(part.boost).toBeDefined();
        const boostValues = Object.values(part.boost);
        expect(boostValues.length).toBeGreaterThan(0);
        boostValues.forEach(value => {
          expect(typeof value).toBe('number');
          expect(value).toBeGreaterThanOrEqual(0);
        });
      });
    });

    it('should have at least 3 tiers for each category', () => {
      const categories = ['engine', 'transmission', 'suspension', 'wheels', 'body', 'exhaust'];
      categories.forEach(category => {
        const partsInCategory = carParts.filter(part => part.category === category);
        const tiers = new Set(partsInCategory.map(part => part.tier));
        expect(tiers.size).toBeGreaterThanOrEqual(3);
      });
    });

    it('should have progressive pricing by tier', () => {
      const categories = ['engine', 'transmission', 'suspension', 'wheels', 'body', 'exhaust'];
      categories.forEach(category => {
        const partsInCategory = carParts.filter(part => part.category === category);
        const tier1Parts = partsInCategory.filter(p => p.tier === 1);
        const tier2Parts = partsInCategory.filter(p => p.tier === 2);
        const tier3Parts = partsInCategory.filter(p => p.tier === 3);

        if (tier1Parts.length > 0 && tier2Parts.length > 0) {
          const avgTier1Price = tier1Parts.reduce((sum, p) => sum + parseFloat(p.price), 0) / tier1Parts.length;
          const avgTier2Price = tier2Parts.reduce((sum, p) => sum + parseFloat(p.price), 0) / tier2Parts.length;
          expect(avgTier2Price).toBeGreaterThan(avgTier1Price);
        }

        if (tier2Parts.length > 0 && tier3Parts.length > 0) {
          const avgTier2Price = tier2Parts.reduce((sum, p) => sum + parseFloat(p.price), 0) / tier2Parts.length;
          const avgTier3Price = tier3Parts.reduce((sum, p) => sum + parseFloat(p.price), 0) / tier3Parts.length;
          expect(avgTier3Price).toBeGreaterThan(avgTier2Price);
        }
      });
    });
  });

  describe('Data Consistency', () => {
    it('should have consistent naming conventions', () => {
      cars.forEach(car => {
        expect(car.brand).toBeTruthy();
        expect(car.model).toBeTruthy();
        expect(car.brand.length).toBeGreaterThan(0);
        expect(car.model.length).toBeGreaterThan(0);
      });

      carParts.forEach(part => {
        expect(part.name).toBeTruthy();
        expect(part.name.length).toBeGreaterThan(0);
      });
    });

    it('should have valid category names', () => {
      const validCategories = ['engine', 'transmission', 'suspension', 'wheels', 'body', 'exhaust'];
      carParts.forEach(part => {
        expect(validCategories).toContain(part.category);
      });
    });
  });
});
