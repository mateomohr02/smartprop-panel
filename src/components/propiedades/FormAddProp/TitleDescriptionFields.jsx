"use client";

import { validateAddPropertyForm } from "@/utils/validateAddPropertyForm";
import React from "react";

const TitleDescriptionFields = ({
  property,
  setProperty,
  errors,
  setErrors,
  hasTriedSubmit,
}) => {
  const handleChange = (field, value) => {
    const updated = {
      ...property,
      initialData: {
        ...property.initialData,
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
    <div className="w-full gap-2 flex flex-col">
      {/* --- Título --- */}
      <div className="flex flex-col w-full gap-1">
        <div className="flex justify-between items-baseline">
          <label htmlFor="title">Título</label>
          {errors?.initialData?.title && (
            <span className="text-red-500 text-sm">
              {errors.initialData.title}
            </span>
          )}
        </div>
        <input
          type="text"
          id="title"
          placeholder="Ingrese el título de la propiedad"
          className="bg-third rounded-sm p-2 drop-shadow-sm"
          value={property.initialData.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      {/* --- Descripción --- */}
      <div className="flex flex-col w-full gap-1">
        <div className="flex justify-between items-baseline">
          <label htmlFor="description">Descripción</label>
          {errors?.initialData?.description && (
            <span className="text-red-500 text-sm">
              {errors.initialData.description}
            </span>
          )}
        </div>
        <textarea
          id="description"
          placeholder="Ingrese la descripción"
          className="bg-third rounded-sm p-2 drop-shadow-sm max-h-[200px]"
          value={property.initialData.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>
    </div>
  );
};

export default TitleDescriptionFields;
