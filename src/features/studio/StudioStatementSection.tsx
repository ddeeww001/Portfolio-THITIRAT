export const StudioStatementSection = () => (
  <section style={{ padding: '90px 20px', background: 'rgba(10, 10, 13, 0.35)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
    <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', width: '100%' }}>
      <h2
        style={{
          fontSize: 'clamp(1.45rem, 4.5vw, 3.2rem)',
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
          marginBottom: '20px',
          color: '#ffffff',
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
        }}
      >
        We make people stop and ask, who made that?
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.92rem, 2.2vw, 1.15rem)', maxWidth: '720px', margin: '0 auto', lineHeight: 1.65, wordBreak: 'break-word', overflowWrap: 'break-word' }}>
        That reaction is the whole job. Strategy, UI/UX design, and clean frontend code built for products that refuse to look ordinary. No templates, ever.
      </p>
    </div>
  </section>
);
