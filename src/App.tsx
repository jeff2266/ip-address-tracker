import { FormEventHandler, useRef, useState } from 'react'
import arrow from './assets/icon-arrow.svg'
import MapBox from './components/MapBox'

type Track = {
	ip: string
	location: string
	coord: [number, number]
	timezone: string
	isp: string
}

function validate(input: string) {
	const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/
	if (ipv4Regex.test(input)) {
		const parts = input.split('.')
		for (let part of parts) {
			if (parseInt(part) > 255) {
				return false
			}
		}
		return true
	}
	return false
}

function App() {
	const [track, setTrack] = useState<Track | null>(null)
	const [isError, setIsError] = useState<Boolean | null>(false)
	const input = useRef<HTMLInputElement>(null)

	const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
		event.preventDefault()
		if (!input.current?.value || !validate(input.current.value)) {
			setIsError(true)
			return
		}

		let request: string | null
		let resp: Response | null
		let body: any

		setIsError(null)
		request = input.current
			? `https://geo.ipify.org/api/v2/country?apiKey=${import.meta.env.VITE_IPIFY_KEY}&ipAddress=${
					input.current.value
				}`
			: null
		resp = request ? await fetch(request) : null
		body = await resp?.json()
		if (!body) {
			setIsError(true)
			return
		}

		let newTrack = {
			ip: body.ip as string,
			location: `${body.location.region}, ${body.location.country}`,
			timezone: body.location.timezone as string,
			isp: body.isp as string
		}

		request = newTrack?.location
			? encodeURI(
					`https://api.geoapify.com/v1/geocode/search?text=${newTrack.location}&apiKey=${
						import.meta.env.VITE_GEOAPIFY_KEY
					}`
				)
			: null
		resp = request ? await fetch(request) : null
		body = await resp?.json()
		if (!body) {
			setIsError(true)
			return
		}

		const properties = (body.features as Array<any>)[0]?.properties
		setTrack({...newTrack, coord: [properties.lat, properties.lon]})
		setIsError(false)
	}

	return (
		<>
			<div className="row-start-1 col-start-1 w-full min-w-max h-full grid grid-rows-[auto_auto_auto_auto_3fr] grid-cols-[0_auto_0] gap-x-4 justify-items-center items-start">
				<div className="row-start-1 col-start-1 min-w-full h-full row-span-3 col-span-3 bg-[url(/pattern-bg-mobile.png)] lg:bg-[url(/pattern-bg-desktop.png)] bg-cover"></div>
				<h1 className="row-start-1 col-start-2 text-2xl text-white mt-4 px-4">IP Address Tracker</h1>
				<form
					className="row-start-2 col-start-2 rounded-lg overflow-clip flex w-full lg:max-w-screen-sm shadow-md my-6"
					onSubmit={onSubmit}>
					<input
						ref={input}
						className={`grow w-10/12 px-4 py-2 bg-white rounded-s-lg border border-red-600 disabled:text-dark-gray ${
							isError === true ? 'border-red-600' : 'border-transparent'
						}`}
						disabled={isError === null}
						placeholder="Search for any IP address or domain"
					/>
					<button
						className="shrink-0 rounded-none bg-black hover:bg-dark-gray disabled:bg-dark-gray"
						disabled={isError === null}>
						<img
							className={`mx-4 ${isError === null ? 'animate-[pulse_1s_infinite]' : ''}`}
							src={arrow}
							alt="arrow"
						/>
					</button>
				</form>
				<div className="row-start-3 col-start-2 row-span-2 w-full min-h-max lg:max-w-screen-lg bg-white rounded-lg py-6 shadow-md">
					<div className="grid grid-rows-4 grid-cols-none lg:grid-rows-none lg:grid-cols-4 gap-y-4">
						<div className="text-center lg:text-left lg:border-r border-dark-gray px-6">
							<h2 className="text-sm text-dark-gray">IP ADDRESS</h2>
							<p>{track?.ip ?? '-'}</p>
						</div>
						<div className="text-center lg:text-left lg:border-r border-dark-gray px-6">
							<h2 className="text-sm text-dark-gray">LOCATION</h2>
							<p>{!track?.location || track.location === '' ? '-' : track.location}</p>
						</div>
						<div className="text-center lg:text-left lg:border-r border-dark-gray px-6">
							<h2 className="text-sm text-dark-gray">TIMEZONE</h2>
							<p>{!track?.timezone || track.timezone === '' ? '-' : track.timezone}</p>
						</div>
						<div className="text-center lg:text-left px-6">
							<h2 className="text-sm text-dark-gray">ISP</h2>
							<p>{!track?.isp || track.isp === '' ? '-' : track.isp}</p>
						</div>
					</div>
				</div>
				<div className="row-start-4 col-start-1 row-span-2 col-span-3 relative w-full h-full flex justify-center items-center overflow-clip -z-10">
					<MapBox coord={track?.coord ?? [51.505, -0.09]} />
				</div>
			</div>
		</>
	)
}

export default App
