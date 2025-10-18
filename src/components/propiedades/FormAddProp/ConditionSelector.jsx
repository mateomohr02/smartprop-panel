"use client"

import { ChevronDown } from "lucide-react";

const ConditionSelector = ({ property, setProperty }) => {
  const availableConditions = [
    { display: "A estrenar", slug: "new" },
    { display: "Como Nuevo", slug: "like-new" },
    { display: "Bueno", slug: "good" },
    { display: "A Renovar", slug: "to-renovate" },
  ];

  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor="condition">Condición</label>

      <div className="relative w-full">
        <select
          id="condition"
          name="condition"
          value={property.condition?.slug || ""}
          onChange={(e) => {
            const selected = availableConditions.find(
              (c) => c.slug === e.target.value
            );
            setProperty({
              ...property,
              condition: selected || { display: "", slug: "" },
            });
          }}
          className="appearance-none w-full p-2 rounded-sm px-3 pr-10 bg-third drop-shadow-sm"
        >
          <option value="" disabled>
            Seleccione la Condición
          </option>
          {availableConditions.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.display}
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

export default ConditionSelector;
