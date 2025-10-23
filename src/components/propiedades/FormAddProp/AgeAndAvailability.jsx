import { ChevronDown } from "lucide-react";
import { validateAddPropertyForm } from "@/utils/validateAddPropertyForm";

const AgeAndAvailability = ({
  property,
  setProperty,
  errors,
  setErrors,
  hasTriedSubmit,
}) => {
  const availableOptions = [
    { display: "Inmediata", value: "inmediate" },
    { display: "A partir de:", value: "date" },
  ];

  const handleAvailabilityChange = (e) => {
    const value = e.target.value;
    setProperty({
      ...property,
      availabilityType: value,
      availabilityDate:
        value === "date" ? property.availabilityDate || "" : null,
    });

    if (hasTriedSubmit) {
      const validationErrors = validateAddPropertyForm({
        ...property,
        availabilityType: value,
        availabilityDate:
          value === "date" ? property.availabilityDate || "" : null,
      });
      setErrors(validationErrors);
    }
  };

  const handleAgeChange = (e) => {
    setProperty({ ...property, age: e.target.value });

    if (hasTriedSubmit) {
      const validationErrors = validateAddPropertyForm({
        ...property,
        age: e.target.value,
      });
      setErrors(validationErrors);
    }
  };

  const handleAvailabilityDateChange = (e) => {
    setProperty({ ...property, availabilityDate: e.target.value });

    if (hasTriedSubmit) {
      const validationErrors = validateAddPropertyForm({
        ...property,
        availabilityDate: e.target.value,
      });
      setErrors(validationErrors);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex flex-row gap-2 ">
        {/* Antigüedad */}
        <div className="w-1/2 flex flex-col gap-1">
          <div className="flex justify-between items-baseline">
            <label htmlFor="age">Antigüedad</label>
            <label htmlFor="ageError" className="text-red-500 text-sm">
              {errors.age && errors.age}
            </label>
          </div>
          <input
            type="number"
            placeholder="Ingrese los años"
            className="p-2 rounded-sm w-full shadow-sm bg-third"
            value={property.age || ""}
            onChange={handleAgeChange}
          />
        </div>

        {/* Disponibilidad */}
        <div className="w-1/2 flex flex-col gap-1">
          <div className="flex justify-between items-baseline">
            <label htmlFor="availabilityType">Disponibilidad</label>
            <label htmlFor="availabilityTypeError" className="text-red-500 text-sm">
              {errors.availabilityType && errors.availabilityType}
            </label>
          </div>

          <div className="relative w-full">
            <select
              name="availabilityType"
              value={property.availabilityType || ""}
              className="appearance-none w-full p-2 rounded-sm px-3 pr-10 bg-third drop-shadow-sm"
              onChange={handleAvailabilityChange}
            >
              <option value="" disabled>
                Seleccione la Disponibilidad
              </option>
              {availableOptions.map((o) => (
                <option key={`${o.value}-Option`} value={o.value}>
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
      <div className="w-full">
        {/* Mostrar selector de fecha solo si availabilityType es "date" */}
        {property.availabilityType === "date" && (
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-baseline">
              <label htmlFor="availabilityDate">Fecha de Disponibilidad</label>
              <label htmlFor="availabilityDateError" className="text-red-500 text-sm">
                {errors.availabilityDate && errors.availabilityDate}
              </label>
            </div>
            <input
              type="date"
              className="p-2 rounded-sm w-full shadow-sm bg-third mt-2"
              value={property.availabilityDate || ""}
              onChange={handleAvailabilityDateChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AgeAndAvailability;