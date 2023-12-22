import { FormEventHandler, useRef, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import arrow from './assets/icon-arrow.svg'

type Track = {
	ip: string
	location: string
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
	const [isError, setIsError] = useState<Boolean>(false)
	const input = useRef<HTMLInputElement>(null)

	const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
		event.preventDefault()
		if (!input.current?.value || !validate(input.current.value)) {
			setIsError(true)
			return
		}
		const request = input.current
			? `https://geo.ipify.org/api/v2/country?apiKey=${import.meta.env.VITE_IPIFY_KEY}&ipAddress=${
					input.current.value
				}`
			: null
		const resp = request ? await fetch(request) : null
		const body = await resp?.json()
		if (!body) {
			setIsError(true)
			return
		}
		setTrack(
			body
				? {
						ip: body.ip,
						location: `${body.location.region}, ${body.location.country}`,
						timezone: body.location.timezone,
						isp: body.isp
					}
				: null
		)
		setIsError(false)
	}

	return (
		<>
			<div className="row-start-1 col-start-1 w-full min-w-max h-full grid grid-rows-[auto_auto_auto_auto_3fr] grid-cols-[0_auto_0] gap-x-4 justify-items-center items-start">
				<div className="row-start-1 col-start-1 min-w-full h-full row-span-3 col-span-3 bg-[url(pattern-bg-mobile.png)] lg:bg-[url(pattern-bg-desktop.png)] bg-cover"></div>
				<h1 className="row-start-1 col-start-2 text-2xl text-white mt-4 px-4">IP Address Tracker</h1>
				<form
					className="row-start-2 col-start-2 rounded-lg overflow-clip flex min-w-full lg:min-w-max shadow-md my-6"
					onSubmit={onSubmit}>
					<input
						ref={input}
						className={`grow text-base px-4 py-2 rounded-s-lg border ${
							isError ? ' border-red-600' : 'border-transparent'
						}`}
						placeholder="Search for any IP address or domain"
					/>
					<button className="shrink-0 rounded-none bg-black hover:bg-dark-gray">
						<img className="mx-4" src={arrow} alt="arrow" />
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
							<p>{track?.location ?? '-'}</p>
						</div>
						<div className="text-center lg:text-left lg:border-r border-dark-gray px-6">
							<h2 className="text-sm text-dark-gray">TIMEZONE</h2>
							<p>{track?.timezone ?? '-'}</p>
						</div>
						<div className="text-center lg:text-left px-6">
							<h2 className="text-sm text-dark-gray">ISP</h2>
							<p>{track?.isp ?? '-'}</p>
						</div>
					</div>
				</div>
				<div className="row-start-4 col-start-1 row-span-2 col-span-3 relative w-full h-96 flex justify-center items-center overflow-clip -z-10">
					<MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						<Marker position={[51.505, -0.09]}>
							<Popup>
								A pretty CSS3 popup. <br /> Easily customizable.
							</Popup>
						</Marker>
					</MapContainer>
				</div>
			</div>
		</>
	)
}

export default App
