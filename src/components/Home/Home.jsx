import AppLayout from "../layout/AppLayout";
import Boxes from "../Boxes/Boxes";
import TrafficChart from "../Chart/Chart";
import SourcesChart from "../Chart/Donut";
import Stats from "../Stats/Stats";
import { useI18n } from "../../i18n/useI18n";

export default function Home() {
  const { t } = useI18n();

  return (
    <AppLayout
      title={t("page.dashboard.title")}
      subtitle={t("page.dashboard.subtitle")}
      crumbs={[
        { label: t("crumb.home"), to: "/" },
        { label: t("page.dashboard.title") },
      ]}
      showRail
    >
      <div className="flex flex-col gap-4">
        <Boxes />

        <div className="animate-fade-up" style={{ animationDelay: "120ms" }}>
          <TrafficChart />
        </div>

        {/* Sources takes the wider half; session activity is a narrow tile */}
        <div
          className="grid animate-fade-up gap-4 lg:grid-cols-[1.6fr_1fr]"
          style={{ animationDelay: "180ms" }}
        >
          <SourcesChart />
          <Stats />
        </div>
      </div>
    </AppLayout>
  );
}
