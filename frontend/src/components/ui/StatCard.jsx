const chipTones = {
  sky: "bg-sky-50 text-primary-600 ring-sky-100",
  emerald: "bg-emerald-50 text-emerald-600 ring-emerald-100",
  amber: "bg-amber-50 text-amber-600 ring-amber-100",
  red: "bg-red-50 text-red-600 ring-red-100",
  slate: "bg-slate-100 text-slate-500 ring-slate-200",
};

export default function StatCard({
  label,
  value,
  subtitle = "vs yesterday",
  trend,
  trendDirection = "up",
  trendTone,
  tone = "sky",
  icon,
}) {
  const chip = chipTones[tone] || chipTones.sky;
  const trendColor =
    trendTone ||
    (trendDirection === "up"
      ? "bg-emerald-50 text-emerald-600"
      : "bg-red-50 text-red-600");

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm shadow-slate-200/50 ring-1 ring-slate-200/70">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {label}
          </p>
          <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight text-slate-900">
            {value}
          </p>
        </div>
        {icon && (
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ${chip}`}
          >
            {icon}
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-3 flex items-center gap-2 text-xs">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 font-semibold ${trendColor}`}
          >
            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
            >
              {trendDirection === "up" ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 9l7 7 7-7" />
              )}
            </svg>
            {trend}
          </span>
          <span className="text-slate-400">{subtitle}</span>
        </div>
      )}
    </div>
  );
}
