/**
 * Shown only in development (`npm run dev`) when a section has no data because .env values are missing.
 * In a production build `import.meta.env.DEV` is false, so this renders nothing and the
 * message text is removed from the bundle — visitors never see configuration hints.
 */
export function DevConfigNotice({ keys }: { keys: string[] }) {
  if (!import.meta.env.DEV) return null;
  return (
    <p
      role="note"
      style={{
        margin: '0 0 12px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85rem',
        lineHeight: 1.5,
        color: '#ffb366',
        textAlign: 'center',
      }}
    >
      [dev only] Missing in .env: {keys.join(', ')}. On the live site this section is hidden —
      add these to your host&apos;s environment variables and redeploy.
    </p>
  );
}
