"use client";

import { useEffect, useState } from "react";
import fetchAvailableLocations from "@/utils/fetchAvailableLocations";

export function useFetchLocations(fatherLocation) {
  const [locations, setLocations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        // 🧠 Si no hay ubicación padre (inicio)
        if (!fatherLocation) {
          const token = localStorage.getItem("token");
          const tenantId = localStorage.getItem("tenantId");

          if (!token || !tenantId) throw new Error("Token o Tenant ID no encontrado");

          const fetchedLocations = await fetchAvailableLocations(null, token, tenantId);
          setLocations(fetchedLocations);
          setError(null);
          return;
        }

        // 🚫 Si el usuario ingresó una ubicación personalizada
        // (sin id ni slug) no hacemos request
        if (!fatherLocation.id && !fatherLocation.slug) {
          setLocations(null);
          setLoading(false);
          return;
        }

        const token = localStorage.getItem("token");
        const tenantId = localStorage.getItem("tenantId");

        if (!token || !tenantId) throw new Error("Token o Tenant ID no encontrado");

        const fetchedLocations = await fetchAvailableLocations(fatherLocation, token, tenantId);
        setLocations(fetchedLocations);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    loadLocations();
  }, [fatherLocation]);

  return { locations, loading, error };
}
