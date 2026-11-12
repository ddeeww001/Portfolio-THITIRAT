/**
 * fetch() + JSON with a short-lived cache in sessionStorage.
 *
 * Used for public APIs with strict rate limits (GitHub: 60 requests/hour per visitor IP without a
 * token). Re-renders, re-opening the section or reloading the page within `ttlMs` reuse the
 * stored copy instead of calling the API again. Only successful responses are stored.
 * Storage can be unavailable (private mode, blocked) — then it simply behaves like fetch().
 */
export async function cachedJson<T>(url: string, { ttlMs = 10 * 60 * 1000, force = false } = {}): Promise<T> {
  const key = `cache:${url}`;

  if (!force) {
    try {
      const hit = sessionStorage.getItem(key);
      if (hit) {
        const { at, data } = JSON.parse(hit) as { at: number; data: T };
        if (Date.now() - at < ttlMs) return data;
      }
    } catch {
      /* no storage — fall through to the network */
    }
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  const data = (await res.json()) as T;

  try {
    sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), data }));
  } catch {
    /* quota / disabled storage — caching is optional */
  }
  return data;
}
