"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { validateAddPropertyForm } from "@/utils/validateAddPropertyForm";

const AgeAndAvailability = ({ property, setProperty, errors, setErrors, hasTriedSubmit }) => {
  const availableOptions = [
    { display: "Inmediata", value: "inmediate" },
    { display: "A partir de:", value: "date" },
  ];

  // --- Cambiar antigüedad ---
  const handleAgeChange = (e) => {
    const newAge = e.target.value;
    const updated = {
      ...property,
      data: {
        ...property.data,
        age: newAge,
      },
    };
    setProperty(updated);

    if (hasTriedSubmit) {
      const validationErrors = validateAddPropertyForm(updated);
      setErrors(validationErrors);
    }
  };

  // --- Cambiar tipo de disponibilidad ---
  const handleAvailabilityChange = (e) => {
    const newType = e.target.value;
    const updated = {
      ...property,
      data: {
        ...property.data,
        availability: {
          type: newType,
          date: newType === "date" ? property.data.availability.date || "" : null,
        },
      },
    };
    setProperty(updated);

    if (hasTriedSubmit) {
      const validationErrors = validateAddPropertyForm(updated);
      setErrors(validationErrors);
    }
  };

  // --- Cambiar fecha de disponibilidad ---
  const handleAvailabilityDateChange = (e) => {
    const newDate = e.target.value;
    const updated = {
      ...property,
      data: {
        ...property.data,
        availability: {
          ...property.data.availability,
          date: newDate,
        },
      },
    };
    setProperty(updated);

    if (hasTriedSubmit) {
      const validationErrors = validateAddPropertyForm(updated);
      setErrors(validationErrors);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        {/* Antigüedad */}
        <div className="w-1/2 flex flex-col gap-1">
          <div className="flex justify-between items-baseline">
            <label htmlFor="age">Antigüedad</label>
            <span className="text-red-500 text-sm">
              {errors?.data?.age && errors?.data?.age}
            </span>
          </div>
          <input
            id="age"
            type="number"
            placeholder="Ingrese los años"
            className="p-2 rounded-sm w-full shadow-sm bg-third"
            value={property.data.age || ""}
            onChange={handleAgeChange}
          />
        </div>

        {/* Disponibilidad */}
        <div className="w-1/2 flex flex-col gap-1">
          <div className="flex justify-between items-baseline">
            <label htmlFor="availability">Disponibilidad</label>
            <span className="text-red-500 text-sm">
             {errors?.data?.availability && errors?.data?.availability}
            </span>
          </div>

          <div className="relative w-full">
            <select
              id="availability"
              name="availability"
              value={property.data.availability.type}
              className="appearance-none w-full p-2 rounded-sm px-3 pr-10 bg-third drop-shadow-sm"
              onChange={handleAvailabilityChange}
            >
              <option value="" disabled>
                Seleccione la Disponibilidad
              </option>
              {availableOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.display}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
              size={18}
            />
          </div>
        </div>
      </div>

      {/* Fecha de disponibilidad */}
      {property.data.availability.type === "date" && (
        <div className="w-full flex flex-col gap-1 mt-2">
          <div className="flex justify-between items-baseline">
            <label htmlFor="availabilityDate">Fecha de Disponibilidad</label>
            <span className="text-red-500 text-sm">
              {errors.data.availabilityDate && errors.data.availabilityDate}
            </span>
          </div>
          <input
            id="availabilityDate"
            type="date"
            className="p-2 rounded-sm w-full shadow-sm bg-third"
            value={property.data.availability.date || ""}
            onChange={handleAvailabilityDateChange}
          />
        </div>
      )}
    </div>
  );
};

export default AgeAndAvailability;
