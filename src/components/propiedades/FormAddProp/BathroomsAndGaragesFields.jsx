"use client"

const BathroomsAndGaragesFields = ({ property, setProperty }) => {
  return (
    <div className="flex gap-2 rounded-sm w-full">
      <div className="flex flex-col flex-1 gap-1">
        <label htmlFor="covered">Baños</label>
        <input
          type="text"
          className="p-2 bg-third rounded-sm drop-shadow-sm w-full text-center"
          value={property.bathrooms}
          onChange={(e) =>
            setProperty({
              ...property,
              bathrooms: e.target.value,
            })
          }
        />
      </div>
      <div className="flex flex-col flex-1 gap-1">
        <label htmlFor="total">Garages</label>
        <input
          type="text"
          className="p-2 bg-third rounded-sm drop-shadow-sm w-full text-center"
          value={property.garages}
          onChange={(e) =>
            setProperty({
              ...property,
              garages: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
};

export default BathroomsAndGaragesFields;
