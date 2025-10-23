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
  const [open, setOpen] = useState(false);

  return (
    <aside className="w-12 bg-dark-bg text-white p-4">
      <div className="flex items-center justify-center">
        <FaBars className="text-2xl" />
      </div>
    </aside>
  );
}
