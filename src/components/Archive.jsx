import React from 'react'
import { useState, useEffect } from 'react'
import { MdDelete } from "react-icons/md";
import { MdUnarchive } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

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

  return (
    <div className={`bg-purple-200 w-full px-10 py-7 min-h-[calc(100vh-57px)] flex flex-col justify-between`}>
      <div className="canvas">
        <h2 className='text-xl font-bold'>Your Archived Notes</h2>
        <hr className='bg-slate-500 h-[2px] my-3' />
        <div className="clocks flex justify-evenly flex-wrap gap-5">
        </div>
        <div className="archivelist grid gap-4 overflow-y-auto xl:h-[70vh] lg:h-[73vh] md:h-[75vh] sm:h-[90vh]">
          {archive.length === 0 ? <div className='font-bold text-slate-600 text-lg'>you have not archived any notes!</div> :
            archive.filter((item) => item.title.toLowerCase().includes(searchText.toLocaleLowerCase())).map((item) => {
              return (
                <div key={item.id} className='bg-purple-400 min-h-[300px] max-h-[300px] rounded-lg flex flex-col justify-between overflow-hidden'>
                  <div className="content">
                    <h2 className="title font-bold py-1 px-3 bg-purple-500">{item.title}</h2>
                    <div className='text py-2 px-3 max-h-[232px] overflow-y-auto whitespace-pre-wrap break-words'>{item.text}</div>
                  </div>
                  <div className="noteFooter flex flex-col">
                    <hr className='bg-purple-500 h-[1.5px] border-0' />
                    <div className="px-3 flex justify-between items-center">
                      <small>{item.date}</small>
                      <div className="btns flex gap-1">
                        <span onClick={() => archiveNote(item)} className='hover:bg-purple-500 p-[6px] my-1 rounded-[50%] cursor-pointer'><MdUnarchive /></span>
                        <span onClick={() => deleteNote(item.id, item.title)} className='hover:bg-purple-500 p-[6px] my-1 rounded-[50%] cursor-pointer'><MdDelete /></span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
      <div className="search flex items-center bg-white rounded-md">
        <input onChange={handleSearch} className='py-1 px-1 w-[100%] rounded-md text-lg text-slate-700 focus:outline-none' type="text" placeholder='Type to search a note' />
        <span className="searchIcon py-2 px-3"><FaSearch /></span>
      </div>
    </div>
  )
}

export default Archive
