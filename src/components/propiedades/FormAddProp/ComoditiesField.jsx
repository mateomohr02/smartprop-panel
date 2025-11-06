"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { normalizeText } from "@/helpers/normalizeText";
import { useFetchComodities } from "@/hooks/useFetchComodities";
import { validateAddPropertyForm } from "@/utils/validateAddPropertyForm";

const ComoditiesField = ({
  property,
  setProperty,
  errors,
  setErrors,
  hasTriedSubmit,
}) => {
  const { comodities, loading, error } = useFetchComodities();
  const [inputValue, setInputValue] = useState("");
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);

  const selectedComodities = property.comodities || [];

  // Filtrar sugerencias (comodidades existentes no deben repetirse)
  const filteredSuggestions =
    comodities?.filter(
      (c) =>
        normalizeText(c.name).includes(normalizeText(inputValue)) &&
        !selectedComodities.some(
          (sel) => sel.exists && sel.value === c.id
        )
    ) || [];

  const updateComodities = (newComodities) => {
    const updatedProperty = { ...property, comodities: newComodities };
    setProperty(updatedProperty);

    if (hasTriedSubmit) {
      const validationErrors = validateAddPropertyForm(updatedProperty);
      setErrors(validationErrors);
    }
  };

  const handleAddComodity = (comodityObj) => {
    updateComodities([...selectedComodities, comodityObj]);
    setInputValue("");
    setSuggestionsVisible(false);
  };

  const handleRemoveComodity = (index) => {
    const newComodities = selectedComodities.filter((_, i) => i !== index);
    updateComodities(newComodities);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();

      // Verificar si la comodidad existe
      const existing = comodities.find(
        (c) => normalizeText(c.name) === normalizeText(inputValue)
      );

      const newComodity = existing
        ? { exists: true, value: existing.id }
        : { exists: false, value: inputValue.trim() };

      handleAddComodity(newComodity);
    }
  };

  // Mostrar nombre legible
  const getDisplayName = (c) => {
    if (c.exists) {
      const match = comodities.find((cm) => cm.id === c.value);
      return match ? match.name : `ID: ${c.value}`;
    }
    return c.value;
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <label>Comodidades</label>

      <div className="bg-third p-2 rounded-sm flex flex-wrap gap-2 items-center">
        {selectedComodities.map((c, i) => (
          <div
            key={`${c.exists}-${c.value}-${i}`}
            className="bg-contrast px-2 py-1 rounded-sm flex items-center gap-1"
          >
            <span className="text-sm">{getDisplayName(c)}</span>
            <X
              size={14}
              className="cursor-pointer hover:text-red-500"
              onClick={() => handleRemoveComodity(i)}
            />
          </div>
        ))}

        <input
          type="text"
          className="w-full bg-transparent outline-none px-1"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setSuggestionsVisible(true);
          }}
          onFocus={() => setSuggestionsVisible(true)}
          onKeyDown={handleKeyDown}
          placeholder="Agregar..."
        />
      </div>

      {errors.comodities && (
        <label htmlFor="comoditiesError" className="text-red-500 text-sm">
          {errors.comodities}
        </label>
      )}

      {suggestionsVisible &&
        inputValue.trim() !== "" &&
        filteredSuggestions.length > 0 && (
          <ul className="border border-gray-200 rounded-sm bg-contrast shadow-sm z-10">
            {filteredSuggestions.map((c) => (
              <li
                key={c.id}
                className="p-2 text-sm hover:bg-third cursor-pointer"
                onClick={() => handleAddComodity({ exists: true, value: c.id })}
              >
                {c.name}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
};

export default ComoditiesField;
