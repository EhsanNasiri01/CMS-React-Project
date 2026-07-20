import {
  LuEye,
  LuMousePointerClick,
  LuTrendingDown,
  LuTrendingUp,
  LuUserPlus,
  LuUsers,
} from "react-icons/lu";
import { useI18n } from "../../i18n/useI18n";

const METRICS = [
  {
    key: "metric.pageViews",
    value: 121168658,
    delta: 11.01,
    Icon: LuEye,
    tone: "text-info",
    spark: [38, 42, 36, 48, 55, 51, 62, 58, 71],
  },
  {
    key: "metric.impressions",
    value: 728564,
    delta: 25,
    Icon: LuMousePointerClick,
    tone: "text-accent",
    spark: [22, 30, 28, 41, 39, 52, 49, 63, 74],
  },
  {
    key: "metric.newUsers",
    value: 1457,
    delta: -4.2,
    Icon: LuUserPlus,
    tone: "text-warning",
    spark: [64, 61, 66, 58, 55, 59, 48, 45, 43],
  },
  {
    key: "metric.activeUsers",
    value: 5653,
    delta: 16,
    Icon: LuUsers,
    tone: "text-success",
    spark: [30, 34, 33, 44, 47, 45, 56, 60, 68],
  },
];

/** Nine points, normalised to a 100×32 box, rendered as a smooth polyline. */
function Sparkline({ points, positive }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * 100;
      const y = 30 - ((p - min) / range) * 26;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg
      viewBox="0 0 100 32"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="h-8 w-full"
    >
      <path
        d={`${d} L100 32 L0 32 Z`}
        fill={positive ? "rgba(45,226,197,0.10)" : "rgba(245,85,109,0.10)"}
      />
      <path
        d={d}
        fill="none"
        stroke={positive ? "#2DE2C5" : "#F5556D"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default function Boxes() {
  const { t, formatNumber } = useI18n();

  return (
    <section
      aria-label={t("page.dashboard.title")}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {METRICS.map(({ key, value, delta, Icon, tone, spark }, i) => {
        const positive = delta >= 0;
        const DeltaIcon = positive ? LuTrendingUp : LuTrendingDown;

        return (
          <article
            key={key}
            style={{ animationDelay: `${i * 60}ms` }}
            className="surface-card surface-card-hover animate-fade-up group overflow-hidden p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="eyebrow">{t(key)}</h3>
              <Icon
                aria-hidden="true"
                className={`size-[18px] shrink-0 ${tone}`}
                strokeWidth={1.75}
              />
            </div>

            <p className="tabular mt-4 text-[28px] font-semibold leading-none tracking-[-0.02em]">
              {formatNumber(value)}
            </p>

            <div className="mt-4 flex items-end justify-between gap-4">
              <div className="min-w-0">
                <span
                  className={[
                    "inline-flex items-center gap-1 text-[13px] font-medium",
                    positive ? "text-success" : "text-danger",
                  ].join(" ")}
                >
                  <DeltaIcon
                    aria-hidden="true"
                    className="size-3.5"
                    strokeWidth={2.25}
                  />
                  <span className="tabular">
                    {positive ? "+" : "−"}
                    {formatNumber(Math.abs(delta), {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })}
                    %
                  </span>
                  {/* Direction is stated in text too, never colour alone */}
                  <span className="sr-only">
                    {positive ? t("metric.up") : t("metric.down")}
                  </span>
                </span>
                <p className="mt-0.5 truncate text-[11px] text-fg-subtle">
                  {t("metric.vsLastWeek")}
                </p>
              </div>

              <div className="w-24 shrink-0 opacity-70 transition-opacity duration-300 group-hover:opacity-100">
                <Sparkline points={spark} positive={positive} />
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
