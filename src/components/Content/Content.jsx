import { LuPlus } from "react-icons/lu";
import AppLayout from "../layout/AppLayout";
import { useI18n } from "../../i18n/useI18n";

const POSTS = [
 [
  {
    id: 1,
    title: "Designing a dark-first admin console",
    author: "John Smith",
    status: "published",
    updated: "2026-07-18",
    views: 12480,
  },
  {
    id: 2,
    title: "Migrating the dashboard to logical CSS properties",
    author: "Emily Johnson",
    status: "review",
    updated: "2026-07-17",
    views: 3120,
  },
  {
    id: 3,
    title: "A pragmatic guide to Firebase REST in React",
    author: "Michael Brown",
    status: "draft",
    updated: "2026-07-15",
    views: 0,
  },
  {
    id: 4,
    title: "Release notes — version 2.4",
    author: "Sarah Wilson",
    status: "scheduled",
    updated: "2026-07-22",
    views: 0,
  },
  {
    id: 5,
    title: "Accessibility checklist for data tables",
    author: "David Miller",
    status: "published",
    updated: "2026-07-11",
    views: 8940,
  },
]
];

/* Status colour is always paired with its label, never the sole signal. */
const STATUS_STYLES = {
  published: "border-success/30 bg-success/10 text-success",
  draft: "border-line-strong bg-elevated text-fg-muted",
  scheduled: "border-info/30 bg-info/10 text-info",
  review: "border-warning/30 bg-warning/10 text-warning",
};

export default function Content() {
  const { t, lang, formatNumber } = useI18n();

  const dateFormatter = new Intl.DateTimeFormat(
    lang === "fa" ? "fa-IR" : "en-US",
    { day: "numeric", month: "short", year: "numeric" }
  );

  return (
    <AppLayout
      title={t("page.content.title")}
      subtitle={t("page.content.subtitle")}
      crumbs={[
        { label: t("crumb.home"), to: "/" },
        { label: t("page.content.title") },
      ]}
      actions={
        <button type="button" className="btn-primary">
          <LuPlus className="size-4" strokeWidth={2.25} />
          {t("content.new")}
        </button>
      }
    >
      <section className="surface-card animate-fade-up overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-start">
            <thead>
              <tr className="border-b border-line bg-canvas/60">
                {[
                  "content.col.title",
                  "content.col.author",
                  "content.col.status",
                  "content.col.updated",
                ].map((key) => (
                  <th
                    key={key}
                    scope="col"
                    className="eyebrow px-5 py-3 text-start font-normal"
                  >
                    {t(key)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {POSTS.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-line/60 transition-colors duration-150 last:border-0 hover:bg-panel"
                >
                  <td className="px-5 py-4">
                    <p className="font-medium leading-snug text-fg">
                      {post.title}
                    </p>
                    {post.views > 0 && (
                      <p className="tabular mt-0.5 font-mono text-[11px] text-fg-subtle">
                        {formatNumber(post.views)} {t("metric.pageViews")}
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-4 text-[13px] text-fg-muted">
                    {post.author}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`pill ${STATUS_STYLES[post.status]}`}>
                      {t(`content.status.${post.status}`)}
                    </span>
                  </td>
                  <td className="tabular px-5 py-4 text-[13px] text-fg-muted">
                    {dateFormatter.format(new Date(post.updated))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AppLayout>
  );
}
