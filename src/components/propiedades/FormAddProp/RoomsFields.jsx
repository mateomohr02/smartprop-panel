"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { normalizeText } from "@/helpers/normalizeText";
import { useFetchOtherRooms } from "@/hooks/useFetchOtherRooms";
import { validateAddPropertyForm } from "@/utils/validateAddPropertyForm";

const RoomsFields = ({
  property,
  setProperty,
  errors,
  setErrors,
  hasTriedSubmit,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sizes, setSizes] = useState([""]);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const { rooms } = useFetchOtherRooms(); // rooms: [{ id, name, slug }]

  const selectedRooms = property.rooms || [];

  // Filtra sugerencias (evita duplicados)
  const filteredSuggestions =
    rooms?.filter(
      (r) =>
        normalizeText(r.name).includes(normalizeText(inputValue)) &&
        !selectedRooms.some(
          (sel) =>
            sel.exists &&
            normalizeText(sel.value) === normalizeText(r.id.toString())
        )
    ) || [];

  const updateRooms = (newList) => {
    const updatedProperty = { ...property, rooms: newList };
    setProperty(updatedProperty);

    if (hasTriedSubmit) {
      const validationErrors = validateAddPropertyForm(updatedProperty);
      setErrors(validationErrors);
    }
  };

  const handleAddRoom = () => {
    if (!inputValue.trim()) return;

    const existing = rooms.find(
      (r) => normalizeText(r.name) === normalizeText(inputValue)
    );

    const finalQuantity = parseInt(quantity) || 1;
    const validSizes = sizes
      .filter((s) => s.trim() !== "")
      .map((s) => parseFloat(s))
      .filter((n) => !isNaN(n));

    const newRoom = {
      exists: !!existing,
      value: existing ? existing.id : inputValue.trim(),
      quantity: finalQuantity,
    };

    if (validSizes.length) newRoom.size = validSizes;

    updateRooms([...selectedRooms, newRoom]);

    // Reset inputs
    setInputValue("");
    setQuantity("");
    setSizes([""]);
    setSuggestionsVisible(false);
  };

  const handleRemoveRoom = (index) => {
    const newList = selectedRooms.filter((_, i) => i !== index);
    updateRooms(newList);
  };

  const handleQuantityChange = (val) => {
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

  const getRoomName = (room) => {
    if (room.exists) {
      const found = rooms.find((r) => r.id === room.value);
      return found ? found.name : `ID: ${room.value}`;
    }
    return room.value;
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-sm font-medium">Tipos de Ambientes</label>

      <div className="border border-gray-300 rounded-md p-2 flex flex-col gap-2 bg-white relative">
        {/* Tags de ambientes seleccionados */}
        <div className="flex flex-wrap gap-2">
          {selectedRooms.map((r, idx) => (
            <div
              key={`${r.value}-${idx}`}
              className="bg-third border border-gray-200 p-2 rounded-sm flex items-center gap-1"
            >
              <span className="text-sm">
                {getRoomName(r)}
                {r.size?.length
                  ? ` (${r.quantity || 1}) - ${r.size.join("m², ")}m²`
                  : r.quantity && r.quantity > 1
                  ? ` (${r.quantity})`
                  : ""}
              </span>
              <X
                size={16}
                className="cursor-pointer hover:text-red-500"
                onClick={() => handleRemoveRoom(idx)}
              />
            </div>
          ))}
        </div>

        {/* Input nombre + cantidad */}
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
              onFocus={() => setSuggestionsVisible(true)}
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
              placeholder="1"
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
                <span className="text-sm text-gray-500">m²</span>
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

      {Array.isArray(errors?.rooms) &&
        errors?.rooms.some((e) => Object.keys(e).length > 0) && (
          <label htmlFor="roomsError" className="text-red-500 text-sm">
            Revisá los ambientes, hay errores.
          </label>
        )}
    </div>
  );
};

export default RoomsFields;
