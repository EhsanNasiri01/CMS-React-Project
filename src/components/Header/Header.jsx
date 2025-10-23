import React from "react";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { useState } from "react";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-dark-bg text-white px-6 py-3 ">
      {/* Left side (Logo + Menu) */}
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold tracking-wide">Dashboard</h1>
        <nav className="hidden md:flex space-x-6 text-slate-300">
          <a href="#" className="hover:text-white">
            Pages
          </a>
          <a href="#" className="hover:text-white">
            Posts
          </a>
        </nav>
        {/* Divider */}
        <div className="h-4 w-px bg-slate-700"></div>
        {/* Center (Search Bar) */}
        <div className="hidden md:flex  ">
          <FaSearch className="text-slate-400 mr-2" />
        </div>
      </div>

      {/* Right side (Icons & User) */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 cursor-pointer">
          <FaUserCircle size={28} className="text-blue-400" />
          <span className="hidden md:inline text-sm font-medium">
            UX Designer
          </span>
        </div>
        <FaBell className="text-slate-400 hover:text-white cursor-pointer" />
      </div>
    </header>
  );
}
