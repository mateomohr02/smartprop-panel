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

  // Filtra sugerencias según el texto ingresado
  const filteredSuggestions =
    comodities?.filter(
      (c) =>
        normalizeText(c.name).includes(normalizeText(inputValue)) &&
        !selectedComodities.some(
          (sel) => normalizeText(sel.slug) === normalizeText(c.slug)
        )
    ) || [];

  const handleAddComodity = (comodity) => {
    setProperty({
      ...property,
      comodities: [...selectedComodities, comodity],
    });
    setInputValue("");
    setSuggestionsVisible(false);

    if (hasTriedSubmit) {
      const validationErrors = validateAddPropertyForm({
        ...property,
        comodities: [...selectedComodities, comodity],
      });
      setErrors(validationErrors);
    }
  };

  const handleRemoveComodity = (slug) => {
    setProperty({
      ...property,
      comodities: selectedComodities.filter((c) => c.slug !== slug),
    });

    if (hasTriedSubmit) {
      const validationErrors = validateAddPropertyForm({
        ...property,
        comodities: selectedComodities.filter((c) => c.slug !== slug),
      });
      setErrors(validationErrors);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();

      const existing = comodities.find(
        (c) => normalizeText(c.name) === normalizeText(inputValue)
      );

      // Si existe, usar su slug; si no, generar uno nuevo
      const newComodity =
        existing || {
          slug: normalizeText(inputValue.trim().replace(/\s+/g, "-")),
          name: inputValue.trim(),
        };

      handleAddComodity({ slug: newComodity.slug });
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <label>Comodidades</label>

      <div className="bg-third p-2 rounded-sm flex flex-wrap gap-2 items-center">
        {selectedComodities.map((c) => (
          <div
            key={c.slug}
            className="bg-contrast px-2 py-1 rounded-sm flex items-center gap-1"
          >
            <span className="text-sm">{c.slug}</span>
            <X
              size={14}
              className="cursor-pointer hover:text-red-500"
              onClick={() => handleRemoveComodity(c.slug)}
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
                onClick={() => handleAddComodity({ slug: c.slug })}
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