"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { normalizeText } from "@/helpers/normalizeText";
import { useFetchOtherRooms } from "@/hooks/useFetchOtherRooms";

const RoomsFields = ({ property, setProperty }) => {
  const [inputValue, setInputValue] = useState("");
  const [quantity, setQuantity] = useState(""); // 🔹 ahora inicia vacío
  const [sizes, setSizes] = useState([""]);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const { rooms } = useFetchOtherRooms();

  const selectedRooms = property.otherRooms || [];

  const filteredSuggestions =
    rooms?.filter(
      (r) =>
        normalizeText(r.name).includes(normalizeText(inputValue)) &&
        !selectedRooms.some(
          (sel) => normalizeText(sel.roomSlug) === normalizeText(r.slug)
        )
    ) || [];

  const handleAddRoom = () => {
    if (!inputValue.trim()) return;

    const existing = rooms.find(
      (r) => normalizeText(r.name) === normalizeText(inputValue)
    );

    const finalQuantity = parseInt(quantity) || 1; // 🔹 usa 1 si está vacío o inválido

    const newRoom = {
      roomSlug: existing ? existing.name : inputValue.trim(),
      value: finalQuantity,
    };

    if (finalQuantity > 1 || sizes.some((s) => s.trim() !== "")) {
      const validSizes = sizes
        .filter((s) => s.trim() !== "")
        .map((s) => parseFloat(s));
      if (validSizes.length) newRoom.size = validSizes;
    }

    setProperty({
      ...property,
      otherRooms: [...selectedRooms, newRoom],
    });

    // Reset
    setInputValue("");
    setQuantity("");
    setSizes([""]);
    setSuggestionsVisible(false);
  };

  const handleRemoveRoom = (roomSlug) => {
    setProperty({
      ...property,
      otherRooms: selectedRooms.filter((r) => r.roomSlug !== roomSlug),
    });
  };

  const handleQuantityChange = (val) => {
    // 🔹 acepta vacío sin forzar a 1
    if (val === "") {
      setQuantity("");
      setSizes([""]);
      return;
    }

    const qty = parseInt(val) || 1;
    setQuantity(qty);
    setSizes((prev) => {
      const updated = [...prev];
      if (qty > prev.length) {
        for (let i = prev.length; i < qty; i++) updated.push("");
      } else if (qty < prev.length) {
        updated.length = qty;
      }
      return updated;
    });
  };

  const handleSizeChange = (index, val) => {
    const updated = [...sizes];
    updated[index] = val;
    setSizes(updated);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-sm font-medium">Tipos de Ambientes</label>

      <div className="border border-gray-300 rounded-md p-2 flex flex-col gap-2 bg-white relative">
        {/* Tags de ambientes seleccionados */}
        <div className="flex flex-wrap gap-2">
          {selectedRooms.map((r, idx) => (
            <div
              key={`${r.roomSlug}-${idx}`}
              className="bg-third border border-gray-200 p-2 rounded-sm flex items-center gap-1"
            >
              <span>
                {r.roomSlug}
                {r.size
                  ? ` ${r.size.join(" - ")} (${r.value})`
                  : r.value > 1
                  ? ` (${r.value})`
                  : ""}
              </span>
              <X
                size={16}
                className="cursor-pointer"
                onClick={() => handleRemoveRoom(r.roomSlug)}
              />
            </div>
          ))}
        </div>

        {/* Input de nombre + cantidad */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col relative">
            <label>Nombre</label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setSuggestionsVisible(true);
              }}
              onFocus={() => {
                if (inputValue.trim()) setSuggestionsVisible(true);
              }}
              onBlur={() => setTimeout(() => setSuggestionsVisible(false), 150)}
              className="rounded-sm p-2 bg-third focus:outline-none drop-shadow-sm"
              placeholder="Ej: Balcón"
            />

            {suggestionsVisible &&
              inputValue.trim() &&
              filteredSuggestions.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-md shadow-md absolute top-[58px] left-0 z-10 w-full">
                  {filteredSuggestions.map((r) => (
                    <div
                      key={r.id}
                      onClick={() => {
                        setInputValue(r.name);
                        setSuggestionsVisible(false);
                      }}
                      className="px-2 py-1 text-sm hover:bg-indigo-100 cursor-pointer"
                    >
                      {r.name}
                    </div>
                  ))}
                </div>
              )}
          </div>

          <div className="flex flex-col justify-end">
            <label>Cantidad</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
              className="rounded-sm p-2 bg-third focus:outline-none drop-shadow-sm"
              placeholder="1" // 🔹 ahora muestra el 1 como referencia visual
            />
          </div>
        </div>

        {/* Tamaños */}
        <div className="flex flex-col gap-1">
          <label>Tamaño</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {Array.from({ length: quantity || 1 }).map((_, i) => (
              <div key={i} className="flex items-center gap-1">
                <input
                  type="number"
                  step="0.1"
                  placeholder="8.5"
                  value={sizes[i] || ""}
                  onChange={(e) => handleSizeChange(i, e.target.value)}
                  className="w-full rounded-sm p-2 bg-third focus:outline-none drop-shadow-sm"
                />
                <span className="text-sm text-gray-500">mts²</span>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddRoom}
          className="bg-primary self-end text-contrast w-fit rounded-sm hover:bg-secondary transition-all duration-300 py-2 px-4 mt-1"
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

export default RoomsFields;
