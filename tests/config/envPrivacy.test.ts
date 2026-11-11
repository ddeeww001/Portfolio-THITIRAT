import { describe, it, expect, vi, afterEach } from 'vitest';
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createElement } from 'react';
import { render, screen } from '@testing-library/react';

const ROOT = resolve(__dirname, '../..');

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
  vi.restoreAllMocks();
});

// ─────────────────────────────────────────────────────────────
// 1. No personal data hardcoded in source code
// ─────────────────────────────────────────────────────────────
describe('Privacy guard: personal values live only in .env', () => {
  const PERSONAL_KEYS = [
    'VITE_USER_NAME', 'VITE_USER_EMAIL', 'VITE_USER_PHONE', 'VITE_USER_BIRTHDAY',
    'VITE_GITHUB_USERNAME', 'VITE_LINE_ID', 'VITE_INSTAGRAM_USERNAME',
    'VITE_FACEBOOK_NAME', 'VITE_FACEBOOK_URL', 'VITE_INSTAGRAM_URL',
  ];

  const listSourceFiles = (dir: string): string[] =>
    readdirSync(dir).flatMap((name) => {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) return listSourceFiles(full);
      return /\.(ts|tsx|js|jsx|html)$/.test(name) ? [full] : [];
    });

  /** Minimal KEY="value" parser (importing vite itself breaks under jsdom). */
  const readDotEnv = (path: string): Record<string, string> =>
    Object.fromEntries(
      readFileSync(path, 'utf8')
        .split(/\r?\n/)
        .map((line) => line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?(.*?)"?\s*$/))
        .filter((m): m is RegExpMatchArray => !!m)
        .map((m) => [m[1], m[2]]),
    );

  const hasRealEnv = existsSync(join(ROOT, '.env'));

  // Skipped in CI (no .env there); runs on the developer machine where the real values exist.
  it.skipIf(!hasRealEnv)('src/ and index.html contain none of the real .env values', () => {
    const env = readDotEnv(join(ROOT, '.env'));
    const secrets = PERSONAL_KEYS
      .map((key) => [key, env[key]?.trim()] as const)
      .filter((e): e is readonly [string, string] => !!e[1] && e[1].length >= 4);
    const files = [...listSourceFiles(join(ROOT, 'src')), join(ROOT, 'index.html')];

    // Report only file + key name, never the value itself.
    const leaks: string[] = [];
    for (const file of files) {
      const text = readFileSync(file, 'utf8').toLowerCase();
      for (const [key, value] of secrets) {
        if (text.includes(value.toLowerCase())) leaks.push(`${file.replace(ROOT, '')} contains the value of ${key}`);
      }
    }
    expect(leaks).toEqual([]);
  });
});

// ─────────────────────────────────────────────────────────────
// 2. Missing env values → hidden, not broken
// ─────────────────────────────────────────────────────────────
describe('Missing .env values are hidden in the UI', () => {
  it('profileDatabase.socials drops entries whose value is missing', async () => {
    vi.stubEnv('VITE_INSTAGRAM_USERNAME', '');
    vi.stubEnv('VITE_LINE_ID', '');
    const { profileDatabase } = await import('../../src/features/profile/profileData');
    const labels = profileDatabase.socials.map((s) => s.label);
    expect(labels).not.toContain('Instagram');
    expect(labels).not.toContain('Line');
    expect(labels).toContain('GitHub');
  });

  it('ContactSection renders no email/phone icons when they are not set', async () => {
    vi.stubEnv('VITE_USER_EMAIL', '');
    vi.stubEnv('VITE_USER_PHONE', '');
    const { ContactSection } = await import('../../src/features/contact/ContactSection');
    render(createElement(ContactSection));
    expect(screen.queryByRole('link', { name: 'Send email' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Copy email' })).toBeNull();
    expect(screen.queryByRole('link', { name: 'Call' })).toBeNull();
  });

  it('every social label has a matching icon', async () => {
    const { profileDatabase } = await import('../../src/features/profile/profileData');
    const { socialIcons } = await import('../../src/features/contact/socialIcons');
    for (const s of profileDatabase.socials) {
      expect(socialIcons[s.label], `missing icon for ${s.label}`).toBeTypeOf('function');
    }
  });
});

// ─────────────────────────────────────────────────────────────
// 3. VITE_ENABLE_SELF_XSS_WARNING actually toggles the warning
// ─────────────────────────────────────────────────────────────
describe('initSecurityGuards respects the Self-XSS flag', () => {
  it('prints the console warning by default', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    const { initSecurityGuards } = await import('../../src/shared/lib/security');
    initSecurityGuards();
    expect(log).toHaveBeenCalled();
    expect(String(log.mock.calls[0][0])).toContain('STOP');
  });

  it('prints nothing when selfXssWarning is false', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    const { initSecurityGuards } = await import('../../src/shared/lib/security');
    initSecurityGuards({ selfXssWarning: false });
    expect(log).not.toHaveBeenCalled();
  });

  it('ENV_CONFIG passes "false" from .env through as boolean false', async () => {
    vi.stubEnv('VITE_ENABLE_SELF_XSS_WARNING', 'false');
    const { ENV_CONFIG } = await import('../../src/config/env');
    expect(ENV_CONFIG.enableSelfXssWarning).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────
// 4. GitHubSection uses the username from .env (no hardcoded fallback)
// ─────────────────────────────────────────────────────────────
describe('GitHubSection reads the username from env', () => {
  it('calls the GitHub API with VITE_GITHUB_USERNAME', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, json: async () => ({}) });
    vi.stubGlobal('fetch', fetchMock);
    const { GitHubSection } = await import('../../src/features/github/GitHubSection');
    render(createElement(GitHubSection));
    await vi.waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(fetchMock.mock.calls[0][0]).toBe('https://api.github.com/users/test-user');
    vi.unstubAllGlobals();
  });

  it('does not call the API at all when the username is missing', async () => {
    vi.stubEnv('VITE_GITHUB_USERNAME', '');
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const { GitHubSection } = await import('../../src/features/github/GitHubSection');
    render(createElement(GitHubSection));
    await screen.findByText(/VITE_GITHUB_USERNAME is not set/);
    expect(fetchMock).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
});
