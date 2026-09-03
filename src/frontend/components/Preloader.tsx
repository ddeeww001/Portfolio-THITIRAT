import React, { useEffect, useState } from 'react';
import '../CSS/preloader.css';

export interface PreloaderProps {
  /**
   * External loading state (e.g. while fetching initial assets or fonts).
   * When true, the ring continues spinning. When false, it fades out smoothly.
   */
  isLoading?: boolean;
  /**
   * Minimum duration in milliseconds to prevent flickering on fast connections.
   * Default: 300ms (fast & responsive)
   */
  minimumDuration?: number;
  /**
   * Callback fired when the spinning ring loader finishes fading out.
   */
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({
  isLoading = false,
  minimumDuration = 300,
  onComplete,
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const startTime = Date.now();

    const checkReady = () => {
      const elapsed = Date.now() - startTime;
      if (!isLoading && elapsed >= minimumDuration) {
        setIsExiting(true);
        setTimeout(() => {
          setIsMounted(false);
          if (onComplete) onComplete();
        }, 400);
      } else {
        setTimeout(checkReady, 50);
      }
    };

    const timer = setTimeout(checkReady, 50);
    return () => clearTimeout(timer);
  }, [isLoading, minimumDuration, onComplete]);

  if (!isMounted) return null;

  return (
    <div
      className={`minimal-preloader-overlay ${isExiting ? 'is-exiting' : ''}`}
      aria-label="Loading Page"
      role="status"
    >
      <div className="minimal-spinner-container">
        {/* Glowing dual-ring spinner */}
        <div className="minimal-spinner-ring" />
        <div className="minimal-spinner-ring-inner" />
      </div>
    </div>
  );
};

export default Preloader;
