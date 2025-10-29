"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useFetchPropertyDetail } from "@/hooks/useFetchPropertyDetail";
import FormEditProperty from "./FormEditProperty";

const EditPage = () => {
  const { propertyId } = useParams();
  const { property, loading, error } = useFetchPropertyDetail(propertyId);

  const [propertyState, setPropertyState] = useState(null);
  
  useEffect(() => {
    if (property?.data) {
      setPropertyState(property.data);
    }
  }, [property]);

  if (loading) {
    return <div className="p-4 text-gray-500">Cargando propiedad...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error al cargar la propiedad.</div>;
  }

  if (!propertyState) {
    return <div className="p-4 text-gray-500">No se encontró la propiedad.</div>;
  }

  return (
    <div className="p-2">
      <FormEditProperty property={propertyState} setProperty={setPropertyState} />
    </div>
  );
};

export default EditPage;
