import { LuConstruction } from "react-icons/lu";
import AppLayout from "./AppLayout";
import { useI18n } from "../../i18n/useI18n";
export default function Placeholder({ titleKey }) {
  const { t } = useI18n();
  const title = t(titleKey);

  return (
    <AppLayout
      title={title}
      crumbs={[{ label: t("crumb.home"), to: "/" }, { label: title }]}
    >
      <section className="surface-card animate-fade-up flex flex-col items-center justify-center gap-3 px-6 py-20 text-center">
        <span className="grid size-12 place-items-center rounded-full bg-elevated text-fg-subtle">
          <LuConstruction aria-hidden="true" className="size-5" strokeWidth={1.75} />
        </span>
        <p className="text-sm font-medium">{t("placeholder.title")}</p>
        <p className="max-w-sm text-[13px] leading-relaxed text-fg-muted">
          {t("placeholder.body", { section: title })}
        </p>
      </section>
    </AppLayout>
  );
}
