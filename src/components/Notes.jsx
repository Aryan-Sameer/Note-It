import React from 'react'
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoMdArchive } from "react-icons/io";

const Notes = () => {

  const [noteText, setNoteText] = useState("")
  const [noteTitle, setNoteTitle] = useState("")
  const [searchText, setSearchText] = useState("")

  const charLimit = 250
  const titleLimit = 20

  let initNote
  if (localStorage.getItem("notesData") === null) {
    initNote = []
  }
  else {
    initNote = JSON.parse(localStorage.getItem("notesData"))
  }

  const [notes, setNotes] = useState(initNote)

  useEffect(() => {
    localStorage.setItem("notesData", JSON.stringify(notes))
  }, [notes])


  const handleNoteText = (event) => {
    if (charLimit - event.target.value.length >= 0) {
      setNoteText(event.target.value)
    }
  }

  const handleNoteTitle = (event) => {
    if (titleLimit - event.target.value.length >= 0) {
      setNoteTitle(event.target.value)
    }
  }

  const handleSearch = (event) => {
    setSearchText(event.target.value)
  }

  const AddNote = () => {
    if (noteText.trim().length > 0) {
      let date = new Date()
      let newNote = {
        id: uuidv4(),
        title: noteTitle,
        text: noteText,
        date: date.toLocaleDateString()
      }
      setNotes([newNote, ...notes])
      setNoteText("")
      setNoteTitle("")
    }
  }

  const deleteNote = (id, title) => {
    let okay = confirm(`Are you sure you want to delete "${title}"`)
    if (okay) {
      let newNotes = notes.filter((item) => item.id !== id)
      setNotes(newNotes)
    }
  }

  const editNote = (id) => {
    let note = notes.filter(i => i.id === id)
    setNoteText(note[0].text)
    setNoteTitle(note[0].title)
    let newNotes = notes.filter((item) => item.id !== id)
    setNotes(newNotes)
  }

  return (
    <div className={`bg-purple-200 w-full px-10 py-7 min-h-[calc(100vh-57px)] flex flex-col justify-between`}>
      <div className="canvas">
        <h2 className='text-xl font-bold'>Your Notes</h2>
        <hr className='bg-slate-500 h-[2px] my-3' />
        <div className="notelist grid gap-4 overflow-y-auto xl:h-[68vh] lg:h-[73vh] md:h-[75vh] sm:h-[90vh]">
          <div className='note bg-purple-400 min-h-[300px] max-h-[300px] rounded-lg flex flex-col justify-between overflow-hidden'>
            <div className="content h-full">
              <input onChange={handleNoteTitle} className="title font-bold py-1 px-3 bg-purple-500 w-full placeholder-white focus:outline-none" value={noteTitle} placeholder='Add title' />
              <textarea onChange={handleNoteText} className='text px-3 py-2 w-full h-[calc(100%-32px)] bg-purple-400 placeholder-white focus:outline-none resize-none' value={noteText} placeholder='Type to add a new note'></textarea>
            </div>
            <div className="noteFooter flex flex-col">
              <hr className='bg-purple-500 h-[1.5px] border-0' />
              <div className="px-3 flex justify-between items-center">
                <small className={noteText.length >= 240 ? "text-red-500" : "text-white"}>{charLimit - noteText.length} remaining</small>
                <button onClick={AddNote} disabled={noteText.length <= 8 || noteTitle.length <= 3} className='bg-purple-600 disabled:bg-purple-500 hover:bg-purple-600  px-[6px] my-[6px] rounded-md cursor-pointer text-white'>Add</button>
              </div>
            </div>
          </div>
          {
            notes.filter((item) => item.title.toLowerCase().includes(searchText.toLocaleLowerCase())).map((item) => {
              return (
                <div key={item.id} className='note bg-purple-400 min-h-[300px] max-h-[300px] rounded-lg flex flex-col justify-between overflow-hidden'>
                  <div className="content">
                    <h2 className="title font-bold py-1 px-3 bg-purple-500">{item.title}</h2>
                    <div className='text py-2 px-3 max-h-[232px] overflow-y-auto whitespace-pre-wrap break-words'>{item.text}</div>
                  </div>
                  <div className="noteFooter flex flex-col">
                    <hr className='bg-purple-500 h-[1.5px] border-0' />
                    <div className="px-3 flex justify-between items-center">
                      <small>{item.date}</small>
                      <div className="btns flex gap-1">
                        <span  className='hover:bg-purple-500 p-[6px] my-1 rounded-[50%] cursor-pointer'><IoMdArchive /></span>
                        <span onClick={() => editNote(item.id)} className='hover:bg-purple-500 p-[6px] my-1 rounded-[50%] cursor-pointer'><FaEdit /></span>
                        <span onClick={() => deleteNote(item.id,  item.title)} className='hover:bg-purple-500 p-[6px] my-1 rounded-[50%] cursor-pointer'><MdDelete /></span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="search flex items-center bg-white rounded-md">
        <input onChange={handleSearch} className='py-1 px-1 w-[100%] rounded-md text-lg text-slate-700 focus:outline-none' type="text" placeholder='Type to search a note' />
        <span className="searchIcon py-2 px-3"><FaSearch /></span>
      </div>
    </div>
  )
}

export default Notes
