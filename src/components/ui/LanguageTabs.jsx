import { useI18n } from "../../i18n/useI18n";

export default function LanguageTabs() {
  const { lang, setLang, locales, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t("header.language")}
      className="relative flex h-11 items-center gap-0.5 rounded-lg border border-line bg-canvas p-1"
    >
      {Object.entries(locales).map(([code, meta]) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            title={meta.label}
            className={[
              "relative h-full cursor-pointer rounded-[6px] px-3 font-mono text-xs font-medium",
              "transition-colors duration-200 ease-out",
              active
                ? "bg-accent text-canvas"
                : "text-fg-subtle hover:text-fg",
            ].join(" ")}
          >
            {meta.short}
            <span className="sr-only"> — {meta.label}</span>
          </button>
        );
      })}
    </div>
  );
}
