import { Link } from "react-router";
import { LuArrowRight } from "react-icons/lu";
import { useI18n } from "../../i18n/useI18n";
import BrandMark from "../ui/BrandMark";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <main className="grid min-h-dvh place-items-center px-6">
      <div className="w-full max-w-md animate-fade-up text-center">
        <BrandMark className="mx-auto size-10" />
        <p className="tabular mt-8 font-mono text-[64px] font-semibold leading-none tracking-tight text-elevated">
          {t("notFound.code")}
        </p>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">
          {t("notFound.title")}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">
          {t("notFound.body")}
        </p>
        <Link to="/" className="btn-primary mt-8">
          {t("notFound.back")}
          <LuArrowRight className="size-4 rtl:rotate-180" strokeWidth={2} />
        </Link>
      </div>
    </main>
  );
}
