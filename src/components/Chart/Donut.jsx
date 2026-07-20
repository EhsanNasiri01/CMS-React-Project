import { useMemo } from "react";
import ApexChart from "react-apexcharts";
import { useI18n } from "../../i18n/useI18n";
import Panel from "../ui/Panel";

const SOURCES = [
  { key: "source.google", name: "Google", value: 3124213, color: "#2DE2C5" },
  { key: "source.github", name: "GitHub", value: 1523151, color: "#60A5FA" },
  { key: "source.direct", name: null, value: 948213, color: "#A78BFA" },
  { key: "source.other", name: null, value: 412907, color: "#3B486B" },
];

const TOTAL = SOURCES.reduce((sum, s) => sum + s.value, 0);

export default function SourcesChart() {
  const { t, formatNumber, lang } = useI18n();

  const labels = SOURCES.map((s) => s.name ?? t(s.key));

  const options = useMemo(
    () => ({
      chart: {
        type: "donut",
        background: "transparent",
        foreColor: "#8B9AB8",
        fontFamily: "inherit",
        animations: { easing: "easeout", speed: 400 },
      },
      colors: SOURCES.map((s) => s.color),
      labels,
      stroke: { width: 2, colors: ["#0D1220"] },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            size: "76%",
            // Centre text is rendered as DOM below, not by Apex, so it can use
            // the real type scale and tabular figures.
            labels: { show: false },
          },
        },
      },
      legend: { show: false },
      dataLabels: { enabled: false },
      tooltip: {
        enabled: true,
        theme: "dark",
        y: { formatter: (v) => formatNumber(v) },
      },
      states: { hover: { filter: { type: "lighten", value: 0.08 } } },
    }),
    [formatNumber, t] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <Panel title={t("chart.sources")} hint={t("chart.sourcesHint")}>
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
        <div className="relative shrink-0">
          <ApexChart
            key={lang}
            options={options}
            series={SOURCES.map((s) => s.value)}
            type="donut"
            width={190}
            height={190}
          />
          {/* Centre label sits above the SVG so it inherits real typography */}
          <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
            <div>
              <div className="tabular text-[22px] font-semibold leading-none">
                {formatNumber(TOTAL)}
              </div>
              <div className="eyebrow mt-1.5">{t("chart.totalSessions")}</div>
            </div>
          </div>
        </div>

        {/* Legend carries the exact numbers, so the chart is never the only
            way to read the data. */}
        <ul className="w-full min-w-0 flex-1 space-y-3.5">
          {SOURCES.map((source, i) => {
            const label = labels[i];
            const share = (source.value / TOTAL) * 100;
            return (
              <li key={source.key}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="flex min-w-0 items-center gap-2.5 text-[13px] text-fg">
                    <span
                      aria-hidden="true"
                      className="size-2 shrink-0 rounded-full"
                      style={{ background: source.color }}
                    />
                    <span className="truncate">{label}</span>
                  </span>
                  <span className="tabular shrink-0 font-mono text-xs text-fg-muted">
                    {formatNumber(share, { maximumFractionDigits: 1 })}%
                  </span>
                </div>
                <div className="mt-1.5 flex items-center gap-3">
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-elevated">
                    <div
                      className="h-full rounded-full transition-[width] duration-500 ease-out"
                      style={{
                        width: `${share}%`,
                        background: source.color,
                      }}
                    />
                  </div>
                  <span className="tabular shrink-0 text-[11px] text-fg-subtle">
                    {formatNumber(source.value)}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Panel>
  );
}
