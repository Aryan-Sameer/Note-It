import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Tasks from './components/Tasks'
import Menubar from './components/Menubar'
import Notes from './components/Notes'
import Clock from './components/Clock'
import Events from './components/Events'
import Archive from './components/Archive'
import { PiChecksBold } from "react-icons/pi";
import { useState } from 'react'
import { ThemeContext } from './context/themeContext'

function App() {
    
    const [darkMode, setDarkMode] = useState(localStorage.getItem("mode") === "true")

    const routes = createBrowserRouter([
        {
            path: "/",
            element: <><Menubar /><Tasks /></>
        },
        {
            path: "/Notes",
            element: <><Menubar /><Notes /></>
        },
        {
            path: "/Clock",
            element: <><Menubar /><Clock /></>
        },
        {
            path: "/Events",
            element: <><Menubar /><Events /></>
        },
        {
            path: "/Archive",
            element: <><Menubar /><Archive /></>
        },
    ])

    return (
        <div className={`${darkMode ? "dark" : ""}`}>
            <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
                <nav className={`bg-purple-600 text-white py-[6px] dark:bg-neutral-950`}>
                    <span className='flex items-end text-[30px] mx-5 font-bold text-white-100 relative w-fit pointer-events-none select-none'>workFlo<span className='text-[40px] font-extrabold'><PiChecksBold /></span></span>
                </nav>
                <div className="main flex">
                    <RouterProvider router={routes} />
                </div>
            </ThemeContext.Provider>
        </div>
    )
}

export default App
