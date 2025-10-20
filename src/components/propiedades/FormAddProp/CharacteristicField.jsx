"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { normalizeText } from "@/helpers/normalizeText";

import { useFetchCharacteristics } from "@/hooks/useFetchCharacteristics";

const CharacteristicField = ({ property, setProperty }) => {
  const { characteristics, loading, error } = useFetchCharacteristics();

  const [inputValue, setInputValue] = useState("");
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);

  const selectedCharacteristics = property.characteristics || [];

  // Filtra sugerencias según el texto ingresado
  const filteredSuggestions =
    characteristics?.filter(
      (c) =>
        normalizeText(c.name).includes(normalizeText(inputValue)) &&
        !selectedCharacteristics.some(
          (sel) => normalizeText(sel.name) === normalizeText(c.name)
        )
    ) || [];

  const handleAddCharacteristic = (characteristic) => {
    setProperty({
      ...property,
      characteristics: [...selectedCharacteristics, characteristic],
    });
    setInputValue("");
    setSuggestionsVisible(false);
  };

  const handleRemoveCharacteristic = (characteristicName) => {
    setProperty({
      ...property,
      characteristics: selectedCharacteristics.filter((c) => c.name !== characteristicName),
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();

      // Si no existe en la lista de sugerencias, crear una nueva
      const existing = characteristics.find(
        (c) => normalizeText(c.name) === normalizeText(inputValue)
      );

      const newCharacteristic = existing || { name: inputValue.trim() };
      handleAddCharacteristic(newCharacteristic);
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <label>Características</label>

      <div className="bg-third p-2 rounded-sm flex flex-wrap gap-2 items-center">
        {selectedCharacteristics.map((c) => (
          <div
            key={c.name}
            className="bg-contrast px-2 py-1 rounded-sm flex items-center gap-1"
          >
            <span className="text-sm">{c.name}</span>
            <X
              size={14}
              className="cursor-pointer hover:text-red-500"
              onClick={() => handleRemoveCharacteristic(c.name)}
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

      {suggestionsVisible &&
        inputValue.trim() !== "" &&
        filteredSuggestions.length > 0 && (
          <ul className="border border-gray-200 rounded-sm bg-contrast shadow-sm z-10">
            {filteredSuggestions.map((c) => (
              <li
                key={c.id}
                className="p-2 text-sm hover:bg-third cursor-pointer"
                onClick={() => handleAddCharacteristic(c)}
              >
                {c.name}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
};

export default CharacteristicField;
