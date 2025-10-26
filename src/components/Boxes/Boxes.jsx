import React from "react";

export default function Boxes() {
  return (
    // کانتینر گرید با فاصله 24px (gap-6)
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 py-6 font-Dana">
      {/* باکس 1: بازدید ها */}
      <div className="flex flex-col justify-between bg-[#24304B] p-3 rounded-xl shadow-lg gap-y-5 ">
        {/* ردیف بالا: عنوان و آیکون */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-slate-400">بازدید ها</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-yellow-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 10.224 6.365 7.5 12 7.5c5.635 0 8.573 2.724 9.964 4.183.37.361.37.958 0 1.319C20.577 14.776 17.635 17.5 12 17.5c-5.635 0-8.573-2.724-9.964-4.183z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        {/* ردیف پایین: عدد و درصد (تراز شده از پایین) */}
        <div className="flex justify-between items-baseline">
          <div>
            <span className="text-3xl font-semibold text-white">
              121,168,658
            </span>
          </div>
          <div className="flex items-center text-sm font-medium text-green-500">
            <span>+11.01%</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 ml-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* باکس 2: نمایش ها */}
      <div className="flex flex-col justify-between bg-[#24304B] p-3 rounded-xl shadow-lg gap-y-5 ">
        {/* ردیف بالا: عنوان و آیکون */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-slate-400">نمایش ها</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-purple-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75v4.5m0-4.5h-4.5m4.5 0L15 9M20.25 20.25v-4.5m0 4.5h-4.5m4.5 0L15 15"
            />
          </svg>
        </div>
        {/* ردیف پایین: عدد و درصد (تراز شده از پایین) */}
        <div className="flex justify-between items-baseline">
          <div>
            <span className="text-3xl font-semibold text-white">728,564</span>
          </div>
          <div className="flex items-center text-sm font-medium text-green-500">
            <span>+25%</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 ml-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* باکس 3: کاربران جدید */}
      <div className="flex flex-col justify-between bg-[#24304B] p-3 rounded-xl shadow-lg gap-y-5 ">
        {/* ردیف بالا: عنوان و آیکون */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-slate-400">
            کاربران جدید
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.5 21.75c-2.673 0-5.18-.932-7.14-2.515z"
            />
          </svg>
        </div>
        {/* ردیف پایین: عدد و درصد (تراز شده از پایین) */}
        <div className="flex justify-between items-baseline">
          <div>
            <span className="text-3xl font-semibold text-white">1,457</span>
          </div>
          <div className="flex items-center text-sm font-medium text-green-500">
            <span>+5%</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 ml-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* باکس 4: کاربران فعال */}
      <div className="flex flex-col justify-between bg-[#24304B] p-3 rounded-xl shadow-lg  gap-y-5">
        {/* ردیف بالا: عنوان و آیکون */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-slate-400">
            کاربران فعال
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-green-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </div>
        {/* ردیف پایین: عدد و درصد (تراز شده از پایین) */}
        <div className="flex justify-between items-baseline">
          <div>
            <span className="text-3xl font-semibold text-white">5,653</span>
          </div>
          <div className="flex items-center text-sm font-medium text-green-500">
            <span>+16%</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 ml-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
