import React from "react";
import { FaBell, FaSearch, FaUserCircle, FaBars } from "react-icons/fa";
import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
export default function Header() {
  return (
    <header className="flex gap-x-1   ">
      <Sidebar></Sidebar>
      <div className="w-full bg-dark-bg text-white  px-6 py-[26px] max-h-20">
        <div className="container flex items-center justify-between  bg-dark-bg">
          {/* Right side (Logo + Menu) */}
          <div className="flex items-center ">
            <nav className="flex text-slate-300 gap-x-2 md:gap-x-10  child:pb-1 mr-1">
              <a
                href="#"
                className="hover:text-white hover:border-b-2 hover:border-b-[#00F6FF] "
              >
                داشبورد
              </a>
              <a
                href="#"
                className="hover:text-white hover:border-b-2 hover:border-b-[#00F6FF] "
              >
                صفحات
              </a>
              <a
                href="#"
                className="hover:text-white hover:border-b-2 hover:border-b-[#00F6FF] "
              >
                پست ها
              </a>
            </nav>
            {/* Divider */}
            <div className="h-8 w-px bg-slate-700 mr-10 "></div>
            {/* Center (Search Bar) */}
            <div className="hidden md:flex mr-10 cursor-pointer">
              <FaSearch className="text-slate-400 mr-2 text-lg" />
            </div>
          </div>
          {/* Left side (Icons & User) */}
          <div className="flex items-center gap-x-6">
            <div className="flex items-center gap-x-2 cursor-pointer">
              <FaUserCircle size={28} className="text-blue-400" />

              <span className="hidden md:inline text-sm font-medium">
                طراح سایت
              </span>
            </div>
            <FaBell className="text-slate-400 hover:text-white cursor-pointer w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
