export default function Card({ className = "", children }) {
  return (
    <div
      className={`rounded-2xl bg-white shadow-sm shadow-slate-200/50 ring-1 ring-slate-200/70 ${className}`}
    >
      {children}
    </div>
  );
}
