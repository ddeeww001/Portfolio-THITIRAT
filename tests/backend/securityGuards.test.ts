import { sanitizeInput, deepFreeze, escapeHtml, sanitizeUrl } from '../../src/utils/security';

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

  describe('HTML Character Escaping (XSS Output Encoding)', () => {
    it('escapes dangerous HTML special characters', () => {
      const input = '<div class="test" onclick=\'alert(1)\'>Hello & Welcome</div>';
      const escaped = escapeHtml(input);
      expect(escaped).not.toContain('<');
      expect(escaped).not.toContain('>');
      expect(escaped).not.toContain('"');
      expect(escaped).not.toContain("'");
      expect(escaped).toContain('&amp;');
      expect(escaped).toContain('&lt;');
      expect(escaped).toContain('&gt;');
    });

    it('handles empty string gracefully', () => {
      expect(escapeHtml('')).toBe('');
    });
  });

  describe('URL Sanitization (Link Injection / Protocol XSS)', () => {
    it('blocks javascript: URLs', () => {
      expect(sanitizeUrl('javascript:alert(1)')).toBe('#');
      expect(sanitizeUrl('JAVASCRIPT:void(0)')).toBe('#');
    });

    it('blocks data: and vbscript: URLs', () => {
      expect(sanitizeUrl('data:text/html,<script>alert(1)</script>')).toBe('#');
      expect(sanitizeUrl('vbscript:msgbox(1)')).toBe('#');
    });

    it('allows valid HTTPS and HTTP URLs', () => {
      expect(sanitizeUrl('https://github.com')).toBe('https://github.com');
      expect(sanitizeUrl('http://localhost:3000')).toBe('http://localhost:3000');
    });

    it('allows valid relative and anchor paths', () => {
      expect(sanitizeUrl('/projects')).toBe('/projects');
      expect(sanitizeUrl('#contact')).toBe('#contact');
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
