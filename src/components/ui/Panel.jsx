export default function Panel({
  title,
  hint,
  actions,
  className = "",
  bodyClassName = "",
  children,
}) {
  return (
    <section className={`surface-card flex flex-col ${className}`}>
      {(title || actions) && (
        <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
          <div className="min-w-0">
            <h2 className="text-[15px] font-semibold tracking-tight">
              {title}
            </h2>
            {hint && (
              <p className="mt-0.5 text-xs leading-relaxed text-fg-subtle">
                {hint}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex shrink-0 items-center gap-2">{actions}</div>
          )}
        </header>
      )}
      <div className={`flex-1 p-5 ${bodyClassName}`}>{children}</div>
    </section>
  );
}
