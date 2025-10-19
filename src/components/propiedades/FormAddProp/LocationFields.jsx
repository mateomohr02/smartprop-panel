"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useFetchLocations } from "@/hooks/useFetchLocations";

const LocationFields = ({ property, setProperty }) => {
  const [fatherLocation, setFatherLocation] = useState(null);
  const { locations, loading, error } = useFetchLocations(fatherLocation);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");

  const [customCountry, setCustomCountry] = useState("");
  const [customProvince, setCustomProvince] = useState("");
  const [customCity, setCustomCity] = useState("");
  const [customNeighborhood, setCustomNeighborhood] = useState("");

  // Guardar en el estado global de propiedad cada vez que cambia algo
  useEffect(() => {
    setProperty((prev) => ({
      ...prev,
      place: {
        countryInput:
          selectedCountry === "other" ? customCountry : selectedCountry,
        provinceInput:
          selectedProvince === "other" ? customProvince : selectedProvince,
        cityInput: selectedCity === "other" ? customCity : selectedCity,
        neighborhoodInput:
          selectedNeighborhood === "other"
            ? customNeighborhood
            : selectedNeighborhood,
      },
    }));
  }, [
    selectedCountry,
    selectedProvince,
    selectedCity,
    selectedNeighborhood,
    customCountry,
    customProvince,
    customCity,
    customNeighborhood,
    setProperty,
  ]);

  // Maneja el cambio en los selects
  const handleSelect = (type, value) => {
    switch (type) {
      case "country":
        setSelectedCountry(value);
        setSelectedProvince("");
        setSelectedCity("");
        setSelectedNeighborhood("");
        setFatherLocation(
          value && value !== "other"
            ? { id: value, type: "País" }
            : null
        );
        break;
      case "province":
        setSelectedProvince(value);
        setSelectedCity("");
        setSelectedNeighborhood("");
        setFatherLocation(
          value && value !== "other"
            ? { id: value, type: "Provincia" }
            : null
        );
        break;
      case "city":
        setSelectedCity(value);
        setSelectedNeighborhood("");
        setFatherLocation(
          value && value !== "other"
            ? { id: value, type: "Ciudad" }
            : null
        );
        break;
      case "neighborhood":
        setSelectedNeighborhood(value);
        break;
    }
  };

  // Mostrar estados
  if (loading) {
    return (
      <div className="w-full py-2 px-3 border-2 border-secondary rounded-lg bg-gray-100 text-gray-500">
        Cargando ubicaciones...
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

  // Determina qué lista de ubicaciones mostrar según el padre actual
  const getListForType = () => {
    if (!fatherLocation) return locations; // países
    switch (fatherLocation.type) {
      case "País":
        return locations; // provincias
      case "Provincia":
        return locations; // ciudades
      case "Ciudad":
        return locations; // barrios
      default:
        return [];
    }
  };

  const list = getListForType();

  return (
    <div className="w-full flex flex-col gap-3">
      {/* País */}
      <div className="flex flex-col">
        <label>País</label>
        <div className="relative">
          <select
            value={selectedCountry}
            onChange={(e) => handleSelect("country", e.target.value)}
            className="appearance-none w-full p-2 drop-shadow-sm rounded-md pr-10 bg-blue-50"
          >
            <option value="">Seleccione un país</option>
            {list?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
            <option value="other">Otro...</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
        {selectedCountry === "other" && (
          <input
            type="text"
            placeholder="Ingrese un nuevo país"
            className="mt-1 p-2 rounded-md bg-blue-50"
            value={customCountry}
            onChange={(e) => setCustomCountry(e.target.value)}
          />
        )}
      </div>

      {/* Provincia */}
      {selectedCountry && selectedCountry !== "other" && (
        <div className="flex flex-col">
          <label>Provincia</label>
          <div className="relative">
            <select
              value={selectedProvince}
              onChange={(e) => handleSelect("province", e.target.value)}
              className="appearance-none w-full p-2 drop-shadow-sm rounded-md pr-10 bg-blue-50"
            >
              <option value="">Seleccione una provincia</option>
              {fatherLocation?.type === "País" &&
                locations?.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              <option value="other">Otro...</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          {selectedProvince === "other" && (
            <input
              type="text"
              placeholder="Ingrese una nueva provincia"
              className="mt-1 p-2 rounded-md bg-blue-50"
              value={customProvince}
              onChange={(e) => setCustomProvince(e.target.value)}
            />
          )}
        </div>
      )}

      {/* Ciudad */}
      {selectedProvince && selectedProvince !== "other" && (
        <div className="flex flex-col">
          <label>Ciudad</label>
          <div className="relative">
            <select
              value={selectedCity}
              onChange={(e) => handleSelect("city", e.target.value)}
              className="appearance-none w-full p-2 drop-shadow-sm rounded-md pr-10 bg-blue-50"
            >
              <option value="">Seleccione una ciudad</option>
              {fatherLocation?.type === "Provincia" &&
                locations?.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              <option value="other">Otro...</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          {selectedCity === "other" && (
            <input
              type="text"
              placeholder="Ingrese una nueva ciudad"
              className="mt-1 p-2 rounded-md bg-blue-50"
              value={customCity}
              onChange={(e) => setCustomCity(e.target.value)}
            />
          )}
        </div>
      )}

      {/* Barrio */}
      {selectedCity && selectedCity !== "other" && (
        <div className="flex flex-col">
          <label>Barrio</label>
          <div className="relative">
            <select
              value={selectedNeighborhood}
              onChange={(e) =>
                handleSelect("neighborhood", e.target.value)
              }
              className="appearance-none w-full p-2 drop-shadow-sm rounded-md pr-10 bg-blue-50"
            >
              <option value="">Seleccione un barrio</option>
              {fatherLocation?.type === "Ciudad" &&
                locations?.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.name}
                  </option>
                ))}
              <option value="other">Otro...</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          {selectedNeighborhood === "other" && (
            <input
              type="text"
              placeholder="Ingrese un nuevo barrio"
              className="mt-1 p-2 rounded-md bg-blue-50"
              value={customNeighborhood}
              onChange={(e) => setCustomNeighborhood(e.target.value)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default LocationFields;
