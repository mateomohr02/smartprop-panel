"use client";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const LocationSelector = ({ label, level, data, selected, onSelect, error }) => {
  const { locations, loading, error: fetchError } = data;
  const [selectedValue, setSelectedValue] = useState(selected || "");
  const [customValue, setCustomValue] = useState("");

  useEffect(() => {
    if (!selected) {
      setSelectedValue("");
      setCustomValue("");
    }
  }, [selected]);

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);

    if (value === "other") {
      onSelect({ name: "" }); // activa campo personalizado
    } else {
      const selectedLoc = locations?.find((loc) => loc.slug === value);
      onSelect(selectedLoc || value);
      setCustomValue("");
    }
  };

  const handleCustomChange = (e) => {
    const value = e.target.value;
    setCustomValue(value);
    onSelect({ name: value }); // valor personalizado
  };

  if (loading) {
    return (
      <div className="w-full py-2 px-3 border-2 border-secondary rounded-lg bg-gray-100 text-gray-500">
        Cargando {label.toLowerCase()}s...
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="w-full py-2 px-3 border-2 border-red-400 rounded-lg bg-red-50 text-red-600">
        Error al cargar {label.toLowerCase()}s: {fetchError}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      <div className="relative w-full">
        <select
          name={level}
          value={selectedValue?.slug || selectedValue || ""}
          onChange={handleSelectChange}
          className={`appearance-none w-full p-2 drop-shadow-sm rounded-sm px-3 pr-10 bg-third ${
            error ? "border border-red-400" : ""
          }`}
        >
          <option value="" disabled>
            Seleccione {label.toLowerCase()}
          </option>
          {locations?.map((loc) => (
            <option key={loc.id} value={loc.slug}>
              {loc.name}
            </option>
          ))}
          <option value="other">Otro...</option>
        </select>

        <ChevronDown
          className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
          size={18}
        />
      </div>

      {selectedValue === "other" && (
        <input
          type="text"
          className={`w-full mt-2 p-2 drop-shadow-sm rounded-sm px-3 bg-third ${
            error ? "border border-red-400" : ""
          }`}
          placeholder={`Ingrese ${label.toLowerCase()}`}
          value={customValue}
          onChange={handleCustomChange}
        />
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default LocationSelector;
