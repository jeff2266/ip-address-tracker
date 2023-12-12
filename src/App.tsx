import arrow from './assets/icon-arrow.svg'

function App() {
  // console.log(import.meta.env.VITE_IPIFY_KEY)

  return (
    <>
      <div className="grid grid-rows-[auto_1fr] w-full h-full">
        <div className="relative row-start-1 col-start-1 w-full grid grid-rows-[auto_1fr] justify-items-center items-start bg-[url(pattern-bg-desktop.png)] bg-cover">
          <h1 className='text-2xl text-white my-5'>IP Address Tracker</h1>
          <div className="rounded-lg overflow-hidden flex w-5/12 min-w-max shadow-md">
            <input className='grow text-base px-4 py-2' placeholder="Search for any IP address or domain" />
            <button className='shrink-0 rounded-none bg-black hover:bg-dark-gray'>
              <img className='mx-4' src={arrow} alt='arrow' />
            </button>
          </div>
          <div className='relative -bottom-1/2 grid grid-cols-[repeat(4,_minmax(200px,_1fr))] bg-white rounded-lg py-6 shadow-md'>
            <div className='border-r border-dark-gray px-6'>
              <h2 className='text-sm text-dark-gray'>IP ADDRESS</h2>
              <p>-</p>
            </div>
            <div className='border-r border-dark-gray px-6'>
              <h2 className='text-sm text-dark-gray'>LOCATION</h2>
              <p>-</p>
            </div>
            <div className='border-r border-dark-gray px-6'>
              <h2 className='text-sm text-dark-gray'>TIMEZONE</h2>
              <p>-</p>
            </div>
            <div className='px-6'>
              <h2 className='text-sm text-dark-gray'>ISP</h2>
              <p>-</p>
            </div>
          </div>
        </div>
        <div className="relative w-full flex justify-center items-center">
        </div>
      </div>
    </>
  )
}

export default App
