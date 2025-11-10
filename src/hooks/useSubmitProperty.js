"use client";

import { submitPropertyMultimedia } from "@/utils/submitPropertyMultimedia";
import { parseNumericFields } from "@/helpers/parseNumericFields";
import { useState } from "react";
import { postPropertyInitialData } from "@/utils/postPropertyInitialData";
import { postPropertyData } from "@/utils/postPropertyData";
import { sendPropertyLocation } from "@/utils/sendPropertyLocation";
import { sendPropertyMultimedia } from "@/utils/sendPropertyMultimedia";
import { postPropertyCharacteristics } from "@/utils/postPropertyCharacteristics";
import { postPropertyComodities } from "@/utils/postPropertyComodities";
import { postPropertyRooms } from "@/utils/postPropertyRooms";
import { postPropertyPublish } from "@/utils/postPropertyPublish";

export function useSubmitProperty() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitProperty = async (property) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const tenantId = localStorage.getItem("tenantId");

      const parsedFields = parseNumericFields(property.data);

      if (!token || !tenantId)
        throw new Error("Token o Tenant ID no encontrado");

      let propertyId;
      //PASO 1: INICIALIZAR REGISTRO
      setProgress("Inicializando registro...");
      const sendInitialData = await postPropertyInitialData(
        property.initialData,
        token,
        tenantId
      );
      propertyId = sendInitialData.property.id;

      //PASO 2: CARGAR INFORMACIÓN
      setProgress("Cargando información...");
      const sendPropertyData = await postPropertyData(
        propertyId,
        parsedFields,
        token,
        tenantId
      );

      //PASO 3: AÑADIR UBICACIÓN
      setProgress("Agregando datos de la ubicación...");

      console.log(property.location, 'location enviada');
      console.log(property.location.address, 'direc' || "no hay dirección");
      
      const sendLocation = await sendPropertyLocation(
        propertyId,
        property.location,
        token,
        tenantId
      );

      //PASO 4: SUBIR MULTIMEDIA

      setProgress("Subiendo multimedia...");
      const multimediaUrls = await submitPropertyMultimedia(
        property.multimedia,
        token,
        tenantId
      );

      const sendMultimedia = await sendPropertyMultimedia(
        propertyId,
        multimediaUrls,
        token,
        tenantId
      );

      //PASO 5: AÑADIR CARACTERÍSTICAS

      setProgress("Añadiendo características...");

      const sendPropertyCharacteristics = await postPropertyCharacteristics(
        propertyId,
        property.characteristics,
        token,
        tenantId
      );

    

      //PASO 6: AÑADIR COMODIDADES

      setProgress("Añadiendo comodidades...");

      
      console.log(property.comodities);

      const sendPropertyComodities = await postPropertyComodities(
        propertyId,
        property.comodities,
        token,
        tenantId
      );

      //PASO 7: AÑADIR AMBIENTES

      setProgress("Añadiendo ambientes...");
      const sendPropertyRooms = await postPropertyRooms(
        propertyId,
        property.rooms,
        token,
        tenantId
      );

      //PASO 8: PUBLICAR

      setProgress("Publicando propiedad...");
      const sendPropertyPublish = await postPropertyPublish(
        propertyId,
        token,
        tenantId
      );
      setProgress("Propiedad publicada");

      return sendPropertyPublish.property;
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
