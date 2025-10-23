"use client";

import { useEffect, useState } from "react";
import { fetchPropertyDetail } from "@/utils/fetchPropertyDetail";

export function useFetchPropertyDetail(propertyId) {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProperty = async () => {
      try {
        const token = localStorage.getItem("token");
        const tenantId = localStorage.getItem("tenantId");

        if (!token || !tenantId ) throw new Error("Token o Tenant ID no encontrado");

        const fetchedProperty = await fetchPropertyDetail(propertyId, token, tenantId);
        setProperty(fetchedProperty);        
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) loadProperty();
  }, [propertyId]);

  return { property, loading, error };
}
