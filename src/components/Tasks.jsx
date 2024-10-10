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

    const handleEdit = (e, id) => {
        let t = todos.filter(i => i.id === id)
        setTodo(t[0].todo)
        let newTodos = todos.filter(item => {
            return item.id !== id
        })
        setTodos(newTodos)
        localStorage.setItem("tasks", JSON.stringify(todos))
    }

    const handleDelete = (e, id) => {
        let newTodos = todos.filter(item => {
            return item.id !== id
        })
        setTodos(newTodos)
        localStorage.setItem("tasks", JSON.stringify(todos))
    }

    const handleAdd = () => {
        setTodos([{
            id: uuidv4(),
            todo,
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
        <div className={`bg-purple-200 w-full px-10 py-7 min-h-[calc(100vh-57px)] flex flex-col justify-between`}>
            <div className="tasks ">
                <h2 className='text-xl font-bold'>Your Tasks</h2>
                <hr className='bg-slate-500 h-[2px] my-3' />
                <input type="checkbox" onChange={toggleFinished} checked={showFinished} /> Show finished
                <div className="taskList overflow-y-auto xl:h-[66vh] lg:h-[71vh] md:h-[73vh] sm:h-[87vh]">
                    {todos.length == 0 && <div className='my-5 font-bold text-slate-500 text-lg'>No tasks to display!</div>}
                    {todos.map(item => {
                        return ((showFinished || !item.isComplete) &&
                            <div key={item.id} className="task flex justify-between rounded-md my-2 bg-white">
                                <div className={item.isComplete ? "line-through px-2 flex items-center" : "px-2 flex items-center"}>
                                    <input name={item.id} onChange={handleCheckbox} className='mx-2' type="checkbox" checked={item.isComplete} />
                                    <p>{item.todo}</p>
                                </div>
                                <div className="buttons flex items-center">
                                    <span onClick={(e) => handleImportant(e, item.id)} className='mx-2 cursor-pointer'>{item. isImportant ? <BsStarFill /> : <BsStar />}</span>
                                    <button onClick={(e) => handleEdit(e, item.id)} className={`bg-purple-600 hover:bg-purple-700 px-3 py-2 text-white font-bold`}><FaEdit /></button>
                                    <button onClick={(e) => handleDelete(e, item.id)} className={`bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-r-md text-white font-bold`}><MdDelete /></button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="addTask flex bg-white rounded-md">
                <input onChange={(e) => { setTodo(e.target.value) }} value={todo} type="text" className='py-1 px-1 w-[100%] rounded-l-md text-lg text-slate-700 focus:outline-none' placeholder='Type to add a task'/>
                <button onClick={handleAdd} disabled={todo.length <= 3} className={`disabled:bg-purple-400 bg-purple-600 hover:bg-purple-700 px-4 py-1 text-white rounded-r-md font-bold`}>Add</button>
            </div>
        </div>
    )
}

export default Tasks
