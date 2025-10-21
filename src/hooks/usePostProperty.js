"use client";

import { postProperty } from "@/utils/postProperty";
import { useEffect, useState } from "react";

export function usePostProperty(prop) {
  const [property, setProperty] = useState([]);
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

        const response = await postProperty(prop, token, tenantId);
        setProperty(response.data);
        setError(null);
      } catch (err) {
        console.error("Error al crear la propiedad:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [prop]);

  return { property, loading, error };
}
