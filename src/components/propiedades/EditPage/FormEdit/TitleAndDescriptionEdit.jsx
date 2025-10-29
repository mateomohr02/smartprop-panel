"use client";

import { validateAddPropertyForm } from "@/utils/validateAddPropertyForm";
import React from "react";

const TitleAndDescriptionEdit = ({
  property,
  setProperty,
  errors,
  setErrors,
  hasTriedSubmit
}) => {
  return (
    <div className="w-full gap-2 flex flex-col">
      <div className="flex flex-col w-full gap-1">
        <div className="flex justify-between items-baseline">
          <label htmlFor="title">Título</label>
          <label htmlFor="titleError" className="text-red-500 text-sm ">
            {errors.title && errors.title}
          </label>
        </div>
        <input
          type="text"
          name="title"
          placeholder="Ingrese el título de la propiedad"
          id="title"
          className="bg-third rounded-sm p-2 drop-shadow-sm"
          value={property.title}
          onChange={(e) => {
            const newValue = e.target.value;
            const updated = { ...property, title: newValue };
            setProperty(updated);

            if (hasTriedSubmit) {
              const validationErrors = validateAddPropertyForm(updated);
              console.log(errors, validationErrors);
              setErrors(validationErrors);
            }
          }}
        />
      </div>

      <div className="flex flex-col w-full gap-1">
        <div className="flex justify-between items-baseline">
          <label htmlFor="description">Descripción</label>
          <label htmlFor="descriptionError" className="text-red-500 text-sm ">
            {errors.description && errors.description}
          </label>
        </div>
        <textarea
          name="description"
          placeholder="Ingrese la descripción."
          id="description"
          className="bg-third rounded-sm p-2 drop-shadow-sm max-h-[200px]"
          value={property.description}
          onChange={(e) => {
            const newValue = e.target.value;
            const updated = { ...property, description: newValue };
            setProperty(updated);

            if (hasTriedSubmit) {
              const validationErrors = validateAddPropertyForm(updated);
              setErrors(validationErrors);
            }
          }}
        />
      </div>
    </div>
  );
};

export default TitleAndDescriptionEdit;
