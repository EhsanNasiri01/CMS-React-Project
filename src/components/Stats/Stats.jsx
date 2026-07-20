import { useI18n } from "../../i18n/useI18n";
import Panel from "../ui/Panel";

const ONLINE = 179;
const OFFLINE = 394;
const TOTAL = ONLINE + OFFLINE;

export default function Stats() {
  const { t, formatNumber } = useI18n();
  const onlineShare = (ONLINE / TOTAL) * 100;

  return (
    <Panel title={t("chart.activity")} hint={t("chart.activityHint")}>
      <div className="flex items-baseline gap-2">
        <span className="tabular text-[38px] font-semibold leading-none tracking-[-0.02em]">
          {formatNumber(TOTAL)}
        </span>
        <span className="text-sm text-fg-muted">{t("chart.total")}</span>
      </div>

      {/* Split bar: proportion is visible, exact counts are in the key below */}
      <div
        role="img"
        aria-label={`${t("chart.online")}: ${formatNumber(
          ONLINE
        )} — ${t("chart.offline")}: ${formatNumber(OFFLINE)}`}
        className="mt-5 flex h-2 overflow-hidden rounded-full bg-elevated"
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out"
          style={{ width: `${onlineShare}%` }}
        />
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-4">
        {[
          { label: t("chart.online"), value: ONLINE, color: "bg-accent" },
          { label: t("chart.offline"), value: OFFLINE, color: "bg-elevated" },
        ].map((item) => (
          <div key={item.label}>
            <dt className="flex items-center gap-2 text-xs text-fg-muted">
              <span
                aria-hidden="true"
                className={`h-1 w-4 rounded-full ${item.color}`}
              />
              {item.label}
            </dt>
            <dd className="tabular mt-1.5 text-lg font-semibold">
              {formatNumber(item.value)}{" "}
              <span className="text-xs font-normal text-fg-subtle">
                {t("chart.usersUnit")}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </Panel>
  );
}
