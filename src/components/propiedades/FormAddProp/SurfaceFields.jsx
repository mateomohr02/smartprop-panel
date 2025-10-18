"use client"

const SurfaceFields = ({ property, setProperty }) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="w-full flex flex-row justify-between">
        <label htmlFor="surface">Superfice</label>
        <label className="text-gray-500">mts²</label>
      </div>
      <div className="border border-gray-200 px-2 pb-2 py-1 flex gap-2 rounded-sm">
        <div className="flex flex-col flex-1 gap-1">
          <label htmlFor="covered">Cubierta</label>
          <input
            type="text"
            className="p-2 bg-third rounded-sm drop-shadow-sm w-full"
            value={property.surface.covered}
            onChange={(e) =>
              setProperty({
                ...property,
                surface: {
                  ...property.surface,
                  covered: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="flex flex-col flex-1 gap-1">
          <label htmlFor="total">Total</label>
          <input
            type="text"
            className="p-2 bg-third rounded-sm drop-shadow-sm w-full"
            value={property.surface.total}
            onChange={(e) =>
              setProperty({
                ...property,
                surface: {
                  ...property.surface,
                  total: e.target.value,
                },
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SurfaceFields;
