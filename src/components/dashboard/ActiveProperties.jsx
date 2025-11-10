"use client";

import { useMemo } from "react";
import { useFetchProperties } from "@/hooks/useFetchProperties";

const ActiveProperties = () => {
  const { properties, loading, error } = useFetchProperties();
  console.log(properties);
  

  const { activeCount, totalCount } = useMemo(() => {
    const props = properties || [];
    const active = props.filter((p) => p.isActive && p.status === 'published').length;
    return { activeCount: active, totalCount: props.length };
  }, [properties]);

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
        <p className="text-red-500">Error cargando las propiedades activas</p>
      </div>
    );

  return (
    <div className="relative min-w-[340px] max-w-[450px] min-h-[250px] max-h-[360px] bg-white rounded-lg shadow-md border border-gray-200 p-4 flex flex-col">
      {/* 🧭 Título arriba a la izquierda */}
      <h3 className="font-medium">
        Propiedades Activas
      </h3>

      {/* 🔢 Números centrados */}
      <div className="flex flex-1 justify-center items-center">
        <div className="flex items-baseline justify-center gap-1 pb-10">
          <span className="text-8xl font-semibold">
            {activeCount}
          </span>
          <span className="text-4xl text-gray-500">
            /{totalCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ActiveProperties;
