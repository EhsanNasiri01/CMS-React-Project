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
const items = [
  { id: 0, label: "Command", Icon: TbCommand },
  { id: 1, label: "Compass", Icon: FiCompass },
  { id: 2, label: "Bot", Icon: LuBot },
  { id: 3, label: "Megaphone", Icon: HiOutlineMegaphone },
  { id: 4, label: "Clock", Icon: FiClock },
];

function SidebarItem({ active, onClick, Icon, label }) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={[
        "relative grid place-items-center w-12 h-12 rounded-2xl transition-all duration-200",
        active ? "bg-[#2E3A59] shadow-inner" : "hover:bg-[#2A3756]",
      ].join(" ")}
    >
      {/* Icon */}
      <Icon
        className={[
          "text-xl transition-colors duration-200",
          active ? "text-white" : "text-[#94A3C0]",
        ].join(" ")}
      />

      {/* Optional tiny underline accent for the megaphone (to mirror the screenshot) */}
      {label === "Megaphone" && (
        <span
          className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-3 rounded-full bg-[#94A3C0] opacity-60"
          aria-hidden
        />
      )}
    </button>
  );
}
export default function Sidebar() {
  const [active, setActive] = useState(0);
  return (
    <aside className="flex flex-col justify-between w-20 h-screen bg-dark-bg text-white px-2 z-40 ">
      <div className="flex flex-col justify-between pt-6 pb-4 h-screen items-center">
        {" "}
        <div className="flex flex-col items-center  gap-y-7">
          <FaBars className="text-2xl cursor-pointer" />
          {/* Divider */}
          <div className="w-8 h-px bg-slate-700"></div>
          {/* Box Of Menu */}
          {/* Sidebar wrapper */}
          <aside className="bg-[#24304B] w-16 py-2 px-2 rounded-[28px] flex flex-col items-center gap-4">
            {items.map(({ id, Icon, label }) => (
              <SidebarItem
                key={id}
                active={active === id}
                onClick={() => setActive(id)}
                Icon={Icon}
                label={label}
              />
            ))}
          </aside>

          {/* Demo content area to the right */}
          <section className="text-white/80 mt-2"></section>
        </div>
        <div className="px-5">
          <div className="w-11 h-11 bg-[#24304B] flex items-center justify-center rounded-lg text-zinc-400 cursor-pointer">
            <CiChat1 className="w-5 h-5" />
          </div>
        </div>
      </div>
    </aside>
  );
}
