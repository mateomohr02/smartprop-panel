"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { normalizeText } from "@/helpers/normalizeText";
import { useFetchComodities } from "@/hooks/useFetchComodities";

const ComoditiesField = ({ property, setProperty }) => {
  const { comodities, loading, error } = useFetchComodities();

  const [inputValue, setInputValue] = useState("");
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);

  const selectedComodities = property.comodities || [];

  // Filtra sugerencias según el texto ingresado
  const filteredSuggestions =
    comodities?.filter(
      (c) =>
        normalizeText(c.name).includes(normalizeText(inputValue)) &&
        !selectedComodities.some(
          (sel) => normalizeText(sel.name) === normalizeText(c.name)
        )
    ) || [];

  const handleAddComodity = (comodity) => {
    setProperty({
      ...property,
      comodities: [...selectedComodities, comodity],
    });
    setInputValue("");
    setSuggestionsVisible(false);
  };

  const handleRemoveComodity = (comodityName) => {
    setProperty({
      ...property,
      comodities: selectedComodities.filter((c) => c.name !== comodityName),
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();

      // Si no existe en la lista de sugerencias, crear una nueva
      const existing = comodities.find(
        (c) => normalizeText(c.name) === normalizeText(inputValue)
      );

      const newComodity = existing || { name: inputValue.trim() };
      handleAddComodity(newComodity);
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <label>Comodities</label>

      <div className="bg-third p-2 rounded-sm flex flex-wrap gap-2 items-center">
        {selectedComodities.map((c) => (
          <div
            key={c.name}
            className="bg-contrast px-2 py-1 rounded-sm flex items-center gap-1"
          >
            <span className="text-sm">{c.name}</span>
            <X
              size={14}
              className="cursor-pointer hover:text-red-500"
              onClick={() => handleRemoveComodity(c.name)}
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
                onClick={() => handleAddComodity(c)}
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
