import { LuArrowRight, LuGauge } from "react-icons/lu";
import { useI18n } from "../../i18n/useI18n";

const ACTIVITY = [
  { key: "activity.projectUpdated", when: ["rail.now"], initials: "MK" },
  { key: "activity.released", when: ["rail.minutesAgo", { n: 59 }], initials: "AT" },
  { key: "activity.bugFiled", when: ["rail.hoursAgo", { n: 12 }], initials: "SR" },
  { key: "activity.dataEdited", when: ["rail.today", { time: "11:59" }], initials: "EN" },
];

const TEAM = [

  { name: "John Smith", initials: "JS", online: true },
  { name: "Emily Johnson", initials: "EJ", online: true },
  { name: "Michael Brown", initials: "MB", online: false },
  { name: "Sarah Wilson", initials: "SW", online: true },
  { name: "David Miller", initials: "DM", online: false },
  { name: "James Anderson", initials: "JA", online: false },

];

const LOAD_SCORE = 46;

function Avatar({ initials, online }) {
  return (
    <span className="relative shrink-0">
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center rounded-full bg-elevated font-mono text-[11px] font-medium text-fg-muted ring-1 ring-line"
      >
        {initials}
      </span>
      {online !== undefined && (
        <span
          aria-hidden="true"
          className={[
            "absolute -bottom-0.5 -end-0.5 size-2.5 rounded-full ring-2 ring-surface",
            online ? "bg-success" : "bg-fg-subtle",
          ].join(" ")}
        />
      )}
    </span>
  );
}

function RailSection({ title, action, children }) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="eyebrow">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

/**
 * Context rail. Secondary information only — every item here is also
 * reachable from a primary page, so hiding it below xl costs nothing.
 */
export default function LeftSidebar() {
  const { t, formatNumber } = useI18n();
  const circumference = 2 * Math.PI * 26;

  return (
    <aside
      aria-label={t("rail.activity")}
      className="hidden w-[300px] shrink-0 overflow-y-auto border-s border-line bg-surface px-5 py-6 xl:block"
    >
      <div className="flex flex-col gap-8">
        <RailSection
          title={t("rail.activity")}
          action={
            <button
              type="button"
              className="flex cursor-pointer items-center gap-1 text-[11px] text-fg-subtle transition-colors hover:text-accent"
            >
              {t("rail.viewAll")}
              <LuArrowRight
                aria-hidden="true"
                className="size-3 rtl:rotate-180"
                strokeWidth={2}
              />
            </button>
          }
        >
          <ol className="relative">
            {ACTIVITY.map((item, i) => (
              <li key={item.key} className="relative flex gap-3 pb-4 last:pb-0">
                {/* Timeline spine */}
                {i < ACTIVITY.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute start-4 top-9 h-[calc(100%-2rem)] w-px -translate-x-1/2 bg-line rtl:translate-x-1/2"
                  />
                )}
                <Avatar initials={item.initials} />
                <div className="min-w-0 pt-0.5">
                  <p className="text-[13px] leading-snug text-fg">
                    {t(item.key)}
                  </p>
                  <p className="eyebrow mt-0.5 !text-[10px]">
                    {t(item.when[0], item.when[1])}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </RailSection>

        <RailSection title={t("rail.team")}>
          <ul className="space-y-3">
            {TEAM.map((member) => (
              <li key={member.name} className="flex items-center gap-3">
                <Avatar initials={member.initials} online={member.online} />
                <span className="truncate text-[13px] text-fg">
                  {member.name}
                </span>
              </li>
            ))}
          </ul>
        </RailSection>

        <RailSection title={t("rail.performance")}>
          <div className="rounded-card border border-line bg-panel p-4">
            <div className="flex items-center gap-4">
              <div className="relative size-16 shrink-0">
                <svg viewBox="0 0 64 64" className="size-full -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    fill="none"
                    stroke="#1E2740"
                    strokeWidth="7"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    fill="none"
                    stroke="#2DE2C5"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={
                      circumference - (LOAD_SCORE / 100) * circumference
                    }
                  />
                </svg>
                <span className="tabular absolute inset-0 grid place-items-center text-sm font-semibold">
                  {formatNumber(LOAD_SCORE)}%
                </span>
              </div>
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-[13px] text-fg">
                  <LuGauge
                    aria-hidden="true"
                    className="size-3.5 text-fg-subtle"
                    strokeWidth={1.75}
                  />
                  {t("rail.loadTime")}
                </p>
                <p className="mt-1 text-xs font-medium text-success">
                  +{formatNumber(25)}%
                </p>
              </div>
            </div>
          </div>
        </RailSection>
      </div>
    </aside>
  );
}
