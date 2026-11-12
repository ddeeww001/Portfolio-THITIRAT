import { describe, it, expect } from 'vitest';
import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { projectsDatabase } from '../../../src/features/projects/projectsData';

const publicFile = (src: string) => resolve(__dirname, '../../../public', `.${src}`);

describe('project images (card image + SEE MORE gallery)', () => {
  const all = projectsDatabase.flatMap((p) => [
    ...(p.image ? [{ project: p.title, src: p.image }] : []),
    ...(p.gallery ?? []).map((g) => ({ project: p.title, src: g.src })),
  ]);

  it('every referenced image exists in /public and is not empty', () => {
    const missing = all.filter(({ src }) => !existsSync(publicFile(src)) || statSync(publicFile(src)).size === 0);
    expect(missing).toEqual([]);
  });

  it('images are local files, never remote/temporary URLs', () => {
    expect(all.filter(({ src }) => !src.startsWith('/projects/'))).toEqual([]);
  });

  it('CM Craft Map, ETHChiangmai and YOUNG DEV HACKATHON have a static card image', () => {
    const withImage = (needle: string) => projectsDatabase.find((p) => p.title.includes(needle))?.image;
    expect(withImage('CM CRAFT MAP')).toBe('/projects/cm-craft-map-hero.webp');
    expect(withImage('ETHChaingmai')).toBe('/projects/ethchiangmai-presentation.webp');
    expect(withImage('YOUNG DEV HACKATHON')).toBe('/projects/young-dev-hackathon.webp');
    expect(withImage('CAMT open house')).toBe('/projects/camt-web3-club-booth.webp');
  });

  it('every project has a local cover, so no card calls the slow external screenshot API', () => {
    const noCover = projectsDatabase.filter((p) => !(p.image ?? p.gallery?.[0]?.src)).map((p) => p.title);
    expect(noCover).toEqual([]);
  });

  it('every gallery image has a caption', () => {
    const noCaption = projectsDatabase.flatMap((p) => (p.gallery ?? []).filter((g) => !g.caption.trim()));
    expect(noCaption).toEqual([]);
  });
});
