import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(__dirname, '../..');
const read = (p: string) => readFileSync(join(ROOT, p), 'utf8');

describe('Deploy workload (Vercel)', () => {
  const vercel = JSON.parse(read('vercel.json')) as {
    headers: { source: string; headers: { key: string; value: string }[] }[];
  };
  const headerFor = (source: string, key: string) =>
    vercel.headers.find((h) => h.source === source)?.headers.find((x) => x.key === key)?.value;

  it('hashed build assets and fonts are cached for a year (immutable)', () => {
    expect(headerFor('/assets/(.*)', 'Cache-Control')).toMatch(/max-age=31536000.*immutable/);
    expect(headerFor('/fonts/(.*)', 'Cache-Control')).toMatch(/max-age=31536000.*immutable/);
  });

  it('images / PDFs are cached, index.html always revalidates (so new deploys show up)', () => {
    expect(headerFor('/(picture|projects|certify_LifeLongLearning)/(.*)', 'Cache-Control')).toMatch(/max-age=\d+/);
    expect(headerFor('/', 'Cache-Control')).toMatch(/max-age=0.*must-revalidate/);
  });

  it('security headers are sent on every route', () => {
    expect(headerFor('/(.*)', 'X-Frame-Options')).toBe('DENY');
    expect(headerFor('/(.*)', 'X-Content-Type-Options')).toBe('nosniff');
    expect(headerFor('/(.*)', 'Strict-Transport-Security')).toMatch(/max-age=/);
  });

  it('fonts are self-hosted: no Google Fonts requests, local woff2 files exist', () => {
    const html = read('index.html');
    expect(html).not.toMatch(/fonts\.googleapis|fonts\.gstatic/);
    const css = read('src/shared/styles/fonts.css');
    const files = [...css.matchAll(/url\('\/fonts\/([^']+)'\)/g)].map((m) => m[1]);
    expect(files.length).toBeGreaterThanOrEqual(2);
    for (const f of files) expect(existsSync(join(ROOT, 'public/fonts', f)), f).toBe(true);
  });

  it('archived files live outside public/ (not deployed)', () => {
    expect(existsSync(join(ROOT, 'public/picture/profile.jpg'))).toBe(false);
    expect(readdirSync(join(ROOT, 'public/certify_LifeLongLearning'))).not.toContain('Logical Resoning.pdf');
    expect(existsSync(join(ROOT, 'assets-archive/picture/profile.jpg'))).toBe(true);
  });
});
