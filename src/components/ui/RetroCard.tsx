import type { ReactNode } from 'react';

interface Props {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function RetroCard({ title, children, className = '' }: Props) {
  return (
    <div className={`retro-panel ${className}`}>
      {title && (
        <div className="title-bar">
          <span>{title}</span>
          <span style={{ fontSize: 8, color: 'var(--text-secondary)' }}>■ □ ×</span>
        </div>
      )}
      <div style={{ padding: 12 }}>{children}</div>
    </div>
  );
}
