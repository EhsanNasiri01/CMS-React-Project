import React from "react";
import {
  FaBars,
  FaKeyboard,
  FaRegUser,
  FaRegCalendar,
  FaSearch,
  FaClock,
  FaComments,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="flex flex-col w-20 h-screen bg-dark-bg text-white p-2 z-40">
      <div className="flex items-center justify-center -mt-[70px] h-screen">
        <FaBars className="text-2xl" />
      </div>
    </aside>
  );
}
