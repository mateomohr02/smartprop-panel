"use client";

import React from "react";
import { validateAddPropertyForm } from "@/utils/validateAddPropertyForm";

const SurfaceFields = ({ property, setProperty, errors, setErrors, hasTriedSubmit }) => {
  const handleChange = (field, value) => {
    const updated = {
      ...property,
      surface: {
        ...property.surface,
        [field]: value,
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
      <div className="w-full flex flex-row justify-between">
        <label htmlFor="surface">Superficie</label>
        <label className="text-gray-500">mts²</label>
      </div>

      <div className="border border-gray-200 px-2 pb-2 py-1 flex gap-2 rounded-sm">
        {/* Cubierta */}
        <div className="flex flex-col flex-1 gap-1">
          <div className="flex justify-between items-baseline">
            <label htmlFor="covered">Cubierta</label>
            <label htmlFor="surface.coveredError" className="text-red-500 text-sm">
              {errors["surface.covered"] && errors["surface.covered"]}
            </label>
          </div>
          <input
            type="text"
            id="covered"
            className="p-2 bg-third rounded-sm drop-shadow-sm w-full"
            value={property.surface.covered || ""}
            onChange={(e) => handleChange("covered", e.target.value)}
          />
        </div>

        {/* Total */}
        <div className="flex flex-col flex-1 gap-1">
          <div className="flex justify-between items-baseline">
            <label htmlFor="total">Total</label>
            <label htmlFor="surface.totalError" className="text-red-500 text-sm">
              {errors["surface.total"] && errors["surface.total"]}
            </label>
          </div>
          <input
            type="text"
            id="total"
            className="p-2 bg-third rounded-sm drop-shadow-sm w-full"
            value={property.surface.total || ""}
            onChange={(e) => handleChange("total", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SurfaceFields;
