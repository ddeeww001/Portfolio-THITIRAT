"""Generate the hero cloud bank: an engraved cumulus drawn only with horizontal scan lines.

    pip install pillow numpy
    python scripts/make-hero-cloud.py            # writes public/picture/hero-cloud.webp

Style: billowing cloud mass (dense on the left, tapering to the right), each billow lit from the
top — bright tops are drawn with thick lines, shaded undersides with thin/broken lines, and every
billow gets an engraved contour on its upper edge. Output is white on transparent so it sits on
the dark sky; the page mirrors it for the right-hand side.
"""
from pathlib import Path
import math
import random

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

OUT = Path(__file__).resolve().parent.parent / "public" / "picture" / "hero-cloud.webp"
W, H = 1600, 760
SS = 2                      # supersampling for smooth edges
PITCH = 11                  # distance between scan lines (px, final size)
SEED = 7

rnd = random.Random(SEED)


def billows():
    """Rows of overlapping puffs, back (top) to front (bottom); the mass tapers to the right."""
    out = []
    rows = 5
    for row in range(rows):
        t = row / (rows - 1)                       # 0 = back/top row, 1 = front/bottom row
        base_y = 150 + t * 520
        reach = 0.45 + 0.55 * t                    # lower rows reach further right
        x = -60.0
        while x < W * reach:
            taper = 1 - x / (W * 1.05)
            r = rnd.uniform(70, 135) * (0.5 + 0.6 * taper) * (0.8 + 0.4 * t)
            out.append((x + r * 0.6, base_y - rnd.uniform(-30, 95) * taper, r))
            x += r * rnd.uniform(0.75, 1.4)
            if rnd.random() < 0.35:                # small puffs nested on top break up the rows
                rs = r * rnd.uniform(0.35, 0.55)
                out.append((x - r * rnd.uniform(0.2, 0.9), base_y - r * rnd.uniform(0.5, 0.9), rs))
    # a few towering heads at the back-left, like the reference
    for _ in range(3):
        r = rnd.uniform(110, 160)
        out.append((rnd.uniform(40, 420), rnd.uniform(90, 230), r))
    out.sort(key=lambda b: b[1] - b[2] * 0.2)       # draw back-to-front
    return out


def main():
    w, h = W * SS, H * SS
    shade = np.zeros((h, w), np.float32)           # 0..1 brightness, last (front) billow wins
    mask = np.zeros((h, w), bool)
    contour = np.zeros((h, w), np.uint8)
    yy, xx = np.mgrid[0:h, 0:w]
    puffs = billows()

    for cx, cy, r in puffs:
        cx, cy, r = cx * SS, cy * SS, r * SS
        d = np.hypot(xx - cx, (yy - cy) * 1.08)
        inside = d <= r
        # light from the top: bright crown, darker belly, a darker rim near the lower edge
        v = (cy - yy) / r                           # +1 top .. -1 bottom
        light = np.clip(0.5 + 0.75 * v, 0, 1) ** 1.3
        rim = np.clip((d / r - 0.86) / 0.14, 0, 1) * (v < 0.2)
        light = np.clip(light - 0.6 * rim, 0, 1)
        shade[inside] = light[inside]
        mask |= inside
        contour[inside] = 0          # a billow in front hides the contours behind it
        cimg = Image.new("L", (w, h), 0)
        cd = ImageDraw.Draw(cimg)
        a0, a1 = rnd.uniform(185, 215), rnd.uniform(320, 350)
        cd.arc([cx - r, cy - r / 1.08, cx + r, cy + r / 1.08], a0, a1, fill=255, width=int(2.4 * SS))
        # an inner echo line on bigger billows (engraving style), no hooks
        if r > 70 * SS:
            k = 0.86
            cd.arc([cx - r * k, cy - r * k / 1.08 + r * 0.05, cx + r * k, cy + r * k / 1.08 + r * 0.05],
                   a0 + 15, a0 + rnd.uniform(55, 85), fill=200, width=int(1.4 * SS))
        contour = np.maximum(contour, np.asarray(cimg))

    # soften the silhouette a touch
    m_img = Image.fromarray((mask * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(2 * SS))
    mask = np.asarray(m_img) > 127

    img = Image.new("L", (w, h), 0)
    draw = ImageDraw.Draw(img)

    # 1) scan lines: thickness follows the shading; dark areas break into dashes
    pitch = PITCH * SS
    for y0 in range(0, h, pitch):
        row_mask = mask[y0]
        row_shade = shade[y0]
        x = 0
        while x < w:
            if not row_mask[x]:
                x += 1
                continue
            start = x
            while x < w and row_mask[x]:
                x += 1
            seg_shade = row_shade[start:x]
            # walk the run, emitting dashes whose thickness tracks the local shade
            sx = start
            while sx < x:
                s = float(seg_shade[sx - start])
                thick = 0.8 + 4.2 * s ** 1.2         # px (final)
                length = int(rnd.uniform(30, 160) * SS * (0.3 + s))
                ex = min(x, sx + max(length, 6 * SS))
                if s > 0.3 or (s > 0.08 and rnd.random() < s * 2):  # shadows: sparse, broken
                    half = thick * SS / 2
                    draw.rectangle([sx, y0 - half, ex, y0 + half], fill=int(150 + 105 * s))
                gap = int(rnd.uniform(2, 14) * SS * (1.3 - s)) if s < 0.6 else int(rnd.uniform(0, 3) * SS)
                sx = ex + gap

    # 2) engraved contours (already occluded back-to-front)
    img = Image.fromarray(np.maximum(np.asarray(img), contour))

    # keep everything inside the silhouette, fade the far right and bottom out
    alpha = np.asarray(img, np.float32) * mask
    fade_x = np.clip(1.15 - xx / w, 0, 1) ** 0.6
    fade_y = np.clip((h - yy) / (h * 0.18), 0, 1)
    alpha = alpha * fade_x * fade_y

    rgba = np.zeros((h, w, 4), np.uint8)
    rgba[..., :3] = 255
    rgba[..., 3] = np.clip(alpha, 0, 255).astype(np.uint8)
    out = Image.fromarray(rgba).resize((W, H), Image.LANCZOS)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    out.save(OUT, "WEBP", quality=88, method=6)
    print(f"wrote {OUT} ({OUT.stat().st_size / 1024:.0f} KB)")


if __name__ == "__main__":
    main()
