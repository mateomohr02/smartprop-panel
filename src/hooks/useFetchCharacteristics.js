"use client";

import { fetchCharacteristics } from "@/utils/fetchCharacteristics";
import { useEffect, useState } from "react";

export function useFetchCharacteristics() {
  const [characteristics, setCharacteristics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem("token");
        const tenantId = localStorage.getItem("tenantId");

        if (!token || !tenantId) {
          throw new Error("Token o Tenant ID no encontrados en localStorage");
        }

        const response = await fetchCharacteristics(token, tenantId);
        setCharacteristics(response.data);
        setError(null);
      } catch (err) {
        console.error("Error al obtener características:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { characteristics, loading, error };
}
