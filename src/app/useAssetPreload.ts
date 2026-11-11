import { useEffect, useState } from 'react';

const loadImage = (src: string) =>
  new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve(); // a broken image must never block the page
    img.src = src;
  });

/** Waits for critical images and web fonts. Returns true while still loading. */
export function useAssetPreload(images: string[]): boolean {
  const [loading, setLoading] = useState(true);
  const key = images.join('|');

  useEffect(() => {
    let cancelled = false;
    const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
    Promise.all([...key.split('|').filter(Boolean).map(loadImage), fonts])
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [key]);

  return loading;
}
