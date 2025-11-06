"use client";

import { validateAddPropertyForm } from "@/utils/validateAddPropertyForm";

const BathroomsAndGaragesFields = ({
  property,
  setProperty,
  errors,
  setErrors,
  hasTriedSubmit,
}) => {
  const handleBathroomsChange = (e) => {
    const value = e.target.value;

    setProperty((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        bathrooms: value,
      },
    }));

    if (hasTriedSubmit) {
      const validationErrors = validateAddPropertyForm({
        ...property,
        data: {
          ...property.data,
          bathrooms: value,
        },
      });
      setErrors(validationErrors);
    }
  };

  const handleGaragesChange = (e) => {
    const value = e.target.value;

    setProperty((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        garages: value,
      },
    }));

    if (hasTriedSubmit) {
      const validationErrors = validateAddPropertyForm({
        ...property,
        data: {
          ...property.data,
          garages: value,
        },
      });
      setErrors(validationErrors);
    }
  };

  return (
    <div className="flex gap-2 rounded-sm w-full">
      {/* BAÑOS */}
      <div className="flex flex-col flex-1 gap-1">
        <div className="flex justify-between items-baseline">
          <label htmlFor="bathrooms">Baños</label>
          <label htmlFor="bathroomsError" className="text-red-500 text-sm">
            {errors?.data?.bathrooms && errors.data.bathrooms}
          </label>
        </div>
        <input
          type="number"
          className="p-2 bg-third rounded-sm drop-shadow-sm w-full text-center"
          value={property.data.bathrooms ?? ""}
          onChange={handleBathroomsChange}
        />
      </div>

      {/* GARAGES */}
      <div className="flex flex-col flex-1 gap-1">
        <div className="flex justify-between items-baseline">
          <label htmlFor="garages">Garages</label>
          <label htmlFor="garagesError" className="text-red-500 text-sm">
            {errors?.data?.garages && errors.data.garages}
          </label>
        </div>
        <input
          type="number"
          className="p-2 bg-third rounded-sm drop-shadow-sm w-full text-center"
          value={property.data.garages ?? ""}
          onChange={handleGaragesChange}
        />
      </div>
    </div>
  );
};

export default BathroomsAndGaragesFields;
