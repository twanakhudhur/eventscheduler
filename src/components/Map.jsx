// src/components/Map.js

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

export default function Map({ event }) {
  const customMarkerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
  });
  
  const latitude = event?.latitude ?? 0;
  const longitude = event?.longitude ?? 0;

  return (
    <>
      {latitude && longitude ? (
        <div className="mt-5 relative z-10">
          <MapContainer
            center={[latitude, longitude]}
            zoom={13}
            style={{ height: '200px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[latitude, longitude]} icon={customMarkerIcon}>
              <Popup>{event.location}</Popup>
            </Marker>
          </MapContainer>
        </div>
      ) : (
        <p className="text-center text-gray-500">Location data not available</p>
      )}
    </>
  );
}
