import arrow from './assets/icon-arrow.svg'

function App() {
	// console.log(import.meta.env.VITE_IPIFY_KEY)

	return (
		<>
			<div className="grid grid-rows-[auto_1fr] w-full h-full">
				<div className="row-start-1 col-start-1 w-full grid grid-rows-[auto_auto_1fr_1fr] grid-cols-[0_auto_0] gap-x-4 justify-items-center items-start">
					<div className="row-start-1 col-start-1 min-w-full min-h-full row-span-3 col-span-3 bg-[url(pattern-bg-desktop.png)] bg-cover"></div>
					<h1 className="row-start-1 col-start-2 text-2xl text-white px-4 py-3">IP Address Tracker</h1>
					<div className="row-start-2 col-start-2 rounded-lg overflow-clip flex min-w-full lg:min-w-max shadow-md my-4">
						<input className="grow text-base px-4 py-2" placeholder="Search for any IP address or domain" />
						<button className="shrink-0 rounded-none bg-black hover:bg-dark-gray">
							<img className="mx-4" src={arrow} alt="arrow" />
						</button>
					</div>
					<div className="row-start-3 col-start-2 row-span-2 w-full lg:max-w-screen-lg my-2 bg-white rounded-lg py-6 shadow-md">
						<div className="grid grid-rows-4 grid-cols-none lg:grid-rows-none lg:grid-cols-4 gap-y-4">
							<div className="text-center lg:text-left lg:border-r border-dark-gray px-6">
								<h2 className="text-sm text-dark-gray">IP ADDRESS</h2>
								<p>-</p>
							</div>
							<div className="text-center lg:text-left lg:border-r border-dark-gray px-6">
								<h2 className="text-sm text-dark-gray">LOCATION</h2>
								<p>-</p>
							</div>
							<div className="text-center lg:text-left lg:border-r border-dark-gray px-6">
								<h2 className="text-sm text-dark-gray">TIMEZONE</h2>
								<p>-</p>
							</div>
							<div className="text-center lg:text-left px-6">
								<h2 className="text-sm text-dark-gray">ISP</h2>
								<p>-</p>
							</div>
						</div>
					</div>
				</div>
				<div className="relative w-full flex justify-center items-center"></div>
			</div>
		</>
	)
}

export default App
