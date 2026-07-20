import { NavLink } from "react-router";
import {
  LuChartNoAxesColumn,
  LuCalendarClock,
  LuFileText,
  LuHardDrive,
  LuHistory,
  LuImage,
  LuLayoutDashboard,
  LuLifeBuoy,
  LuMegaphone,
  LuMessageSquare,
  LuPanelLeftClose,
  LuPanelLeftOpen,
  LuPlug,
  LuSettings,
  LuShieldCheck,
  LuTags,
  LuUsers,
} from "react-icons/lu";
import { useI18n } from "../../i18n/useI18n";
import BrandMark from "../ui/BrandMark";

const PRIMARY = [
  { to: "/", labelKey: "nav.dashboard", Icon: LuLayoutDashboard, end: true },
  { to: "/users", labelKey: "nav.users", Icon: LuUsers },
  { to: "/content", labelKey: "nav.content", Icon: LuFileText, badge: 12 },
  { to: "/media", labelKey: "nav.media", Icon: LuImage },
];

// UI-only groups — no routes behind these yet, so they render as inert rows
// with a "soon" badge rather than links that would dead-end.
const WORKSPACE = [
  { labelKey: "nav.analytics", Icon: LuChartNoAxesColumn },
  { labelKey: "nav.campaigns", Icon: LuMegaphone, badge: 3 },
  { labelKey: "nav.comments", Icon: LuMessageSquare, badge: 48 },
  { labelKey: "nav.tags", Icon: LuTags },
  { labelKey: "nav.schedule", Icon: LuCalendarClock },
];

const SYSTEM = [
  { labelKey: "nav.integrations", Icon: LuPlug },
  { labelKey: "nav.roles", Icon: LuShieldCheck },
  { labelKey: "nav.audit", Icon: LuHistory },
];

const SECONDARY = [
  { to: "/settings", labelKey: "nav.settings", Icon: LuSettings },
  { to: "/support", labelKey: "nav.support", Icon: LuLifeBuoy },
];

const STORAGE = { used: 32.4, total: 50 };

function Badge({ children, tone = "accent" }) {
  return (
    <span
      className={[
        "tabular ms-auto rounded-full px-1.5 py-0.5 font-mono text-[10px] leading-none",
        tone === "accent"
          ? "bg-accent/15 text-accent"
          : "bg-elevated text-fg-subtle",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function NavItem({ to, end, Icon, label, badge, expanded, onNavigate }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onNavigate}
      title={expanded ? undefined : label}
      className={({ isActive }) =>
        [
          "group relative flex h-11 items-center rounded-lg text-sm",
          "transition-colors duration-200 ease-out",
          expanded ? "gap-3 px-3" : "justify-center px-0",
          isActive
            ? "bg-elevated font-medium text-fg"
            : "text-fg-muted hover:bg-panel hover:text-fg",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          {/* Active marker: an accent bar on the inline-start edge. Logical
              positioning means it flips sides automatically under RTL. */}
          <span
            aria-hidden="true"
            className={[
              "absolute inset-y-2 start-0 w-[3px] rounded-full bg-accent",
              "transition-opacity duration-200",
              isActive ? "opacity-100" : "opacity-0",
            ].join(" ")}
          />
          <Icon
            className={[
              "size-[18px] shrink-0 transition-colors duration-200",
              isActive ? "text-accent" : "text-fg-subtle group-hover:text-fg",
            ].join(" ")}
            strokeWidth={1.75}
          />
          {expanded && <span className="truncate">{label}</span>}
          {expanded && badge !== undefined && <Badge>{badge}</Badge>}
        </>
      )}
    </NavLink>
  );
}

/** Non-routed nav row — same shape as NavItem, but never active. */
function SoonItem({ Icon, label, badge, expanded, soonLabel }) {
  return (
    <button
      type="button"
      title={expanded ? undefined : label}
      className={[
        "group flex h-11 w-full cursor-pointer items-center rounded-lg text-sm",
        "text-fg-muted transition-colors duration-200 ease-out hover:bg-panel hover:text-fg",
        expanded ? "gap-3 px-3" : "justify-center px-0",
      ].join(" ")}
    >
      <Icon
        className="size-[18px] shrink-0 text-fg-subtle transition-colors duration-200 group-hover:text-fg"
        strokeWidth={1.75}
      />
      {expanded && <span className="truncate text-start">{label}</span>}
      {expanded &&
        (badge !== undefined ? (
          <Badge>{badge}</Badge>
        ) : (
          <Badge tone="muted">{soonLabel}</Badge>
        ))}
    </button>
  );
}

export default function Sidebar({
  expanded,
  onToggle,
  onNavigate,
  className = "",
}) {
  const { t, formatNumber } = useI18n();
  const storagePct = Math.round((STORAGE.used / STORAGE.total) * 100);

  return (
    <aside
      className={[
        "flex h-full shrink-0 flex-col border-e border-line bg-surface",
        "transition-[width] duration-300 ease-out",
        expanded ? "w-[248px]" : "w-[76px]",
        className,
      ].join(" ")}
    >
      {/* Brand */}
      <div
        className={[
          "flex h-16 items-center border-b border-line",
          expanded ? "gap-3 px-4" : "justify-center px-0",
        ].join(" ")}
      >
        <BrandMark className="size-8 shrink-0" />
        {expanded && (
          <div className="min-w-0 leading-tight">
            <div className="truncate text-[15px] font-semibold tracking-tight">
              {t("app.name")}
            </div>
            <div className="eyebrow truncate !text-[10px]">
              {t("app.tagline")}
            </div>
          </div>
        )}
      </div>

      <nav
        aria-label={t("nav.primary")}
        className="flex flex-1 flex-col gap-1 overflow-y-auto p-3"
      >
        {expanded && (
          <p className="eyebrow px-3 pb-2 pt-1">{t("nav.primary")}</p>
        )}
        {PRIMARY.map((item) => (
          <NavItem
            key={item.to}
            {...item}
            badge={item.badge && formatNumber(item.badge)}
            label={t(item.labelKey)}
            expanded={expanded}
            onNavigate={onNavigate}
          />
        ))}

        <div className="my-3 h-px bg-line" />
        {expanded && (
          <p className="eyebrow px-3 pb-2">{t("nav.workspace")}</p>
        )}
        {WORKSPACE.map((item) => (
          <SoonItem
            key={item.labelKey}
            {...item}
            badge={item.badge && formatNumber(item.badge)}
            label={t(item.labelKey)}
            soonLabel={t("nav.soon")}
            expanded={expanded}
          />
        ))}

        <div className="my-3 h-px bg-line" />
        {expanded && <p className="eyebrow px-3 pb-2">{t("nav.system")}</p>}
        {SYSTEM.map((item) => (
          <SoonItem
            key={item.labelKey}
            {...item}
            label={t(item.labelKey)}
            soonLabel={t("nav.soon")}
            expanded={expanded}
          />
        ))}

        <div className="my-3 h-px bg-line" />

        {SECONDARY.map((item) => (
          <NavItem
            key={item.to}
            {...item}
            label={t(item.labelKey)}
            expanded={expanded}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      {/* Storage meter — collapses to nothing when the rail is narrow */}
      {expanded && (
        <div className="mx-3 mb-1 rounded-card border border-line bg-panel p-3">
          <div className="flex items-center gap-2">
            <LuHardDrive
              aria-hidden="true"
              className="size-3.5 shrink-0 text-fg-subtle"
              strokeWidth={1.75}
            />
            <span className="text-[13px] font-medium text-fg">
              {t("nav.storage")}
            </span>
            <span className="tabular ms-auto font-mono text-[11px] text-fg-subtle">
              {formatNumber(storagePct)}%
            </span>
          </div>
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-elevated">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-500"
              style={{ width: `${storagePct}%` }}
            />
          </div>
          <p className="tabular mt-2 text-[11px] text-fg-subtle">
            {t("nav.storageUsed", {
              used: formatNumber(STORAGE.used, { maximumFractionDigits: 1 }),
              total: formatNumber(STORAGE.total),
            })}
          </p>
          <button
            type="button"
            className="mt-3 h-9 w-full cursor-pointer rounded-lg border border-line-strong text-[12px] font-medium text-fg-muted transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            {t("nav.upgrade")}
          </button>
        </div>
      )}

      {/* Collapse control — hidden on mobile where the sidebar is a drawer */}
      <div className="hidden border-t border-line p-3 lg:block">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-label={expanded ? t("nav.collapse") : t("nav.expand")}
          title={expanded ? t("nav.collapse") : t("nav.expand")}
          className={[
            "flex h-11 w-full cursor-pointer items-center rounded-lg text-sm",
            "text-fg-muted transition-colors duration-200 hover:bg-panel hover:text-fg",
            expanded ? "gap-3 px-3" : "justify-center",
          ].join(" ")}
        >
          {expanded ? (
            <LuPanelLeftClose
              className="size-[18px] rtl:rotate-180"
              strokeWidth={1.75}
            />
          ) : (
            <LuPanelLeftOpen
              className="size-[18px] rtl:rotate-180"
              strokeWidth={1.75}
            />
          )}
          {expanded && <span>{t("nav.collapse")}</span>}
        </button>
      </div>
    </aside>
  );
}
