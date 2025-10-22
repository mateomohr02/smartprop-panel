"use client";

import { useState, useEffect } from "react";

const AddressFields = ({ property, setProperty }) => {
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");

  // Si property.address ya tiene valor (por ejemplo al editar)
  useEffect(() => {
    if (property.address && (!street && !number)) {
      const parts = property.address.trim().split(" ");
      const possibleNumber = parts.pop();
      const possibleStreet = parts.join(" ");

      setStreet(possibleStreet);
      if (possibleNumber && possibleNumber !== "S/N") {
        setNumber(possibleNumber);
      }
    }
  }, [property.address]);

  // Actualizar property.address cada vez que cambian calle o altura
  useEffect(() => {
    const formattedAddress =
      street.trim() && (number.trim() || "S/N")
        ? `${street.trim()} ${number.trim() || "S/N"}`
        : "";

    // Evitar actualizar si el valor no cambió
    if (formattedAddress !== property.address) {
      setProperty((prev) => ({ ...prev, address: formattedAddress }));
    }
  }, [street, number]);

  const isDefault = number.trim() === "";

  return (
    <div className="flex gap-2 rounded-sm w-full">
      <div className="flex flex-col w-2/3 gap-1">
        <label htmlFor="street">Calle</label>
        <input
          type="text"
          placeholder="Nombre de la Calle"
          className="p-2 bg-third rounded-sm drop-shadow-sm w-full"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          onInput={(e) => setStreet(e.target.value)}
          autoComplete="new-street"
        />
      </div>

      <div className="flex flex-col w-1/3 gap-1">
        <label htmlFor="number">Altura</label>
        <input
          type="number"
          name="number"
          id="number"
          className="p-2 bg-third rounded-sm drop-shadow-sm w-full text-center"
          placeholder={isDefault ? "S/N" : ""}
          value={isDefault ? "" : number}
          onChange={(e) => setNumber(e.target.value)}
          onInput={(e) => setNumber(e.target.value)}
          autoComplete="new-number"
        />
      </div>
    </div>
  );
};

export default AddressFields;
