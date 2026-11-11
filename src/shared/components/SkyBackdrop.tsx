import './skyBackdrop.css';

/** Small deterministic random generator, so the stars are identical on every load (a still image). */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

interface Star {
  x: number;
  y: number;
  r: number;
  o: number;
}

const rand = seeded(20260111);
/** 220 small stars + 14 brighter ones, denser towards the top of the sky. */
const STARS: Star[] = Array.from({ length: 234 }, (_, i) => {
  const bright = i >= 220;
  const y = Math.pow(rand(), 1.6) * 100; // bias towards the top
  return {
    x: rand() * 100,
    y,
    r: bright ? 1.4 + rand() * 0.8 : 0.4 + rand() * 0.7,
    o: bright ? 0.85 : 0.25 + rand() * 0.5,
  };
});

/**
 * Fixed, decorative page background: a still night sky (navy → black gradient,
 * a soft purple/teal horizon glow and a field of stars). No animation, no pointer events.
 */
export const SkyBackdrop = () => (
  <div className="sky-backdrop" aria-hidden="true" data-testid="sky-backdrop">
    <svg className="sky-backdrop__stars" viewBox="0 0 100 100" preserveAspectRatio="none" role="presentation" focusable="false">
      {STARS.map((s, i) => (
        // A zero-length line with a round cap + non-scaling stroke = a round dot in screen pixels,
        // even though the SVG stretches to fill the viewport.
        <line
          key={i}
          x1={s.x.toFixed(2)}
          y1={s.y.toFixed(2)}
          x2={s.x.toFixed(2)}
          y2={s.y.toFixed(2)}
          stroke="#ffffff"
          strokeOpacity={s.o}
          strokeWidth={s.r * 2}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
    <div className="sky-backdrop__horizon" />
    <div className="sky-backdrop__vignette" />
  </div>
);
