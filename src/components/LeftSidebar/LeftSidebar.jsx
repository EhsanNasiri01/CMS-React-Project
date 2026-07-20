import {
  LuArrowRight,
  LuCheck,
  LuDownload,
  LuFileText,
  LuFilm,
  LuGauge,
  LuImage,
  LuPenLine,
  LuUpload,
  LuUserPlus,
} from "react-icons/lu";
import { useI18n } from "../../i18n/useI18n";

const QUICK_ACTIONS = [
  { key: "rail.newPost", Icon: LuPenLine },
  { key: "rail.invite", Icon: LuUserPlus },
  { key: "rail.upload", Icon: LuUpload },
  { key: "rail.report", Icon: LuDownload },
];

const STORAGE = { used: 32.4, total: 50 };

const STORAGE_BREAKDOWN = [
  { key: "rail.images", Icon: LuImage, gb: 18.2, color: "bg-accent" },
  { key: "rail.videos", Icon: LuFilm, gb: 9.6, color: "bg-info" },
  { key: "rail.documents", Icon: LuFileText, gb: 4.6, color: "bg-warning" },
];

const TASKS = [
  { key: "task.reviewDrafts", done: true },
  { key: "task.replyComments", done: false },
  { key: "task.publishRelease", done: false },
  { key: "task.auditRoles", done: false },
];

const UPCOMING = [
  { key: "event.newsletter", day: 24, time: "09:00", tone: "text-accent" },
  { key: "event.maintenance", day: 26, time: "02:30", tone: "text-warning" },
  { key: "event.standup", day: 27, time: "14:00", tone: "text-info" },
];

const ACTIVITY = [
  { key: "activity.projectUpdated", when: ["rail.now"], initials: "MK" },
  { key: "activity.released", when: ["rail.minutesAgo", { n: 59 }], initials: "AT" },
  { key: "activity.bugFiled", when: ["rail.hoursAgo", { n: 12 }], initials: "SR" },
  { key: "activity.dataEdited", when: ["rail.today", { time: "11:59" }], initials: "EN" },
];

const TEAM = [

  { name: "Test", initials: "TS", online: true },
  { name: "Test", initials: "TS", online: true },
  { name: "Test", initials: "TS", online: false },
  { name: "Test", initials: "TS", online: true },
  { name: "Test", initials: "TS", online: false },
  { name: "Test", initials: "TS", online: false },

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
        <RailSection title={t("rail.quickActions")}>
          <div className="grid grid-cols-2 gap-2">
            {QUICK_ACTIONS.map(({ key, Icon }) => (
              <button
                key={key}
                type="button"
                className="flex cursor-pointer flex-col items-start gap-2 rounded-card border border-line bg-panel p-3 text-start transition-colors duration-200 hover:border-accent/50 hover:bg-elevated"
              >
                <Icon
                  aria-hidden="true"
                  className="size-4 text-accent"
                  strokeWidth={1.75}
                />
                <span className="text-[12px] leading-tight text-fg">
                  {t(key)}
                </span>
              </button>
            ))}
          </div>
        </RailSection>

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
            {TEAM.map((member, i) => (
              <li key={i} className="flex items-center gap-3">
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

        <RailSection title={t("rail.storage")}>
          <div className="rounded-card border border-line bg-panel p-4">
            <p className="tabular font-mono text-[13px] text-fg">
              {t("rail.storageUsed", {
                used: formatNumber(STORAGE.used, { maximumFractionDigits: 1 }),
                total: formatNumber(STORAGE.total),
              })}
            </p>
            {/* Stacked bar — one segment per media type */}
            <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-elevated">
              {STORAGE_BREAKDOWN.map((row) => (
                <span
                  key={row.key}
                  aria-hidden="true"
                  className={row.color}
                  style={{ width: `${(row.gb / STORAGE.total) * 100}%` }}
                />
              ))}
            </div>
            <ul className="mt-4 space-y-2.5">
              {STORAGE_BREAKDOWN.map(({ key, Icon, gb }) => (
                <li key={key} className="flex items-center gap-2.5">
                  <Icon
                    aria-hidden="true"
                    className="size-3.5 shrink-0 text-fg-subtle"
                    strokeWidth={1.75}
                  />
                  <span className="text-[12px] text-fg-muted">{t(key)}</span>
                  <span className="tabular ms-auto font-mono text-[11px] text-fg-subtle">
                    {formatNumber(gb, { maximumFractionDigits: 1 })} GB
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </RailSection>

        <RailSection
          title={t("rail.tasks")}
          action={
            <span className="eyebrow !text-[10px] text-fg-subtle">
              {t("rail.tasksLeft", {
                n: formatNumber(TASKS.filter((task) => !task.done).length),
              })}
            </span>
          }
        >
          <ul className="space-y-2">
            {TASKS.map(({ key, done }) => (
              <li key={key}>
                <button
                  type="button"
                  aria-pressed={done}
                  className="flex w-full cursor-pointer items-start gap-2.5 rounded-lg px-2 py-1.5 text-start transition-colors duration-200 hover:bg-panel"
                >
                  <span
                    aria-hidden="true"
                    className={[
                      "mt-0.5 grid size-4 shrink-0 place-items-center rounded border transition-colors duration-200",
                      done
                        ? "border-accent bg-accent text-canvas"
                        : "border-line-strong",
                    ].join(" ")}
                  >
                    {done && <LuCheck className="size-3" strokeWidth={3} />}
                  </span>
                  <span
                    className={[
                      "text-[12px] leading-snug",
                      done ? "text-fg-subtle line-through" : "text-fg",
                    ].join(" ")}
                  >
                    {t(key)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </RailSection>

        <RailSection title={t("rail.upcoming")}>
          <ul className="space-y-2">
            {UPCOMING.map(({ key, day, time, tone }) => (
              <li
                key={key}
                className="flex items-center gap-3 rounded-card border border-line bg-panel p-3"
              >
                <span
                  className={[
                    "tabular grid size-9 shrink-0 place-items-center rounded-lg bg-elevated font-mono text-[13px] font-semibold",
                    tone,
                  ].join(" ")}
                >
                  {formatNumber(day)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[12px] text-fg">{t(key)}</p>
                  <p className="tabular mt-0.5 font-mono text-[10px] text-fg-subtle">
                    {time}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </RailSection>
      </div>
    </aside>
  );
}
