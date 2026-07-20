import { Link } from "react-router";
import { LuChevronRight } from "react-icons/lu";
export default function PageHeader({ title, subtitle, crumbs = [], actions }) {
  return (
    <div className="mb-7 animate-fade-up">
      {crumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-3">
          <ol className="flex flex-wrap items-center gap-1.5 text-[13px]">
            {crumbs.map((crumb, i) => {
              const isLast = i === crumbs.length - 1;
              return (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  {i > 0 && (
                    <LuChevronRight
                      aria-hidden="true"
                      className="size-3.5 shrink-0 text-fg-subtle rtl:rotate-180"
                      strokeWidth={2}
                    />
                  )}
                  {isLast || !crumb.to ? (
                    <span aria-current="page" className="text-fg-muted">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      to={crumb.to}
                      className="text-fg-subtle transition-colors hover:text-accent"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      )}

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-[26px] font-semibold leading-tight tracking-[-0.02em] md:text-[32px]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1.5 max-w-[62ch] text-sm leading-relaxed text-fg-muted">
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}
