import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

// Define the custom icon using the correct Leaflet properties
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapComponentProps {
  lat?: number;
  lng?: number;
}

function LocationMarker() {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const map = useMap();

  useEffect(() => {
    map.locate().on('locationfound', function(e) {
      setPosition(e.latlng);
      map.setView(e.latlng, 13);
    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position} icon={DefaultIcon}>
      <Popup>Your Location</Popup>
    </Marker>
  );
}

function SetViewOnPropsChange({ lat, lng }: MapComponentProps) {
  const map = useMap();

  useEffect(() => {
    if (lat !== undefined && lng !== undefined) {
      map.setView([lat, lng], 13);
    }
  }, [lat, lng, map]);

  return null;
}

const Map = ({ lat, lng }: MapComponentProps) => {
  // Provide default values if lat or lng are undefined
  const centerLat = lat !== undefined ? lat : 51.505; // Default to London's latitude
  const centerLng = lng !== undefined ? lng : -0.09;  // Default to London's longitude

  return (
    <MapContainer
      center={[centerLat, centerLng]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <SetViewOnPropsChange lat={lat} lng={lng} />
      <Marker position={[centerLat, centerLng]} icon={DefaultIcon}>
        <Popup>Selected Location</Popup>
      </Marker>
      <LocationMarker />
    </MapContainer>
  );
}

export default Map;
