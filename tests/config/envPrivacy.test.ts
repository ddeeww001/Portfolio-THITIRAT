import { describe, it, expect, vi, afterEach } from 'vitest';
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createElement } from 'react';
import { render, screen } from '@testing-library/react';
import { PUBLIC_PROFILE } from '../../src/config/profile';

const ROOT = resolve(__dirname, '../..');

/** Browser code only: src/backend runs on the server, its logs never reach visitors. */
const listFrontendFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return name === 'backend' ? [] : listFrontendFiles(full);
    return /\.(ts|tsx|js|jsx)$/.test(name) ? [full] : [];
  });

/** Replace the public profile with one whose fields are emptied (to test "missing data" UI). */
const withProfile = (overrides: Partial<Record<keyof typeof PUBLIC_PROFILE, string>>) =>
  vi.doMock('../../src/config/profile', () => ({ PUBLIC_PROFILE: { ...PUBLIC_PROFILE, ...overrides } }));

const EMPTY_PROFILE = Object.fromEntries(Object.keys(PUBLIC_PROFILE).map((k) => [k, ''])) as Record<
  keyof typeof PUBLIC_PROFILE,
  string
>;

afterEach(() => {
  vi.doUnmock('../../src/config/profile');
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.resetModules();
  vi.restoreAllMocks();
  sessionStorage.clear();
});

// ─────────────────────────────────────────────────────────────
// 1. Public vs private data
// ─────────────────────────────────────────────────────────────
describe('Profile data: public in src/config/profile.ts, private only in .env', () => {
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

  it('public profile has the name, email, GitHub and social links', () => {
    expect(PUBLIC_PROFILE.name).not.toBe('');
    expect(PUBLIC_PROFILE.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(PUBLIC_PROFILE.githubUrl).toBe(`https://github.com/${PUBLIC_PROFILE.githubUsername}`);
    for (const url of [PUBLIC_PROFILE.instagramUrl, PUBLIC_PROFILE.facebookUrl]) expect(url).toMatch(/^https:\/\//);
    expect(Object.isFrozen(PUBLIC_PROFILE)).toBe(true);
  });

  it('the public profile file holds no phone number or other private data', () => {
    const text = readFileSync(join(ROOT, 'src/config/profile.ts'), 'utf8');
    expect(text).not.toMatch(/\b0\d{1,2}[- ]?\d{3}[- ]?\d{4}\b/); // Thai phone number pattern
    expect(Object.keys(PUBLIC_PROFILE)).not.toContain('phone');
    expect(Object.keys(PUBLIC_PROFILE)).not.toContain('birthday');
    expect(text).not.toMatch(/^\s*(phone|birthday|password|secret|token)\s*:/im);
  });

  // Skipped in CI (no .env there); runs on the developer machine where the real values exist.
  it.skipIf(!existsSync(join(ROOT, '.env')))('the real phone number from .env appears in no source file', () => {
    const phone = readDotEnv(join(ROOT, '.env')).VITE_USER_PHONE?.trim();
    if (!phone || phone.length < 4) return;
    const digits = phone.replace(/\D/g, '');
    const leaks = [...listSourceFiles(join(ROOT, 'src')), join(ROOT, 'index.html')].filter((file) => {
      const text = readFileSync(file, 'utf8');
      return text.includes(phone) || text.replace(/\D/g, '').includes(digits);
    });
    // Report only file names, never the value itself.
    expect(leaks.map((f) => f.replace(ROOT, ''))).toEqual([]);
  });

  it('.env.example lists only private keys (no public profile keys left in env)', () => {
    const example = readFileSync(join(ROOT, '.env.example'), 'utf8');
    expect(example).toMatch(/^VITE_USER_PHONE=/m);
    for (const key of ['VITE_USER_NAME', 'VITE_USER_EMAIL', 'VITE_GITHUB_USERNAME', 'VITE_FACEBOOK_URL', 'VITE_USER_BIRTHDAY']) {
      expect(example).not.toMatch(new RegExp(`^${key}=`, 'm'));
    }
  });
});

// ─────────────────────────────────────────────────────────────
// 2. Missing values → hidden, not broken
// ─────────────────────────────────────────────────────────────
describe('Missing values are hidden in the UI', () => {
  it('profileDatabase.socials drops entries whose value is empty', async () => {
    withProfile({ instagramUsername: '', lineId: '' });
    const { profileDatabase } = await import('../../src/features/profile/profileData');
    const labels = profileDatabase.socials.map((s) => s.label);
    expect(labels).not.toContain('Instagram');
    expect(labels).not.toContain('Line');
    expect(labels).toContain('GitHub');
  });

  it('no phone in .env → no "Call" icon (email icon still shown)', async () => {
    vi.stubEnv('VITE_USER_PHONE', '');
    const { ContactSection } = await import('../../src/features/contact/ContactSection');
    render(createElement(ContactSection));
    expect(screen.queryByRole('link', { name: 'Call' })).toBeNull();
    expect(screen.getByRole('link', { name: 'Send email' })).toBeTruthy();
  });

  it('every social label has a matching icon', async () => {
    const { profileDatabase } = await import('../../src/features/profile/profileData');
    const { socialIcons } = await import('../../src/features/contact/socialIcons');
    for (const s of profileDatabase.socials) {
      expect(socialIcons[s.label], `missing icon for ${s.label}`).toBeTypeOf('function');
    }
  });

  it('with no contact data at all, the Contact section and its nav link disappear', async () => {
    withProfile(EMPTY_PROFILE);
    vi.stubEnv('VITE_USER_PHONE', '');
    const { ContactSection } = await import('../../src/features/contact/ContactSection');
    const { navItems, contactAvailable } = await import('../../src/app/navigation');
    const { container } = render(createElement(ContactSection));
    expect(container).toBeEmptyDOMElement();
    expect(contactAvailable).toBe(false);
    expect(navItems.map((i) => i.id)).not.toContain('contact');
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

  it('never reveals which defences are active (no headers / CSP / anti-tamper hints)', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    const { initSecurityGuards } = await import('../../src/shared/lib/security');
    initSecurityGuards();
    const printed = log.mock.calls.map((c) => String(c[0])).join('\n');
    expect(printed).not.toMatch(/header|csp|content-security|anti-tamper|\[system\]/i);
  });

  it('frontend code has no console output except the Self-XSS warning and dev-only logs', () => {
    const files = listFrontendFiles(join(ROOT, 'src'));
    const offenders = files.flatMap((file) =>
      readFileSync(file, 'utf8').split('\n')
        .map((line, i) => ({ line: line.trim(), at: `${file.slice(ROOT.length + 1)}:${i + 1}` }))
        .filter(({ line }) => /(^|[^.\w])console\.\w+\(/.test(line) && !line.includes('import.meta.env.DEV'))
        .map(({ at }) => at),
    );
    expect(offenders).toEqual([]);
  });

  it.each(['.env', '.env.example'])('%s does not set NODE_ENV (it would make `vite build` a dev build)', (file) => {
    const path = join(ROOT, file);
    if (!existsSync(path)) return;
    expect(readFileSync(path, 'utf8')).not.toMatch(/^\s*NODE_ENV\s*=/m);
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
// 4. GitHubSection uses the username from the public profile
// ─────────────────────────────────────────────────────────────
describe('GitHubSection reads the username from src/config/profile.ts', () => {
  it('calls the GitHub API with the public GitHub username', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 500, json: async () => ({}) });
    vi.stubGlobal('fetch', fetchMock);
    const { GitHubSection } = await import('../../src/features/github/GitHubSection');
    render(createElement(GitHubSection));
    await vi.waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(fetchMock.mock.calls[0][0]).toBe(`https://api.github.com/users/${PUBLIC_PROFILE.githubUsername}`);
  });

  it('renders nothing and calls no API when the username is emptied', async () => {
    withProfile({ githubUsername: '', githubUrl: '' });
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const { GitHubSection } = await import('../../src/features/github/GitHubSection');
    const { container } = render(createElement(GitHubSection));
    expect(container).toBeEmptyDOMElement();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
