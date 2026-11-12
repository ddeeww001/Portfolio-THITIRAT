"""Create the small certificate thumbnails (and optionally shrink the PDFs).

Run after adding a PDF to public/certify_LifeLongLearning:
    pip install pymupdf pillow
    python scripts/make-cert-thumbs.py            # thumbnails only
    python scripts/make-cert-thumbs.py --shrink   # + downsample the big images inside each PDF

Thumbnails: page 1 → 288px-wide WebP in public/certify_LifeLongLearning/thumbs/<same name>.webp
(the certificate list shows these instead of rendering PDFs in the browser).
Previews: page 1 → 1400px-wide WebP in .../previews/ (shown in the certificate viewer).
--shrink: images wider than 2000px are resized to 2000px (JPEG q82). A PDF is only overwritten
when it gets ≥10% smaller and page 1 still renders the same (mean pixel difference < 4/255).
"""
import io
import sys
from pathlib import Path

import pymupdf as fitz
from PIL import Image, ImageChops, ImageStat

CERT_DIR = Path(__file__).resolve().parent.parent / "public" / "certify_LifeLongLearning"
THUMB_WIDTH = 288      # list row thumbnail
PREVIEW_WIDTH = 1400   # image shown in the certificate viewer (PDFs can't be framed: X-Frame-Options DENY)
MAX_IMAGE_WIDTH = 2000


def render(doc, width):
    page = doc[0]
    zoom = width / page.rect.width
    pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=False)
    return Image.frombytes("RGB", (pix.width, pix.height), pix.samples)


def shrink(pdf_path: Path) -> str:
    before = pdf_path.stat().st_size
    doc = fitz.open(pdf_path)
    reference = render(doc, 1000)
    seen = set()
    for page in doc:
        for img in page.get_images(full=True):
            xref, width = img[0], img[2]
            if xref in seen or width <= MAX_IMAGE_WIDTH:
                continue
            seen.add(xref)
            pix = fitz.Pixmap(doc, xref)
            if pix.n - pix.alpha >= 4:  # CMYK -> RGB
                pix = fitz.Pixmap(fitz.csRGB, pix)
            im = Image.frombytes("RGB" if pix.n == 3 else "L", (pix.width, pix.height), pix.samples)
            im = im.resize((MAX_IMAGE_WIDTH, round(im.height * MAX_IMAGE_WIDTH / im.width)), Image.LANCZOS)
            buf = io.BytesIO()
            im.save(buf, "JPEG", quality=82, optimize=True, progressive=True)
            page.replace_image(xref, stream=buf.getvalue())
    out = io.BytesIO()
    doc.save(out, garbage=4, deflate=True, clean=True)
    data = out.getvalue()
    diff = ImageStat.Stat(ImageChops.difference(reference, render(fitz.open(stream=data, filetype="pdf"), 1000)).convert("L")).mean[0]
    if len(data) < before * 0.9 and diff < 4:
        pdf_path.write_bytes(data)
        return f"{before / 1e6:.2f} -> {len(data) / 1e6:.2f} MB"
    return "kept original"


def main():
    do_shrink = "--shrink" in sys.argv
    thumbs = CERT_DIR / "thumbs"
    thumbs.mkdir(exist_ok=True)
    previews = CERT_DIR / "previews"
    previews.mkdir(exist_ok=True)
    for pdf in sorted(CERT_DIR.glob("*.pdf")):
        note = shrink(pdf) if do_shrink else ""
        doc = fitz.open(pdf)
        render(doc, THUMB_WIDTH).save(thumbs / f"{pdf.stem}.webp", "WEBP", quality=80, method=6)
        render(doc, PREVIEW_WIDTH).save(previews / f"{pdf.stem}.webp", "WEBP", quality=82, method=6)
        print(f"{pdf.name}: thumbnail + preview ok {note}")


if __name__ == "__main__":
    main()
