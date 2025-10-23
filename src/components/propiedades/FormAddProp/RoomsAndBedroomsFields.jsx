"use client"

import { validateAddPropertyForm } from "@/utils/validateAddPropertyForm";

const RoomsAndBedroomsFields = ({
  property,
  setProperty,
  errors,
  setErrors,
  hasTriedSubmit,
}) => {
  const handleRoomsChange = (e) => {
    setProperty({
      ...property,
      rooms: e.target.value,
    });

    if (hasTriedSubmit) {
      const validationErrors = validateAddPropertyForm({
        ...property,
        rooms: e.target.value,
      });
      setErrors(validationErrors);
    }
  };

  const handleBedroomsChange = (e) => {
    setProperty({
      ...property,
      bedrooms: e.target.value,
    });

    if (hasTriedSubmit) {
      const validationErrors = validateAddPropertyForm({
        ...property,
        bedrooms: e.target.value,
      });
      setErrors(validationErrors);
    }
  };

  return (
    <div className="flex gap-2 rounded-sm w-full">
      <div className="flex flex-col flex-1 gap-1">
        <div className="flex justify-between items-baseline">
          <label htmlFor="rooms">Ambientes</label>
          <label htmlFor="roomsError" className="text-red-500 text-sm">
            {errors.rooms && errors.rooms}
          </label>
        </div>
        <input
          type="number"
          className="p-2 bg-third rounded-sm drop-shadow-sm w-full text-center"
          value={property.rooms}
          onChange={handleRoomsChange}
        />
      </div>
      <div className="flex flex-col flex-1 gap-1">
        <div className="flex justify-between items-baseline">
          <label htmlFor="bedrooms">Dormitorios</label>
          <label htmlFor="bedroomsError" className="text-red-500 text-sm">
            {errors.bedrooms && errors.bedrooms}
          </label>
        </div>
        <input
          type="number"
          className="p-2 bg-third rounded-sm drop-shadow-sm w-full text-center"
          value={property.bedrooms}
          onChange={handleBedroomsChange}
        />
      </div>
    </div>
  );
};

export default RoomsAndBedroomsFields;