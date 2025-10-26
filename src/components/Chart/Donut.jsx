import React from "react";
import Chart from "react-apexcharts";

// داده‌های چارت
const data = [
  {
    label: "شرکت گوگل",
    value: 3124213,
    color: "#00C4FF",
    users: "3,124,213 کاربر",
  },
  {
    label: "شرکت گیتهاب",
    value: 1523151,
    color: "#008B8B",
    users: "1,523,151 کاربر",
  },
  {
    label: "بقیه شرکت ها",
    value: 948213,
    color: "#3F4E6B",
    users: "948,213 کاربر",
  },
];

const totalUsers = data.reduce((sum, item) => sum + item.value, 0);
const formattedTotalUsers = new Intl.NumberFormat().format(totalUsers);

const DonutChart = () => {
  const series = data.map((item) => item.value);
  const colors = data.map((item) => item.color);

  // پیکربندی تنظیمات ظاهری (options) - این بخش نیازی به Tailwind ندارد
  const options = {
    chart: {
      type: "donut",
      background: "#131B2F",
      foreColor: "#8A9CBF",
      height: 220,
    },
    colors: colors,
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: "80%",
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: " ",
              fontSize: "1px",
              color: "transparent",
              formatter: function (w) {
                return (
                  // این HTML داخلی همچنان از inline style استفاده می‌کند که برای این بخش طبیعی است
                  `<div style="font-size: 28px; font-weight: bold; color: white; line-height: 1.1;">${formattedTotalUsers}</div>` +
                  `<div style="font-size: 14px; color: #8A9CBF; line-height: 1.1;">Label</div>`
                );
              },
            },
            name: {
              show: false,
            },
            value: {
              show: false,
            },
          },
        },
      },
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    labels: data.map((item) => item.label),
    dataLabels: {
      enabled: false,
    },
  };

  // کامپوننت سفارشی Legend (راهنمای کنار چارت) با Tailwind
  const CustomLegend = () => (
    <div
      // style={{
      //   paddingLeft: "40px",
      //   display: "flex",
      //   flexDirection: "column",
      //   gap: "20px",
      //   width: "calc(100% - 200px)",
      // }}
      className="pl-10 flex flex-col gap-5 w-[calc(100%-200px)]"
    >
      {data.map((item) => (
        <div
          key={item.label}
          // style={{ display: "flex", alignItems: "center", gap: "15px" }}
          className="flex items-center gap-x-[15px]" // استفاده از arbitrary value برای gap
        >
          {/* خط رنگی پویا (این مورد باید inline بماند) */}
          <div
            style={{ backgroundColor: item.color }}
            // style={{
            //   width: "30px",
            //   height: "2px",
            // }}
            className="w-[30px] h-[2px]" // استفاده از arbitrary value
          />

          {/* متن Legend */}
          <div className="leading-[1.4]">
            {" "}
            {/* line-height: 1.4 */}
            <div className="text-white text-sm">
              {" "}
              {/* font-size: 14px */}
              {item.label}
            </div>
            <div className="text-[#8A9CBF] text-[13px]">
              {" "}
              {/* color + font-size */}
              {item.users}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // رندر نهایی کامپوننت با Tailwind
  return (
    <div
      // style={{
      //   background: "#131B2F",
      //   padding: "20px",
      //   borderRadius: "12px",
      //   maxWidth: "550px",
      //   display: "flex",
      //   flexDirection: "column",
      //   boxSizing: "border-box",
      // }}
      className="bg-[#131B2F rounded-xl max-w-[550px] flex flex-col box-border"
    >
      {/* ۱. عنوان بالا */}
      <div className="flex  gap-x-2 items-center text-white text-lg mb-5">
        {" "}
        {/* 18px, margin-bottom: 20px */}
        نمودار
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-5 h-5 text-gray-400"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
          />
        </svg>
      </div>

      {/* ۲. کانتینر اصلی برای چارت و Legend */}
      <div
        // style={{
        //   display: "flex",
        //   alignItems: "center",
        //   justifyContent: "flex-start",
        //   height: "220px",
        // }}
        className="flex items-center justify-start gap-x-10 h-[220px]"
      >
        {/* چارت ApexCharts */}
        <div
          // style={{
          //   minWidth: "200px",
          //   height: "220px",
          //   display: "flex",
          //   alignItems: "center",
          //   justifyContent: "center",
          // }}
          className="min-w-[200px] h-[220px] flex items-center justify-center"
        >
          <Chart
            options={options}
            series={series}
            type="donut"
            width="200"
            height="220"
          />
        </div>

        {/* Legend سفارشی */}
        <CustomLegend />
      </div>
    </div>
  );
};

export default DonutChart;
