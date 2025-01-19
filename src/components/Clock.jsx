import StopWatch from './StopWatch'
import Timer from './Timer'

const Clock = () => {

    return (
        <section className={`bg-purple-200 w-full px-10 py-7 flex flex-col justify-between dark:bg-neutral-700`}>
            <article className="canvas">
                <h2 className='text-xl font-bold dark:text-white'>Timer and Stop watch</h2>
                <hr className='bg-slate-500 border-slate-400 h-[2px] my-3 dark:border-2 dark:border-neutral-600' />
                <div className="clocks flex justify-evenly flex-wrap gap-5 my-[24px]">
                    <Timer />
                    <StopWatch />
                </div>
            </article>
        </section>
    )
}

export default Clock
