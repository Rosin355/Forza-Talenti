export default function Badge({ children, color, soft }) {
  return (
    <span style={{ background: soft, color, border: `1px solid ${color}22` }}
      className="lfdt-badge">{children}</span>
  );
}
