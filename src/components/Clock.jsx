import StopWatch from './StopWatch'
import Timer from './Timer'

const Clock = () => {

    return (
        <div className={`bg-purple-200 w-full px-10 py-7 min-h-[calc(100vh-57px)] flex flex-col justify-between`}>
            <div className="canvas">
                <h2 className='text-xl font-bold'>Timer and Stop watch</h2>
                <hr className='bg-slate-500 h-[2px] my-3' />
                <div className="clocks flex justify-evenly flex-wrap gap-5">
                    <Timer />
                    <StopWatch />
                </div>
            </div>
        </div>
    )
}

export default Clock
