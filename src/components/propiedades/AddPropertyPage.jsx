"use client";

import { useState } from "react";

import FormAddProperty from "./FormAddProp/FormAddProperty";

const AddPropertyPage = () => {
  const [newProperty, setNewProperty] = useState({
    initialData: {
      title: null,
      description: null,
      propertyType: null,
    },
    data: {
      price: { currency: "USD", value: null },
      expenses: { currency: null, value: null },
      financing: "Consultar",
      rooms: null,
      bedrooms: null,
      bathrooms: null,
      garages: null,
      surface: {
        covered: null,
        total: null,
      },
      services: {
        light: true,
        water: true,
        gas: true,
      },
      condition: null,
      age: null,
      availability: { type: "inmediate", date: null },
    },
    location: {
        country:null,
        province:null,
        city:null,
        neighborhood:null,
        address:null
    },
    multimedia: {images:[], videos:[]},
    comodities: [],
    characteristics: [],
    rooms: [],
  });

  return (
    <div className="p-2">
      <FormAddProperty property={newProperty} setProperty={setNewProperty} />
    </div>
  );
};

export default AddPropertyPage;
