import './App.css'
import arrow from './assets/icon-arrow.svg'
import bgDesktop from '/pattern-bg-desktop.png'

function App() {
  // console.log(import.meta.env.VITE_IPIFY_KEY)

  return (
    <>
      <div className="grid grid-rows-[auto_0_1fr] w-full h-full">
        <img className='row-start-1 col-start-1 w-full object-cover' src={bgDesktop} alt='background' />
        <div className="row-start-1 col-start-1">
          <h1>IP Address Tracker</h1>
          <div className="rounded-lg overflow-hidden flex max-w-max">
            <input placeholder="Enter an IP address..." />
            <button className='rounded-none'>
              <img src={arrow} alt='arrow' />
            </button>
          </div>
        </div>
        <div className="relative w-full flex justify-center items-center">
        </div>
        <p>test</p>
      </div>
    </>
  )
}

export default App
