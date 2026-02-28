interface Props {
  title: string;
  extra?: React.ReactNode;
}

export function TitleBar({ title, extra }: Props) {
  return (
    <div className="title-bar">
      <span>{title}</span>
      {extra || <span style={{ fontSize: 8, color: 'var(--text-secondary)' }}>■ □ ×</span>}
    </div>
  );
}
