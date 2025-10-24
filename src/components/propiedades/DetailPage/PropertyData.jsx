"use client";

import SideCard from "./SideCard";
import MainCard from "./MainCard";

const PropertyData = ({ property }) => {
  
  return (
    <div className="w-full flex flex-col bg-contrast rounded-sm">
      <SideCard property={property} />
      <MainCard property={property} />
      {/* MAIN CARD (placeholder para tus datos/mapa) */}
      <div className="flex-1">
        <div className="h-full shadow-sm">
          {/* Aquí iría el contenido principal o el mapa */}
        </div>
      </div>
    </div>
  );
};

export default PropertyData;
