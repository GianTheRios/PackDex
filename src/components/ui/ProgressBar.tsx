interface Props {
  yes: number;
  no?: number;
}

export function ProgressBar({ yes }: Props) {
  const no = 100 - yes;
  return (
    <div className="progress-bar">
      <div className="progress-bar__fill--yes" style={{ width: `${yes}%` }} />
      <div className="progress-bar__fill--no" style={{ width: `${no}%` }} />
    </div>
  );
}
