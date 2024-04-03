import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";

import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import clsx from "clsx";

const linkData = [
  {
    label: "Dashboard",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Tasks",
    link: "tasks",
    icon: <FaTasks />,
  },
  {
    label: "Completed",
    link: "completed/completed",
    icon: <MdTaskAlt />,
  },
  {
    label: "In Progress",
    link: "in-progress/in progress",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "To Do",
    link: "todo/todo",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "Team",
    link: "team",
    icon: <FaUsers />,
  },
  {
    label: "Trash",
    link: "trashed",
    icon: <FaTrashAlt />,
  },
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const path = location.pathname.split("/")[1];

  const sideBarLinks = user.isAdmin ? linkData : linkData.slice(0, 5);
  
  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ element }) => {
    return (
      <Link
        to={element.link}
        onClick={closeSidebar}
        className={clsx(
          "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d] hover:text-[#2564ed] ",
          path === element.link.split("/")[0] ? "bg-blue-700 text-white " : ""
        )}
      >
        {element.icon}
        <span className="">{element.label}</span>
      </Link>
    );
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 p-5">
      <h1 className="flex gap-1 items-center">
        <p className="bg-blue-600 p-2 rounded-full">
          {/* tick icon */}
          <MdOutlineAddTask className="text-white text-2xl font-black" />
        </p>
        <span className="text-2xl font-bold text-black">TaskMaster</span>
      </h1>
      <div className="flex-1 flex flex-col gap-y-5 py-8">
        {sideBarLinks.map((link) => (
          <NavLink element={link} key={link.label} />
        ))}
      </div>
      <div className="">
        <button className="w-full flex gap-2 p-2 items-center text-lg text-gray-800">
          <MdSettings/>
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
