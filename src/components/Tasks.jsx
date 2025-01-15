import React from 'react'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsStar } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";

const Tasks = () => {

    const [todo, setTodo] = useState("")
    const [showFinished, setShowFinished] = useState(true)
    const [showImportant, setShowImportant] = useState(false)

    let initTodo
    if (localStorage.getItem("tasks") === null) {
        initTodo = []
    }
    else {
        initTodo = JSON.parse(localStorage.getItem("tasks"))
    }

    const [todos, setTodos] = useState(initTodo)

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(todos))
    }, [todos])

    const toggleFinished = (e) => {
        setShowFinished(!showFinished)
    }

    const toggleImportant = (e) => {
        setShowImportant(!showImportant)
    }

    const handleEdit = (e, id) => {
        if (todo.length == 0) {
            let t = todos.filter(i => i.id === id)
            setTodo(t[0].todo)
            let newTodos = todos.filter(item => {
                return item.id !== id
            })
            setTodos(newTodos)
            localStorage.setItem("tasks", JSON.stringify(todos))
        }
    }

    const handleDelete = (e, id) => {
        let newTodos = todos.filter(item => {
            return item.id !== id
        })
        setTodos(newTodos)
        localStorage.setItem("tasks", JSON.stringify(todos))
    }

    const handleAdd = () => {
        const date = new Date()
        setTodos([{
            id: uuidv4(),
            todo,
            date: date.toLocaleDateString(),
            isComplete: false,
            isImportant: false
        }, ...todos])
        setTodo("")
        localStorage.setItem("tasks", JSON.stringify(todos))
    }

    const handleCheckbox = (e) => {
        let id = e.target.name
        let index = todos.findIndex(item => {
            return item.id === id
        })
        let newTodos = [...todos]
        newTodos[index].isComplete = !newTodos[index].isComplete
        setTodos(newTodos)
        localStorage.setItem("tasks", JSON.stringify(todos))
    }

    const handleImportant = (e, id) => {
        let index = todos.findIndex(item => {
            return item.id === id
        })
        let newTodos = [...todos]
        newTodos[index].isImportant = !newTodos[index].isImportant
        setTodos(newTodos)
        localStorage.setItem("tasks", JSON.stringify(todos))
    }

    return (
        <div className={`bg-purple-200 w-full px-10 py-7 min-h-[calc(100vh-57px)] flex flex-col justify-between dark:bg-neutral-700`}>
            <div className="canvas">
                <h2 className='text-xl font-bold dark:text-white'>Your Tasks</h2>
                <hr className='bg-slate-500 border-slate-400 h-[2px] my-3 dark:border-2 dark:border-neutral-600' />
                {!(todos.length === 0) && <div>
                    <input type="checkbox" onChange={toggleFinished} checked={showFinished} /> <span className='dark:text-white'>Show finished</span>
                    <span className='border-2 border-purple-400 mx-3 dark:border-neutral-800'></span>
                    <input type="checkbox" onChange={toggleImportant} checked={showImportant} /> <span className='dark:text-white'>Show only important</span>
                </div>}
                <div className="taskList overflow-y-auto xl:h-[66vh] lg:h-[71vh] md:h-[73vh] sm:h-[87vh]">
                    {todos.length == 0 && <div className='font-bold text-slate-600 text-lg dark:text-slate-200'>No tasks to display!</div>}
                    {todos.map(item => {
                        return (((showFinished || !item.isComplete) && (!showImportant || item.isImportant)) &&
                            <div key={item.id} className="task flex justify-between rounded-md my-2 bg-white dark:bg-neutral-300">
                                <div className={item.isComplete ? "line-through px-2 flex items-center" : "px-2 flex items-center"}>
                                    <input name={item.id} onChange={handleCheckbox} className='mx-2' type="checkbox" checked={item.isComplete} />
                                    <p>{item.todo}</p>
                                </div>
                                <div className="buttons flex items-center">
                                    <small className='font-bold text-purple-600 mx-1 dark:text-neutral-900'>{item.date}</small>
                                    <span onClick={(e) => handleImportant(e, item.id)} className='mx-2 cursor-pointer text-purple-600 dark:text-neutral-900'>{item.isImportant ? <BsStarFill /> : <BsStar />}</span>
                                    <button onClick={(e) => handleEdit(e, item.id)} className="bg-purple-600 hover:bg-purple-700 px-3 py-2 text-white font-bold h-full dark:bg-neutral-900 dark:hover:bg-neutral-800"><FaEdit /></button>
                                    <button onClick={(e) => handleDelete(e, item.id)} className="bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-r-md text-white font-bold h-full dark:bg-neutral-900 dark:hover:bg-neutral-800"><MdDelete /></button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="addTask flex bg-white rounded-md">
                <input onChange={(e) => { setTodo(e.target.value) }} value={todo} type="text" className='py-1 px-1 w-[100%] rounded-l-md text-lg text-slate-700 focus:outline-none dark:bg-neutral-300 dark:text-slate-900' placeholder='Type to add a task' />
                <button onClick={handleAdd} disabled={todo.length <= 3} className="disabled:bg-purple-400 bg-purple-600 hover:bg-purple-700 px-4 py-1 text-white rounded-r-md font-bold dark:disabled:bg-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800">Add</button>
            </div>
        </div>
    )
}

export default Tasks
