"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const MapContent = dynamic(() => import("./MapPreviewContent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-md text-gray-500">
      Cargando mapa...
    </div>
  ),
});

const MapPreview = ({ property }) => {
  return <MapContent property={property} />;
};

export default MapPreview;
