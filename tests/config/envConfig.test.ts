import { describe, it, expect } from 'vitest';
import { parseEnvConfig, ENV_CONFIG } from '../../src/config/env';
import { PROFILE_DEFAULTS } from '../../src/config/profileDefaults';
import { profileDatabase } from '../../src/features/profile/profileData';

// parseEnvConfig is pure, so every case passes its own env and never depends on the real .env.
describe('Environment Configuration (parseEnvConfig)', () => {
  it('falls back to PROFILE_DEFAULTS when env has no profile values', () => {
    const cfg = parseEnvConfig({});
    expect(cfg.name).toBe(PROFILE_DEFAULTS.VITE_USER_NAME?.trim() ?? '');
    expect(cfg.githubUsername).toBe(PROFILE_DEFAULTS.VITE_GITHUB_USERNAME?.trim() ?? '');
    expect(cfg.name).not.toBe('');
  });

  it('env wins over defaults; an empty env value still falls back', () => {
    const defaults = { VITE_USER_NAME: 'Default Name', VITE_USER_EMAIL: 'default@example.com' };
    const cfg = parseEnvConfig({ VITE_USER_NAME: 'From Env', VITE_USER_EMAIL: '  ' }, defaults);
    expect(cfg.name).toBe('From Env');
    expect(cfg.email).toBe('default@example.com');
  });

  it('returns empty strings when both env and defaults are empty', () => {
    const cfg = parseEnvConfig({}, {});
    for (const key of [
      'name', 'email', 'phone', 'birthday', 'githubUsername', 'githubUrl',
      'lineId', 'instagramUsername', 'instagramUrl', 'facebookName', 'facebookUrl',
    ] as const) {
      expect(cfg[key]).toBe('');
    }
  });

  it('uses and trims values provided by env', () => {
    const cfg = parseEnvConfig({ VITE_USER_NAME: '  Jane Doe ', VITE_GITHUB_USERNAME: 'jane' });
    expect(cfg.name).toBe('Jane Doe');
    expect(cfg.githubUsername).toBe('jane');
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

describe('profileDatabase integrity (test env from vitest.config.ts)', () => {
  it('builds profile from env values', () => {
    expect(profileDatabase.id).toBe(1);
    expect(profileDatabase.name).toBe(ENV_CONFIG.name);
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
