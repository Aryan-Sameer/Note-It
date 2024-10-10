import React from 'react'
import { FaCircleUser } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";
import { FaCircleHalfStroke } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from 'react';

const Menubar = () => {

  const [menuBar, setMenuBar] = useState(false)

  const openMenu = () => {
    setMenuBar(!menuBar)
  }

  return (
    <div className={`bg-purple-400 py-7 px-5 flex flex-col justify-between xl:w-[15%] md:w-[min-content]`}>
      <div className="head h-full">
        <ul className='flex flex-col justify-between h-full'>
          <div className="first flex flex-col gap-5 justify-between">
            <span onClick={openMenu} className='text-xl cursor-pointer xl:hidden md:block'><GiHamburgerMenu /></span>
            <NavLink className={(e) => {return e.isActive? "activeLink": ""}} to="/"><li className='flex items-center gap-3 text-xl cursor-pointer'><FaCheckCircle /><span className={`link text-[16px] xl:block ${menuBar?"block":"hidden"}`}> Tasks</span></li></NavLink>
            <NavLink className={(e) => {return e.isActive? "activeLink": ""}} to="/Notes"><li className='flex items-center gap-3 text-xl cursor-pointer'><FaNoteSticky /><span className={`link text-[16px] xl:block ${menuBar?"block":"hidden"}`}> Notes</span></li></NavLink>
            <NavLink className={(e) => {return e.isActive? "activeLink": ""}} to="/Clock"><li className='flex items-center gap-3 text-xl cursor-pointer'><FaClock /><span className={`link text-[16px] xl:block ${menuBar?"block":"hidden"}`}>Clock</span></li></NavLink>
          </div>
          <div className="second flex flex-col gap-5 justify-between">
            <li className='flex items-center gap-3 text-xl text-bold cursor-pointer'><FaCircleHalfStroke /><span className={`link text-[16px] xl:block ${menuBar?"block":"hidden"}`}>Theme</span></li>
            <li className='flex items-center gap-3 text-xl text-bold mb-0 cursor-pointer'><FaCircleUser /><span className={`link text-[16px] xl:block ${menuBar?"block":"hidden"}`}>Account</span></li>
          </div>
        </ul>
      </div>
    </div>
  )
}

export default Menubar
