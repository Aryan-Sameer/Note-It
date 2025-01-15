import React, { useState } from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Events = () => {

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const currentDate = new Date()

    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth())
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear())

    const [selectedDate, setSelectedDate] = useState(currentDate)
    const [showPopup, setshowPop] = useState(false)

    const [events, setEvents] = useState([])
    const [eventTime, setEventTime] = useState({ hours: "00", minutes: "00" })
    const [eventText, setEventText] = useState("")

    const [editingEvent, setEditingEvent] = useState(null)

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

    const prevMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1))
        setCurrentYear((prevMonth) => (prevMonth === 0 ? currentYear - 1 : currentYear))
    }

    const nextMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1))
        setCurrentYear((prevMonth) => (prevMonth === 11 ? currentYear + 1 : currentYear))
    }

    const handleClick = (day) => {
        const clickedDate = new Date(currentYear, currentMonth, day)
        const today = new Date()

        if (clickedDate >= today || isSameDate(clickedDate, today)) {
            setSelectedDate(clickedDate)
            setshowPop(true)
            setEventTime({ hours: "00", minutes: "00" })
            setEventText("")
            setEditingEvent(null)
        }
    }

    const isSameDate = (date1, date2) => {
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
    }

    const handleEventSubmit = () => {
        const newEvent = {
            id: editingEvent ? editingEvent.id : Date.now(),
            date: selectedDate,
            time: `${eventTime.hours.padStart(2, "0")} : ${eventTime.minutes.padStart(2, "0")}`,
            text: eventText
        }

        let updatedEvent = [...events]

        if (editingEvent) {
            updatedEvent = updatedEvent.map((event) => {
                if (event.id === editingEvent.id) {
                    return newEvent
                }
                return event
            })
        } else {
            updatedEvent.push(newEvent)
        }

        updatedEvent.sort((a, b) => new Date(a.date) - new Date(b.date))

        setEvents(updatedEvent)
        setEventTime({ hours: "00", minutes: "00" })
        setEventText("")
        setshowPop(false)
        setEditingEvent(null)
    }

    const handleEdit = (event) => {
        setSelectedDate(new Date(event.date))
        setEventTime({
            hours: event.time.split(":")[0],
            minutes: event.time.split(":")[1]
        })
        setEventText(event.text)
        setEditingEvent(event)
        setshowPop(true)
    }

    const handleDelete = (eventId) => {
        const updatedEvent = events.filter((evnt) => evnt.id !== eventId)
        setEvents(updatedEvent)
    }

    const handleTimeChange = (e) => {
        const { name, value } = e.target
        setEventTime({ ...eventTime, [name]: value.padStart(2, "0") })
    }

    return (
        <div className={`bg-purple-200 w-full px-10 py-7 min-h-[calc(100vh-57px)] flex flex-col justify-between dark:bg-neutral-700`}>
            <div className="canvas">
                <h2 className='text-xl font-bold dark:text-white'>Your Events</h2>
                <hr className='bg-slate-500 border-slate-400 h-[2px] my-3 dark:border-2 dark:border-neutral-600' />

                <div className="main flex gap-8 w-[85%] m-auto my-[24px]">

                    <section className="calendar w-[35%] relative bg-purple-400 rounded-md h-fit dark:text-white dark:bg-neutral-800">
                        <div className="navigations flex justify-between bg-purple-600 text-white p-2 rounded-t-md dark:bg-neutral-900">
                            <div className="date">
                                <span>{monthsOfYear[currentMonth]}, </span>
                                <span>{currentYear}</span>
                            </div>
                            <div className="navBtns flex gap-4 text-xl">
                                <button onClick={prevMonth} className='hover:bg-purple-700 rounded-full dark:bg-neutral-800'><MdKeyboardArrowLeft /></button>
                                <button onClick={nextMonth} className='hover:bg-purple-700 rounded-full dark:bg-neutral-800'><MdKeyboardArrowRight /></button>
                            </div>
                        </div>

                        {!showPopup && <div className="content">

                            <div className="weekDays text-center uppercase mt-2">
                                {daysOfWeek.map((day, index) => {
                                    return (
                                        <span key={index} className='font-bold'>{day}</span>
                                    )
                                })}
                            </div>

                            <hr className='border border-purple-500 w-[90%] mx-auto mt-2 dark:border-neutral-700'/>

                            <div className="dates grid grid-cols-7 aspect-[3/2]">
                                {
                                    [...Array(firstDayOfMonth).keys()].map((_, index) => {
                                        return (
                                            <span key={`empty-${index}`} />
                                        )
                                    })
                                }
                                {
                                    [...Array(daysInMonth).keys()].map((day) => {
                                        return (
                                            <span key={day}
                                                onClick={() => handleClick(day + 1)}
                                                className={
                                                    day + 1 === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear() ? "today" : ""
                                                }>
                                                {day + 1}
                                            </span>
                                        )
                                    })
                                }
                            </div>
                        </div>}

                        {showPopup && <div className="eventPopup  w-full flex flex-col justify-center gap-4 p-4 bg-purple-400 rounded-lg aspect-[3/2] dark:bg-neutral-800">
                            <h2 className='text-md font-bold'>{selectedDate.getDate()}, {monthsOfYear[selectedDate.getMonth()]}</h2>
                            <div className="timeInput flex justify-evenly items-center">
                                <h2 className='text-md font-bold'>Set time : </h2>
                                <input
                                    onChange={handleTimeChange}
                                    type="number"
                                    className='focus-within:outline-none text-center p-1 bg-transparent border-y-[3px] border-purple-600 text-white text-lg placeholder:text-white dark:border-neutral-700'
                                    value={eventTime.hours}
                                    placeholder='HH'
                                    name="hours"
                                    min={0} max={23}
                                    id="" />
                                <input
                                    onChange={handleTimeChange}
                                    type="number"
                                    className='focus-within:outline-none text-center p-1 bg-transparent border-y-[3px] border-purple-600 text-white text-lg placeholder:text-white dark:border-neutral-700'
                                    value={eventTime.minutes}
                                    placeholder='MM'
                                    name="minutes"
                                    min={0} max={59}
                                    id="" />
                            </div>

                            <textarea
                                onChange={(e) => e.target.value.length <= 60 && setEventText(e.target.value)}
                                className='eventText resize-none focus-within:outline-none p-1 rounded-md text-sm dark:bg-neutral-300 dark:text-slate-900'
                                value={eventText}
                                placeholder='Event description'
                                rows={3} name="" id=""></textarea>

                            <div className="flex justify-between gap-2">
                                <button onClick={handleEventSubmit} className='bg-purple-600 text-white px-[6px] py-1 rounded-md flex-grow dark:bg-neutral-900'>{editingEvent ? "Update Event" : "Add Event"}</button>
                                <button onClick={() => setshowPop(false)} className='bg-purple-600 text-white px-[6px] rounded-md py-1 dark:bg-neutral-900'><RxCross2 /></button>
                            </div>
                        </div>}
                    </section>

                    <section className="events flex flex-col gap-2 flex-grow h-[70svh] overflow-y-auto dark:text-white">
                        {events.map((event, index) => {
                            return (
                                <div key={index} className="event bg-purple-400 flex p-2 rounded-lg w-full justify-between dark:bg-neutral-800">
                                    <div className="eventData flex items-center justify-center ">
                                        <div className="eventDate border-r-2 border-purple-600 pr-2 text-center dark:border-neutral-700">
                                            <p>{event.date.getDate()} {monthsOfYear[event.date.getMonth()].slice(0, 3)}, {event.date.getFullYear()}</p>
                                            <p className='font-bold'>{event.time}</p>
                                        </div>
                                        <div className="evntText px-2">{event.text}</div>
                                    </div>
                                    <div className="flex flex-col justify-center gap-1 border-l-2 border-purple-600 pl-2 dark:border-neutral-700">
                                        <button onClick={() => handleEdit(event)} className='hover:bg-purple-500 rounded-full p-1 dark:hover:bg-neutral-900'><MdEdit /></button>
                                        <button onClick={() => handleDelete(event.id)} className='hover:bg-purple-500 rounded-full p-1 dark:hover:bg-neutral-900'><MdDelete /></button>
                                    </div>
                                </div>
                            )
                        })}
                        {
                            events.length === 0 && <div className='my-5 font-bold text-slate-600 text-lg dark:text-slate-200'>No events to display!</div>
                        }
                    </section>

                </div>

            </div>
        </div>
    )
}

export default Events
