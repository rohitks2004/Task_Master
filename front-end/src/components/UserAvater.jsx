import React from 'react'
import {Menu, Transition} from "@headlessui/react";
import { Fragment,useState } from 'react';
import { FaUser,FaLock } from 'react-icons/fa';
import {IoLogOutOutline} from "react-icons/io5"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserAvater = () => {
    const [open,setOpen] =useState(false);
    const [openpassword,setOpenpassword] = useState(false);
    const {user} = useSelector((state)=>state.auth);
    const [LogoutUser] = useLogoutMutation();
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const logoutHandler = ()=>{
        console.log("logout")
    }



  return (
    <div>UserAvater</div>
  )
}

export default UserAvater