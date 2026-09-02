import { describe, it, expect } from 'vitest';
import { ENV_CONFIG, profileDatabase } from '../../src/data/profileData';

describe('Environment Configuration & Data Integrity Tests (Backend/Data Test Suite)', () => {
  it('has valid default fallback values for all required environment variables', () => {
    expect(ENV_CONFIG.name).toBeTruthy();
    expect(ENV_CONFIG.email).toContain('@');
    expect(ENV_CONFIG.phone).toBeTruthy();
    expect(ENV_CONFIG.githubUsername).toBe('ddeeww001');
    expect(ENV_CONFIG.githubUrl).toMatch(/^https:\/\/github\.com\//);
    expect(ENV_CONFIG.instagramUrl).toMatch(/^https:\/\/instagram\.com\//);
    expect(ENV_CONFIG.facebookUrl).toMatch(/^https:\/\/facebook\.com\//);
  });

  it('verifies profileDatabase data schema integrity', () => {
    expect(profileDatabase.id).toBe(1);
    expect(profileDatabase.name).toBe(ENV_CONFIG.name);
    expect(Array.isArray(profileDatabase.role)).toBe(true);
    expect(profileDatabase.role.length).toBeGreaterThan(0);
    expect(Array.isArray(profileDatabase.technicalSkills)).toBe(true);
    expect(Array.isArray(profileDatabase.tools)).toBe(true);
    expect(Array.isArray(profileDatabase.certifications)).toBe(true);
    expect(profileDatabase.certifications.length).toBeGreaterThan(10);
  });

  it('validates email format regex', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test(ENV_CONFIG.email)).toBe(true);
  });
});
