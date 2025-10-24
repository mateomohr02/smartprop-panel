import { putProperty } from "@/utils/putProperty";

const ToggleButtonDetailCard = ({ flag, type, propertyId, setDisplayProperty }) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const tenantId = typeof window !== "undefined" ? localStorage.getItem("tenantId") : null;

  const handleClick = async () => {
    const newValue = !flag;

    // Actualizar estado local inmediatamente (optimistic update)
    setDisplayProperty((prev) => ({
      ...prev,
      [type]: newValue,
    }));

    try {
      await putProperty(
        {
          id: propertyId,
          [type]: newValue,
        },
        token,
        tenantId
      );
    } catch (error) {
      console.error("Error al actualizar propiedad:", error);

      // Revertir si hubo error
      setDisplayProperty((prev) => ({
        ...prev,
        [type]: flag,
      }));
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-block w-10 h-5 rounded-full cursor-pointer relative transition-all duration-200 ${
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

export default ToggleButtonDetailCard;
