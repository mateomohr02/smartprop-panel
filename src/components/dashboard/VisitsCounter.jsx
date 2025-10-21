"use client";

import { useFetchMetrics } from "@/hooks/useFetchMetrics";

const VisitsCounter = () => {
  const { metrics, loading, error } = useFetchMetrics();
 

  if (loading)
    return (
      <div className="min-w-[340px] max-w-[450px] min-h-[250px] max-h-[360px] bg-gray-100 rounded-lg shadow-md border border-gray-200 relative overflow-hidden">
        {/* Shimmer overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white to-transparent animate-shimmer-diagonal" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-[250px]">
        <p className="text-red-500">Error cargando las métricas de visitas.</p>
      </div>
    );

  return (
    <div className="relative min-w-[340px] max-w-[450px] min-h-[250px] max-h-[360px] bg-white rounded-lg shadow-md border border-gray-200 p-4 flex flex-col">
      {/* 🧭 Título arriba a la izquierda */}
      <h3 className="font-medium">Visitas este Mes</h3>

      {/* 🔢 Números centrados */}
      <div className="flex flex-1 justify-center items-center">
        <div className="flex items-baseline justify-center gap-1 pb-10">

          {
            metrics.visit_site.length !== 0  ?  <span className="text-8xl font-semibold">{metrics.visit_site[0].total}</span> : <span>Todavía no hubieron visitas este mes.</span>
          }
         
        </div>
      </div>
    </div>
  );
};

export default VisitsCounter;
