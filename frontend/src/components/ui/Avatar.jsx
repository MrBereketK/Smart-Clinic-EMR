export default function Avatar({ name, className = "" }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-xs font-bold text-white shadow-sm ${className}`}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}
