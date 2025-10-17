"use client";

import { useEffect, useState } from "react";
import ToggleButton from "./ToggleButton";

const TableProperties = ({ properties }) => {
  const [displayProperties, setDisplayProperties] = useState(properties);

  useEffect(() => {
    setDisplayProperties(properties);
  }, [properties]);

  return (
    <div className="p-2">
      <div className="overflow-hidden rounded-lg shadow-sm bg-contrast p-2">
        <table className="w-full text-sm table-fixed">
          <thead className="bg-contrast">
            <tr className="text-center">
              {/* Nombre */}
              <th className="w-2/3 sm:w-2/7 px-3 py-2 font-semibold">Nombre</th>

              {/* Estado */}
              <th className="w-1/3 sm:w-1/7 px-3 py-2 font-semibold">Estado</th>

              {/* Otras columnas (solo visibles en sm y superior) */}
              <th className="hidden sm:table-cell w-1/7 px-3 py-2 font-semibold">
                Promocionado
              </th>
              <th className="hidden sm:table-cell w-1/7 px-3 py-2 font-semibold">
                Visualizaciones
              </th>
              <th className="hidden sm:table-cell w-1/7 px-3 py-2 font-semibold">
                Interacciones
              </th>
              <th className="hidden sm:table-cell w-1/7 px-3 py-2 font-semibold">
                Compartido
              </th>
            </tr>
          </thead>

          <tbody className="border">
            {displayProperties?.map((property) => (
              <tr key={property.id} className="bg-third">
                {/* Nombre */}
                <td className="w-2/3 sm:w-2/7 px-3 py-2 truncate border-r max-w-[250px]">
                  {property.title}
                </td>

                {/* Estado */}
                <td className="w-1/3 sm:w-1/7 border-r">
                  <div className="flex items-center justify-center w-full h-full">
                    <ToggleButton
                      flag={property.isActive}
                      type="isActive"
                      propertyId={property.id}
                      setDisplayProperties={setDisplayProperties}
                    />
                  </div>
                </td>

                {/* Promocionado */}
                <td className="hidden sm:table-cell w-1/7 border-r">
                  <div className="flex items-center justify-center w-full h-full">
                    <ToggleButton
                      flag={property.isFeatured}
                      type="isFeatured"
                      propertyId={property.id}
                      setDisplayProperties={setDisplayProperties}
                    />
                  </div>
                </td>

                {/* Visualizaciones */}
                <td className="hidden sm:table-cell w-1/7 border-r text-center">
                  {property.visualizations}
                </td>

                {/* Interacciones */}
                <td className="hidden sm:table-cell w-1/7 border-r text-center">
                  {property.interactions}
                </td>

                {/* Compartido */}
                <td className="hidden sm:table-cell w-1/7 border-r text-center">
                  {property.reach}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableProperties;
