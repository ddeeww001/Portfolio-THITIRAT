import React, { useEffect, useState } from 'react';
import '../CSS/preloader.css';
import { playIntroChime } from './SoundEffects';

export interface PreloaderProps {
  /**
   * External loading state (e.g. while fetching API or assets).
   * When true, progress climbs up to ~88% and holds until isLoading is false.
   */
  isLoading?: boolean;
  /**
   * Minimum duration in milliseconds to ensure smooth branded experience.
   * Default: 1600ms
   */
  minimumDuration?: number;
  /**
   * Callback fired when preloader exit animation completes.
   */
  onComplete?: () => void;
  /**
   * Custom brand title.
   * Default: "THITIRAT SIRISAWAD"
   */
  title?: string;
  /**
   * Custom subtitle / role tagline.
   * Default: "CREATIVE DEVELOPER & UX/UI DESIGNER"
   */
  subtitle?: string;
}

export const Preloader: React.FC<PreloaderProps> = ({
  isLoading = false,
  minimumDuration = 1600,
  onComplete,
  title = "THITIRAT SIRISAWAD",
  subtitle = "CREATIVE DEVELOPER & UX/UI DESIGNER",
}) => {
  const [progress, setProgress] = useState(0);
  const [phaseText, setPhaseText] = useState('INITIALIZING PORTFOLIO ENGINE . . .');
  const [isExiting, setIsExiting] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    let currentProgress = 0;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const timeRatio = Math.min(elapsed / minimumDuration, 1);

      if (isLoading) {
        // Hold around 88% if external data is still loading
        const targetProgress = Math.min(Math.round(timeRatio * 88), 88);
        if (currentProgress < targetProgress) {
          currentProgress += Math.max(1, Math.floor((targetProgress - currentProgress) * 0.2));
        }
      } else {
        // Fast-forward smoothly to 100%
        if (timeRatio < 1 && currentProgress < 85) {
          currentProgress = Math.round(timeRatio * 90);
        } else {
          currentProgress += Math.max(2, Math.floor((100 - currentProgress) * 0.25));
          if (currentProgress >= 99) {
            currentProgress = 100;
          }
        }
      }

      setProgress(currentProgress);

      // Dynamic phase text based on progress milestone
      if (currentProgress < 25) {
        setPhaseText('INITIALIZING PORTFOLIO ENGINE . . .');
      } else if (currentProgress < 50) {
        setPhaseText('LOADING CREATIVE COMPONENTS . . .');
      } else if (currentProgress < 75) {
        setPhaseText('VERIFYING DATA & CREDENTIALS . . .');
      } else if (currentProgress < 95) {
        setPhaseText('PREPARING USER EXPERIENCE . . .');
      } else {
        setPhaseText('EXPERIENCE READY .');
      }

      // When 100% is reached, trigger exit transition
      if (currentProgress >= 100) {
        clearInterval(interval);
        playIntroChime();
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsMounted(false);
            if (onComplete) onComplete();
          }, 850);
        }, 200);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isLoading, minimumDuration, onComplete]);

  if (!isMounted) return null;

  return (
    <div className={`preloader-root ${isExiting ? 'is-exiting' : ''}`} aria-label="Loading Screen" role="dialog" aria-modal="true">
      {/* Background Ambient Glows */}
      <div className="preloader-glow-top" />
      <div className="preloader-glow-bottom" />

      {/* Top Bar */}
      <div className="preloader-top-bar">
        <div className="preloader-status-pill">
          <span className="preloader-status-dot" />
          <span>SYSTEM ACTIVE • PORTFOLIO V2.0</span>
        </div>
        <div className="preloader-version-tag">2026 EDITION</div>
      </div>

      {/* Center Main Content */}
      <div className="preloader-center-content">
        {/* Monogram Brand Badge */}
        <div className="preloader-logo-badge">
          <svg className="preloader-logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        </div>

        {/* Title & Subtitle */}
        <h1 className="preloader-title">{title}</h1>
        <p className="preloader-subtitle">{subtitle}</p>

        {/* Progress Bar & Counter Box */}
        <div className="preloader-progress-box">
          <div className="preloader-progress-info">
            <span className="preloader-phase-text">{phaseText}</span>
            <span className="preloader-percent-number">{progress}%</span>
          </div>

          <div className="preloader-track" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <div className="preloader-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="preloader-bottom-bar">
        <div className="preloader-tech-badges">
          <span className="preloader-badge">REACT 19</span>
          <span className="preloader-badge">TYPESCRIPT</span>
          <span className="preloader-badge">VITE</span>
          <span className="preloader-badge">TRIONN UI</span>
        </div>
        <div>OPTIMIZING GRAPHICS & AUDIO ENGINE</div>
      </div>
    </div>
  );
};

export default Preloader;
