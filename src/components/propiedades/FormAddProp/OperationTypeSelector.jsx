"use client";

import { ChevronDown } from "lucide-react";
import { validateAddPropertyForm } from "@/utils/validateAddPropertyForm";

const OperationTypeSelector = ({
  property,
  setProperty,
  errors,
  setErrors,
  hasTriedSubmit,
}) => {
  const availableOperations = [
    { display: "Venta", slug: "sale" },
    { display: "Alquiler", slug: "rent" },
    { display: "Alquiler Temporal", slug: "short-term" },
  ];

  const handleChange = (e) => {
    const value = e.target.value;

    const updated = {
      ...property,
      data: {
        ...property.data,
        operation: value, // 👈 ahora dentro de data
      },
    };

    setProperty(updated);

    if (hasTriedSubmit) {
      const validationErrors = validateAddPropertyForm(updated);
      setErrors(validationErrors);
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex items-baseline justify-between">
        <label htmlFor="operation">Operación</label>
        <label htmlFor="operationError" className="text-red-500 text-sm">
          {errors?.data?.operation && errors.data.operation}
        </label>
      </div>

      <div className="relative w-full">
        <select
          name="operation"
          id="operation"
          value={property.data.operation || ""}
          className="appearance-none w-full p-2 rounded-sm px-3 pr-10 bg-third drop-shadow-sm"
          onChange={handleChange}
        >
          <option value="" disabled>
            Seleccione la Operación
          </option>
          {availableOperations.map((o) => (
            <option key={o.slug} value={o.slug}>
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
  );
};

export default OperationTypeSelector;
