import React from "react";

export default function LeftSidebar() {
  return (
    <section className="border-r-2 border-darker-bg h-screen">
      <div class="w-[300px] bg-[#131B2F] ">
        <div class="w-full max-w-xs rounded-lg p-6 text-white flex flex-col gap-y-8">
          <div class="flex flex-col gap-y-4">
            <div class="flex items-center gap-x-2">
              <h3 class="font-semibold text-white">فعالیت ها</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-5 h-5 text-gray-400"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
            </div>

            <ul class="flex flex-col">
              <li class="flex gap-x-3">
                <div class="flex flex-col items-center">
                  <img
                    class="w-8 h-8 rounded-full"
                    src="https://placehold.co/40x40/a0aec0/E2E8F0"
                    alt="avatar"
                  />
                  <div class="w-px h-6 bg-[#3F4E6B] my-1"></div>
                </div>
                <div class="flex flex-col -mt-1">
                  <p class="text-white text-sm">جزئیات پروژه X تغییر کرد</p>
                  <p class="text-gray-400 text-xs">همین حالا</p>
                </div>
              </li>

              <li class="flex gap-x-3">
                <div class="flex flex-col items-center">
                  <img
                    class="w-8 h-8 rounded-full"
                    src="https://placehold.co/40x40/718096/E2E8F0"
                    alt="avatar"
                  />
                  <div class="w-px h-6 bg-[#3F4E6B] my-1"></div>
                </div>
                <div class="flex flex-col -mt-1">
                  <p class="text-white text-sm">نسخه جدید منتشر شد</p>
                  <p class="text-gray-400 text-xs">۵۹ دقیقه پیش</p>
                </div>
              </li>

              <li class="flex gap-x-3">
                <div class="flex flex-col items-center">
                  <img
                    class="w-8 h-8 rounded-full"
                    src="https://placehold.co/40x40/4A5568/E2E8F0"
                    alt="avatar"
                  />
                  <div class="w-px h-6 bg-[#3F4E6B] my-1"></div>
                </div>
                <div class="flex flex-col -mt-1">
                  <p class="text-white text-sm">یک باگ ارسال شد</p>
                  <p class="text-gray-400 text-xs">۱۲ ساعت پیش</p>
                </div>
              </li>

              <li class="flex gap-x-3">
                <div class="flex flex-col items-center">
                  <img
                    class="w-8 h-8 rounded-full"
                    src="https://placehold.co/40x40/2D3748/E2E8F0"
                    alt="avatar"
                  />
                </div>
                <div class="flex flex-col -mt-1">
                  <p class="text-white text-sm">داده A در صفحه X ویرایش شد</p>
                  <p class="text-gray-400 text-xs">امروز، ۱۱:۵۹ صبح</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="flex flex-col gap-y-4">
            <div class="flex items-center gap-x-2">
              <h3 class="font-semibold text-white">آخرین کاربران</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-5 h-5 text-gray-400"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
            </div>

            <ul class="flex flex-col gap-y-3">
              <li class="flex items-center gap-x-3">
                <img
                  class="w-8 h-8 rounded-full"
                  src="https://placehold.co/40x40/E2E8F0/4A5568"
                  alt="avatar"
                />
                <span class="text-sm font-medium">احسان نصیری</span>
              </li>
              <li class="flex items-center gap-x-3">
                <img
                  class="w-8 h-8 rounded-full"
                  src="https://placehold.co/40x40/f56565/4A5568"
                  alt="avatar"
                />
                <span class="text-sm font-medium">ابولفضل</span>
              </li>
              <li class="flex items-center gap-x-3">
                <img
                  class="w-8 h-8 rounded-full"
                  src="https://placehold.co/40x40/ed8936/4A5568"
                  alt="avatar"
                />
                <span class="text-sm font-medium">محمد</span>
              </li>
              <li class="flex items-center gap-x-3">
                <img
                  class="w-8 h-8 rounded-full"
                  src="https://placehold.co/40x40/E2E8F0/4A5568"
                  alt="avatar"
                />
                <span class="text-sm font-medium">مهدی</span>
              </li>
              <li class="flex items-center gap-x-3">
                <img
                  class="w-8 h-8 rounded-full"
                  src="https://placehold.co/40x40/E2E8F0/4A5568"
                  alt="avatar"
                />
                <span class="text-sm font-medium">علی</span>
              </li>
              <li class="flex items-center gap-x-3">
                <img
                  class="w-8 h-8 rounded-full"
                  src="https://placehold.co/40x40/4A5568/E2E8F0"
                  alt="avatar"
                />
                <span class="text-sm font-medium">محسن</span>
              </li>
            </ul>
          </div>

          <div class="flex flex-col gap-y-4">
            <div class="flex items-center gap-x-2">
              <h3 class="font-semibold text-white">سرعت سایت</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-5 h-5 text-gray-400"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
            </div>

            <div class="bg-[#1F283E] rounded-lg p-4 flex items-center justify-between gap-x-3">
              <div class="w-16 h-16 relative">
                <svg class="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="#3F4E6B"
                    stroke-width="12"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="#00C4FF"
                    stroke-width="12"
                    fill="none"
                    stroke-dasharray="264"
                    stroke-dashoffset="142.5"
                    stroke-linecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <span class="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold">
                  ۴۶٪
                </span>
              </div>

              <div class="flex-1">
                <span class="text-gray-400 text-sm">زمان بارگذاری</span>
              </div>

              <div>
                <span class="text-green-500 font-semibold">+۲۵٪</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
