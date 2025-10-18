const ServicesSelector = ({ property, setProperty }) => {
  return (
    <div className="w-full flex flex-col">
      <label htmlFor="services">Servicios</label>
      <div className="flex flex-row justify-evenly gap-1">
        <div className="flex flex-row items-center gap-1">
          <input
          className=""
            type="checkbox"
            checked={property.services.light}
            onChange={() =>
              setProperty({
                ...property,
                services: {
                  ...property.services,
                  light: !property.services.light,
                },
              })
            }
          />
          <label htmlFor="light">Luz</label>
        </div>

        <div className="flex flex-row items-center gap-1">
          <input
            type="checkbox"
            checked={property.services.water}
            onChange={() =>
              setProperty({
                ...property,
                services: {
                  ...property.services,
                  water: !property.services.water,
                },
              })
            }
          />
          <label htmlFor="water">Agua Corriente</label>
        </div>

        <div className="flex flex-row items-center gap-1">
          <input
            type="checkbox"
            checked={property.services.gas}
            onChange={() =>
              setProperty({
                ...property,
                services: {
                  ...property.services,
                  gas: !property.services.gas,
                },
              })
            }
          />
          <label htmlFor="gas">Gas Natural</label>
        </div>
      </div>
    </div>
  );
};

export default ServicesSelector;
