interface Props {
  label: string;
  color?: string;
}

export function Badge({ label, color }: Props) {
  return (
    <span className="badge" style={color ? { borderColor: color, color } : undefined}>
      {label}
    </span>
  );
}
