"use client";

import { useParseGoogleMapsURL } from "@/hooks/useParseGoogleMapsURL";
import { Clipboard } from "lucide-react";
import { useEffect, useState } from "react";
import MapPreview from "./MapPreview";
import { validateAddPropertyForm } from "@/utils/validateAddPropertyForm";

const MapLocationField = ({
  property,
  setProperty,
  errors,
  setErrors,
  hasTriedSubmit,
}) => {
  const [linkInput, setLinkInput] = useState("");
  const [shouldParse, setShouldParse] = useState(false);
  const [clipboardError, setClipboardError] = useState(null);

  const { location, loading, error } = useParseGoogleMapsURL(
    shouldParse ? linkInput : null
  );

  // ✅ Actualiza property cuando cambia la ubicación
  useEffect(() => {
    if (location && !loading && !error && shouldParse) {
      setProperty((prev) => ({
        ...prev,
        mapLocation: location,
      }));
      setShouldParse(false);

      if (hasTriedSubmit) {
        const validationErrors = validateAddPropertyForm({
          ...property,
          mapLocation: location,
        });
        setErrors(validationErrors);
      }
    }
  }, [location, loading, error, shouldParse, setProperty]);

  // 📋 Pegar desde el portapapeles
  const handlePasteFromClipboard = async () => {
    try {
      setClipboardError(null);
      const text = await navigator.clipboard.readText();
      if (!text) throw new Error("El portapapeles está vacío");
      setLinkInput(text.trim());
    } catch (err) {
      console.error("Error al leer el portapapeles:", err);
      setClipboardError("No se pudo acceder al portapapeles");
    }
  };

  const handleSendLocation = () => {
    setShouldParse(true);

    if (hasTriedSubmit) {
      const validationErrors = validateAddPropertyForm(property);
      setErrors(validationErrors);
    }
  };

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="w-full flex flex-row justify-between">
        <label htmlFor="map">Mapa</label>
        {errors.mapLocation && (
          <label htmlFor="mapError" className="text-red-500 text-sm">
            {errors.mapLocation}
          </label>
        )}
      </div>

      <div className="border border-gray-200 px-2 pb-2 py-1 flex gap-2 rounded-sm">
        <div className="flex flex-col flex-1 gap-1">
          <label htmlFor="latitude">URL Google Maps</label>

          {/* 🧭 Input con botón integrado */}
          <div className="relative w-full">
            <input
              type="text"
              className="p-2 pr-10 bg-third rounded-sm drop-shadow-sm w-full"
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
              placeholder="Pega aquí la URL de Google Maps"
            />

            {/* 📋 Botón dentro del input */}
            <button
              type="button"
              onClick={handlePasteFromClipboard}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
              title="Pegar desde portapapeles"
            >
              <Clipboard size={18} />
            </button>
          </div>

          {clipboardError && (
            <p className="text-xs text-red-500 mt-1">{clipboardError}</p>
          )}
        </div>

        <div className="flex items-end">
          <button
            type="button"
            className="py-2 px-4 rounded-sm bg-primary text-contrast hover:bg-secondary transition-all duration-300"
            onClick={handleSendLocation}
            disabled={!linkInput || loading}
          >
            {loading ? "Procesando..." : "Enviar"}
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-1"> {error}</p>}
      {location && <MapPreview property={property} />}
    </div>
  );
};

export default MapLocationField;