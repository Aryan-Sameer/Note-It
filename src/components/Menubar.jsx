import React, { useContext } from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { IoMdArchive } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { FaSun } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";
import { ThemeContext } from '../context/themeContext';

const Menubar = () => {

  const { darkMode, setDarkMode } = useContext(ThemeContext)

  const handleMode = () => {
    setDarkMode(!darkMode)
    localStorage.setItem("mode", !darkMode)
  }

  return (
    <aside className={`bg-purple-400 py-7 px-5 flex flex-col justify-between xl:w-[15%] md:w-[min-content] dark:bg-neutral-800`}>
      <div className='menulist flex flex-col justify-between h-full'>
        <section className="first flex flex-col gap-5 justify-between dark:text-neutral-300">
          <NavLink className={(e) => { return e.isActive ? "activeLink" : "" }} to="/"><span className='flex items-center gap-3 text-xl cursor-pointer'><FaCheckCircle /><span className={`link lg:block hidden`}> Tasks</span></span></NavLink>

          <NavLink className={(e) => { return e.isActive ? "activeLink" : "" }} to="/Notes"><span className='flex items-center gap-3 text-xl cursor-pointer'><FaNoteSticky /><span className={`link lg:block hidden`}> Notes</span></span></NavLink>

          <NavLink className={(e) => { return e.isActive ? "activeLink" : "" }} to="/Events"><span className='flex items-center gap-3 text-xl cursor-pointer'><FaCalendarAlt /><span className={`link lg:block hidden`}>Events</span></span></NavLink>

          <NavLink className={(e) => { return e.isActive ? "activeLink" : "" }} to="/Clock"><span className='flex items-center gap-3 text-xl cursor-pointer'><FaClock /><span className={`link lg:block hidden`}>Clock</span></span></NavLink>
        </section>
        <section className="second flex flex-col gap-5 justify-between dark:text-neutral-300">
          <NavLink className={(e) => { return e.isActive ? "activeLink" : "" }} to="/Archive"><span className='flex items-center gap-3 text-xl cursor-pointer'><IoMdArchive /><span className={`link lg:block hidden`}>Archive</span></span></NavLink>

          <span onClick={handleMode} className='flex items-center gap-3 text-xl text-bold cursor-pointer select-none'>{darkMode ? <FaMoon /> : <FaSun />}<span className={`link lg:block hidden`}>Theme</span></span>
        </section>
      </div>
    </aside>
  )
}

export default Menubar
