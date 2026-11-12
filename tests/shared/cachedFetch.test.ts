import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cachedJson } from '../../src/shared/lib/cachedFetch';

const ok = (data: unknown) => ({ ok: true, status: 200, json: async () => data });

describe('cachedJson (rate-limit friendly fetch)', () => {
  beforeEach(() => sessionStorage.clear());
  afterEach(() => vi.unstubAllGlobals());

  it('second call within the TTL is served from the cache (no network)', async () => {
    const fetchMock = vi.fn().mockResolvedValue(ok({ login: 'x' }));
    vi.stubGlobal('fetch', fetchMock);
    expect(await cachedJson('https://api.example/u')).toEqual({ login: 'x' });
    expect(await cachedJson('https://api.example/u')).toEqual({ login: 'x' });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('force: true (REFRESH button) skips the cache', async () => {
    const fetchMock = vi.fn().mockResolvedValue(ok([1]));
    vi.stubGlobal('fetch', fetchMock);
    await cachedJson('https://api.example/r');
    await cachedJson('https://api.example/r', { force: true });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('expired entries are fetched again', async () => {
    const fetchMock = vi.fn().mockResolvedValue(ok(1));
    vi.stubGlobal('fetch', fetchMock);
    await cachedJson('https://api.example/t', { ttlMs: 0 });
    await cachedJson('https://api.example/t', { ttlMs: 0 });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('failed responses throw and are NOT cached', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce({ ok: false, status: 403, json: async () => ({}) }).mockResolvedValue(ok('fine'));
    vi.stubGlobal('fetch', fetchMock);
    await expect(cachedJson('https://api.example/f')).rejects.toThrow('403');
    expect(await cachedJson('https://api.example/f')).toBe('fine');
  });
});
