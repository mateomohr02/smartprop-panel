"use client";

import { ChevronDown } from "lucide-react";
import { validateAddPropertyForm } from "@/utils/validateAddPropertyForm";

const ConditionSelector = ({
  property,
  setProperty,
  errors,
  setErrors,
  hasTriedSubmit,
}) => {
  const availableConditions = [
    { display: "A estrenar", slug: "new" },
    { display: "Como Nuevo", slug: "like-new" },
    { display: "Bueno", slug: "good" },
    { display: "A Renovar", slug: "to-renovate" },
  ];

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex justify-between items-baseline">
        <label htmlFor="condition">Condición</label>
        <label htmlFor="errorCondition" className="text-red-500 text-sm">
          {errors.condition && errors.condition}
        </label>
      </div>
      <div className="relative w-full">
        <select
          id="condition"
          name="condition"
          value={property.condition || ""}
          onChange={(e) => {
            const selected = availableConditions.find(
              (c) => c.slug === e.target.value
            );
            setProperty({
              ...property,
              condition: selected.slug,
            });

            if (hasTriedSubmit) {
              const validationErrors = validateAddPropertyForm({
                ...property,
                condition: selected.slug,
              });
              setErrors(validationErrors);
            }
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
