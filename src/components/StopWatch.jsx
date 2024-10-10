import React from 'react'
import { useState, useEffect, useRef } from 'react'

const StopWatch = () => {

    const [isRunning, setIsRunning] = useState(false)
    const [elapsesTime, setElapsesTime] = useState(0)
    const intervalIdRef = useRef(null)
    const startTimeRef = useRef(0)

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsesTime(Date.now() - startTimeRef.current)
            }, 10);
        }

        return () => {
            clearInterval(intervalIdRef.current)
        }

    }, [isRunning])

    const start = () => {
        setIsRunning(true)
        startTimeRef.current = Date.now() - elapsesTime
    }

    const stop = () => {
        setIsRunning(false)
    }

    const reset = () => {
        setElapsesTime(0)
        setIsRunning(false)
    }

    const formatTime = () => {
        let hours = Math.floor(elapsesTime / (1000 * 60 * 60))
        let minutes = Math.floor(elapsesTime / (1000 * 60) % 60)
        let seconds = Math.floor(elapsesTime / (1000) % 60)
        let milliseconds = Math.floor(elapsesTime % (1000) / 10)

        hours = String(hours).padStart(2, "0")
        minutes = String(minutes).padStart(2, "0")
        seconds = String(seconds).padStart(2, "0")
        milliseconds = String(milliseconds).padStart(2, "0")

        return [hours, ":", minutes, ":", seconds, ":", milliseconds]
    }

    return (
        <div className='stopWatch bg-purple-400 w-[430px] p-4 rounded-lg h-40 border-purple-500 border-[6px]'>
            <div className="inputContainer flex flex-col items-center justify-between h-full">
                <div className="display flex gap-10">
                    <div className='text-4xl text-white flex justify-between gap-2'>{formatTime().map((item, index) => {
                        return (
                            <div key={index} className='text-4xl p-3 text-white'>{item}</div>
                        )
                    })}</div>
                </div>
                <div className="controls flex justify-between w-full gap-1">
                    <button onClick={start} className='p-1 bg-purple-600 text-white hover:bg-purple-700 rounded-lg w-full'>Start</button>
                    <button onClick={stop} className='p-1 bg-purple-600 text-white hover:bg-purple-700 rounded-lg w-full'>Stop</button>
                    <button onClick={reset} className='p-1 bg-purple-600 text-white hover:bg-purple-700 rounded-lg w-full'>Reset</button>
                </div>
            </div>
        </div>
    )
}

export default StopWatch
