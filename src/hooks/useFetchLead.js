"use client";

import { useEffect, useState } from "react";
import { fetchLead } from "@/utils/fetchLead";

export function useFetchLead(leadId) {
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLead = async () => {
      try {
        const token = localStorage.getItem("token");
        const tenantId = localStorage.getItem("tenantId");

        if (!token || !tenantId ) throw new Error("Token o Tenant ID no encontrado");

        const fetchedLead = await fetchLead(leadId, token, tenantId);
        setLead(fetchedLead);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (leadId) loadLead();
  }, [leadId]);

  return { lead, setLead, loading, error };
}
