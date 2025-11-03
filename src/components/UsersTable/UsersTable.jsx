import * as React from "react";
import { useState } from "react";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { faIR } from "@mui/x-data-grid/locales";
import { IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const firebaseURL =
  "https://cms-dashboard-23daf-default-rtdb.firebaseio.com/users";

// سبک دارک برای SweetAlert2 Modal و input
const darkSwalStyle = `
.swal2-popup {
  background: #071026 !important;
  color: #fff !important;
  border-radius: 12px !important;
  box-shadow: 0 5px 20px #11182744 !important;
}
.swal2-title,
.swal2-html-container {
  color: #fff !important;
  font-family: IRANSans, Vazirmatn, Tahoma, Segoe UI, sans-serif !important;
}
.swal2-input, .swal2-textarea {
  background: #131B2F !important;
  color: #fff !important;
  border: 1px solid #24304B !important;
  box-shadow: none !important;
}
.swal2-input::placeholder,
.swal2-textarea::placeholder {
  color: #bfc6e0 !important;
  opacity: 1 !important;
}
.swal2-confirm {
  background: #384A71 !important;
  color: #fff !important;
  border: none !important;
  border-radius: 6px !important;
  font-family: IRANSans, Vazirmatn, Tahoma, Segoe UI, sans-serif !important;
}
.swal2-cancel {
  background: #232947 !important;
  color: #fff !important;
  border: 1px solid #414a74 !important;
  border-radius: 6px !important;
  font-family: IRANSans, Vazirmatn, Tahoma, Segoe UI, sans-serif !important;
}
.swal2-actions {
  gap: 0.7rem !important;
}
.swal2-icon {
  color: #F06292 !important;
  border-color: #F06292 !important;
}
`;

export default function UsersTable() {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = useState(false);

  // اضافه کردن style دارک تم SweetAlert2 فقط یک بار
  React.useEffect(() => {
    if (!document.getElementById("dark-swal-style")) {
      const style = document.createElement("style");
      style.id = "dark-swal-style";
      style.innerHTML = darkSwalStyle;
      document.head.appendChild(style);
    }
  }, []);

  // گرفتن کاربران از دیتابیس
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${firebaseURL}.json`);
      if (!response.ok) throw new Error("خطا در دریافت کاربران");
      const data = await response.json();
      if (data) {
        // اگر key نامبر نیست (یعنی id باید int باشد). فرض میگیریم که همیشه id فیلد int است
        const usersList = Object.entries(data).map(([key, user]) => ({
          ...user,
          id: user.id ? +user.id : key,
          firebaseKey: key, // برای حذف و آپدیت لازم است
        }));
        setRows(usersList);
      } else {
        setRows([]);
      }
    } catch (error) {
      console.error(error);
      setRows([]);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  // تعریف ستون‌ها اینجا باشه که به توابع حذف و ویرایش دسترسی داشته باشیم
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
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <IconButton
            size="small"
            sx={{
              backgroundColor: "#384A71",
              color: "#fff",
              "&:hover": { backgroundColor: "#2c3752" },
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              transition: "all 0.18s",
            }}
            aria-label="ویرایش"
            title="ویرایش"
            onClick={() => editUserHandler(params.row)}
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
            onClick={() => deleteUserHandler(params.row)}
          >
            <DeleteOutlineOutlinedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </div>
      ),
    },
  ];

  // تابع افزودن کاربر
  const addUserHandler = async () => {
    const MySwal = withReactContent(Swal);

    const { value: formValues } = await MySwal.fire({
      title: <strong>افزودن کاربر جدید</strong>,
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="نام"/>` +
        `<input id="swal-input2" class="swal2-input" placeholder="نام کاربری"/>` +
        `<input id="swal-input3" class="swal2-input" placeholder="ایمیل" type="email"/>` +
        `<input id="swal-input4" class="swal2-input" placeholder="پسورد" type="password"/>`,
      focusConfirm: false,
      confirmButtonText: "افزودن",
      cancelButtonText: "انصراف",
      showCancelButton: true,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value.trim(),
          document.getElementById("swal-input2").value.trim(),
          document.getElementById("swal-input3").value.trim(),
          document.getElementById("swal-input4").value.trim(),
        ];
      },
      customClass: {
        popup: "", //تمام استایل ما بالا به صورت global اضافه شده
      },
    });

    if (formValues && formValues.every((v) => v)) {
      // پیدا کردن آخرین id و یکی بیشتر را انتخاب کن
      let maxId = 0;
      if (rows.length > 0) {
        maxId = Math.max(...rows.map((u) => parseInt(u.id, 10) || 0));
      }
      const newUser = {
        name: formValues[0],
        username: formValues[1],
        email: formValues[2],
        password: formValues[3],
        id: maxId + 1,
      };
      try {
        // اضافه کن به دیتابیس (POST to /users.json)
        await fetch(`${firebaseURL}.json`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });
        await fetchUsers();
        Swal.fire({
          icon: "success",
          title: "کاربر با موفقیت افزوده شد!",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (err) {
        Swal.fire({ icon: "error", title: "خطا در ثبت کاربر" });
      }
    } else if (formValues) {
      Swal.fire({
        icon: "error",
        title: "همه فیلدها باید پر شوند!",
      });
    }
  };

  // حذف کاربر
  const deleteUserHandler = async (row) => {
    const MySwal = withReactContent(Swal);
    const result = await MySwal.fire({
      title: `حذف کاربر`,
      text: `آیا از حذف "${row.name}" مطمئن هستید؟`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "حذف",
      cancelButtonText: "انصراف",
      customClass: {
        popup: "", //استایل اجراشده سمت بالا همه modalها را دارک میکند
      },
    });
    if (result.isConfirmed) {
      if (!row.firebaseKey) {
        Swal.fire({ icon: "error", title: "خطا در حذف کاربر" });
        return;
      }
      try {
        await fetch(`${firebaseURL}/${row.firebaseKey}.json`, {
          method: "DELETE",
        });
        await fetchUsers();
        Swal.fire({
          icon: "success",
          title: "کاربر حذف شد!",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (err) {
        Swal.fire({ icon: "error", title: "خطا در حذف کاربر" });
      }
    }
  };

  // ویرایش کاربر
  const editUserHandler = async (row) => {
    const MySwal = withReactContent(Swal);
    const { value: formValues } = await MySwal.fire({
      title: <strong>ویرایش کاربر</strong>,
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="نام" value="${
          row.name || ""
        }"/>` +
        `<input id="swal-input2" class="swal2-input" placeholder="نام کاربری" value="${
          row.username || ""
        }"/>` +
        `<input id="swal-input3" class="swal2-input" placeholder="ایمیل" type="email" value="${
          row.email || ""
        }"/>` +
        `<input id="swal-input4" class="swal2-input" placeholder="پسورد" type="password" value="${
          row.password || ""
        }"/>`,
      focusConfirm: false,
      confirmButtonText: "ذخیره تغییرات",
      cancelButtonText: "انصراف",
      showCancelButton: true,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value.trim(),
          document.getElementById("swal-input2").value.trim(),
          document.getElementById("swal-input3").value.trim(),
          document.getElementById("swal-input4").value.trim(),
        ];
      },
      customClass: {
        popup: "",
      },
    });

    if (formValues && formValues.every((v) => v)) {
      const updatedUser = {
        id: row.id,
        name: formValues[0],
        username: formValues[1],
        email: formValues[2],
        password: formValues[3],
      };
      try {
        await fetch(`${firebaseURL}/${row.firebaseKey}.json`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        });
        await fetchUsers();
        Swal.fire({
          icon: "success",
          title: "تغییرات ذخیره شد!",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (err) {
        Swal.fire({ icon: "error", title: "خطا در ویرایش کاربر" });
      }
    } else if (formValues) {
      Swal.fire({
        icon: "error",
        title: "همه فیلدها باید پر شوند!",
      });
    }
  };

  const theme = createTheme(
    {
      direction: "rtl",
      palette: {
        mode: "dark",
        background: {
          default: "#131B2F", // Table background
          paper: "#131B2F",
        },
      },
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

  // محاسبه ارتفاع ثابت متناسب با تعداد ردیف‌ها برای جلوگیری از ردیف خالی اضافه
  const rowHeight = 52;
  const headerHeight = 56;
  const footerHeight = 56;
  const pageSize = 5;

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: pageSize,
  });

  const firstRowIndex = paginationModel.page * paginationModel.pageSize;
  const lastRowIndex = Math.min(
    firstRowIndex + paginationModel.pageSize,
    rows.length
  );
  const visibleRowsCount = lastRowIndex - firstRowIndex;

  // اگر ردیف کمتر از pageSize بود، ارتفاع را کاهش بده تا ردیف اضافه نیاد
  const calculatedHeight =
    headerHeight +
    (visibleRowsCount > 0 ? visibleRowsCount * rowHeight : rowHeight) +
    footerHeight;

  return (
    <div className="mt-5 p-5">
      <div className="flex justify-end mb-4 w-full">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-7 rounded-lg"
          onClick={addUserHandler}
        >
          افزودن کاربر
        </button>
      </div>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            height: calculatedHeight,
            width: "100%",
            direction: "rtl",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            initialState={{
              pagination: { paginationModel: { pageSize: pageSize } },
            }}
            pageSizeOptions={[pageSize]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            checkboxSelection
            sx={{
              direction: "rtl",
              bgcolor: "#131B2F", // Table main background changed
              "& .MuiDataGrid-footerContainer": { justifyContent: "flex-end" },
              "& .MuiDataGrid-cell": {
                justifyContent: "flex-end",
                textAlign: "right",
                paddingRight: "0.5rem",
                bgcolor: "#131B2F", // Changed
              },
              "& .MuiDataGrid-columnHeader": {
                textAlign: "right",
                justifyContent: "flex-end",
                bgcolor: "#24304B", // Header background color changed
                color: "#fff",
              },
              "& .MuiDataGrid-columnHeaderCheckbox, & .MuiDataGrid-cellCheckbox":
                {
                  justifyContent: "flex-end",
                  flexDirection: "row-reverse",
                  bgcolor: "#24304B",
                },
              "& .MuiDataGrid-cellCheckbox": {
                backgroundColor: "#131B2F",
              },
              "& .MuiDataGrid-row": {
                bgcolor: "#131B2F",
              },
              "& .MuiDataGrid-row.Mui-selected": {
                backgroundColor: "#26314d !important",
              },
              "& .MuiDataGrid-virtualScroller": {
                bgcolor: "#131B2F",
              },
              "& .MuiCheckbox-root": {
                color: "#fff",
              },
            }}
            localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
          />
        </Box>
      </ThemeProvider>
    </div>
  );
}
