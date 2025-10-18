"use client";

import { useEffect, useState } from "react";
import { fetchPropertyTypes } from "@/utils/fetchPropertyTypes";

export function useFetchPropertyTypes() {
  const [propertyTypes, setPropertyTypes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPropertyTypes = async () => {
      try {
        const token = localStorage.getItem("token");
        const tenantId = localStorage.getItem("tenantId");

        if (!token || !tenantId)
          throw new Error("Token o Tenant ID no encontrado");

        const fetchedPropertyTypes = await fetchPropertyTypes(
          token,
          tenantId
        );
        setPropertyTypes(fetchedPropertyTypes);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPropertyTypes();
  }, []);

  return { propertyTypes, loading, error };
}
