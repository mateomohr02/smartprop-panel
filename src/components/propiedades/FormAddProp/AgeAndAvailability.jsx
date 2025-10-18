import { ChevronDown } from "lucide-react";

const AgeAndAvailability = ({ property, setProperty }) => {
  const availableOptions = [
    { display: "Inmediata", value: "inmediate" },
    { display: "A partir de:", value: "date" },
  ];

  const handleAvailabilityChange = (e) => {
    const value = e.target.value;
    setProperty({
      ...property,
      availabilityType: value,
      availabilityDate:
        value === "date" ? property.availabilityDate || "" : null,
    });
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex flex-row gap-2 ">
        {/* Antigüedad */}
        <div className="w-1/2 flex flex-col gap-1">
          <label htmlFor="age">Antigüedad</label>
          <input
            type="number"
            placeholder="Ingrese los años"
            className="p-2 rounded-sm w-full shadow-sm bg-third"
            value={property.age || ""}
            onChange={(e) => setProperty({ ...property, age: e.target.value })}
          />
        </div>

        {/* Disponibilidad */}
        <div className="w-1/2 flex flex-col gap-1">
          <label htmlFor="availabilityType">Disponibilidad</label>

          <div className="relative w-full">
            <select
              name="availabilityType"
              value={property.availabilityType || ""}
              className="appearance-none w-full p-2 rounded-sm px-3 pr-10 bg-third drop-shadow-sm"
              onChange={handleAvailabilityChange}
            >
              <option value="" disabled>
                Seleccione la Disponibilidad
              </option>
              {availableOptions.map((o) => (
                <option key={`${o.value}-Option`} value={o.value}>
                  {o.display}
                </option>
              ))}
            </select>

            <ChevronDown
              className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
              size={18}
            />
          </div>
        </div>
      </div>
      <div className="w-full">
        {/* Mostrar selector de fecha solo si availabilityType es "date" */}
        {property.availabilityType === "date" && (
          <input
            type="date"
            className="p-2 rounded-sm w-full shadow-sm bg-third mt-2"
            value={property.availabilityDate || ""}
            onChange={(e) =>
              setProperty({ ...property, availabilityDate: e.target.value })
            }
          />
        )}
      </div>
    </div>
  );
};

export default AgeAndAvailability;
