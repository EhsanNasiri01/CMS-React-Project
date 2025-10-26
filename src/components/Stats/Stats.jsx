import React from "react";
import DonutChart from "../Chart/Donut";
export default function Stats() {
  return (
    <section className="mt-4">
      <div className="flex  justify-between">
        {" "}
        <DonutChart></DonutChart>
        <div className="w-[486px]">
          <div className="max-w-md w-full bg-[#131B2F] rounded-lg">
            <div className="flex items-center gap-x-2 mb-12">
              <h2 className="text-lg font-medium text-white">میزان فعالیت</h2>
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

            <div className="flex mb-3 gap-x-2 items-center">
              <span className="text-4xl font-bold text-white">594</span>
              <span className="ml-2 text-lg text-gray-400">مجموع</span>
            </div>

            <div className="w-full bg-[#3F4E6B] rounded-full h-2.5 mb-6">
              <div className="bg-[#00C4FF] h-2.5 rounded-full w-[30%]"></div>
            </div>

            <div className="grid grid-cols-2 justify-between items-center text-sm gap-x-4">
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center gap-x-2 text-gray-400">
                  <span className="w-4 h-1 bg-[#00C4FF] rounded-full"></span>
                  <span>آنلاین</span>
                </div>
                <span className="text-lg font-semibold text-white">
                  179 کاربر
                </span>
              </div>

              <div className="flex flex-col gap-y-2">
                <div className="flex items-center gap-x-2 text-gray-400">
                  <span className="w-4 h-1 bg-[#3F4E6B] rounded-full"></span>
                  <span>آفلاین</span>
                </div>
                <span className="text-lg font-semibold text-white">
                  394 کاربر
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
