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
        const token = localStorage.getItem("token");
        const tenantId = localStorage.getItem("tenantId");

        if (!token || !tenantId) throw new Error("Token o Tenant ID no encontrado");

        const fetchedLocations = await fetchAvailableLocations(fatherLocation, token, tenantId);
        setLocations(fetchedLocations);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadLocations();
  }, [fatherLocation]);

  return { locations, loading, error };
}
