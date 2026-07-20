import { NavLink } from "react-router";
import {
  LuFileText,
  LuImage,
  LuLayoutDashboard,
  LuLifeBuoy,
  LuPanelLeftClose,
  LuPanelLeftOpen,
  LuSettings,
  LuUsers,
} from "react-icons/lu";
import { useI18n } from "../../i18n/useI18n";
import BrandMark from "../ui/BrandMark";

const PRIMARY = [
  { to: "/", labelKey: "nav.dashboard", Icon: LuLayoutDashboard, end: true },
  { to: "/users", labelKey: "nav.users", Icon: LuUsers },
  { to: "/content", labelKey: "nav.content", Icon: LuFileText },
  { to: "/media", labelKey: "nav.media", Icon: LuImage },
];

const SECONDARY = [
  { to: "/settings", labelKey: "nav.settings", Icon: LuSettings },
  { to: "/support", labelKey: "nav.support", Icon: LuLifeBuoy },
];

function NavItem({ to, end, Icon, label, expanded, onNavigate }) {
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
        </>
      )}
    </NavLink>
  );
}

export default function Sidebar({
  expanded,
  onToggle,
  onNavigate,
  className = "",
}) {
  const { t } = useI18n();

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
            label={t(item.labelKey)}
            expanded={expanded}
            onNavigate={onNavigate}
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
