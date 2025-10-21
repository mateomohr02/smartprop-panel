"use client";


import { fetchOtherRooms } from "@/utils/fetchOtherRooms";
import { useEffect, useState } from "react";

export function useFetchOtherRooms() {
  const [rooms, setRooms] = useState([]);
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

        const response = await fetchOtherRooms(token, tenantId);
        setRooms(response.data);
        setError(null);
      } catch (err) {
        console.error("Error al obtener tipos de ambientes:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { rooms, loading, error };
}
