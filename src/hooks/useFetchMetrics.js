"use client";

import { useEffect, useState } from "react";

export function useFetchMetrics() {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const token = localStorage.getItem("token");
        const tenantId = localStorage.getItem("tenantId");

        if (!token || !tenantId) {
          throw new Error("Token o Tenant ID no encontrados en localStorage");
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/dashboard/metrics`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Tenant-ID": tenantId,
              "Content-Type": "application/json",
            }
          }
        );

        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        setMetrics(data.data);
      } catch (err) {
        console.error("Error al obtener métricas:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []); 
  

  return { metrics, loading, error };
}
