import { describe, it, expect } from 'vitest';
import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { CERT_CATEGORIES, certFilePath, certMatchesCategory, certThumbPath } from '../../../src/features/certificates/certificatesData';
import { profileDatabase } from '../../../src/features/profile/profileData';

describe('certificatesData', () => {
  it('every certificate in profileData points to a PDF that exists in /public', () => {
    const missing = profileDatabase.certifications.filter(
      (title) => !existsSync(resolve(__dirname, '../../../public', `.${certFilePath(title)}`)),
    );
    expect(missing).toEqual([]);
  });

  it('every certificate has a small pre-rendered thumbnail (the list never downloads PDFs)', () => {
    const missing = profileDatabase.certifications.filter(
      (title) => !existsSync(resolve(__dirname, '../../../public', `.${certThumbPath(title)}`)),
    );
    expect(missing).toEqual([]);
  });

  it('thumbnails are small WebP files (< 40 KB each)', () => {
    for (const title of profileDatabase.certifications) {
      const file = resolve(__dirname, '../../../public', `.${certThumbPath(title)}`);
      expect(certThumbPath(title)).toMatch(/\/thumbs\/.+\.webp$/);
      expect(statSync(file).size, title).toBeLessThan(40 * 1024);
    }
  });

  it('starts with ALL and lists the category tabs', () => {
    expect(CERT_CATEGORIES[0]).toBe('ALL');
    expect(CERT_CATEGORIES).toContain('Communication');
  });

  it('matches categories by keyword (case-insensitive)', () => {
    expect(certMatchesCategory('Agile Thinking', 'Agile & Thinking')).toBe(true);
    expect(certMatchesCategory('Active Listening', 'Communication')).toBe(true);
    expect(certMatchesCategory('Active Listening', 'Agile & Thinking')).toBe(false);
  });

  it('unknown categories match everything (safe default)', () => {
    expect(certMatchesCategory('Anything', 'Not a category')).toBe(true);
  });
});
