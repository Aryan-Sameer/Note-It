import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Tasks from './components/Tasks'
import Menubar from './components/Menubar'
import Notes from './components/Notes'
import Clock from './components/Clock'
import Events from './components/Events'
import Archive from './components/Archive'

function App() {

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
        <>
            <div>
                <nav className={`bg-purple-600 text-white py-[6px]`}>
                    <span className='text-[30px] mx-5 font-bold text-white-100'>Note-It</span>
                </nav>
                <div className="main flex">
                    <RouterProvider router={routes} />
                </div>
            </div>
        </>
    )
}

export default App
