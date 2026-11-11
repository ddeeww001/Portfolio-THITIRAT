// UI building blocks used with useFilteredList (search box, counter, filter tabs, empty state).
import type { CSSProperties, ReactNode } from 'react';
import { playClickSound, playHoverSound } from '../lib/SoundEffects';

const SearchIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

interface SearchBoxProps {
  value: string;
  placeholder: string;
  busy: boolean;
  onChange: (value: string) => void;
  onClear: () => void;
}

export const SearchBox = ({ value, placeholder, busy, onChange, onClear }: SearchBoxProps) => (
  <div className="interactive-search-box">
    <span className="search-icon-left">
      <SearchIcon size={18} />
    </span>
    <input
      type="text"
      className="search-input-field"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <div className="search-action-right">
      {busy && <div className="search-loading-spinner" title="Searching..." />}
      {value && (
        <button className="search-clear-btn" onClick={onClear} title="Clear search">
          ✕
        </button>
      )}
    </div>
  </div>
);

interface ResultCounterProps {
  busy: boolean;
  busyLabel: string;
  children: ReactNode;
}

export const ResultCounter = ({ busy, busyLabel, children }: ResultCounterProps) => (
  <div className={`feedback-counter-badge ${busy ? 'is-updating' : ''}`}>
    <span className={`feedback-dot ${busy ? 'pulse' : 'green'}`} />
    <span>{busy ? busyLabel : children}</span>
  </div>
);

interface FilterTabsProps {
  options: readonly string[];
  active: string;
  onSelect: (option: string) => void;
  style?: CSSProperties;
  buttonStyle?: CSSProperties;
}

export const FilterTabs = ({ options, active, onSelect, style, buttonStyle }: FilterTabsProps) => (
  <div className="filter-container" style={style}>
    {options.map((option) => (
      <button
        key={option}
        className={`filter-btn ${active === option ? 'active' : ''}`}
        onClick={() => {
          playClickSound();
          onSelect(option);
        }}
        onMouseEnter={playHoverSound}
        style={buttonStyle}
      >
        {option}
      </button>
    ))}
  </div>
);

interface EmptyStateProps {
  title: string;
  message: ReactNode;
  resetLabel: string;
  onReset: () => void;
}

export const EmptyState = ({ title, message, resetLabel, onReset }: EmptyStateProps) => (
  <div className="empty-state-card">
    <div className="empty-state-icon">
      <SearchIcon size={24} />
    </div>
    <h3 style={{ color: '#ffffff', fontSize: '1.2rem', margin: 0 }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, maxWidth: '380px' }}>{message}</p>
    <button
      className="empty-state-btn"
      onClick={() => {
        playClickSound();
        onReset();
      }}
    >
      {resetLabel}
    </button>
  </div>
);
