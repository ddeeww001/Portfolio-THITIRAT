import { describe, it, expect } from 'vitest';
import { sanitizeInput, escapeHtml, sanitizeUrl, deepFreeze } from '../../src/utils/security';
import fs from 'fs';
import path from 'path';

describe('🛡️ Cross-Site Scripting (XSS) Prevention Test Suite', () => {

  describe('1. HTML Tag & Script Injection Stripping (sanitizeInput)', () => {
    it('removes simple and uppercase <script> tags', () => {
      const payloads = [
        '<script>alert("XSS")</script>Test',
        '<SCRIPT>alert("XSS")</SCRIPT>Test',
        '<script src="http://attacker.com/evil.js"></script>Test',
        '<sCrIpt type="text/javascript">alert(1)</sCrIpt>Test',
      ];

      payloads.forEach((payload) => {
        const sanitized = sanitizeInput(payload);
        expect(sanitized).not.toContain('<script');
        expect(sanitized).not.toContain('</script>');
        expect(sanitized).toBe('Test');
      });
    });

    it('removes dangerous inline event handlers (onerror, onload, onclick, etc.)', () => {
      const payloads = [
        '<img src="invalid-image.jpg" onerror="alert(document.cookie)" />Hello',
        '<svg onload="alert(1)">Vector</svg>',
        '<body onload="alert(1)">Content</body>',
        '<input type="text" autofocus onfocus="alert(1)" />Search',
        '<a href="#" onclick="alert(\'hacked\')">Click Me</a>',
      ];

      payloads.forEach((payload) => {
        const sanitized = sanitizeInput(payload);
        expect(sanitized).not.toContain('onerror=');
        expect(sanitized).not.toContain('onload=');
        expect(sanitized).not.toContain('onclick=');
        expect(sanitized).not.toContain('onfocus=');
      });
    });

    it('removes <style> and CSS injection blocks', () => {
      const maliciousStyle = '<style>body { display: none !important; }</style>Safe Text';
      expect(sanitizeInput(maliciousStyle)).toBe('Safe Text');
    });

    it('removes <iframe>, <object>, and <embed> tags', () => {
      const payload = '<iframe src="https://attacker.site/phish"></iframe>My Portfolio<embed src="evil.swf" />';
      const sanitized = sanitizeInput(payload);
      expect(sanitized).not.toContain('<iframe');
      expect(sanitized).not.toContain('<embed');
      expect(sanitized).toBe('My Portfolio');
    });

    it('removes pseudo-protocols (javascript:, data:, vbscript:)', () => {
      expect(sanitizeInput('javascript:alert(1)')).not.toContain('javascript:');
      expect(sanitizeInput('JAVASCRIPT:alert(1)')).not.toContain('javascript:');
      expect(sanitizeInput('vbscript:msgbox(1)')).not.toContain('vbscript:');
      expect(sanitizeInput('data:text/html,<script>alert(1)</script>')).not.toContain('data:');
    });

    it('preserves clean Thai, English text and numbers without distortion', () => {
      const safeInputs = [
        'UX/UI Designer & Frontend Developer',
        'ผลงานการแข่งขัน Hackathon 2026',
        'TypeScript React 19 Project #123',
        'email@domain.com',
      ];

      safeInputs.forEach((input) => {
        expect(sanitizeInput(input)).toBe(input.trim());
      });
    });
  });

  describe('2. Output Encoding & HTML Entity Escaping (escapeHtml)', () => {
    it('escapes all dangerous HTML characters (&, <, >, ", \', /, `, =)', () => {
      const dangerousString = '<div class="banner" id=\'box\' onclick=`evil()`>Tom & Jerry</div>';
      const escaped = escapeHtml(dangerousString);

      expect(escaped).not.toContain('<');
      expect(escaped).not.toContain('>');
      expect(escaped).not.toContain('"');
      expect(escaped).not.toContain("'");
      expect(escaped).not.toContain('`');
      
      expect(escaped).toContain('&lt;');
      expect(escaped).toContain('&gt;');
      expect(escaped).toContain('&quot;');
      expect(escaped).toContain('&#x27;');
      expect(escaped).toContain('&amp;');
      expect(escaped).toContain('&#x60;');
    });

    it('neutralizes attribute breakout payloads', () => {
      const breakoutPayload = '"><script>alert(1)</script><input value="';
      const escaped = escapeHtml(breakoutPayload);

      expect(escaped).toContain('&quot;&gt;&lt;script&gt;');
      expect(escaped).not.toContain('<script>');
    });

    it('returns empty string for null, undefined, or empty values', () => {
      expect(escapeHtml('')).toBe('');
      expect(escapeHtml(null as unknown as string)).toBe('');
      expect(escapeHtml(undefined as unknown as string)).toBe('');
    });
  });

  describe('3. URL & Protocol Injection Prevention (sanitizeUrl)', () => {
    it('blocks dangerous URI schemes (javascript:, data:, vbscript:)', () => {
      const dangerousUrls = [
        'javascript:alert(document.domain)',
        'JAVASCRIPT:alert(1)',
        'data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==',
        'vbscript:msgbox(1)',
      ];

      dangerousUrls.forEach((url) => {
        expect(sanitizeUrl(url)).toBe('#');
      });
    });

    it('allows safe HTTPS and HTTP URLs', () => {
      const safeUrls = [
        'https://github.com/ddeeww001/Portfolio-THITIRAT',
        'https://linkedin.com/in/thitirat',
        'http://localhost:5173',
      ];

      safeUrls.forEach((url) => {
        expect(sanitizeUrl(url)).toBe(url);
      });
    });

    it('allows safe mailto: and tel: links', () => {
      expect(sanitizeUrl('mailto:thitirat@example.com')).toBe('mailto:thitirat@example.com');
      expect(sanitizeUrl('tel:+66812345678')).toBe('tel:+66812345678');
    });

    it('allows safe relative paths and anchors', () => {
      expect(sanitizeUrl('/projects')).toBe('/projects');
      expect(sanitizeUrl('#contact')).toBe('#contact');
      expect(sanitizeUrl('./assets/document.pdf')).toBe('./assets/document.pdf');
      expect(sanitizeUrl('../certify_LifeLongLearning/UXUI.pdf')).toBe('../certify_LifeLongLearning/UXUI.pdf');
    });

    it('supports custom fallback URLs', () => {
      expect(sanitizeUrl('javascript:alert(1)', 'https://fallback.com')).toBe('https://fallback.com');
      expect(sanitizeUrl('', '/default')).toBe('/default');
    });
  });

  describe('4. Memory Tampering & Prototype Pollution Protection (deepFreeze)', () => {
    it('deeply freezes objects and prevents property manipulation', () => {
      const config = {
        apiEndpoint: 'https://api.github.com',
        user: {
          role: 'ADMIN',
          permissions: {
            canEdit: true,
          },
        },
      };

      const frozenConfig = deepFreeze(config);

      expect(Object.isFrozen(frozenConfig)).toBe(true);
      expect(Object.isFrozen(frozenConfig.user)).toBe(true);
      expect(Object.isFrozen(frozenConfig.user.permissions)).toBe(true);

      // Attempting mutation throws in strict mode
      expect(() => {
        (frozenConfig as any).apiEndpoint = 'https://malicious-api.com';
      }).toThrow(TypeError);

      expect(() => {
        (frozenConfig.user.permissions as any).canEdit = false;
      }).toThrow(TypeError);
    });
  });

  describe('5. Content Security Policy (CSP) Configuration Check', () => {
    it('ensures index.html contains a strict Content-Security-Policy meta tag', () => {
      const indexPath = path.resolve(__dirname, '../../index.html');
      const indexContent = fs.readFileSync(indexPath, 'utf-8');

      expect(indexContent).toContain('http-equiv="Content-Security-Policy"');
      expect(indexContent).toContain("default-src 'self'");
      expect(indexContent).toContain("object-src 'none'");
      expect(indexContent).toContain("base-uri 'self'");
    });
  });

});
