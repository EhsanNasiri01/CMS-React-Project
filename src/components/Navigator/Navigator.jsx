import React from "react";
import { FaChevronLeft } from "react-icons/fa";

export default function Boxes() {
  return (
    <div className="mt-6 mr-8 text-white ">
      {/* Navigator */}
      <div className="flex gap-x-2.5 items-center">
        <a href="" className="text-cyan-600">
          داشبورد
        </a>
        {/* Chevron left */}
        <FaChevronLeft className="text-slate-400 w-3 h-3" />
        <a href="" className="hover:text-cyan-600 transition-colors">
          آمار
        </a>
      </div>
    </div>
  );
}
