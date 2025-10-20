"use client";
import { useState } from "react";
import LocationSelector from "./LocationSelector";
import { useFetchLocations } from "@/hooks/useFetchLocations";

const LocationFields = ({ property, setProperty }) => {
  const [country, setCountry] = useState(null);
  const [province, setProvince] = useState(null);
  const [city, setCity] = useState(null);

  // Fetch dinámico según el nivel seleccionado
  const countriesFetch = useFetchLocations(null);
  const provincesFetch = useFetchLocations(country);
  const citiesFetch = useFetchLocations(province);
  const neighborhoodsFetch = useFetchLocations(city);

  return (
    <div className="w-full flex flex-col gap-1">
      <label className="font-medium">Ubicación</label>

      <div className="border border-gray-200 px-2 pb-2 py-1 flex flex-col gap-3 rounded-sm bg-third/40">
        {/* Country */}
        <LocationSelector
          label="País"
          level="country"
          data={countriesFetch}
          selected={country}
          onSelect={(val) => {
            const withType = val ? { ...val, type: "country" } : null;
            setCountry(withType);
            setProvince(null);
            setCity(null);
            setProperty({
              ...property,
              place: {
                countryInput: val?.slug || val?.name || val || "",
                provinceInput: "",
                cityInput: "",
                neighborhoodInput: "",
              },
            });
          }}
          property={property}
          setProperty={setProperty}
        />

        {/* Province */}
        {country && (
          <LocationSelector
            label="Provincia"
            level="province"
            data={provincesFetch}
            selected={province}
            onSelect={(val) => {
              const withType = val ? { ...val, type: "province" } : null;
              setProvince(withType);
              setCity(null);
              setProperty({
                ...property,
                place: {
                  ...property.place,
                  provinceInput: val?.slug || val?.name || val || "",
                  cityInput: "",
                  neighborhoodInput: "",
                },
              });
            }}
            property={property}
            setProperty={setProperty}
          />
        )}

        {/* City */}
        {province && (
          <LocationSelector
            label="Ciudad"
            level="city"
            data={citiesFetch}
            selected={city}
            onSelect={(val) => {
              const withType = val ? { ...val, type: "city" } : null;
              setCity(withType);
              setProperty({
                ...property,
                place: {
                  ...property.place,
                  cityInput: val?.slug || val?.name || val || "",
                  neighborhoodInput: "",
                },
              });
            }}
            property={property}
            setProperty={setProperty}
          />
        )}

        {/* Neighborhood */}
        {city && (
          <LocationSelector
            label="Barrio"
            level="neighborhood"
            data={neighborhoodsFetch}
            selected={property.place?.neighborhoodInput || ""}
            onSelect={(val) => {
              setProperty({
                ...property,
                place: {
                  ...property.place,
                  neighborhoodInput: val?.slug || val?.name || val || "",
                },
              });
            }}
            property={property}
            setProperty={setProperty}
          />
        )}
      </div>
    </div>
  );
};

export default LocationFields;
