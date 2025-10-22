"use client";

import { submitPropertyMultimedia } from "@/utils/submitPropertyMultimedia";
import { postProperty } from "@/utils/postProperty";
import { parseNumericFields } from "@/helpers/parseNumericFields";
import { useState } from "react";

export function useSubmitProperty() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitProperty = async (property) => {
    setLoading(true);
    setError(null);
    setProgress("Iniciando subida...");

    try {
      const token = localStorage.getItem("token");
      const tenantId = localStorage.getItem("tenantId");

      // Paso 1: Subir imágenes
      setProgress("Subiendo imágenes...");
      const multimediaUrls = await submitPropertyMultimedia(property.multimedia, token, tenantId);

      // Paso 2: Parsear campos numéricos
      const parsedProperty = parseNumericFields(property);

      // Paso 3: Crear objeto final con URLs de multimedia
      const fullProperty = {
        ...parsedProperty,
        multimedia: multimediaUrls,
      };

      console.log(fullProperty, "full property");

      // Paso 4: Guardar la propiedad en la DB
      setProgress("Guardando información de la propiedad...");
      const savedProperty = await postProperty(fullProperty, token, tenantId);

      setProgress("Propiedad agregada correctamente ✅");
      return savedProperty;
    } catch (err) {
      console.error("Error al subir propiedad:", err);
      setError(err.message);
      setProgress("Error al subir propiedad ❌");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submitProperty, progress, loading, error };
}
