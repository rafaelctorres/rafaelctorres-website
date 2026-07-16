interface CalloutProps {
  type: 'curiosidade' | 'info';
  title?: string;
  children: React.ReactNode;
}

export default function Callout({ type, title, children }: CalloutProps) {
  const isInfo  = type === 'info';
  const color   = isInfo ? 'var(--color-blue)' : 'var(--color-orange)';
  const label   = title ?? (isInfo ? 'informação adicional' : 'curiosidade');

  return (
    <aside style={{
      borderLeft: `3px solid ${color}`,
      background: 'var(--color-raised)',
      borderRadius: '0 8px 8px 0',
      padding: '1rem 1.25rem',
      margin: '2em 0',
    }}>
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        color,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginBottom: '0.6em',
      }}>
        {label}
      </p>
      <div style={{ color: 'var(--color-copy)', fontSize: '15px', lineHeight: 1.6 }}>
        {children}
      </div>
    </aside>
  );
}
