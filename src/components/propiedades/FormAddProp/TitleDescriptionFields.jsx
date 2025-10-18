"use client";

import React from "react";

const TitleDescriptionFields = ({ property, setProperty }) => {
  return (
    <div className="w-full gap-2 flex flex-col">
      <div className="flex flex-col w-full gap-1">
        <label htmlFor="title">Título</label>
        <input
          type="text"
          name="title"
          placeholder="Ingrese el título de la propiedad"
          id="title"
          className="bg-third rounded-sm p-2 drop-shadow-sm"
          value={property.title}
          onChange={(e) => setProperty({ ...property, title: e.target.value })}
        />
      </div>

      <div className="flex flex-col w-full gap-1">
        <label htmlFor="description">Descripción</label>
        <textarea
          name="description"
          placeholder="Ingrese la descripción."
          id="description"
          className="bg-third rounded-sm p-2 drop-shadow-sm max-h-[200px]"
          value={property.description}
          onChange={(e) =>
            setProperty({ ...property, description: e.target.value })
          }
        />
      </div>
    </div>
  );
};

export default TitleDescriptionFields;
