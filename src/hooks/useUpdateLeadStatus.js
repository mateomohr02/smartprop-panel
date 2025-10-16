"use client";

import { useState } from "react";
import { putLeadStatus } from "@/utils/putLeadStatus";

export function useUpdateLeadStatus() {
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateLeadStatus = async (leadId, status) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No se encontró el token en localStorage");
      }

      const updatedLead = await putLeadStatus(leadId, status, token);
      setLead(updatedLead?.data || null);

      return updatedLead;
    } catch (err) {
      console.error("Error al actualizar lead:", err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateLeadStatus, lead, loading, error };
}
