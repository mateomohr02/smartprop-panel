"use client";

import MapPreview from "../FormAddProp/MapPreview";

const MainCard = ({ property }) => {
  console.log(property);

  return (
    <div>
      <p>Título: {property?.title}</p>
      <p>Descripción: {property?.description}</p>
      <p>
        Precio: {property?.price}{" "}
        {property?.priceFIAT === "ARS"
          ? "$"
          : property?.priceFIAT === "USD"
          ? "U$D"
          : property?.priceFIAT === "EUR"
          ? "€"
          : property?.priceFIAT === "BRL"
          ? "R$"
          : ""}
      </p>
      {property?.expenses && (
        <p>
          Expensas: {property?.expenses}{" "}
          {property?.expensesFIAT === "ARS"
            ? "$"
            : property?.expensesFIAT === "USD"
            ? "U$D"
            : property?.expensesFIAT === "EUR"
            ? "€"
            : property?.expensesFIAT === "BRL"
            ? "R$"
            : ""}
        </p>
      )}
      <p>Información de Financiación: {property?.financing}</p>
      <div>
        <p>Superficie Cubierta: {property?.surface?.covered} mts²</p>
        <p>Superficie Total: {property?.surface?.total} mts²</p>
      </div>
      <div>
        <p>Ambientes: {property?.rooms}</p>
        <p>Dormitorios: {property?.bedrooms}</p>
        <p>Baños: {property?.bathrooms}</p>
        <p>Cocheras: {property?.garages}</p>
      </div>
      <div>
        Tipos de Ambientes:{" "}
        {property?.Rooms?.length > 0 ? (
          property?.Rooms.map((room) => <span key={room.id}> {room.name}</span>)
        ) : (
          <span>No se ingresaron tipos de ambientes.</span>
        )}
      </div>
      <div>
        Comodidades:{" "}
        {property?.Comoditiess?.length > 0 ? (
          property?.Comoditiess.map((com) => (
            <span key={com.id}> {com.name}</span>
          ))
        ) : (
          <span>No se ingresaron comodidades.</span>
        )}
      </div>
      <div>
        Características:{" "}
        {property?.Characteristics?.length > 0 ? (
          property?.Characteristics.map((char) => (
            <span key={char.id}> {char.name}</span>
          ))
        ) : (
          <span>No se ingresaron características.</span>
        )}
      </div>

      <div>
        <p>
          Dirección: {property?.address}, {property?.City?.name},{" "}
          {property?.Province?.name}, {property?.Country?.name}
        </p>
        <p>Barrio: {property?.Neighborhood?.name}</p>
      </div>
      <MapPreview property={property} />
    </div>
  );
};

export default MainCard;
