import * as L from 'leaflet'
import { useEffect, useRef } from 'react'

export default function MapBox({ coord }: { coord: [number, number] }) {
	const map = useRef<L.Map | null>(null)
	const marker = useRef<L.Marker>(L.marker(coord))

	useEffect(() => {
		if (map.current === null) {
			map.current = L.map('map')
			map.current.zoomControl.remove()
			L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(map.current)
		}
		marker.current.removeFrom(map.current)
		marker.current = L.marker(coord)
		map.current.setView(coord, 13, { animate: true })
		marker.current.addTo(map.current)
	}, [coord])

	return <div id="map" className="w-full h-full overflow-clip"></div>
}
