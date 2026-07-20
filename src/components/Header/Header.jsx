import { LuBell, LuMenu, LuSearch } from "react-icons/lu";
import { useI18n } from "../../i18n/useI18n";
import LanguageTabs from "../ui/LanguageTabs";

const UNREAD = 3;

export default function Header({ onOpenNav }) {
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-line bg-surface/85 px-4 backdrop-blur-xl md:px-6">
      {/* Mobile drawer trigger */}
      <button
        type="button"
        onClick={onOpenNav}
        aria-label={t("header.openMenu")}
        className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-lg text-fg-muted transition-colors hover:bg-panel hover:text-fg lg:hidden"
      >
        <LuMenu className="size-5" strokeWidth={1.75} />
      </button>

      {/* Search */}
      <div className="relative min-w-0 flex-1 md:max-w-md">
        <LuSearch
          aria-hidden="true"
          className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-fg-subtle"
          strokeWidth={1.75}
        />
        <input
          type="search"
          aria-label={t("header.searchShort")}
          placeholder={t("header.search")}
          className="h-11 w-full rounded-lg border border-line bg-canvas ps-10 pe-3 text-sm text-fg
                     placeholder:text-fg-subtle
                     transition-[border-color,box-shadow] duration-200
                     focus:border-accent focus:outline-none focus:ring-[3px] focus:ring-accent/15"
        />
      </div>

      <div className="ms-auto flex items-center gap-2 md:gap-3">
        <LanguageTabs />

        <button
          type="button"
          aria-label={`${t("header.notifications")} — ${t("header.unread", {
            n: UNREAD,
          })}`}
          className="relative grid size-11 cursor-pointer place-items-center rounded-lg text-fg-muted transition-colors hover:bg-panel hover:text-fg"
        >
          <LuBell className="size-5" strokeWidth={1.75} />
          {UNREAD > 0 && (
            <span className="absolute end-2 top-2 grid size-4 place-items-center rounded-full bg-danger font-mono text-[9px] font-semibold text-white ring-2 ring-surface">
              {UNREAD}
            </span>
          )}
        </button>

        <div className="hidden h-8 w-px bg-line sm:block" />

        <button
          type="button"
          className="flex h-11 cursor-pointer items-center gap-2.5 rounded-lg px-2 transition-colors hover:bg-panel"
        >
          <span
            aria-hidden="true"
            className="grid size-8 shrink-0 place-items-center rounded-full bg-elevated font-mono text-xs font-semibold text-fg ring-1 ring-line-strong"
          >
            EN
          </span>
          <span className="hidden text-start leading-tight sm:block">
            <span className="block text-sm font-medium">Ehsan Nasiri</span>
            <span className="block text-[11px] text-fg-subtle">
              {t("header.role")}
            </span>
          </span>
        </button>
      </div>
    </header>
  );
}
