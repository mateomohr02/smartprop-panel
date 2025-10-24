"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ToggleButtonDetailCard from "./ToggleButtonDetailCard";
import Image from "next/image";

const SideCard = ({ property }) => {
  const imgArray = property?.multimedia?.images || [];
  const [count, setCount] = useState(0);

  const handleImageChange = (direction) => {
    if (direction === "right") {
      setCount((prev) => (prev < imgArray.length - 1 ? prev + 1 : 0));
    } else {
      setCount((prev) => (prev > 0 ? prev - 1 : imgArray.length - 1));
    }
  };

  // Estado local de la propiedad mostrada
  const [displayProperty, setDisplayProperty] = useState(property);

  useEffect(() => {
    setDisplayProperty(property);
  }, [property]);

  return (
    <div className="w-full">
      {/* Imagen con flechas */}
      <div className="relative rounded-t-sm w-full aspect-[4/3] flex items-center justify-center overflow-hidden">
        {imgArray.length > 0 ? (
          <Image
            src={imgArray[count]}
            alt="Imagen de la propiedad"
            fill
            className="object-cover"
          />
        ) : (
          <div className="text-gray-400 text-sm">Sin imágenes</div>
        )}

        {/* Flecha izquierda */}
        {imgArray.length > 1 && (
          <>
            <button
              onClick={() => handleImageChange("left")}
              className="absolute left-0 text-contrast/60 hover:text-gray-700 pr-6 pl-1 shadow h-full transition-colors duration-500 hover:bg-gradient-to-l hover:from-white/0 hover:to-white/60"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Flecha derecha */}
            <button
              onClick={() => handleImageChange("right")}
              className="absolute right-0 text-contrast/60 hover:text-gray-700 pr-1 pl-6 shadow h-full transition-colors duration-500 hover:bg-gradient-to-r hover:from-white/0 hover:to-white/60"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Datos */}
      <div className="p-4 flex flex-col gap-3 text-sm rounded-sm">
        <div className="flex justify-between border-b-2 border-gray-200 pb-2">
          <span className="font-medium">Última Edición:</span>
          <span>{displayProperty?.lastEditedBy || "Nombre de Usuario"}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium">Estado</span>
          <ToggleButtonDetailCard
            flag={displayProperty?.isActive}
            type="isActive"
            propertyId={displayProperty?.id}
            setDisplayProperty={setDisplayProperty}
          />
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium">Promocionado</span>
          <ToggleButtonDetailCard
            flag={displayProperty?.isFeatured}
            type="isFeatured"
            propertyId={displayProperty?.id}
            setDisplayProperty={setDisplayProperty}
          />
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Visualizaciones</span>
          <span>{displayProperty?.visualizations}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Interacciones</span>
          <span>{displayProperty?.interactions}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Compartido</span>
          <span>{displayProperty?.reach}</span>
        </div>

        <button className="w-full py-2 bg-primary text-contrast hover:bg-secondary rounded-sm text transition-all duration-300 cursor-pointer">
          Editar Información
        </button>
      </div>
    </div>
  );
};

export default SideCard;
