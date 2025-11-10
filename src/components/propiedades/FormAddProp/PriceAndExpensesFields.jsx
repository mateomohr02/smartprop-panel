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
    const updated = {
      ...property,
      data: {
        ...property.data,
        ...field, // merge del objeto con el cambio correspondiente
      },
    };

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
              {errors?.data?.price && errors.data.price}
            </label>
          </div>
          <input
            type="number"
            placeholder="Ingrese el Valor"
            className="p-2 rounded-sm w-full shadow-sm bg-third"
            value={property.data.price.value || ""}
            onChange={(e) =>
              handleChange({
                price: { ...property.data.price, value: e.target.value },
              })
            }
          />
        </div>

        <div className="w-1/3 flex flex-col gap-1">
          <div className="flex justify-between items-baseline">
            <label htmlFor="priceFIAT">Divisa</label>
            <label htmlFor="priceFIATError" className="text-red-500 text-sm">
              {errors?.data?.priceCurrency && errors?.data?.priceCurrency}
            </label>
          </div>
          <div className="relative w-full">
            <select
              id="priceFIAT"
              name="priceFIAT"
              value={property.data.price.currency || ""}
              className="appearance-none w-full p-2 rounded-sm px-3 pr-10 bg-third drop-shadow-sm"
              onChange={(e) =>
                handleChange({
                  price: { ...property.data.price, currency: e.target.value },
                })
              }
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
              {errors?.data?.expenses && errors.data.expenses}
            </label>
          </div>
          <input
            type="number"
            placeholder="Ingrese el Valor"
            className="p-2 rounded-sm w-full shadow-sm bg-third"
            value={property.data.expenses.value || ""}
            onChange={(e) =>
              handleChange({
                expenses: { ...property.data.expenses, value: e.target.value },
              })
            }
          />
        </div>

        <div className="w-1/3 flex flex-col gap-1">
          <div className="flex justify-between items-baseline">
            <label htmlFor="expensesFIAT">Divisa</label>
            <label htmlFor="expensesFIATError" className="text-red-500 text-sm">
              {errors?.data?.expensesCurrency && errors.data.expensesCurrency}
            </label>
          </div>

          <div className="relative w-full">
            <select
              id="expensesFIAT"
              name="expensesFIAT"
              value={property.data.expenses.currency || ""}
              className="appearance-none w-full p-2 rounded-sm px-3 pr-10 bg-third drop-shadow-sm"
              onChange={(e) =>
              handleChange({
                expenses: { ...property.data.expenses, currency: e.target.value },
              })
            }
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
