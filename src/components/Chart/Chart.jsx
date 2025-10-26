import React from "react";
import Chart from "react-apexcharts";

// داده‌های شبیه‌سازی شده برای نمودار
const chartData = [
  { name: "شنبه", thisWeek: 110000000, lastWeek: 100000000 },
  { name: "یکشنبه", thisWeek: 145000000, lastWeek: 120000000 },
  { name: "دوشنبه", thisWeek: 160000000, lastWeek: 155000000 },
  { name: "سه شنبه", thisWeek: 220342123, lastWeek: 170000000 },
  { name: "چهار شنبه", thisWeek: 195000000, lastWeek: 230000000 },
  { name: "پنج شنبه", thisWeek: 170000000, lastWeek: 200000000 },
  { name: "جمعه", thisWeek: 160000000, lastWeek: 155000000 },
];

const MyChart = () => {
  // پیکربندی داده‌ها (series)
  const series = [
    {
      name: "این هفته",
      data: chartData.map((item) => item.thisWeek),
    },
    {
      name: "هفته آخر",
      data: chartData.map((item) => item.lastWeek),
    },
  ];

  // پیکربندی تنظیمات ظاهری (options)
  // --- این بخش توسط خود کتابخانه ApexCharts خوانده می‌شود و نیازی به Tailwind ندارد ---
  const options = {
    chart: {
      id: "views-line-chart",
      toolbar: { show: false },
      background: "#131B2F",
      foreColor: "#8A9CBF",
    },
    stroke: {
      curve: "smooth",
      width: [3, 2],
      colors: ["#00F6FF", "#262F46"],
    },
    grid: {
      show: true,
      borderColor: "#1F283E",
      xaxis: { lines: { show: false } },
      padding: { top: 0, right: 20, bottom: 0, left: 0 },
    },
    xaxis: {
      categories: chartData.map((item) => item.name),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: "#8A9CBF", fontSize: "12px" } },
    },
    yaxis: {
      labels: {
        show: true,
        formatter: (value) => {
          if (value >= 1000000) {
            return `${(value / 1000000).toFixed(0)}M`;
          }
          return value;
        },
        style: { colors: ["#8A9CBF"] },
      },
    },
    tooltip: {
      theme: "dark",
      style: { fontSize: "14px", fontFamily: "inherit" },
      x: { show: true },
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const value = series[seriesIndex][dataPointIndex];
        const formattedValue = new Intl.NumberFormat().format(value);
        const label = w.globals.labels[dataPointIndex];
        return (
          '<div class="apexcharts-custom-tooltip" style="padding: 10px 20px; background-color: #071026; border-radius: 8px; border: 1px solid #00C4FF;">' +
          '<div style="color: #8A9CBF; font-size: 12px;">این هفته</div>' +
          '<div style="color: white; font-size: 18px; font-weight: bold;">' +
          formattedValue +
          "</div>" +
          '<div style="color: #8A9CBF; font-size: 12px;">' +
          label +
          "</div>" +
          "</div>"
        );
      },
    },
    markers: {
      size: 0,
      strokeWidth: 0,
      hover: {
        size: 8,
        sizeOffset: 0,
        strokeWidth: 3,
        strokeColors: "#00C4FF",
        fillColors: "#071026",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.8,
        gradientToColors: ["#1a1f33", "#1a1f33"],
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0.05,
        stops: [0, 100],
      },
    },
    legend: { show: false },
    dataLabels: { enabled: false },
  };

  return (
    <div
      // style={{
      //   background: "#131B2F",
      //   padding: "15px",
      //   borderRadius: "12px",
      //   height: "327px",
      //   maxHeight: "327px",
      //   boxSizing: "border-box",
      //   display: "flex",
      //   flexDirection: "column",
      // }}
      className="bg-[#131B2F] py-[15px] pl-[15px] rounded-xl h-[327px] max-h-[327px] box-border flex flex-col"
    >
      <div
        // style={{ color: "white", fontSize: "18px", marginBottom: "30px" }}
        className="flex gap-x-2 items-center text-white text-lg mb-[30px]"
      >
        بازدید ها
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
      <div
        // style={{ flex: 1, minHeight: 0 }}
        className="flex-1 min-h-0" // min-h-0 برای اطمینان از نمایش صحیح چارت در flex-col
      >
        <Chart
          options={options}
          series={series}
          type="area"
          height={"100%"}
          width="100%"
        />
      </div>
    </div>
  );
};

export default MyChart;
