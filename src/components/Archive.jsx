import React from 'react'
import { useState, useEffect } from 'react'
import { MdDelete } from "react-icons/md";
import { MdUnarchive } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaCopy } from 'react-icons/fa6';

const Archive = () => {

  let initNote
  if (localStorage.getItem("notesData") === null) {
    initNote = []
  }
  else {
    initNote = JSON.parse(localStorage.getItem("notesData"))
  }

  let initArchive
  if (localStorage.getItem("archivedNotes") === null) {
    initArchive = []
  }
  else {
    initArchive = JSON.parse(localStorage.getItem("archivedNotes"))
  }

  const [notes, setNotes] = useState(initNote)
  const [archive, setArchive] = useState(initArchive)

  useEffect(() => {
    localStorage.setItem("notesData", JSON.stringify(notes))
  }, [notes])

  useEffect(() => {
    localStorage.setItem("archivedNotes", JSON.stringify(archive))
  }, [archive])

  const deleteNote = (id, title) => {
    let okay = confirm(`Are you sure you want to delete "${title}"`)
    if (okay) {
      let newNotes = archive.filter((item) => item.id !== id)
      setArchive(newNotes)
    }
  }

  const archiveNote = (note) => {
    let date = new Date()
    let newNotes = archive.filter((item) => item.id !== note.id)
    setArchive(newNotes)

    let newNote = {
      id: note.id,
      title: note.title,
      text: note.text,
      date: date.toLocaleDateString()
    }
    setNotes([...notes, newNote])
  }

  const [searchText, setSearchText] = useState("")

  const handleSearch = (event) => {
    setSearchText(event.target.value)
  }

  const copyNote = (text) => {
    navigator.clipboard.writeText(text)
    alert("Note copied to clipboard")
  }

  return (
    <div className={`bg-purple-200 w-full px-10 py-7 min-h-[calc(100vh-57px)] flex flex-col justify-between dark:bg-neutral-700`}>
      <div className="canvas">
        <h2 className='text-xl font-bold dark:text-white'>Your Archived Notes</h2>
        <hr className='bg-slate-500 border-slate-400 h-[2px] my-3 dark:border-2 dark:border-neutral-600' />
        <section className="archivelist grid gap-4 overflow-y-auto xl:h-[70vh] lg:h-[73vh] md:h-[75vh] sm:h-[90vh] dark:text-white">
          {archive.length === 0 ? <div className='font-bold text-slate-600 text-lg dark:text-slate-200'>No archived notes</div> :
            archive.filter((item) => item.title.toLowerCase().includes(searchText.toLocaleLowerCase())).map((item) => {
              return (
                <div key={item.id} className='bg-purple-400 min-h-[300px] max-h-[300px] rounded-lg flex flex-col justify-between overflow-hidden dark:bg-neutral-800'>
                  <div className="content">
                    <h2 className="title font-bold py-1 px-3 bg-purple-500 dark:bg-neutral-900">{item.title}</h2>
                    <div className='text py-2 px-3 max-h-[232px] overflow-y-auto whitespace-pre-wrap break-words'>{item.text}</div>
                  </div>
                  <div className="noteFooter flex flex-col">
                    <hr className='bg-purple-500 h-[1.5px] border-0 dark:bg-neutral-700' />
                    <div className="px-3 flex justify-between items-center">
                      <small>{item.date}</small>
                      <div className="btns flex gap-1">
                        <span onClick={() => copyNote(item.text)} className='hover:bg-purple-500 p-[6px] my-1 rounded-[50%] cursor-pointer dark:hover:bg-neutral-900'><FaCopy /></span>
                        <span onClick={() => archiveNote(item)} className='hover:bg-purple-500 p-[6px] my-1 rounded-[50%] cursor-pointer dark:hover:bg-neutral-900'><MdUnarchive /></span>
                        <span onClick={() => deleteNote(item.id, item.title)} className='hover:bg-purple-500 p-[6px] my-1 rounded-[50%] cursor-pointer dark:hover:bg-neutral-900'><MdDelete /></span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
        </section>
      </div>
      <div className="search flex items-center bg-white rounded-md dark:bg-neutral-300">
        <input onChange={handleSearch} className='py-1 px-1 w-[100%] rounded-md text-lg text-slate-700 focus:outline-none dark:bg-neutral-300 dark:text-slate-900' type="text" placeholder='Type to search a note' />
        <span className="searchIcon py-2 px-3"><FaSearch /></span>
      </div>
    </div>
  )
}

export default Archive
