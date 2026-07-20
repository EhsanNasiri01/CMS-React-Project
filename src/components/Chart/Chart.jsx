import { useMemo } from "react";
import ApexChart from "react-apexcharts";
import { useI18n } from "../../i18n/useI18n";
import Panel from "../ui/Panel";

const DAYS = [
  { key: "day.sat", thisWeek: 110000000, lastWeek: 100000000 },
  { key: "day.sun", thisWeek: 145000000, lastWeek: 120000000 },
  { key: "day.mon", thisWeek: 160000000, lastWeek: 155000000 },
  { key: "day.tue", thisWeek: 220342123, lastWeek: 170000000 },
  { key: "day.wed", thisWeek: 195000000, lastWeek: 230000000 },
  { key: "day.thu", thisWeek: 170000000, lastWeek: 200000000 },
  { key: "day.fri", thisWeek: 160000000, lastWeek: 155000000 },
];

const SERIES_COLORS = ["#2DE2C5", "#4E5F8A"];

/** Legend doubles as the series key; kept outside the SVG so it never clips. */
function Legend({ items }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {items.map(({ label, color, dashed }) => (
        <span
          key={label}
          className="flex items-center gap-2 text-xs text-fg-muted"
        >
          <span
            aria-hidden="true"
            className="h-0.5 w-4 rounded-full"
            style={{
              background: dashed
                ? `repeating-linear-gradient(90deg, ${color} 0 4px, transparent 4px 7px)`
                : color,
            }}
          />
          {label}
        </span>
      ))}
    </div>
  );
}

export default function TrafficChart() {
  const { t, formatNumber, lang } = useI18n();

  const series = useMemo(
    () => [
      { name: t("chart.thisWeek"), data: DAYS.map((d) => d.thisWeek) },
      { name: t("chart.lastWeek"), data: DAYS.map((d) => d.lastWeek) },
    ],
    [t]
  );

  const options = useMemo(
    () => ({
      chart: {
        id: "traffic",
        type: "area",
        toolbar: { show: false },
        zoom: { enabled: false },
        background: "transparent",
        foreColor: "#8B9AB8",
        fontFamily: "inherit",
        animations: { easing: "easeout", speed: 400 },
      },
      colors: SERIES_COLORS,
      stroke: { curve: "smooth", width: [2.5, 2], dashArray: [0, 5] },
      grid: {
        borderColor: "#1E2740",
        strokeDashArray: 3,
        xaxis: { lines: { show: false } },
        padding: { top: 0, right: 8, bottom: 0, left: 4 },
      },
      xaxis: {
        categories: DAYS.map((d) => t(d.key)),
        axisBorder: { show: false },
        axisTicks: { show: false },
        tooltip: { enabled: false },
        labels: { style: { colors: "#5C6B87", fontSize: "12px" } },
      },
      yaxis: {
        labels: {
          formatter: (v) =>
            v >= 1_000_000
              ? `${formatNumber(Math.round(v / 1_000_000))}M`
              : formatNumber(v),
          style: { colors: ["#5C6B87"], fontSize: "12px" },
        },
      },
      tooltip: {
        theme: "dark",
        shared: true,
        intersect: false,
        custom: ({ series: s, dataPointIndex, w }) => {
          const rows = s
            .map(
              (set, i) => `
              <div style="display:flex;align-items:center;gap:8px;justify-content:space-between;">
                <span style="display:flex;align-items:center;gap:6px;color:#8B9AB8;font-size:12px;">
                  <span style="width:10px;height:2px;border-radius:2px;background:${
                    SERIES_COLORS[i]
                  };"></span>${w.globals.seriesNames[i]}
                </span>
                <span style="color:#E6EBF5;font-size:13px;font-weight:600;font-variant-numeric:tabular-nums;">${formatNumber(
                  set[dataPointIndex]
                )}</span>
              </div>`
            )
            .join("");
          return `<div style="padding:12px 14px;background:#0D1220;border:1px solid #2C3857;border-radius:12px;box-shadow:0 16px 40px -16px rgba(0,0,0,.9);min-width:200px;display:flex;flex-direction:column;gap:8px;">
              <div style="color:#5C6B87;font-size:10px;letter-spacing:.14em;text-transform:uppercase;font-family:'JetBrains Mono',monospace;">${
                w.globals.labels[dataPointIndex]
              }</div>${rows}</div>`;
        },
      },
      markers: {
        size: 0,
        hover: {
          size: 5,
          sizeOffset: 0,
        },
        strokeColors: "#070B14",
        strokeWidth: 2,
      },
      fill: {
        type: ["gradient", "solid"],
        gradient: {
          shadeIntensity: 0,
          opacityFrom: 0.28,
          opacityTo: 0,
          stops: [0, 100],
        },
        opacity: [1, 0],
      },
      legend: { show: false },
      dataLabels: { enabled: false },
    }),
    [t, formatNumber]
  );

  return (
    <Panel
      title={t("chart.traffic")}
      hint={t("chart.trafficHint")}
      actions={
        <Legend
          items={[
            { label: t("chart.thisWeek"), color: SERIES_COLORS[0] },
            { label: t("chart.lastWeek"), color: "#7E8DB4", dashed: true },
          ]}
        />
      }
      bodyClassName="pt-2"
    >
      <div className="h-[300px] min-h-0">
        <ApexChart
          key={lang}
          options={options}
          series={series}
          type="area"
          height="100%"
          width="100%"
        />
      </div>
    </Panel>
  );
}
