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

  const handleCountryChange = (val) => {
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

    if (hasTriedSubmit) {
      const validationErrors = validateAddPropertyForm({
        ...property,
        place: {
          countryInput: val?.slug || val?.name || val || "",
          provinceInput: "",
          cityInput: "",
          neighborhoodInput: "",
        },
      });
      setErrors(validationErrors);
    }
  };

  const handleProvinceChange = (val) => {
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

    if (hasTriedSubmit) {
      const validationErrors = validateAddPropertyForm({
        ...property,
        place: {
          ...property.place,
          provinceInput: val?.slug || val?.name || val || "",
          cityInput: "",
          neighborhoodInput: "",
        },
      });
      setErrors(validationErrors);
    }
  };

  const handleCityChange = (val) => {
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

    if (hasTriedSubmit) {
      const validationErrors = validateAddPropertyForm({
        ...property,
        place: {
          ...property.place,
          cityInput: val?.slug || val?.name || val || "",
          neighborhoodInput: "",
        },
      });
      setErrors(validationErrors);
    }
  };

  const handleNeighborhoodChange = (val) => {
    setProperty({
      ...property,
      place: {
        ...property.place,
        neighborhoodInput: val?.slug || val?.name || val || "",
      },
    });

    if (hasTriedSubmit) {
      const validationErrors = validateAddPropertyForm({
        ...property,
        place: {
          ...property.place,
          neighborhoodInput: val?.slug || val?.name || val || "",
        },
      });
      setErrors(validationErrors);
    }
  };

  return (
    <div className="w-full flex flex-col gap-1">
      <label>Ubicación</label>

      <div className="border border-gray-200 px-2 pb-2 py-1 flex flex-col gap-2 rounded-sm bg-contrast">
        {/* Country */}
        <LocationSelector
          label="País"
          level="country"
          data={countriesFetch}
          selected={country}
          onSelect={handleCountryChange}
          property={property}
          setProperty={setProperty}
          error={errors.place?.countryInput}
        />

        {/* Province */}
        {country && (
          <LocationSelector
            label="Provincia"
            level="province"
            data={provincesFetch}
            selected={province}
            onSelect={handleProvinceChange}
            property={property}
            setProperty={setProperty}
            error={errors.place?.provinceInput}
          />
        )}

        {/* City */}
        {province && (
          <LocationSelector
            label="Ciudad"
            level="city"
            data={citiesFetch}
            selected={city}
            onSelect={handleCityChange}
            property={property}
            setProperty={setProperty}
            error={errors.place?.cityInput}
          />
        )}

        {/* Neighborhood */}
        {city && (
          <LocationSelector
            label="Barrio"
            level="neighborhood"
            data={neighborhoodsFetch}
            selected={property.place?.neighborhoodInput || ""}
            onSelect={handleNeighborhoodChange}
            property={property}
            setProperty={setProperty}
            error={errors.place?.neighborhoodInput}
          />
        )}
      </div>
      {(errors["place.countryInput"] ||
        errors["place.provinceInput"] ||
        errors["place.cityInput"] ||
        errors["place.neighborhoodInput"]) && (
        <label htmlFor="locationError" className="text-red-500 text-sm">
          {errors["place.countryInput"] ||
            errors["place.provinceInput"] ||
            errors["place.cityInput"] ||
            errors["place.neighborhoodInput"]}
        </label>
      )}
    </div>
  );
};

export default LocationFields;
