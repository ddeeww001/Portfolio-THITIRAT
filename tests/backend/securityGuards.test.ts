import { describe, it, expect } from 'vitest';
import { sanitizeInput, deepFreeze } from '../../src/utils/security';

describe('Security & Anti-Tampering Guards (Backend/Security Test Suite)', () => {
  describe('Input Sanitization (XSS Prevention)', () => {
    it('strips standard HTML and script tags', () => {
      const maliciousInput = '<script>alert("Hacked")</script>Central Tham';
      expect(sanitizeInput(maliciousInput)).toBe('Central Tham');
    });

    it('strips javascript: pseudo-protocols', () => {
      const input = 'javascript:alert(document.cookie)';
      expect(sanitizeInput(input)).toBe('alert(document.cookie)');
    });

    it('strips inline event handler attributes', () => {
      const input = '<img src="x" onerror="alert(1)" />React';
      expect(sanitizeInput(input)).toBe('React');
    });

    it('handles empty and whitespace-only strings safely', () => {
      expect(sanitizeInput('')).toBe('');
      expect(sanitizeInput('   ')).toBe('');
    });
  });

  describe('Deep Freeze Data Immutability', () => {
    it('prevents top-level and deeply nested property mutation', () => {
      const originalData = {
        name: 'Thitirat',
        profile: {
          role: 'Designer',
          stats: {
            repos: 10,
          },
        },
      };

      const frozen = deepFreeze(originalData);

      expect(Object.isFrozen(frozen)).toBe(true);
      expect(Object.isFrozen(frozen.profile)).toBe(true);
      expect(Object.isFrozen(frozen.profile.stats)).toBe(true);

      // Attempting to modify properties in strict mode should throw TypeError
      expect(() => {
        (frozen as any).name = 'Modified';
      }).toThrow(TypeError);

      expect(() => {
        (frozen.profile as any).role = 'Hacker';
      }).toThrow(TypeError);
    });

    it('prevents adding new properties to frozen objects', () => {
      const data = { title: 'Safe' };
      const frozen = deepFreeze(data);

      expect(() => {
        (frozen as any).newProp = 'Injected';
      }).toThrow(TypeError);
    });
  });
});
