"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

// 📍 Corrige el ícono del marcador (Leaflet por defecto no lo carga bien en Next.js)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapPreviewContent = ({ property }) => {
  const lat = property?.location.mapLocation?.lat;
  const lng = property?.location.mapLocation?.lng;

  useEffect(() => {
    if (!lat || !lng) {
      console.warn("No hay coordenadas para mostrar el mapa");
    }
  }, [lat, lng]);

  if (!lat || !lng)
    return (
      <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-md text-gray-500">
        Sin ubicación disponible
      </div>
    );

  return (
    <div className="w-full h-96 rounded-md overflow-hidden border border-gray-200">
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>
            {property?.initialData.title || "Aquí está la propiedad"}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapPreviewContent;
