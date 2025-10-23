"use client";

import React from "react";
import { validateAddPropertyForm } from "@/utils/validateAddPropertyForm";

const ServicesSelector = ({ property, setProperty, errors, setErrors, hasTriedSubmit }) => {
  const handleToggle = (serviceKey) => {
    const updated = {
      ...property,
      services: {
        ...property.services,
        [serviceKey]: !property.services[serviceKey],
      },
    };

    setProperty(updated);

    if (hasTriedSubmit) {
      const validationErrors = validateAddPropertyForm(updated);
      setErrors(validationErrors);
    }
  };

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="flex justify-between items-baseline">
        <label htmlFor="services">Servicios</label>
        {/* Muestra un error general si alguno falta */}
        {(errors["services.light"] || errors["services.water"] || errors["services.gas"]) && (
          <label htmlFor="servicesError" className="text-red-500 text-sm">
            Debe seleccionar los servicios
          </label>
        )}
      </div>

      <div className="flex flex-row justify-evenly gap-1">
        {/* Luz */}
        <div className="flex flex-row items-center gap-1">
          <input
            type="checkbox"
            id="light"
            checked={property.services.light}
            onChange={() => handleToggle("light")}
          />
          <label htmlFor="light" className="cursor-pointer">
            Luz
          </label>
          {errors["services.light"] && (
            <span className="text-red-500 text-xs">{errors["services.light"]}</span>
          )}
        </div>

        {/* Agua */}
        <div className="flex flex-row items-center gap-1">
          <input
            type="checkbox"
            id="water"
            checked={property.services.water}
            onChange={() => handleToggle("water")}
          />
          <label htmlFor="water" className="cursor-pointer">
            Agua Corriente
          </label>
          {errors["services.water"] && (
            <span className="text-red-500 text-xs">{errors["services.water"]}</span>
          )}
        </div>

        {/* Gas */}
        <div className="flex flex-row items-center gap-1">
          <input
            type="checkbox"
            id="gas"
            checked={property.services.gas}
            onChange={() => handleToggle("gas")}
          />
          <label htmlFor="gas" className="cursor-pointer">
            Gas Natural
          </label>
          {errors["services.gas"] && (
            <span className="text-red-500 text-xs">{errors["services.gas"]}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesSelector;
