export const validateAddPropertyForm = (formData) => {
  const errors = {};

  // Título
  if (!formData.title || formData.title.trim().length < 15) {
    errors.title = "Al menos 15 caracteres";
  }

  // Tipo de propiedad
  if (
    !formData.propertyTypeSlug ||
    formData.propertyTypeSlug.trim().length < 2
  ) {
    errors.propertyTypeSlug = "Seleccionar";
  }

  // Descripción
  if (!formData.description || formData.description.trim().length < 30) {
    errors.description = "Al menos 30 caracteres";
  }

  // Operación
  if (!["sale", "rent", "short-term"].includes(formData.operation)) {
    errors.operation = "Seleccionar";
  }

  // Precio
  if (
    formData.price === "" ||
    isNaN(Number(formData.price)) ||
    Number(formData.price) < 0
  ) {
    errors.price = "Ingresar";
  }

  if (!["ARS", "USD", "EUR", "BRL"].includes(formData.priceFIAT)) {
    errors.priceFIAT = "Seleccionar";
  }

  // Gastos
  if (
    formData.expenses !== "" &&
    (isNaN(Number(formData.expenses)) || Number(formData.expenses) < 0)
  ) {
    errors.expenses = "Ingresar";
  }

  if (
    formData.expensesFIAT &&
    !["ARS", "USD", "EUR", "BRL"].includes(formData.expensesFIAT)
  ) {
    errors.expensesFIAT = "Seleccionar";
  }

  // Condición
  if (!formData.condition) {
    errors.condition = "Seleccionar";
  }

  // Edad
  if (
    !formData.age ||
    (formData.age !== "" &&
      (!Number.isInteger(Number(formData.age)) || Number(formData.age) < 0))
  ) {
    errors.age = "Ingresar";
  }

  // Disponibilidad
  if (!["inmediate", "date"].includes(formData.availabilityType)) {
    errors.availabilityType = "Seleccionar";
  }

  if (formData.availabilityType === "date" && !formData.availabilityDate) {
    errors.availabilityDate = "Ingresar fecha";
  }

  // Superficie
  if (
    formData.surface.covered === "" ||
    isNaN(Number(formData.surface.covered)) ||
    Number(formData.surface.covered) < 0
  ) {
    errors["surface.covered"] = "Ingresar";
  }

  if (
    formData.surface.total === "" ||
    isNaN(Number(formData.surface.total)) ||
    Number(formData.surface.total) < 0
  ) {
    errors["surface.total"] = "Ingresar";
  }

  // Servicios
  ["light", "water", "gas"].forEach((service) => {
    if (typeof formData.services[service] !== "boolean") {
      errors[`services.${service}`] = `Debe seleccionar si tiene ${service}`;
    }
  });

  // Dirección y ubicación
  if (!formData.address || formData.address.trim().length < 5) {
    errors.address = "Ingresar";
  }
  if (
    !formData.place.countryInput ||
    (typeof formData.place.countryInput === "string" &&
      formData.place.countryInput.trim().length < 4)
  ) {
    errors["place.countryInput"] = "Ingresar País";
  }

  if (
    !formData.place.provinceInput ||
    (typeof formData.place.provinceInput === "string" &&
      formData.place.provinceInput.trim().length < 4)
  ) {
    errors["place.provinceInput"] = "Ingresar Provincia";
  }

  if (
    !formData.place.cityInput ||
    (typeof formData.place.cityInput === "string" &&
      formData.place.cityInput.trim().length < 4)
  ) {
    errors["place.cityInput"] = "Ingresar Ciudad";
  }

  if (
    !formData.place.neighborhoodInput ||
    (typeof formData.place.neighborhoodInput === "string" &&
      formData.place.neighborhoodInput.trim().length < 4)
  ) {
    errors["place.neighborhoodInput"] = "Ingresar Barrio";
  }

  if (!formData.mapLocation.lat || !formData.mapLocation.lng) {
    errors.mapLocation = "Subir ubicación";
  }

  // Multimedia
  if (!formData.multimedia.images || formData.multimedia.images.length === 0) {
    errors["multimedia.images"] = "Agregar imágenes";
  }

  // Rooms y comodities opcionales
  if (formData.otherRooms) {
    formData.otherRooms.forEach((room, idx) => {
      if (!room.roomSlug || room.roomSlug.length < 4) {
        errors[`otherRooms.${idx}.roomSlug`] = "Al menos 4 caracteres";
      }
      if (!room.value || Number(room.value) < 1) {
        errors[`otherRooms.${idx}.value`] = "Agregar cantidad válida";
      }
      if (room.size) {
        room.size.forEach((s, i) => {
          if (Number(s) <= 0) {
            errors[`otherRooms.${idx}.size.${i}`] = "Agregar tamaño válido";
          }
        });
      }
    });
  }

  ["rooms", "bedrooms", "bathrooms", "garages"].forEach((field) => {
    if (
      formData[field] !== "" &&
      (isNaN(Number(formData[field])) || Number(formData[field]) <= 0)
    ) {
      errors[field] = "Ingresar un valor válido";
    }
  });

  return errors;
};
