"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { normalizeText } from "@/helpers/normalizeText";
import { useFetchCharacteristics } from "@/hooks/useFetchCharacteristics"; // 👈 nuevo hook
import { validateAddPropertyForm } from "@/utils/validateAddPropertyForm";

const CharacteristicsField = ({
  property,
  setProperty,
  errors,
  setErrors,
  hasTriedSubmit,
}) => {
  const { characteristics, loading, error } = useFetchCharacteristics();
  const [inputValue, setInputValue] = useState("");
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);

  const selectedCharacteristics = property.characteristics || [];

  // Filtrar sugerencias (sin repetir ids existentes)
  const filteredSuggestions =
    characteristics?.filter(
      (c) =>
        normalizeText(c.name).includes(normalizeText(inputValue)) &&
        !selectedCharacteristics.some(
          (sel) => sel.exists && sel.value === c.id
        )
    ) || [];

  const updateCharacteristics = (newList) => {
    const updatedProperty = { ...property, characteristics: newList };
    setProperty(updatedProperty);

    if (hasTriedSubmit) {
      const validationErrors = validateAddPropertyForm(updatedProperty);
      setErrors(validationErrors);
    }
  };

  const handleAddCharacteristic = (characteristicObj) => {
    updateCharacteristics([...selectedCharacteristics, characteristicObj]);
    setInputValue("");
    setSuggestionsVisible(false);
  };

  const handleRemoveCharacteristic = (index) => {
    const newList = selectedCharacteristics.filter((_, i) => i !== index);
    updateCharacteristics(newList);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();

      // Verificar si existe una característica igual
      const existing = characteristics.find(
        (c) => normalizeText(c.name) === normalizeText(inputValue)
      );

      const newCharacteristic = existing
        ? { exists: true, value: existing.id }
        : { exists: false, value: inputValue.trim() };

      handleAddCharacteristic(newCharacteristic);
    }
  };

  const getDisplayName = (c) => {
    if (c.exists) {
      const match = characteristics.find((cm) => cm.id === c.value);
      return match ? match.name : `ID: ${c.value}`;
    }
    return c.value;
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <label>Características</label>

      <div className="bg-third p-2 rounded-sm flex flex-wrap gap-2 items-center">
        {selectedCharacteristics.map((c, i) => (
          <div
            key={`${c.exists}-${c.value}-${i}`}
            className="bg-contrast px-2 py-1 rounded-sm flex items-center gap-1"
          >
            <span className="text-sm">{getDisplayName(c)}</span>
            <X
              size={14}
              className="cursor-pointer hover:text-red-500"
              onClick={() => handleRemoveCharacteristic(i)}
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

      {errors.characteristics && (
        <label htmlFor="characteristicsError" className="text-red-500 text-sm">
          {errors.characteristics}
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
                onClick={() =>
                  handleAddCharacteristic({ exists: true, value: c.id })
                }
              >
                {c.name}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
};

export default CharacteristicsField;
