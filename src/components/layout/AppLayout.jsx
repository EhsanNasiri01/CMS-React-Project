import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import LeftSidebar from "../LeftSidebar/LeftSidebar";
import PageHeader from "./PageHeader";
import { useI18n } from "../../i18n/useI18n";
export default function AppLayout({
  title,
  subtitle,
  crumbs = [],
  actions,
  showRail = false,
  children,
}) {
  const { t } = useI18n();
  const [expanded, setExpanded] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e) => e.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  return (
    <div className="flex h-dvh overflow-hidden bg-canvas">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-canvas"
      >
        {t("common.skipToContent")}
      </a>

      {/* Desktop sidebar */}
      <Sidebar
        expanded={expanded}
        onToggle={() => setExpanded((v) => !v)}
        className="hidden lg:flex"
      />

      {/* Mobile drawer */}
      <div
        className={[
          "fixed inset-0 z-50 lg:hidden",
          drawerOpen ? "" : "pointer-events-none",
        ].join(" ")}
      >
        <div
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
          className={[
            "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
            drawerOpen ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />
        <div
          className={[
            "absolute inset-y-0 start-0 transition-transform duration-300 ease-out",
            drawerOpen ? "translate-x-0" : "-translate-x-full rtl:translate-x-full",
          ].join(" ")}
        >
          <Sidebar
            expanded
            onToggle={() => setDrawerOpen(false)}
            onNavigate={() => setDrawerOpen(false)}
          />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <Header onOpenNav={() => setDrawerOpen(true)} />

        <div className="flex min-h-0 flex-1">
          <main
            id="main"
            className="min-w-0 flex-1 overflow-y-auto px-4 pb-12 pt-6 md:px-6 lg:px-8"
          >
            <div className="mx-auto w-full max-w-[1400px]">
              <PageHeader
                title={title}
                subtitle={subtitle}
                crumbs={crumbs}
                actions={actions}
              />
              {children}
            </div>
          </main>

          {showRail && <LeftSidebar />}
        </div>
      </div>
    </div>
  );
}
