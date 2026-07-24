export default function AnalyticsCard({
  title,
  value,
  description,
  icon: Icon,
  iconClassName = "bg-slate-100 text-slate-700",
}) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-600">{title}</p>

          <p className="mt-2 wrap-break-word text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>

        {Icon ? (
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}
          >
            <Icon size={22} strokeWidth={2} aria-hidden="true" />
          </div>
        ) : null}
      </div>

      {description ? (
        <p className="mt-3 text-xs leading-5 text-slate-500">{description}</p>
      ) : null}
    </article>
  );
}
