"use client";

import { useFetchProperties } from "@/hooks/useFetchProperties";
import ActionButton from "./ActionButton";
import TableProperties from "./TableProperties";

const PropiedadesPage = () => {
  const { properties, loading, error } = useFetchProperties();

  return (
    <div className="flex flex-col items-center">
      <ActionButton href="/propiedades/crear" text="+ Añadir Nueva Propiedad" />
       <TableProperties properties={properties.data} loading={loading} error={error} /> 
    </div>
  );
};

export default PropiedadesPage;
