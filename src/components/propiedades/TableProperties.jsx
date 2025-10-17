"use client";

import { useEffect, useState } from "react";

import ToggleButton from "./ToggleButton";

const TableProperties = ({ properties }) => {
  
  const [displayProperties, setDisplayProperties] = useState(properties);

  useEffect(()=> {
    setDisplayProperties(properties)
  }, [properties])

  return (
    <div className="p-2">
      <div className="overflow-hidden rounded-lg shadow-sm bg-contrast p-2">
        <table className="text-sm">
          <thead className="bg-contrast">
            <tr>
              <th className="px-3 py-2 text-center font-semibold">Nombre</th>
              <th className="px-3 py-2 text-center font-semibold">Estado</th>
              <th className="hidden px-3 py-2 text-center font-semibold">Promocionado</th>
              <th className="hidden px-3 py-2 text-center font-semibold">Visualizaciones</th>
              <th className="hidden px-3 py-2 text-center font-semibold">Interacciones</th>
              <th className="hidden px-3 py-2 text-center font-semibold">Compartido</th>
            </tr>
          </thead>
          <tbody className="border">
            {displayProperties?.map((property) => (
              <tr key={property.id} className="bg-third">
                <td className="px-3 py-2 truncate  max-w-[250px] border-r">
                  {property.title}
                </td>
                <td className="border-r">
                  <div className="flex items-center justify-center w-full h-full">
                    <ToggleButton flag={property.isActive} type="isActive" propertyId={property.id} setDisplayProperties={setDisplayProperties} />
                  </div>
                </td>

                <td className="hidden border-r">
                  <div className="flex items-center justify-center w-full h-full">
                    <ToggleButton flag={property.isFeatured} type="isFeatured" propertyId={property.id} setDisplayProperties={setDisplayProperties}/>
                  </div>
                </td>
                <td className="hidden border-r"></td>
                <td className="hidden border-r"></td>
                <td className="hidden border-r"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableProperties;
