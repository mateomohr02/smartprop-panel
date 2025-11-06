"use client";

import { validateAddPropertyForm } from "@/utils/validateAddPropertyForm";

const RoomsAndBedroomsFields = ({
  property,
  setProperty,
  errors,
  setErrors,
  hasTriedSubmit,
}) => {
  const handleRoomsChange = (e) => {
    const value = e.target.value;

    const updated = {
      ...property,
      data: {
        ...property.data,
        rooms: value,
      },
    };

    setProperty(updated);

    if (hasTriedSubmit) {
      const validationErrors = validateAddPropertyForm(updated);
      setErrors(validationErrors);
    }
  };

  const handleBedroomsChange = (e) => {
    const value = e.target.value;

    const updated = {
      ...property,
      data: {
        ...property.data,
        bedrooms: value,
      },
    };

    setProperty(updated);

    if (hasTriedSubmit) {
      const validationErrors = validateAddPropertyForm(updated);
      setErrors(validationErrors);
    }
  };

  return (
    <div className="flex gap-2 rounded-sm w-full">
      {/* Ambientes */}
      <div className="flex flex-col flex-1 gap-1">
        <div className="flex justify-between items-baseline">
          <label htmlFor="rooms">Ambientes</label>
          <label htmlFor="roomsError" className="text-red-500 text-sm">
            {errors?.data?.rooms && errors?.data?.rooms}
          </label>
        </div>
        <input
          type="number"
          id="rooms"
          className="p-2 bg-third rounded-sm drop-shadow-sm w-full text-center"
          value={property.data.rooms || ""}
          onChange={handleRoomsChange}
        />
      </div>

      {/* Dormitorios */}
      <div className="flex flex-col flex-1 gap-1">
        <div className="flex justify-between items-baseline">
          <label htmlFor="bedrooms">Dormitorios</label>
          <label htmlFor="bedroomsError" className="text-red-500 text-sm">
            {errors?.data?.bedrooms && errors?.data?.bedrooms}
          </label>
        </div>
        <input
          type="number"
          id="bedrooms"
          className="p-2 bg-third rounded-sm drop-shadow-sm w-full text-center"
          value={property.data.bedrooms || ""}
          onChange={handleBedroomsChange}
        />
      </div>
    </div>
  );
};

export default RoomsAndBedroomsFields;
