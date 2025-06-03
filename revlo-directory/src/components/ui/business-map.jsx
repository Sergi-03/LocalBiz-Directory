"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

export default function BusinessMap() {
  const [businesses, setBusinesses] = useState([])

  useEffect(() => {
    const fetchBusinesses = async () => {
      const res = await fetch("https://revlo-backend.onrender.com/api/business")
      const data = await res.json()
      setBusinesses(data)
    }

    fetchBusinesses()
  }, [])

  if (businesses.length === 0) return <p>Loading map...</p>

  return (
    <MapContainer
      center={[businesses[0].latitude, businesses[0].longitude]}
      zoom={13}
      scrollWheelZoom={true}
      className="h-[500px] w-full rounded-xl border shadow z-10"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {businesses.map((biz) => (
        <Marker
          key={biz.id}
          position={[biz.latitude, biz.longitude]}
         >
          <Popup>
            <strong>{biz.name}</strong>
            <br />
            {biz.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}