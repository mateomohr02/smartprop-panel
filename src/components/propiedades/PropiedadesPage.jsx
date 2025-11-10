"use client";

import { useFetchProperties } from "@/hooks/useFetchProperties";
import ActionButton from "./ActionButton";
import TableProperties from "./TableProperties";

const PropiedadesPage = () => {
  const { properties, loading, error } = useFetchProperties();

  return (
    <div className="flex flex-col items-start">
      <ActionButton href="/propiedades/agregar" text="+ Añadir Nueva Propiedad" />

      <TableProperties
        properties={properties}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default PropiedadesPage;
