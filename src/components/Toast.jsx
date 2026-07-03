import { useDemo } from "../store/demoStore";

export default function Toast() {
  const { toast } = useDemo();
  if (!toast) return null;
  return <div className="lfdt-toast" role="status">{toast}</div>;
}
