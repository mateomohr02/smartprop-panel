"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useFetchLead } from "@/hooks/useFetchLead";
import { useUpdateLeadStatus } from "@/hooks/useUpdateLeadStatus";

const ConsultDetailPage = () => {
  const { consultId } = useParams();
  const { lead, setLead, loading, error } = useFetchLead(consultId);
  const { updateLeadStatus, loading: updating } = useUpdateLeadStatus();

  // Marcar como "seen" al entrar
  useEffect(() => {
    if (lead && lead.status === "new") {
      updateLeadStatus(lead.id, "seen").then((res) => {
        if (res?.data) setLead(res.data);
      });
    }
  }, [lead, updateLeadStatus, setLead]);

  const handleReply = async () => {
    const res = await updateLeadStatus(lead.id, "replied");
    if (res?.data) setLead(res.data);
  };

  const handleDismiss = async () => {
    const res = await updateLeadStatus(lead.id, "dismissed");
    if (res?.data) setLead(res.data);
  };

  if (loading) {
    return <div className="p-4 text-gray-500">Cargando consulta...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  if (!lead) {
    return <div className="p-4 text-gray-500">Consulta no encontrada</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">
        Consulta de {lead.name || "Cliente"}
      </h1>

      <div className="mb-4 text-gray-700">
        <p><strong>Email:</strong> {lead.email}</p>
        <p><strong>Teléfono:</strong> {lead.phone}</p>
        <p><strong>Mensaje:</strong> {lead.message}</p>
        <p><strong>Estado actual:</strong> {lead.status}</p>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={handleReply}
          disabled={updating}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          Marcar como respondida
        </button>

        <button
          onClick={handleDismiss}
          disabled={updating}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          Descartar consulta
        </button>
      </div>
    </div>
  );
};

export default ConsultDetailPage;
