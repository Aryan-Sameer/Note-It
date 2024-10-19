import React from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";
import { FaCircleHalfStroke } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from 'react';
import { IoMdArchive } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";

const Menubar = () => {

  const [menuBar, setMenuBar] = useState(false)

  const openMenu = () => {
    setMenuBar(!menuBar)
  }

  return (
    <div className={`bg-purple-400 py-7 px-5 flex flex-col justify-between xl:w-[15%] md:w-[min-content]`}>
      <div className="head h-full">
        <ul className='menulist flex flex-col justify-between h-full'>
          <div className="first flex flex-col gap-5 justify-between">
            <span onClick={openMenu} className='hamburger text-xl cursor-pointer lg:hidden md:block'><GiHamburgerMenu /></span>
            <NavLink className={(e) => {return e.isActive? "activeLink": ""}} to="/"><li className='flex items-center gap-3 text-xl cursor-pointer'><FaCheckCircle /><span className={`link lg:block ${menuBar?"block":"hidden"}`}> Tasks</span></li></NavLink>
            <NavLink className={(e) => {return e.isActive? "activeLink": ""}} to="/Notes"><li className='flex items-center gap-3 text-xl cursor-pointer'><FaNoteSticky /><span className={`link lg:block ${menuBar?"block":"hidden"}`}> Notes</span></li></NavLink>
            <NavLink className={(e) => {return e.isActive? "activeLink": ""}} to="/Clock"><li className='flex items-center gap-3 text-xl cursor-pointer'><FaClock /><span className={`link lg:block ${menuBar?"block":"hidden"}`}>Clock</span></li></NavLink>
            <NavLink className={(e) => {return e.isActive? "activeLink": ""}} to="/Events"><li className='flex items-center gap-3 text-xl cursor-pointer'><FaCalendarAlt /><span className={`link lg:block ${menuBar?"block":"hidden"}`}>Events</span></li></NavLink>
          </div>
          <div className="second flex flex-col gap-5 justify-between">
            <NavLink className={(e) => {return e.isActive? "activeLink": ""}} to="/Archive"><li className='flex items-center gap-3 text-xl cursor-pointer'><IoMdArchive /><span className={`link lg:block ${menuBar?"block":"hidden"}`}>Archive</span></li></NavLink>
            <li className='flex items-center gap-3 text-xl text-bold cursor-pointer'><FaCircleHalfStroke /><span className={`link lg:block ${menuBar?"block":"hidden"}`}>Theme</span></li>
          </div>
        </ul>
      </div>
    </div>
  )
}

export default Menubar
