"use client";

import { useEffect, useState } from "react";

export function useFetchProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("token");
        const tenantId = localStorage.getItem("tenantId");

        if (!token || !tenantId) {
          throw new Error("Token o Tenant ID no encontrados en localStorage");
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/properties`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Tenant-ID": tenantId,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        

        const data = await res.json();

        setProperties(data.properties);
      } catch (err) {
        console.error("Error al obtener propiedades:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return { properties, loading, error };
}
