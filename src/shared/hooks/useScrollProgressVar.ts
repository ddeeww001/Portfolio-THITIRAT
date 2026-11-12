import { useEffect, useRef } from 'react';

/**
 * Writes how far the page has scrolled past the top of the element (0 → 1) into a CSS variable
 * on that element, so CSS can animate with it (transform/opacity only — no React re-renders).
 *
 * Cheap by design: passive scroll listener, at most one update per frame (rAF), and no work at
 * all while the element is off screen. Users who prefer reduced motion get a static 0.
 */
export function useScrollProgressVar<T extends HTMLElement>(varName = '--scroll-progress', distanceRatio = 0.6) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let visible = true;

    const update = () => {
      frame = 0;
      const distance = Math.max(1, el.offsetHeight * distanceRatio);
      const scrolled = window.scrollY - el.offsetTop;
      const progress = Math.min(1, Math.max(0, scrolled / distance));
      el.style.setProperty(varName, progress.toFixed(3));
    };
    const onScroll = () => {
      if (visible && !frame) frame = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible) onScroll();
    });
    observer.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [varName, distanceRatio]);

  return ref;
}
