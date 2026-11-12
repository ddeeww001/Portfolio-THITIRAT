import { describe, it, expect } from 'vitest';
import { parseEnvConfig, ENV_CONFIG } from '../../src/config/env';
import { PUBLIC_PROFILE } from '../../src/config/profile';
import { profileDatabase } from '../../src/features/profile/profileData';

// parseEnvConfig is pure, so every case passes its own env and never depends on the real .env.
describe('Environment Configuration (parseEnvConfig)', () => {
  it('only private values come from env: the phone number (empty when missing)', () => {
    expect(parseEnvConfig({}).phone).toBe('');
    expect(parseEnvConfig({ VITE_USER_PHONE: '  012-345-6789 ' }).phone).toBe('012-345-6789');
  });

  it('public profile data is NOT read from env any more', () => {
    const cfg = parseEnvConfig({}) as Record<string, unknown>;
    for (const key of ['name', 'email', 'birthday', 'githubUsername', 'lineId', 'facebookUrl']) {
      expect(cfg).not.toHaveProperty(key);
    }
  });

  it.each([
    [undefined, 'strict'],
    ['strict', 'strict'],
    ['standard', 'standard'],
    [' STANDARD ', 'standard'],
    ['strcit', 'strict'],
    ['evil', 'strict'],
  ])('securityMode %j → %s (unknown values fall back to strict)', (input, expected) => {
    expect(parseEnvConfig({ VITE_SECURITY_MODE: input }).securityMode).toBe(expected);
  });

  it.each([
    [undefined, true, false],
    ['true', true, true],
    ['FALSE', false, false],
    ['false', false, false],
    ['yes', true, false],
  ])('boolean flag %j → selfXss=%s, cspEnforce=%s', (input, selfXss, csp) => {
    const cfg = parseEnvConfig({
      VITE_ENABLE_SELF_XSS_WARNING: input,
      VITE_ENABLE_SECURITY_LOGS: input,
      VITE_TEST_CSP_ENFORCE: input,
    });
    expect(cfg.enableSelfXssWarning).toBe(selfXss);
    expect(cfg.enableSecurityLogs).toBe(selfXss);
    expect(cfg.testCspEnforce).toBe(csp);
  });

  it('ENV_CONFIG is frozen', () => {
    expect(Object.isFrozen(ENV_CONFIG)).toBe(true);
  });
});

describe('profileDatabase integrity', () => {
  it('builds the profile from the public profile + the phone from env', () => {
    expect(profileDatabase.id).toBe(1);
    expect(profileDatabase.name).toBe(PUBLIC_PROFILE.name);
    expect(profileDatabase.email).toBe(PUBLIC_PROFILE.email);
    expect(profileDatabase.phone).toBe(ENV_CONFIG.phone); // fake '000-000-0000' from vitest.config.ts
    expect(profileDatabase.role.length).toBeGreaterThan(0);
    expect(Array.isArray(profileDatabase.technicalSkills)).toBe(true);
    expect(Array.isArray(profileDatabase.tools)).toBe(true);
    expect(profileDatabase.certifications.length).toBeGreaterThan(10);
  });

  it('has a valid email format', () => {
    expect(profileDatabase.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it('every social entry has a value and an https link', () => {
    expect(profileDatabase.socials.length).toBeGreaterThan(0);
    for (const s of profileDatabase.socials) {
      expect(s.value).toBeTruthy();
      expect(s.link).toMatch(/^https:\/\//);
    }
  });
});
