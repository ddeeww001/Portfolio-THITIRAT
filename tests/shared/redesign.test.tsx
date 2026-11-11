import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { SkyBackdrop } from '../../src/shared/components/SkyBackdrop';
import { useAutoScroll } from '../../src/shared/hooks/useAutoScroll';

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('SkyBackdrop (still background)', () => {
  it('is decorative: hidden from screen readers and draws the stars as SVG', () => {
    render(<SkyBackdrop />);
    const backdrop = screen.getByTestId('sky-backdrop');
    expect(backdrop).toHaveAttribute('aria-hidden', 'true');
    expect(backdrop.querySelector('svg')).not.toBeNull();
    expect(backdrop.querySelectorAll('line').length).toBeGreaterThan(200);
  });

  it('renders the exact same stars every time (deterministic still image)', () => {
    const a = render(<SkyBackdrop />).container.innerHTML;
    const b = render(<SkyBackdrop />).container.innerHTML;
    expect(a).toBe(b);
  });

  it('is a still image: no canvas and no animation frames', () => {
    const raf = vi.spyOn(window, 'requestAnimationFrame');
    render(<SkyBackdrop />);
    expect(screen.getByTestId('sky-backdrop').querySelector('canvas')).toBeNull();
    expect(raf).not.toHaveBeenCalled();
  });
});

/** Minimal scroller wired to the hook, with a fake measurable width. */
function Scroller({ disabled = false }: { disabled?: boolean }) {
  const ref = useAutoScroll<HTMLDivElement>({ speed: 100, resumeAfterMs: 500, disabled });
  return (
    <div ref={ref} data-testid="scroller">
      <span>a</span>
      <span>a</span>
    </div>
  );
}

const mockRaf = () => {
  let cb: FrameRequestCallback | null = null;
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation((fn) => {
    cb = fn;
    return 1;
  });
  vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
  return (time: number) => act(() => cb?.(time));
};

describe('useAutoScroll (certificate ticker)', () => {
  it('moves slowly on its own and pauses while hovered', () => {
    const frame = mockRaf();
    render(<Scroller />);
    const el = screen.getByTestId('scroller');
    Object.defineProperty(el, 'scrollWidth', { value: 4000, configurable: true });

    frame(1000);
    frame(1100); // 0.1 s at 100 px/s → 10 px
    expect(el.scrollLeft).toBe(10);

    fireEvent.mouseEnter(el);
    frame(1200);
    frame(1300);
    expect(el.scrollLeft).toBe(10); // paused under the pointer
  });

  it('resumes after the user stops interacting', () => {
    vi.useFakeTimers();
    const frame = mockRaf();
    render(<Scroller />);
    const el = screen.getByTestId('scroller');
    Object.defineProperty(el, 'scrollWidth', { value: 4000, configurable: true });

    fireEvent.wheel(el); // manual scroll pauses it
    frame(1000);
    frame(1100);
    expect(el.scrollLeft).toBe(0);

    act(() => vi.advanceTimersByTime(600)); // resumeAfterMs = 500
    frame(1200);
    expect(el.scrollLeft).toBe(10);
  });

  it('never auto-scrolls when disabled (e.g. reduced motion)', () => {
    const raf = vi.spyOn(window, 'requestAnimationFrame');
    render(<Scroller disabled />);
    expect(raf).not.toHaveBeenCalled();
  });
});
