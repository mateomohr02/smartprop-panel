"use client";

import { ChevronDown } from "lucide-react";

const OperationTypeSelector = ({ property, setProperty }) => {
    
  const availableOperations = [
    { display: "Venta", slug: "sale" },
    { display: "Alquiler", slug: "rent" },
    { display: "Alquiler Temporal", slug: "short-tern" },
  ];

  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor="operation">Operación:</label>

      <div className="relative w-full">
        <select
          name="propertyType"
          defaultValue={
            property.operation.display === null
              ? "Seleccione la Operación"
              : property.operation.display
          }
          className="appearance-none w-full p-2 rounded-sm px-3 pr-10 bg-third drop-shadow-sm"
          onChange={(e) =>
            setProperty({ ...property, operation: e.target.value })
          }
        >
          <option value="Seleccione la Operación" disabled>
            Seleccione la Operación
          </option>
          {availableOperations.map((o) => {
            return (
              <option key={o.slug} value={o.slug}>
                {o.display}
              </option>
            );
          })}
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
