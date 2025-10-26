import React, { useState } from "react";
import {
  FaBars,
  FaKeyboard,
  FaRegUser,
  FaRegCalendar,
  FaSearch,
  FaClock,
  FaComments,
} from "react-icons/fa";
import { TbCommand } from "react-icons/tb";
import { FiCompass, FiClock } from "react-icons/fi";
import { LuBot } from "react-icons/lu";
import { HiOutlineMegaphone } from "react-icons/hi2";
import { CiChat1 } from "react-icons/ci";
import { Link } from "react-router";

// آیکون‌ها بر اساس لیبل
const items = [
  { id: 0, label: "صفحه اصلی", Icon: TbCommand, to: "/" },
  { id: 1, label: "کاربران", Icon: FaRegUser, to: "/users" },
  { id: 2, label: "ارتباط با ما", Icon: CiChat1, to: "/about" },
  { id: 3, label: "تماس با ما", Icon: HiOutlineMegaphone, to: "/contact" },
];

// حذف سبز/سبز فیروزه‌ای و جایگزینی رنگ‌بندی اولیه با آبی و طیف قبلی
function SidebarItem({ active, to, Icon, label, onClick, expanded }) {
  return (
    <Link
      aria-label={label}
      to={to}
      onClick={onClick}
      className={[
        "group relative flex items-center h-14 rounded-2xl transition-all duration-300 overflow-hidden",
        expanded ? "w-52 px-4 gap-x-4" : "w-14 justify-center",
        active
          ? "bg-[#384A71] shadow-xl scale-105"
          : "hover:bg-[#384A71]/80 hover:scale-105",
        !active && "bg-[#24304B]",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        boxShadow: active
          ? "0 4px 24px 0 #2E3A5980,0 1.5px 16px 0 #384A71"
          : undefined,
        border: active ? "1.5px solid #384A71" : "1px solid transparent",
        position: "relative",
      }}
    >
      {/* Circular animated background when active */}
      {active && (
        <span className="absolute left-0 top-0 w-full h-full z-0 animate-pulse bg-[#384A71] rounded-2xl"></span>
      )}
      {/* Icon */}
      <span className="z-10 flex items-center justify-center transition-all duration-300">
        <Icon
          className={[
            "text-2xl transition-colors duration-300 drop-shadow-lg",
            active
              ? "text-[#ffffffce] scale-125"
              : "text-[#B2BFEA] group-hover:text-[#ffffffce] group-hover:scale-110",
          ].join(" ")}
        />
      </span>
      {/* Label when expanded */}
      {expanded && (
        <span
          className={[
            "ml-3 whitespace-nowrap transition-all duration-300 text-base z-10",
            active
              ? "font-bold text-white tracking-wider drop-shadow"
              : " text-[#A3B1D6]",
          ].join(" ")}
          style={{
            letterSpacing: expanded ? "0.01em" : undefined,
            filter: active ? "brightness(1.2)" : undefined,
          }}
        >
          {label}
        </span>
      )}
      {/* Decorative accent for Megaphone */}
      {label === "Megaphone" && (
        <span
          className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[3.5px] w-4 rounded-full bg-gradient-to-r from-[#4A79FF] to-[#508EFF] opacity-60 z-20"
          aria-hidden
        />
      )}
    </Link>
  );
}

export default function Sidebar() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      className={[
        "flex flex-col justify-between h-screen bg-dark-bg text-white z-40 border-l-2 border-darker-bg px-2 transition-all duration-500 ease-in-out shadow-2xl shadow-[#1E283D]/30 backdrop-blur-lg",
        expanded ? "w-72" : "w-20",
      ].join(" ")}
    >
      <div className="flex flex-col justify-between pt-8 pb-6 h-screen items-center w-full">
        <div className="flex flex-col items-center gap-y-9 w-full transition-all duration-500">
          {/* Animated Sidebar Toggle Button */}
          <button
            aria-label={expanded ? "بستن منو" : "باز کردن منو"}
            onClick={() => setExpanded((prev) => !prev)}
            className={[
              "px-5 h-14 flex items-center justify-center transition-all duration-300 rounded-2xl  bg-[#24304B]  hover:scale-105",
              expanded ? "bg-[#384A71]" : "",
            ].join(" ")}
            tabIndex={0}
          >
            {/* pulse effect */}
            {expanded && (
              <span className="absolute animate-pulse  rounded-2xl z-0 inset-0"></span>
            )}
            <FaBars className="text-2xl text-white relative z-10 drop-shadow-lg" />
          </button>
          {/* Divider */}
          <div className="w-10 h-[2px] bg-gradient-to-r from-[#1E283D] via-[#4269FF3a] to-[#1E283D] rounded-full my-1"></div>
          {/* Box Of Menu - جذاب با بلور و شِدو و ترنزیشن */}
          <aside
            className={[
              "w-full rounded-[32px] flex flex-col items-center gap-5 py-5 px-2",
              "transition-all duration-500",
              "bg-dark-bg",
              " ",
            ].join(" ")}
            style={{
              minHeight: expanded ? "380px" : "300px",
            }}
          >
            {items.map(({ id, Icon, label, to }) => (
              <SidebarItem
                key={id}
                active={active === id}
                onClick={() => setActive(id)}
                Icon={Icon}
                label={label}
                to={to}
                expanded={expanded}
              />
            ))}
          </aside>

          {/* Demo content area to the right */}
          <section className="transition-all duration-300 text-white/80 mt-2"></section>
        </div>
        {/* Chat Button in Bottom with Glow and hover effect */}
        <div className="px-5 pb-1">
          <Link
            to="/chat"
            className={[
              "relative w-14 h-14 flex items-center justify-center rounded-xl cursor-pointer transition-all duration-300",
              "bg-gradient-to-tr from-[#24304B] via-[#2A3756aa] to-[#22315A] border-2 border-[#31416444] shadow-md",
              "hover:shadow-lg hover:scale-105 ",
            ].join(" ")}
            aria-label="Chat"
            style={{
              boxShadow: "0 2px 18px #4269FF22, 0 1px 4px #222E4822",
            }}
          >
            {/* Glow animation border when hover */}
            <span className="absolute z-0 left-0 top-0 w-full h-full rounded-xl  animate-pulse bg-[#4269FF18] opacity-0 hover:opacity-100 transition-opacity  duration-300"></span>
            <CiChat1 className="w-6 h-6 text-[#ffffffce] z-10" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
