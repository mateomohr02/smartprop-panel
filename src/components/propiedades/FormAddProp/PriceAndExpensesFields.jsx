"use client";

import { ChevronDown } from "lucide-react";
import { validateAddPropertyForm } from "@/utils/validateAddPropertyForm";

const PriceAndExpensesFields = ({
  property,
  setProperty,
  errors,
  setErrors,
  hasTriedSubmit,
}) => {
  const availableFIAT = ["USD", "ARS"];

  const handleChange = (field, value) => {
    const updated = { ...property, [field]: value };
    setProperty(updated);

    if (hasTriedSubmit) {
      const validationErrors = validateAddPropertyForm(updated);
      setErrors(validationErrors);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {/* PRECIO */}
      <div className="flex gap-2">
        <div className="w-2/3 flex flex-col gap-1">
          <div className="flex justify-between items-baseline">
            <label htmlFor="price">Precio</label>
            <label htmlFor="priceError" className="text-red-500 text-sm">
              {errors.price && errors.price}
            </label>
          </div>
          <input
            type="number"
            placeholder="Ingrese el Valor"
            className="p-2 rounded-sm w-full shadow-sm bg-third"
            value={property.price}
            onChange={(e) => handleChange("price", e.target.value)}
          />
        </div>

        <div className="w-1/3 flex flex-col gap-1">
          <div className="flex justify-between items-baseline">
            <label htmlFor="priceFIAT">Divisa</label>
            <label htmlFor="priceFIATError" className="text-red-500 text-sm">
              {errors.priceFIAT && errors.priceFIAT}
            </label>
          </div>
          <div className="relative w-full">
            <select
              id="priceFIAT"
              name="priceFIAT"
              value={property.priceFIAT || ""}
              className="appearance-none w-full p-2 rounded-sm px-3 pr-10 bg-third drop-shadow-sm"
              onChange={(e) => handleChange("priceFIAT", e.target.value)}
            >
              <option value="" disabled>
                Seleccione la Divisa
              </option>
              {availableFIAT.map((f) => (
                <option key={`${f}-FIAT`} value={f}>
                  {f}
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

      {/* EXPENSAS */}
      <div className="flex gap-2">
        <div className="w-2/3 flex flex-col gap-1">
          <div className="flex justify-between items-baseline">
            <label htmlFor="expenses">Expensas</label>
            <label htmlFor="expensesError" className="text-red-500 text-sm">
              {errors.expenses && errors.expenses}
            </label>
          </div>
          <input
            type="number"
            placeholder="Ingrese el Valor"
            className="p-2 rounded-sm w-full shadow-sm bg-third"
            value={property.expenses}
            onChange={(e) => handleChange("expenses", e.target.value)}
          />
        </div>

        <div className="w-1/3 flex flex-col gap-1">
          <div className="flex justify-between items-baseline">
            <label htmlFor="expensesFIAT">Divisa</label>
            <label htmlFor="expensesFIATError" className="text-red-500 text-sm">
              {errors.expensesFIAT && errors.expensesFIAT}
            </label>
          </div>

          <div className="relative w-full">
            <select
              id="expensesFIAT"
              name="expensesFIAT"
              value={property.expensesFIAT || ""}
              className="appearance-none w-full p-2 rounded-sm px-3 pr-10 bg-third drop-shadow-sm"
              onChange={(e) => handleChange("expensesFIAT", e.target.value)}
            >
              <option value="" disabled>
                Seleccione la Divisa
              </option>
              {availableFIAT.map((f) => (
                <option key={`${f}-FIAT-expenses`} value={f}>
                  {f}
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
    </div>
  );
};

export default PriceAndExpensesFields;
