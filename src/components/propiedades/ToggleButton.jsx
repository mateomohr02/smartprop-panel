"use client";

import { putProperty } from "@/utils/putProperty";

const ToggleButton = ({ flag, type, propertyId, setDisplayProperties }) => {

  const token = localStorage.getItem("token");
  const tenantId =localStorage.getItem("tenantId")


  const handleClick = async () => {
    // Actualiza en frontend inmediatamente
    setDisplayProperties((prev) =>
      prev.map((property) =>
        property.id === propertyId
          ? { ...property, [type]: !property[type] }
          : property
      )
    );

    try {
      // Mandamos al backend el nuevo estado
      await putProperty({
        id: propertyId,
        [type]: !flag,
      }, token, tenantId);
    } catch (error) {
      console.error("Error al actualizar propiedad:", error);
      // rollback si falla
      setDisplayProperties((prev) =>
        prev.map((property) =>
          property.id === propertyId
            ? { ...property, [type]: flag }
            : property
        )
      );
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-block w-10 h-5 rounded-full relative transition-all duration-200 ${
        flag ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-[2px] left-[2px] w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ${
          flag ? "translate-x-5" : ""
        }`}
      ></span>
    </button>
  );
};

export default ToggleButton;
