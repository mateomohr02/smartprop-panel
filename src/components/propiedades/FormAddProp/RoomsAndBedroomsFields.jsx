"use client"

const RoomsAndBedroomsFields = ({property, setProperty}) => {
  return (
    <div className="flex gap-2 rounded-sm">
        <div className="flex flex-col flex-1 gap-1">
          <label htmlFor="covered">Ambientes</label>
          <input
            type="text"
            className="p-2 bg-third rounded-sm drop-shadow-sm w-full text-center"
            value={property.rooms}
            onChange={(e) =>
              setProperty({
                ...property,
                rooms: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col flex-1 gap-1">
          <label htmlFor="total">Dormitiorios</label>
          <input
            type="text"
            className="p-2 bg-third rounded-sm drop-shadow-sm w-full text-center"
            value={property.bedrooms}
            onChange={(e) =>
              setProperty({
                ...property,
                bedrooms: e.target.value,
              })
            }
          />
        </div>
      </div>
  )
}

export default RoomsAndBedroomsFields