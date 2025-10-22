"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useFetchPropertyTypes } from "@/hooks/useFetchPropertyTypes";

const PropertyTypeSelector = ({ property, setProperty }) => {
  const { propertyTypes, loading, error } = useFetchPropertyTypes();

  // Estado interno del select
  const [selectedType, setSelectedType] = useState(
    property.propertyTypeSlug ? property.propertyTypeSlug : ""
  );
  // Estado para "otro"
  const [customType, setCustomType] = useState("");

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedType(value);

    if (value === "other") {
      // No pisamos propertyType, solo dejamos vacío
      setProperty({ ...property, propertyTypeSlug: "" });
    } else {
      setCustomType("");
      setProperty({ ...property, propertyTypeSlug: value });
    }
  };

  const handleCustomTypeChange = (e) => {
    const value = e.target.value;
    setCustomType(value);
    // Guardamos el valor personalizado en propertyType,
    // pero SIN tocar el selectedType, que sigue siendo "other"
    setProperty({ ...property, propertyTypeSlug: value });
  };

  if (loading) {
    return (
      <div className="w-full py-2 px-3 border-2 border-secondary rounded-lg bg-gray-100 text-gray-500">
        Cargando tipos de propiedad...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-2 px-3 border-2 border-red-400 rounded-lg bg-red-50 text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor="propertyType">Tipo de Propiedad</label>
      <div className="w-full flex flex-col gap-2">
        <div className="relative w-full">
          <select
            name="propertyType"
            value={selectedType}
            className="appearance-none w-full p-2 drop-shadow-sm rounded-sm px-3 pr-10 bg-third"
            onChange={handleSelectChange}
          >
            <option value="" disabled>
              Seleccione el Tipo de Propiedad
            </option>
            {propertyTypes?.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
            <option value="other">Otro...</option>
          </select>

          <ChevronDown
            className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
            size={18}
          />
        </div>

        {selectedType === "other" && (
          <div className="w-full">
            <label htmlFor="otherPropertyType" className="text-sm">
              Nuevo tipo de propiedad
            </label>
            <input
              id="otherPropertyType"
              type="text"
              className="w-full p-2 drop-shadow-sm rounded-sm px-3 bg-third"
              value={customType}
              placeholder="Ingrese el nuevo tipo de propiedad"
              onChange={handleCustomTypeChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyTypeSelector;
