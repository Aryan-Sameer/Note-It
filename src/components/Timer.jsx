import React from 'react'
import { useState, useEffect } from 'react'

const Timer = () => {

    const [isStart, setIsStart] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [days, setDays] = useState(0)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [timerId, setTimerId] = useState(0)

    const handleStart = () => {
        setIsStart(true)
    }

    const handleReset = () => {
        setIsStart(false)
        resetTimer()
    }

    const resetTimer = () => {
        setDays(0)
        setHours(0)
        setMinutes(0)
        setSeconds(0)
        clearInterval(timerId)
    }

    const handlePause = () => {
        setIsPaused(true)
        clearInterval(timerId)
    }

    const handleResume = () => {
        setIsPaused(false)
        runTimer(days, hours, minutes, seconds)
    }

    const handleInput = (e) => {
        let value = parseInt(e.target.value)
        let id = e.target.id
        if (id == "days") {
            if (value < 100) {
                setDays(value)
            }
        } else if (id == "hours") {
            if (value < 24) {
                setHours(value)
            }
        } else if (id == "minutes") {
            if (value < 60) {
                setMinutes(value)
            }
        } else if (id == "seconds") {
            if (value < 60) {
                setSeconds(value)
            }
        }
    }

    const runTimer = (d, h, m, s, t) => {
        if (s > 0) {
            setSeconds(s - 1)
        } else if (s === 0 && m > 0) {
            setMinutes(m - 1)
            setSeconds(59)
        } else if (s === 0 && m === 0 && h > 0) {
            setHours(h - 1)
            setMinutes(59)
            setSeconds(59)
        } else {
            setDays(d - 1)
            setHours(23)
            setMinutes(59)
            setSeconds(59)
        }

        if (d == 0 && h == 0 && m == 0 && s == 0) {
            handleReset()
            alert("Time Up!!!")
        }
    }

    let tid
    useEffect(() => {
        if (isStart) {
            tid = setInterval(() => {
                runTimer(days, hours, minutes, seconds, tid)
            }, 1000);
            setTimerId(tid)
        }

        return () => {
            clearInterval(tid)
        }
    }, [tid, days, hours, minutes, seconds, isStart])


    return (
        <div className="Timer bg-purple-400 w-[430px] p-4 rounded-lg h-40 border-purple-500 border-4">
            {!isStart && <div className="inputContainer flex flex-col items-center justify-between h-full">
                <div className="inputBox flex gap-10">
                    <input onChange={handleInput} id='days' className='h-16 w-16 text-center outline-none rounded-lg' type="text" placeholder='DD' />
                    <input onChange={handleInput} id='hours' className='h-16 w-16 text-center outline-none rounded-lg' type="text" placeholder='HH' />
                    <input onChange={handleInput} id='minutes' className='h-16 w-16 text-center outline-none rounded-lg' type="text" placeholder='MM' />
                    <input onChange={handleInput} id='seconds' className='h-16 w-16 text-center outline-none rounded-lg' type="text" placeholder='SS' />
                </div>
                <button onClick={handleStart} disabled={days == 0 && hours == 0 && minutes == 0 && seconds == 0} className='disabled:bg-purple-500 p-1 bg-purple-600 mt-3 text-white hover:bg-purple-700 rounded-lg w-full'>Start timer</button>
            </div>}

            {isStart && <div className="showContainer flex flex-col items-center justify-between h-full">
                <div className="timerBox flex gap-2 rounded-lg">
                    <div className='text-4xl p-3 text-white'>{days < 10 ? `0${days}` : days}</div>
                    <span className='text-4xl p-3 text-white'>:</span>
                    <div className='text-4xl p-3 text-white'>{hours < 10 ? `0${hours}` : hours}</div>
                    <span className='text-4xl p-3 text-white'>:</span>
                    <div className='text-4xl p-3 text-white'>{minutes < 10 ? `0${minutes}` : minutes}</div>
                    <span className='text-4xl p-3 text-white'>:</span>
                    <div className='text-4xl p-3 text-white'>{seconds < 10 ? `0${seconds}` : seconds}</div>
                </div>
                <div className="controls flex gap-1 w-full">
                    <button onClick={(e) => {
                        if (isPaused) {
                            return handleResume(e)
                        } else {
                            return handlePause(e)
                        }
                    }} className='p-1 bg-purple-600 text-white hover:bg-purple-700 rounded-lg w-full'>{isPaused ? `Resume` : `Stop`}</button>
                    <button onClick={handleReset} className='p-1 bg-purple-600 text-white hover:bg-purple-700 rounded-lg w-full'>Reset</button>
                </div>
            </div>}
        </div>
    )
}

export default Timer
