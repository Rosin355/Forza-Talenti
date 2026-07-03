export default function Toast({ message }) {
  if (!message) return null;
  return <div className="lfdt-toast" role="status">{message}</div>;
}
