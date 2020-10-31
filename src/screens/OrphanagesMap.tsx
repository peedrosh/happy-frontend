import React, { useEffect, useState } from 'react'
import Leaflet from 'leaflet'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPlus } from 'react-icons/fi'
import 'leaflet/dist/leaflet.css'
import mapMarker from '../images/map-marker.svg'
import '../styles/screens/orphanages-map.css'
import api from '../services/api'

const token = process.env.REACT_APP_MAPBOX_TOKEN

const mapIcon = Leaflet.icon({
  iconUrl: mapMarker,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2]
})

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data)
    })
  }, [])

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarker} alt="Happy" />
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando sua visita :)</p>
        </header>
        <footer>
          <strong>Brasília</strong>
          <span>Distrito Federal</span>
        </footer>
      </aside>
  
      <Map
        center={[-15.7744219, -48.0779716]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${token}`} />
  
        {
          orphanages.map(orphanage => {
            const { id, name, latitude, longitude } = orphanage

            return (
              <Marker position={[latitude, longitude]} icon={mapIcon} key={id}>
                <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                  {name}
                  <Link to={`/orphanages/${id}`}>
                    <FiArrowRight size={20} color="#fff" />
                  </Link>
                </Popup>
              </Marker>
            )
          })
        }
      </Map>
  
      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  ) 
}

export default OrphanagesMap
