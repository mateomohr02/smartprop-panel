"use client"

import { validateAddPropertyForm } from "@/utils/validateAddPropertyForm";

const BathroomsAndGaragesFields = ({
  property,
  setProperty,
  errors,
  setErrors,
  hasTriedSubmit,
}) => {
  const handleBathroomsChange = (e) => {
    setProperty({
      ...property,
      bathrooms: e.target.value,
    });

    if (hasTriedSubmit) {
      const validationErrors = validateAddPropertyForm({
        ...property,
        bathrooms: e.target.value,
      });
      setErrors(validationErrors);
    }
  };

  const handleGaragesChange = (e) => {
    setProperty({
      ...property,
      garages: e.target.value,
    });

    if (hasTriedSubmit) {
      const validationErrors = validateAddPropertyForm({
        ...property,
        garages: e.target.value,
      });
      setErrors(validationErrors);
    }
  };

  return (
    <div className="flex gap-2 rounded-sm w-full">
      <div className="flex flex-col flex-1 gap-1">
        <div className="flex justify-between items-baseline">
          <label htmlFor="bathrooms">Baños</label>
          <label htmlFor="bathroomsError" className="text-red-500 text-sm">
            {errors.bathrooms && errors.bathrooms}
          </label>
        </div>
        <input
          type="number"
          className="p-2 bg-third rounded-sm drop-shadow-sm w-full text-center"
          value={property.bathrooms}
          onChange={handleBathroomsChange}
        />
      </div>
      <div className="flex flex-col flex-1 gap-1">
        <div className="flex justify-between items-baseline">
          <label htmlFor="garages">Garages</label>
          <label htmlFor="garagesError" className="text-red-500 text-sm">
            {errors.garages && errors.garages}
          </label>
        </div>
        <input
          type="number"
          className="p-2 bg-third rounded-sm drop-shadow-sm w-full text-center"
          value={property.garages}
          onChange={handleGaragesChange}
        />
      </div>
    </div>
  );
};

export default BathroomsAndGaragesFields;