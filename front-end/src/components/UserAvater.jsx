import React from 'react'
import {Menu, Transition} from "@headlessui/react";
import { Fragment,useState } from 'react';
import { FaUser,FaLock, FaUserLock } from 'react-icons/fa';
import {IoLogOutOutline} from "react-icons/io5"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getInitials } from '../utils';
import { toast } from 'sonner';
import { useLogoutMutation } from '../redux/slices/api/authApiSlice';
import { logout } from '../redux/slices/authSlice';

const UserAvater = () => {
    const [open,setOpen] =useState(false);
    const [openpassword,setOpenpassword] = useState(false);
    const {user} = useSelector((state)=>state.auth);

    const dispatch = useDispatch();
    const Navigate = useNavigate();
const [logoutUser]=useLogoutMutation();

    const logoutHandler =async  ()=>{
      try {
          await logoutUser().unwrap();
          //dispatch(logout())
          Navigate("/log-in");
      } catch (error) {
        toast.error("Something went wrong")
      }
        console.log("logout")
    }



  return (
    <>
      <div>
        <Menu as='div' className='relative inline-block text-left'>
          <div>
            <Menu.Button className="h-10 w-10 2xl:h-12 2xl:w-12 items-center justify-center rounded-full bg-blue-600">
              <span className='text-white font-semibold'>
                {getInitials(user.name)}
              </span>
            </Menu.Button>
          </div>

          <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Item className='absolute right-0 mt-2 w-56 origin-top-right divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none'>

            <div>
               <Menu.Item className=''>
                {({active})=>(
                  <button onClick={()=> setOpen(true)}
                  className='text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base'>
                    <FaUser className='mr-2' arial-hidden="true"/>
                    Profile
                  </button>
                )}
               </Menu.Item>

               <Menu.Item className=''>
                {({active})=>(
                  <button onClick={()=> setOpenpassword(true)}
                  className='text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base'>
                    <FaUserLock className='mr-2' arial-hidden="true"/>
                    ChangePassword
                  </button>
                )}
               </Menu.Item>

               <Menu.Item className=''>
                {({active})=>(
                  <button onClick={logoutHandler}
                  className='text-red-600 group flex w-full items-center rounded-md px-2 py-2 text-base'>
                    <FaUser className='mr-2' arial-hidden="true"/>
                  Logout
                  </button>
                )}
               </Menu.Item>
            </div>
          </Menu.Item>
        </Transition>
        </Menu>
      </div>
    </> 
 )
}

export default UserAvater