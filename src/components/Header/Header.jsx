import React from "react";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { useState } from "react";

export default function Header() {
  return (
    <header className="w-[1820px] bg-dark-bg text-white">
      <div className="container flex items-center justify-between px-6 py-3 ">
        {/* Right side (Logo + Menu) */}
        <div className="flex items-center">
          <nav className="hidden md:flex  text-slate-300 gap-x-10">
            <a href="#" className="hover:text-white">
              داشبورد
            </a>
            <a href="#" className="hover:text-white">
              صفحات
            </a>
            <a href="#" className="hover:text-white">
              پست ها
            </a>
          </nav>
          {/* Divider */}
          <div className="h-4 w-px bg-slate-700 mr-10 "></div>
          {/* Center (Search Bar) */}
          <div className="hidden md:flex mr-10 cursor-pointer">
            <FaSearch className="text-slate-400 mr-2" />
          </div>
        </div>
        {/* Left side (Icons & User) */}
        <div className="flex items-center gap-x-4">
          <FaBell className="text-slate-400 hover:text-white cursor-pointer" />
          <div className="flex items-center gap-x-2 cursor-pointer">
            <span className="hidden md:inline text-md font-medium">
              دیزاینر سایت
            </span>
            <FaUserCircle size={28} className="text-blue-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
