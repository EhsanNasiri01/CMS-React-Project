import AppLayout from "../layout/AppLayout";
import UsersTable from "../UsersTable/UsersTable";
import { useI18n } from "../../i18n/useI18n";

export default function Users() {
  const { t } = useI18n();

  return (
    <AppLayout
      title={t("page.users.title")}
      subtitle={t("page.users.subtitle")}
      crumbs={[
        { label: t("crumb.home"), to: "/" },
        { label: t("page.users.title") },
      ]}
    >
      <div className="animate-fade-up">
        <UsersTable />
      </div>
    </AppLayout>
  );
}
