import { useEffect, useRef, type RefObject } from 'react';

interface Options {
  /** Auto-scroll speed in pixels per second. */
  speed?: number;
  /** How long to wait after the user stops interacting before auto-scroll resumes (ms). */
  resumeAfterMs?: number;
  /** Turn auto-scroll off entirely (manual scrolling still works). */
  disabled?: boolean;
}

/**
 * Slowly auto-scrolls a horizontal scroll container in a loop while still letting the
 * user scroll it by wheel, trackpad, touch, keyboard or mouse-drag.
 *
 * The container's content must be the item list rendered TWICE back to back:
 * when scrollLeft passes the first copy it jumps back by exactly one copy, so the loop is seamless.
 * Pauses on hover/focus/interaction; never moves when the user prefers reduced motion.
 */
export function useAutoScroll<T extends HTMLElement>({ speed = 25, resumeAfterMs = 2500, disabled = false }: Options = {}): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    let paused = false;
    let resumeTimer: ReturnType<typeof setTimeout> | undefined;
    let frame = 0;
    let last = 0;
    let carry = 0; // sub-pixel progress (scrollLeft only stores whole pixels in some browsers)

    const wrap = () => {
      const half = el.scrollWidth / 2;
      if (half <= 0) return;
      if (el.scrollLeft >= half) el.scrollLeft -= half;
      else if (el.scrollLeft <= 0 && carry < 0) el.scrollLeft += half;
    };

    const pause = () => {
      paused = true;
      clearTimeout(resumeTimer);
    };
    const resumeLater = () => {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        paused = false;
      }, resumeAfterMs);
    };
    const nudge = () => {
      pause();
      resumeLater();
    };

    // ── Mouse drag-to-scroll (touch already scrolls natively) ──
    let dragStartX = 0;
    let dragStartScroll = 0;
    let dragging = false;
    let moved = false;
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      dragging = true;
      moved = false;
      dragStartX = e.clientX;
      dragStartScroll = el.scrollLeft;
      pause();
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - dragStartX;
      if (Math.abs(dx) > 4) {
        moved = true;
        el.classList.add('is-dragging');
      }
      el.scrollLeft = dragStartScroll - dx;
      wrap();
    };
    const onPointerUp = () => {
      if (!dragging) return;
      dragging = false;
      el.classList.remove('is-dragging');
      resumeLater();
    };
    // A drag must not also count as a click on the card underneath
    const onClickCapture = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };

    const onEnter = () => pause();
    const onLeave = () => {
      if (!dragging) resumeLater();
    };
    const onScroll = () => wrap();

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('focusin', pause);
    el.addEventListener('focusout', resumeLater);
    el.addEventListener('wheel', nudge, { passive: true });
    el.addEventListener('touchstart', pause, { passive: true });
    el.addEventListener('touchend', resumeLater, { passive: true });
    el.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    el.addEventListener('click', onClickCapture, true);
    el.addEventListener('scroll', onScroll, { passive: true });

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;
      if (paused || document.hidden) return;
      carry += speed * dt;
      const step = Math.trunc(carry);
      if (step !== 0) {
        el.scrollLeft += step;
        carry -= step;
        wrap();
      }
    };
    if (!disabled && !reduceMotion) frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(resumeTimer);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('focusin', pause);
      el.removeEventListener('focusout', resumeLater);
      el.removeEventListener('wheel', nudge);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('touchend', resumeLater);
      el.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('click', onClickCapture, true);
      el.removeEventListener('scroll', onScroll);
    };
  }, [speed, resumeAfterMs, disabled]);

  return ref;
}
