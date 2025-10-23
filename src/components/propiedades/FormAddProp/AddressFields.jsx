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

    if (hasTriedSubmit) {
      const validationErrors = validateAddPropertyForm({
        ...property,
        address: formattedAddress,
      });
      setErrors(validationErrors);
    }
  }, [street, number]);

  const handleStreetChange = (e) => {
    setStreet(e.target.value);

    if (hasTriedSubmit) {
      const formattedAddress =
        e.target.value.trim() && (number.trim() || "S/N")
          ? `${e.target.value.trim()} ${number.trim() || "S/N"}`
          : "";
      const validationErrors = validateAddPropertyForm({
        ...property,
        address: formattedAddress,
      });
      setErrors(validationErrors);
    }
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);

    if (hasTriedSubmit) {
      const formattedAddress =
        street.trim() && (e.target.value.trim() || "S/N")
          ? `${street.trim()} ${e.target.value.trim() || "S/N"}`
          : "";
      const validationErrors = validateAddPropertyForm({
        ...property,
        address: formattedAddress,
      });
      setErrors(validationErrors);
    }
  };

  const isDefault = number.trim() === "";

  return (
    <div className="flex gap-2 rounded-sm w-full">
      <div className="flex flex-col w-2/3 gap-1">
        <div className="flex justify-between items-baseline">
          <label htmlFor="street">Calle</label>
          <label htmlFor="streetError" className="text-red-500 text-sm">
            {errors.address && errors.address}
          </label>
        </div>
        <input
          type="text"
          placeholder="Nombre de la Calle"
          className="p-2 bg-third rounded-sm drop-shadow-sm w-full"
          value={street}
          onChange={handleStreetChange}
          autoComplete="new-street"
        />
      </div>

      <div className="flex flex-col w-1/3 gap-1">
        <label htmlFor="number">Altura</label>
        <input
          type="text"
          name="number"
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