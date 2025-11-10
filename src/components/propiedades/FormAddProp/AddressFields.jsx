"use client";

import { useState, useEffect } from "react";
import { validateAddPropertyForm } from "@/utils/validateAddPropertyForm";

const AddressFields = ({
  property,
  setProperty,
  errors,
  setErrors,
  hasTriedSubmit,
}) => {
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");

  // Inicializar si ya hay dirección (modo edición)
  useEffect(() => {
    const existingAddress = property?.location?.address;
    if (existingAddress && !street && !number) {
      const parts = existingAddress.trim().split(" ");
      const possibleNumber = parts.pop();
      const possibleStreet = parts.join(" ");
      setStreet(possibleStreet || "");
      if (possibleNumber && possibleNumber !== "S/N") {
        setNumber(possibleNumber);
      }
    }
  }, [property?.location?.address]);

  // 🧠 Helper para construir y actualizar dirección
  const updateAddress = (newStreet = street, newNumber = number) => {
    const formattedAddress =
      newStreet.trim() && (newNumber.trim() || "S/N")
        ? `${newStreet.trim()} ${newNumber.trim() || "S/N"}`
        : "";

    setProperty((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        address: formattedAddress || null, // ✅ aseguro que se guarde en location
      },      
    } 
  ));

    if (hasTriedSubmit) {
      const validationErrors = validateAddPropertyForm({
        ...property,
        location: {
          ...property.location,
          address: formattedAddress || null,
        },
      });
      setErrors(validationErrors);
    }
  };

  const handleStreetChange = (e) => {
    const newStreet = e.target.value;
    setStreet(newStreet);
    updateAddress(newStreet, number);
  };

  const handleNumberChange = (e) => {
    const newNumber = e.target.value;
    setNumber(newNumber);
    updateAddress(street, newNumber);
  };

  const isDefault = number.trim() === "";

  return (
    <div className="flex gap-2 rounded-sm w-full">
      {/* Calle */}
      <div className="flex flex-col w-2/3 gap-1">
        <div className="flex justify-between items-baseline">
          <label htmlFor="street">Calle</label>
          <label htmlFor="streetError" className="text-red-500 text-sm">
            {errors?.location?.address && errors.location.address}
          </label>
        </div>
        <input
          type="text"
          id="street"
          placeholder="Nombre de la calle"
          className="p-2 bg-third rounded-sm drop-shadow-sm w-full"
          value={street}
          onChange={handleStreetChange}
          autoComplete="new-street"
        />
      </div>

      {/* Altura */}
      <div className="flex flex-col w-1/3 gap-1">
        <label htmlFor="number">Altura</label>
        <input
          type="text"
          id="number"
          className="p-2 bg-third rounded-sm drop-shadow-sm w-full text-center"
          placeholder={isDefault ? "S/N" : ""}
          value={isDefault ? "" : number}
          onChange={handleNumberChange}
          autoComplete="new-number"
        />
      </div>
    </div>
  );
};

export default AddressFields;
