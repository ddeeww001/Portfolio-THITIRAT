import { useEffect, useState } from 'react';

export type ImageStatus = 'idle' | 'loading' | 'loaded' | 'error';

/** Downloads and decodes an image off the main thread; resolves once it can be painted without a blank flash. */
export async function loadImage(src: string): Promise<void> {
  const img = new Image();
  img.decoding = 'async';
  img.src = src;
  await img.decode(); // rejects if the file is missing or not an image
}

/** Warm the browser cache (e.g. on hover) so a viewer opens instantly. Errors are ignored. */
export function preloadImage(src: string): void {
  loadImage(src).catch(() => {});
}

/**
 * Tracks the loading state of `src` with async/await, so the UI can show a placeholder
 * while it loads and a fallback if it fails. A newer `src` cancels the older result.
 */
export function useImageLoader(src: string | null | undefined): ImageStatus {
  // Result is remembered per src; anything not finished yet for the current src counts as "loading".
  const [result, setResult] = useState<{ src: string; status: 'loaded' | 'error' } | null>(null);

  useEffect(() => {
    if (!src) return;
    let cancelled = false;
    (async () => {
      try {
        await loadImage(src);
        if (!cancelled) setResult({ src, status: 'loaded' });
      } catch {
        if (!cancelled) setResult({ src, status: 'error' });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!src) return 'idle';
  return result?.src === src ? result.status : 'loading';
}
