import React from "react";
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { FaNewspaper, FaUserClock, FaUsers } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
// import moment from "moment";
import { summary } from "../assets/data";
import clsx from "clsx";
import Chart from "../components/Chart.jsx";
import { BGS, PRIOTITYSTYELS, TASK_TYPE } from "../utils/index.js";
// import { BGS, PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../utils";
import UserInfo from "../components/UserInfo";


const TaskTable = ({tasks}) =>{
  const ICONS ={
    high: <MdKeyboardDoubleArrowUp/> ,
    medium: <MdKeyboardArrowUp/>,
    low:<MdKeyboardArrowDown/>
  }

  const TableHeader =()=>(
    <thead className="border-b border-gray-300">
      <tr className="text-black text-left">
        <th className="py2">Task Title</th>
        <th className="py2">Priority</th>
        <th className="py2">Team</th>
        <th className="py2 hidden md:block">Created At</th>
      </tr>
    </thead>
  )

  const TableRow =({task,id})=>{
    return(<tr className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10" key={id}>
      <td className="py-2">
        <div className="flex items-center gap-2">
          <div className={clsx("w-4 h-4 rounded-full",TASK_TYPE[task.stage])}/>
          <p className="text-base text-black">{task.title}</p>
        </div>

      </td>
      <td className="py-2">
        <div className="flex items-center gap-1">
          <span className={clsx("text-lg",PRIOTITYSTYELS[task.priority])}>{ICONS[task.priority]}</span>
          <span>{task.priority}</span>
        </div>
      </td>
      <td className="py-2">
        <div className="flex">
          {
            task.team.map((m,index)=>(
              <div
              key={index}
              className={clsx("w-7 h-7 rounded-full text-white flex items-center justify-center text-sm mr-1",BGS[index % BGS.length])}
               >
                <UserInfo user={m} />
              </div>
            ))
          }
        </div>
      </td>
          </tr>)
  }

  return(<>
    <div className="w-full md:w-2/3 px-2 md:px-4 pt-4 pb-4 shadow-md-rounded bg-white">
       <table className="w-full">
        <TableHeader/>
        <tbody>
          {
            tasks?.map((task,id)=>(
              <TableRow 
              key={id}
              task= {task}
              />
            ))
          }
        </tbody>
       </table>
    </div>

  </>)
}




const Dashboard = () => {

    const totals = summary.tasks;
    const stats = [
        {
          _id: "1",
          label: "TOTAL TASK",
          total: summary?.totalTasks || 0,
          icon: <FaNewspaper />,
          bg: "bg-[#1d4ed8]",
        },
        {
          _id: "2",
          label: "COMPLETED TASK",
          total: totals["completed"] || 0,
          icon: <MdAdminPanelSettings />,
          bg: "bg-[#0f766e]",
        },
        {
          _id: "3",
          label: "TASK IN PROGRESS ",
          total: totals["in progress"] || 0,
          icon: <LuClipboardEdit />,
          bg: "bg-[#f59e0b]",
        },
        {
          _id: "4",
          label: "TODOS",
          total: totals["todo"] || 0,
          icon: <FaArrowsToDot />,
          bg: "bg-[#be185d]",
        },
      ];


      const Card =({label,icon,bg,count})=>{
        return(
          <div className="w-full h-32 bg-white shadow-md rounded-md flex p-5 items-center justify-between ">
            <div className="h-full flex flex-1 flex-col justify-between">
              <p className="text-base text-gray-600">{label}</p>
              <span className="text-2xl text-semi-bold">{count}</span>
              <span className="text-sm text-gray-400">{"11 months"}</span>
            </div>
              <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center text-white",bg)}>
                {icon}
              </div>
          </div>
        )
      }
  return (
    <div className="h-full py-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {stats.map((Element,index)=>{
          return (
            <Card
             
            key={index}
            label={Element.label}
            icon={Element.icon}
            bg={Element.bg}
            count={Element.total}
            />
          )
        } )}
      </div>
      <div className="w-full bg-white my-16 p-4 rounded shadow-md">
        <h4 className="text-gray-600 text-xl font-semibold">
          Chart by Priority
        </h4>
        <Chart/>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8">
        {/* left */}
        <div className="">
          <TaskTable tasks={summary.last10Task}/>
        </div>
        {/* right */}
      </div>
    </div>
  )
}

export default Dashboard