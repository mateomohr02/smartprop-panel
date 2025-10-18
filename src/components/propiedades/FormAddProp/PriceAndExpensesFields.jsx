"use client"

import { ChevronDown } from "lucide-react";

const PriceAndExpensesFields = ({ property, setProperty }) => {
  const availableFIAT = ["USD", "ARS"];

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="w-2/3 flex flex-col gap-1">
          <label htmlFor="price">Precio</label>
          <input
            type="number"
            placeholder="Ingrese el Valor"
            className="p-2 rounded-sm w-full shadow-sm bg-third"
            onChange={(e) => setProperty({ ...property, price: e.target.value })}
          />
        </div>

        <div className="w-1/3 flex flex-col gap-1">
          <label htmlFor="priceFIAT">Divisa</label>

          <div className="relative w-full">
            <select
              name="propertyType"
              defaultValue={
                property.priceFIAT === null
                  ? "Seleccione la Divisa"
                  : property.priceFIAT
              }
              className="appearance-none w-full p-2 rounded-sm px-3 pr-10 bg-third drop-shadow-sm"
              onChange={(e) =>
                setProperty({ ...property, priceFIAT: e.target.value })
              }
            >
              <option value="Seleccione la Divisa" disabled>
                Seleccione la Divisa
              </option>
              {availableFIAT.map((f) => {
                return (
                  <option key={`${f}-FIAT`} value={f}>
                    {f}
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
      </div>

      {/* Expensas */}
      <div className="flex gap-2">
        <div className="w-2/3 flex flex-col gap-1">
          <label htmlFor="expenses">Expensas</label>
          <input
            type="number"
            placeholder="Ingrese el Valor"
            className="p-2 rounded-sm w-full shadow-sm bg-third"
            onChange={(e) => setProperty({ ...property, expenses: e.target.value })}
          />
        </div>

        <div className="w-1/3 flex flex-col gap-1">
          <label htmlFor="expensesFIAT">Divisa</label>

          <div className="relative w-full">
            <select
              name="propertyType"
              defaultValue={
                property.expensesFIAT === null
                  ? "Seleccione la Divisa"
                  : property.expensesFIAT
              }
              className="appearance-none w-full p-2 rounded-sm px-3 pr-10 bg-third drop-shadow-sm"
              onChange={(e) =>
                setProperty({ ...property, expensesFIAT: e.target.value })
              }
            >
              <option value="Seleccione la Divisa" disabled>
                Seleccione la Divisa
              </option>
              {availableFIAT.map((f) => {
                return (
                  <option key={`${f}-FIAT-expenses`} value={f}>
                    {f}
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
      </div>
    </div>
  );
};

export default PriceAndExpensesFields;
