"use client";
import { useState } from "react";
import LocationSelector from "./LocationSelector";
import { useFetchLocations } from "@/hooks/useFetchLocations";
import { validateAddPropertyForm } from "@/utils/validateAddPropertyForm";

const LocationFields = ({
  property,
  setProperty,
  errors,
  setErrors,
  hasTriedSubmit,
}) => {
  const [country, setCountry] = useState(null);
  const [province, setProvince] = useState(null);
  const [city, setCity] = useState(null);

  // Fetch dinámico según el nivel seleccionado
  const countriesFetch = useFetchLocations(null);
  const provincesFetch = useFetchLocations(country);
  const citiesFetch = useFetchLocations(province);
  const neighborhoodsFetch = useFetchLocations(city);

  const updateAndValidate = (updated) => {
    setProperty(updated);
    if (hasTriedSubmit) {
      setErrors(validateAddPropertyForm(updated));
    }
  };

  const handleCountryChange = (val) => {
    const withType = val ? { ...val, type: "country" } : null;
    setCountry(withType);
    setProvince(null);
    setCity(null);

    const updated = {
      ...property,
      location: {
        country: val
          ? { exists: !!val.id, value: val.id || val.name || val }
          : null,
        province: null,
        city: null,
        neighborhood: null,
      },
    };

    updateAndValidate(updated);
  };

  const handleProvinceChange = (val) => {
    const withType = val ? { ...val, type: "province" } : null;
    setProvince(withType);
    setCity(null);

    const updated = {
      ...property,
      location: {
        ...property.location,
        province: val
          ? { exists: !!val.id, value: val.id || val.name || val }
          : null,
        city: null,
        neighborhood: null,
      },
    };

    updateAndValidate(updated);
  };

  const handleCityChange = (val) => {
    const withType = val ? { ...val, type: "city" } : null;
    setCity(withType);

    const updated = {
      ...property,
      location: {
        ...property.location,
        city: val
          ? { exists: !!val.id, value: val.id || val.name || val }
          : null,
        neighborhood: null,
      },
    };

    updateAndValidate(updated);
  };

  const handleNeighborhoodChange = (val) => {
    const updated = {
      ...property,
      location: {
        ...property.location,
        neighborhood: val
          ? { exists: !!val.id, value: val.id || val.name || val }
          : null,
      },
    };

    updateAndValidate(updated);
  };

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="flex flex-row justify-between items-baseline">
      <label>Ubicación</label>
      {(errors?.location?.country ||
        errors?.location?.province ||
        errors?.location?.city ||
        errors?.location?.neighborhood) && (
        <label htmlFor="locationError" className="text-red-500 text-sm">
          {errors?.location?.country ||
            errors?.location?.province ||
            errors?.location?.city ||
            errors?.location?.neighborhood}
        </label>
      )}
      </div>

      <div className="border border-gray-200 px-2 pb-2 py-1 flex flex-col gap-2 rounded-sm bg-contrast">
        {/* País */}
        <LocationSelector
          label="País"
          level="country"
          data={countriesFetch}
          selected={country}
          onSelect={handleCountryChange}
          error={errors["location.country"]}
        />

        {/* Provincia */}
        {country && (
          <LocationSelector
            label="Provincia"
            level="province"
            data={provincesFetch}
            selected={province}
            onSelect={handleProvinceChange}
            error={errors["location.province"]}
          />
        )}

        {/* Ciudad */}
        {province && (
          <LocationSelector
            label="Ciudad"
            level="city"
            data={citiesFetch}
            selected={city}
            onSelect={handleCityChange}
            error={errors["location.city"]}
          />
        )}

        {/* Barrio */}
        {city && (
          <LocationSelector
            label="Barrio"
            level="neighborhood"
            data={neighborhoodsFetch}
            selected={property.location?.neighborhood || ""}
            onSelect={handleNeighborhoodChange}
            error={errors["location.neighborhood"]}
          />
        )}
      </div>

      
    </div>
  );
};

export default LocationFields;
