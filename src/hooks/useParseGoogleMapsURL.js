"use client";

import { parseGoogleMapsUrl } from "@/utils/parseGoogleMapsURL";
import { useEffect, useState } from "react";

export function useParseGoogleMapsURL(url) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return; // si no hay URL, no hacemos nada

    const parse = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const tenantId = localStorage.getItem("tenantId");

        if (!token || !tenantId) throw new Error("Token o Tenant ID no encontrado");

        const parsed = await parseGoogleMapsUrl(url, token, tenantId);

        console.log(parsed);
        
        setLocation(parsed);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    parse();
  }, [url]);

  return { location, loading, error };
}
