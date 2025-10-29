import React from "react";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router";

const menuItems = [
  { label: "داشبورد", to: "/" },
  { label: "کاربران", to: "/users" },
  { label: "پست ها", to: "/posts" },
];

export default function Header() {
  return (
    <header className="w-full bg-dark-bg text-white px-6 py-[26px] max-h-20 border-b-2 border-b-darker-bg">
      <div className="container flex items-center justify-between w-full bg-dark-bg">
        {/* Right side (Logo + Menu) */}
        <div className="flex items-center">
          <nav className="flex gap-x-4 md:gap-x-10 mr-1">
            {menuItems.map((item, idx) => (
              <Link
                key={item.to}
                to={item.to}
                className={`
                  group relative overflow-visible transition-colors duration-300 px-2 pb-1
                  text-slate-300
                  `}
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  {item.label}
                </span>
                {/* Animated Underline */}
                <span
                  className={`
                    absolute left-0 right-0 bottom-0 h-[2.5px] rounded-md
                    bg-gradient-to-r from-[#2cdfff] via-[#00F6FF] to-[#74fdff]
                    scale-x-0 group-hover:scale-x-100
                    transition-transform duration-300 origin-[50%_100%]
                    pointer-events-none
                  `}
                  style={{ zIndex: 1 }}
                />
              </Link>
            ))}
          </nav>
          {/* Divider */}
          <div className="h-8 w-px bg-slate-700 mr-10"></div>
          {/* Center (Search Bar) */}
          <div className="hidden md:flex mr-10 cursor-pointer group items-center transition-all duration-300">
            <FaSearch className="text-slate-400 mr-2 text-lg group-hover:text-[#00F6FF] transition-colors duration-300" />
            {/* Animated search input on hover */}
            <input
              type="text"
              placeholder="جستجو..."
              className="
                w-0 opacity-0 group-hover:w-32 group-hover:opacity-100 ml-2 transition-all duration-300
                bg-[#202b44] text-slate-200 px-3 py-1 rounded-md outline-none
                text-[13px] placeholder-slate-400 border border-slate-700
              "
            />
          </div>
        </div>
        {/* Left side (Icons & User) */}
        <div className="flex items-center gap-x-6">
          <div className="flex items-center gap-x-2 cursor-pointer group">
            <FaUserCircle
              size={28}
              className="text-blue-400 group-hover:scale-110 transition-transform duration-300"
            />
            <span className="hidden md:inline text-sm font-medium transition-colors duration-300 group-hover:text-[#00F6FF]">
              طراح سایت
            </span>
          </div>
          <div className="relative">
            <FaBell className="text-slate-400 hover:text-[#00F6FF] cursor-pointer w-5 h-5 transition-colors duration-300" />
            {/* Example animated notification dot */}
            <span className="absolute top-[-4px] right-[-4px] w-2 h-2 bg-[#00F6FF] rounded-full animate-pulse shadow-lg border-2 border-dark-bg"></span>
          </div>
        </div>
      </div>
    </header>
  );
}
