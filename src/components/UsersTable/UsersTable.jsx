import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { faIR } from "@mui/x-data-grid/locales";
import { IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

// تعریف ستون‌ها با راست‌چین بودن کامل
const columns = [
  {
    field: "name",
    headerName: "نام",
    flex: 1,
    renderCell: (params) => (
      <span
        style={{
          marginRight: 0,
          display: "block",
          textAlign: "right",
          width: "100%",
        }}
      >
        {params.value}
      </span>
    ),
    headerAlign: "left",
    align: "left",
  },
  {
    field: "username",
    headerName: "نام کاربری",
    flex: 1,
    renderCell: (params) => (
      <span
        style={{
          marginRight: 0,
          display: "block",
          textAlign: "right",
          width: "100%",
        }}
      >
        {params.value}
      </span>
    ),
    headerAlign: "left",
    align: "left",
  },
  {
    field: "email",
    headerName: "ایمیل",
    flex: 1.2,
    renderCell: (params) => (
      <span
        style={{
          marginRight: 0,
          display: "block",
          textAlign: "right",
          width: "100%",
        }}
      >
        {params.value}
      </span>
    ),
    headerAlign: "left",
    align: "left",
  },
  {
    field: "password",
    headerName: "پسورد",
    flex: 1,
    renderCell: (params) => (
      <span
        style={{
          marginRight: 0,
          display: "block",
          textAlign: "right",
          width: "100%",
        }}
      >
        {params.value}
      </span>
    ),
    headerAlign: "left",
    align: "left",
  },
  {
    field: "actions",
    headerName: "عملیات",
    width: 110,
    sortable: false,
    filterable: false,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => (
      <div
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "center",
          width: "100%",
        }}
      >
        <IconButton
          size="small"
          sx={{
            backgroundColor: "#6376ba",
            color: "#fff",
            "&:hover": { backgroundColor: "#6376ba" },
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            transition: "all 0.18s",
          }}
          aria-label="ویرایش"
          title="ویرایش"
          onClick={() => alert(`ویرایش کاربر: ${params.row.name}`)}
        >
          <EditOutlinedIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <IconButton
          size="small"
          sx={{
            backgroundColor: "#E91E63",
            color: "#fff",
            "&:hover": { backgroundColor: "#F06292" },
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            transition: "all 0.18s",
          }}
          aria-label="حذف"
          title="حذف"
          onClick={() => alert(`حذف کاربر: ${params.row.name}`)}
        >
          <DeleteOutlineOutlinedIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </div>
    ),
  },
];

const rows = [
  {
    id: 1,
    name: "علی رضایی",
    username: "ali.rezaei",
    email: "ali@example.com",
    password: "Ali@1234",
  },
  {
    id: 2,
    name: "رضا محمدی",
    username: "reza.mohammadi",
    email: "reza@example.com",
    password: "Reza@5678",
  },
  {
    id: 3,
    name: "سارا احمدی",
    username: "sara.ahmadi",
    email: "sara@example.com",
    password: "Sara@9876",
  },
  {
    id: 4,
    name: "مریم سلطانی",
    username: "maryam.soltani",
    email: "maryam@example.com",
    password: "Maryam@2468",
  },
  {
    id: 5,
    name: "حمید نادری",
    username: "hamid.naderi",
    email: "hamid@example.com",
    password: "Hamid@1357",
  },
  {
    id: 6,
    name: "نگار کریمی",
    username: "negar.karimi",
    email: "negar@example.com",
    password: "Negar@1122",
  },
];

export default function UsersTable() {
  const theme = createTheme(
    {
      direction: "rtl",
      palette: { mode: "dark" },
      typography: {
        fontFamily: [
          "IRANSans",
          "Vazirmatn",
          "Tahoma",
          "Segoe UI",
          "sans-serif",
        ].join(","),
      },
    },
    faIR
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: 420, width: "100%", direction: "rtl" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5]}
          checkboxSelection // برای فعال‌سازی چک‌باکس کنار هر کاربر
          sx={{
            direction: "rtl",
            "& .MuiDataGrid-footerContainer": { justifyContent: "flex-end" },
            "& .MuiDataGrid-cell": {
              justifyContent: "flex-end",
              textAlign: "right",
              paddingRight: "0.5rem",
            },
            "& .MuiDataGrid-columnHeader": {
              textAlign: "right",
              justifyContent: "flex-end",
            },
            // چک‌باکس و هدر را راست‌چین کند
            "& .MuiDataGrid-columnHeaderCheckbox, & .MuiDataGrid-cellCheckbox":
              {
                justifyContent: "flex-end",
                flexDirection: "row-reverse",
              },
          }}
          localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>
    </ThemeProvider>
  );
}
