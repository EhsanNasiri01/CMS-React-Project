import { useCallback, useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { enUS, faIR } from "@mui/x-data-grid/locales";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";
import {
  LuCircleAlert,
  LuInbox,
  LuPencil,
  LuPlus,
  LuRefreshCw,
  LuSearch,
  LuTrash2,
} from "react-icons/lu";
import { useI18n } from "../../i18n/useI18n";

const firebaseURL =
  "https://cms-dashboard-23daf-default-rtdb.firebaseio.com/users";

const PAGE_SIZE = 8;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ── SweetAlert helpers ───────────────────────────────────────────────────
   The modal markup is raw HTML (SweetAlert's API), but every field gets a
   real <label>, a 44px input and its own inline error slot. Styling lives in
   index.css under the .swal2-field rules.                                   */

const FIELDS = [
  { id: "name", labelKey: "dialog.field.name", type: "text", autocomplete: "name" },
  { id: "username", labelKey: "dialog.field.username", type: "text", autocomplete: "username" },
  { id: "email", labelKey: "dialog.field.email", type: "email", autocomplete: "email" },
  { id: "password", labelKey: "dialog.field.password", type: "password", autocomplete: "new-password" },
];

const escapeHtml = (value = "") =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
  );

function buildForm(t, values = {}) {
  return FIELDS.map(
    (field) => `
      <div class="swal2-field">
        <label for="f-${field.id}">${t(field.labelKey)}</label>
        <input id="f-${field.id}" type="${field.type}" name="${field.id}"
               autocomplete="${field.autocomplete}"
               placeholder="${t(field.labelKey)}"
               value="${escapeHtml(values[field.id] ?? "")}" />
      </div>`
  ).join("");
}

function readForm(t) {
  const values = {};
  let firstInvalid = null;

  for (const field of FIELDS) {
    const input = document.getElementById(`f-${field.id}`);
    values[field.id] = input.value.trim();
    input.setAttribute("aria-invalid", "false");
  }

  const errors = [];
  if (FIELDS.some((f) => !values[f.id])) errors.push(t("dialog.error.required"));
  if (values.email && !EMAIL_RE.test(values.email))
    errors.push(t("dialog.error.email"));

  if (errors.length) {
    for (const field of FIELDS) {
      const input = document.getElementById(`f-${field.id}`);
      const invalid =
        !values[field.id] ||
        (field.id === "email" && !EMAIL_RE.test(values.email));
      if (invalid) {
        input.setAttribute("aria-invalid", "true");
        firstInvalid ??= input;
      }
    }
    // Focus the first field that needs fixing (WCAG focus management)
    firstInvalid?.focus();
    Swal.showValidationMessage(errors[0]);
    return false;
  }

  return values;
}

const toast = (icon, title) =>
  Swal.fire({
    icon,
    title,
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
    position: "top-end",
    toast: true,
    width: "auto",
  });

/* ── Table states ────────────────────────────────────────────────────────── */

function TableMessage({ Icon, title, body, action, tone = "muted" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <span
        className={[
          "grid size-12 place-items-center rounded-full",
          tone === "danger"
            ? "bg-danger/10 text-danger"
            : "bg-elevated text-fg-subtle",
        ].join(" ")}
      >
        <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
      </span>
      <div>
        <p className="text-sm font-medium text-fg">{title}</p>
        <p className="mt-1 text-[13px] text-fg-muted">{body}</p>
      </div>
      {action}
    </div>
  );
}

/* ── Component ───────────────────────────────────────────────────────────── */

export default function UsersTable() {
  const { t, isRtl, formatNumber } = useI18n();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PAGE_SIZE,
  });

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`${firebaseURL}.json`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setRows(
        data
          ? Object.entries(data).map(([key, user]) => ({
              ...user,
              id: user.id ? +user.id : key,
              firebaseKey: key, // addresses the record for PUT/DELETE
            }))
          : []
      );
    } catch (err) {
      console.error(err);
      setRows([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) =>
      ["name", "username", "email"].some((field) =>
        String(row[field] ?? "").toLowerCase().includes(q)
      )
    );
  }, [rows, query]);

  /* ── Mutations ── */

  const addUser = async () => {
    const { value } = await Swal.fire({
      title: t("dialog.addTitle"),
      html: buildForm(t),
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: t("dialog.add"),
      cancelButtonText: t("dialog.cancel"),
      preConfirm: () => readForm(t),
    });
    if (!value) return;

    const maxId = rows.length
      ? Math.max(...rows.map((u) => parseInt(u.id, 10) || 0))
      : 0;

    try {
      const res = await fetch(`${firebaseURL}.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...value, id: maxId + 1 }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await fetchUsers();
      toast("success", t("dialog.success.added"));
    } catch (err) {
      console.error(err);
      toast("error", t("dialog.error.add"));
    }
  };

  const editUser = async (row) => {
    const { value } = await Swal.fire({
      title: t("dialog.editTitle"),
      html: buildForm(t, row),
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: t("dialog.save"),
      cancelButtonText: t("dialog.cancel"),
      preConfirm: () => readForm(t),
    });
    if (!value) return;

    try {
      const res = await fetch(`${firebaseURL}/${row.firebaseKey}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...value, id: row.id }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await fetchUsers();
      toast("success", t("dialog.success.updated"));
    } catch (err) {
      console.error(err);
      toast("error", t("dialog.error.update"));
    }
  };

  const deleteUser = async (row) => {
    const { isConfirmed } = await Swal.fire({
      title: t("dialog.confirmDelete"),
      text: t("dialog.confirmDeleteBody", { name: row.name }),
      icon: "warning",
      iconColor: "#F5556D",
      showCancelButton: true,
      focusCancel: true,
      confirmButtonText: t("dialog.delete"),
      cancelButtonText: t("dialog.cancel"),
      customClass: { confirmButton: "swal2-danger" },
    });
    if (!isConfirmed || !row.firebaseKey) return;

    try {
      const res = await fetch(`${firebaseURL}/${row.firebaseKey}.json`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await fetchUsers();
      toast("success", t("dialog.success.deleted"));
    } catch (err) {
      console.error(err);
      toast("error", t("dialog.error.delete"));
    }
  };

  /* ── Columns ── */

  const columns = useMemo(
    () => [
      {
        field: "name",
        headerName: t("users.col.name"),
        flex: 1.2,
        minWidth: 180,
        renderCell: ({ row }) => (
          <span className="flex h-full items-center gap-3">
            <span
              aria-hidden="true"
              className="grid size-8 shrink-0 place-items-center overflow-hidden rounded-full bg-elevated font-mono text-[11px] leading-none text-fg-muted ring-1 ring-line"
            >
              {String(row.name ?? "?")
                .trim()
                .split(/\s+/)
                .slice(0, 2)
                .map((w) => [...w][0] ?? "")
                .join("")
                .toUpperCase()}
            </span>
            <span className="truncate text-fg">{row.name}</span>
          </span>
        ),
      },
      {
        field: "username",
        headerName: t("users.col.username"),
        flex: 1,
        minWidth: 140,
        renderCell: ({ value }) => (
          <span className="font-mono text-[13px] text-fg-muted">@{value}</span>
        ),
      },
      {
        field: "email",
        headerName: t("users.col.email"),
        flex: 1.4,
        minWidth: 200,
      },
      {
        field: "password",
        headerName: t("users.col.password"),
        flex: 0.8,
        minWidth: 120,
        sortable: false,
        renderCell: ({ value }) => (
          <span className="font-mono tracking-[0.2em] text-fg-subtle">
            {"•".repeat(Math.min(String(value ?? "").length || 8, 10))}
          </span>
        ),
      },
      {
        field: "actions",
        headerName: t("users.col.actions"),
        width: 112,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        headerAlign: "center",
        align: "center",
        renderCell: ({ row }) => (
          <span className="flex h-full items-center justify-center gap-1.5">
            <button
              type="button"
              onClick={() => editUser(row)}
              aria-label={`${t("users.edit")}: ${row.name}`}
              title={t("users.edit")}
              className="grid size-9 cursor-pointer place-items-center rounded-lg border border-line bg-panel text-fg-muted transition-colors duration-200 hover:border-accent/50 hover:text-accent"
            >
              <LuPencil className="size-4" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={() => deleteUser(row)}
              aria-label={`${t("users.delete")}: ${row.name}`}
              title={t("users.delete")}
              className="grid size-9 cursor-pointer place-items-center rounded-lg border border-line bg-panel text-fg-muted transition-colors duration-200 hover:border-danger/50 hover:text-danger"
            >
              <LuTrash2 className="size-4" strokeWidth={1.75} />
            </button>
          </span>
        ),
      },
    ],
    // editUser / deleteUser are stable enough for this table's lifetime
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, rows]
  );

  /* ── MUI theme: map the DataGrid onto the console palette ── */

  const theme = useMemo(
    () =>
      createTheme(
        {
          direction: isRtl ? "rtl" : "ltr",
          palette: {
            mode: "dark",
            primary: { main: "#2DE2C5" },
            background: { default: "#0D1220", paper: "#0D1220" },
            text: { primary: "#E6EBF5", secondary: "#8B9AB8" },
            divider: "#1E2740",
          },
          typography: {
            fontFamily: isRtl
              ? "Vazirmatn, Instrument Sans, sans-serif"
              : "Instrument Sans, ui-sans-serif, sans-serif",
            fontSize: 14,
          },
        },
        isRtl ? faIR : enUS
      ),
    [isRtl]
  );

  const gridSx = {
    border: "none",
    color: "#E6EBF5",
    "--DataGrid-rowBorderColor": "#161E33",
    "& .MuiDataGrid-columnHeaders": { borderBottom: "1px solid #1E2740" },
    "& .MuiDataGrid-columnHeader": {
      backgroundColor: "#0B1120",
      color: "#5C6B87",
      // Persian has no letter case and dislikes wide tracking — see .eyebrow
      fontFamily: isRtl ? "Vazirmatn, sans-serif" : "'JetBrains Mono', monospace",
      fontSize: isRtl ? 12 : 11,
      letterSpacing: isRtl ? 0 : "0.12em",
      textTransform: isRtl ? "none" : "uppercase",
    },
    "& .MuiDataGrid-columnSeparator": { display: "none" },
    "& .MuiDataGrid-cell": {
      borderBottom: "1px solid #161E33",
      outline: "none !important",
    },
    "& .MuiDataGrid-row": {
      transition: "background-color 160ms ease",
      "&:hover": { backgroundColor: "#111A2C" },
      "&.Mui-selected": {
        backgroundColor: "#14203A",
        "&:hover": { backgroundColor: "#182645" },
      },
    },
    "& .MuiDataGrid-footerContainer": {
      borderTop: "1px solid #1E2740",
      minHeight: 52,
    },
    "& .MuiTablePagination-root": { color: "#8B9AB8" },
    "& .MuiCheckbox-root": { color: "#3B486B", "&.Mui-checked": { color: "#2DE2C5" } },
    "& .MuiDataGrid-overlay": { backgroundColor: "transparent" },
    "& .MuiDataGrid-virtualScroller": { minHeight: 120 },
  };

  /* ── Render ── */

  const showEmpty = !loading && !error && filteredRows.length === 0;

  return (
    <section className="surface-card overflow-hidden">
      {/* Toolbar */}
      <header className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-4">
        <div className="min-w-0">
          <h2 className="text-[15px] font-semibold tracking-tight">
            {t("users.title")}
          </h2>
          <p className="mt-0.5 text-xs text-fg-subtle">
            {t(rows.length === 1 ? "users.count_one" : "users.count", {
              n: formatNumber(rows.length),
            })}
          </p>
        </div>

        <div className="ms-auto flex flex-wrap items-center gap-2">
          <div className="relative">
            <LuSearch
              aria-hidden="true"
              className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-fg-subtle"
              strokeWidth={1.75}
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label={t("users.search")}
              placeholder={t("users.search")}
              className="h-10 w-full rounded-lg border border-line bg-canvas ps-9 pe-3 text-sm placeholder:text-fg-subtle focus:border-accent focus:outline-none focus:ring-[3px] focus:ring-accent/15 sm:w-56"
            />
          </div>

          <button
            type="button"
            onClick={fetchUsers}
            disabled={loading}
            aria-label={t("users.refresh")}
            title={t("users.refresh")}
            className="btn-ghost !w-10 !px-0"
          >
            <LuRefreshCw
              className={`size-4 ${loading ? "animate-spin" : ""}`}
              strokeWidth={1.75}
            />
          </button>

          <button type="button" onClick={addUser} className="btn-primary">
            <LuPlus className="size-4" strokeWidth={2.25} />
            {t("users.add")}
          </button>
        </div>
      </header>

      {error ? (
        <TableMessage
          Icon={LuCircleAlert}
          tone="danger"
          title={t("users.error.title")}
          body={t("users.error.body")}
          action={
            <button type="button" onClick={fetchUsers} className="btn-ghost">
              <LuRefreshCw className="size-4" strokeWidth={1.75} />
              {t("users.retry")}
            </button>
          }
        />
      ) : showEmpty ? (
        <TableMessage
          Icon={LuInbox}
          title={t("users.empty.title")}
          body={t("users.empty.body")}
          action={
            <button type="button" onClick={addUser} className="btn-primary">
              <LuPlus className="size-4" strokeWidth={2.25} />
              {t("users.add")}
            </button>
          }
        />
      ) : (
        <ThemeProvider theme={theme}>
          <Box sx={{ width: "100%" }} dir={isRtl ? "rtl" : "ltr"}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              loading={loading}
              rowHeight={60}
              columnHeaderHeight={44}
              checkboxSelection
              disableRowSelectionOnClick
              pageSizeOptions={[PAGE_SIZE, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              sx={gridSx}
              localeText={
                (isRtl ? faIR : enUS).components.MuiDataGrid.defaultProps
                  .localeText
              }
            />
          </Box>
        </ThemeProvider>
      )}
    </section>
  );
}
