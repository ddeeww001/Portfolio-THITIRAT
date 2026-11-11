import { useEffect, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Use the bundled local worker for pdfjs-dist
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

/** Renders page 1 of a certificate PDF as an image, with a styled fallback cover. */
export const PDFThumbnail = ({ url, title }: { url: string; title: string }) => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const renderPDF = async () => {
      try {
        const pdf = await pdfjsLib.getDocument({ url }).promise;
        const page = await pdf.getPage(1);
        if (!isMounted) return;

        const viewport = page.getViewport({ scale: 1.2 });
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
        console.log('PDF canvas fallback active for:', url, err);
      }
    };

    renderPDF();
    return () => {
      isMounted = false;
    };
  }, [url]);

  return (
    <div
      style={{
        height: '165px',
        background: '#0a0a0c',
        borderRadius: 'var(--radius-md)',
        marginBottom: '18px',
        border: '1px solid rgba(255, 255, 255, 0.16)',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'inset 0 0 15px rgba(0,0,0,0.5)',
      }}
    >
      {/* Skeleton while rendering */}
      {!imgUrl && <div className="skeleton-box" style={{ position: 'absolute', inset: 0, zIndex: 1 }} />}

      {imgUrl ? (
        <img src={imgUrl} alt={title} className="img-fade-in is-loaded" style={{ width: '100%', height: '100%', objectFit: 'cover', zIndex: 2 }} />
      ) : (
        /* Fallback cover */
        <div style={{ padding: '16px', textAlign: 'center', position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #14151c 0%, #232430 100%)', zIndex: 2 }}>
          <div style={{ marginBottom: '8px', opacity: 0.9 }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#ffffff', fontWeight: 700, letterSpacing: '0.05em' }}>
            {title}
          </span>
        </div>
      )}

      {/* Verified badge */}
      <div
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: 'rgba(10, 10, 12, 0.88)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 'var(--radius-full)',
          padding: '2px 8px',
          fontSize: '0.65rem',
          color: '#ffffff',
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
          backdropFilter: 'blur(4px)',
          zIndex: 2,
        }}
      >
        ✓ VERIFIED
      </div>
    </div>
  );
};
