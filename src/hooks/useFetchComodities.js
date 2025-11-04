"use client";

import { fetchComodities } from "@/utils/fetchComodities";
import { useEffect, useState } from "react";

export function useFetchComodities() {
  const [comodities, setComodities] = useState([]);
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

        const response = await fetchComodities(token, tenantId);
        setComodities(response);
        setError(null);
      } catch (err) {
        console.error("Error al obtener comodities:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  console.log(comodities);
  

  return { comodities, loading, error };
}
