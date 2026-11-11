import { useEffect, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Use the bundled local worker for pdfjs-dist
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

/**
 * Renders page 1 of a certificate PDF as an image. Fills its parent (the parent sets the size);
 * shows a light placeholder (Figma: white 90% thumbnail) until rendered or if rendering fails.
 */
export const PDFThumbnail = ({ url, title }: { url: string; title: string }) => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const renderPDF = async () => {
      try {
        // verbosity ERRORS: pdf.js (incl. its separate worker file) prints no warnings/info to the console
        const pdf = await pdfjsLib.getDocument({ url, verbosity: pdfjsLib.VerbosityLevel.ERRORS }).promise;
        const page = await pdf.getPage(1);
        if (!isMounted) return;

        const viewport = page.getViewport({ scale: 0.6 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (context) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- pdfjs typings differ between versions
          await page.render({ canvasContext: context, viewport, canvas } as any).promise;
          if (isMounted) setImgUrl(canvas.toDataURL('image/png'));
        }
      } catch (err) {
        // Dev-only diagnostics: file paths and stack traces must not reach visitors' consoles.
        // import.meta.env.DEV is false in `vite build`, so this whole branch is removed.
        if (import.meta.env.DEV) console.warn('PDF thumbnail fallback for:', url, err);
      }
    };

    renderPDF();
    return () => {
      isMounted = false;
    };
  }, [url]);

  return (
    <span
      style={{
        position: 'absolute',
        inset: 0,
        display: 'block',
        background: 'rgba(255, 255, 255, 0.9)',
      }}
    >
      {!imgUrl && <span className="skeleton-box" style={{ position: 'absolute', inset: 0, opacity: 0.25 }} />}
      {imgUrl && (
        <img src={imgUrl} alt={title} className="img-fade-in is-loaded" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      )}
    </span>
  );
};
