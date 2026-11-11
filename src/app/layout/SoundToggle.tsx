interface SoundToggleProps {
  active: boolean;
  onToggle: () => void;
  /** Compact variant used in the mobile controls. */
  compact?: boolean;
}

export const SoundToggle = ({ active, onToggle, compact = false }: SoundToggleProps) => (
  <button
    className={`sound-toggle-btn${compact ? ' mobile-sound-btn' : ''}`}
    onClick={onToggle}
    title="Toggle UI sound feedback"
  >
    <div className={`sound-waves ${active ? 'active' : ''}`}>
      <div className="sound-bar" />
      <div className="sound-bar" />
      <div className="sound-bar" />
      <div className="sound-bar" />
    </div>
    {compact ? (
      <span className="mobile-sound-text">{active ? 'ON' : 'OFF'}</span>
    ) : (
      <span>{active ? 'AUDIO ON' : 'MUTED'}</span>
    )}
  </button>
);
