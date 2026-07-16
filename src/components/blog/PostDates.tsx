'use client';

interface PostDatesProps {
  date: string;
  updatedAt?: string;
}

function formatDate(iso: string) {
  return iso.slice(0, 10);
}

function formatTimestamp(iso: string) {
  const d = new Date(iso);
  const date = d.toLocaleDateString('pt-BR', { dateStyle: 'short' });
  const time = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  return `${date} · ${time}`;
}

export default function PostDates({ date, updatedAt }: PostDatesProps) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: '0.3rem',
      paddingTop: '1rem',
      borderTop: '1px solid var(--color-line)',
    }}>
      <span className="font-mono text-phi-xs text-muted">
        publicado em{' '}
        <span style={{ color: 'var(--color-copy)' }}>{formatDate(date)}</span>
      </span>
      {updatedAt && (
        <span className="font-mono text-phi-xs text-muted">
          editado em{' '}
          <span style={{ color: 'var(--color-copy)' }}>{formatTimestamp(updatedAt)}</span>
        </span>
      )}
    </div>
  );
}
