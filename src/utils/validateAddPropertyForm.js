export const validateAddPropertyForm = (formData) => {
  const errors = {
    initialData: {},
    data: {},
    location: {},
    multimedia: {},
    comodities: [],
    characteristics: [],
    rooms: [],
  };

  // --- INITIAL DATA ---
  if (!formData.initialData.title || formData.initialData.title.trim().length < 15) {
    errors.initialData.title = "Al menos 15 caracteres";
  }

  if (
    !formData.initialData.propertyType ||
    !formData.initialData.propertyType.value ||
    formData.initialData.propertyType.value.trim().length < 2
  ) {
    errors.initialData.propertyType = "Seleccionar tipo de propiedad";
  }

  if (!formData.initialData.description || formData.initialData.description.trim().length < 30) {
    errors.initialData.description = "Al menos 30 caracteres";
  }

  // --- DATA ---
  const data = formData.data || {};

  if (!data.price?.value || isNaN(Number(data.price.value)) || Number(data.price.value) <= 0) {
    errors.data.price = "Ingresar precio válido";
  }

  if (!["ARS", "USD", "EUR", "BRL"].includes(data.price?.currency)) {
    errors.data.priceCurrency = "Seleccionar";
  }

  if (data.expenses !== null && (isNaN(Number(data.expenses.value)) || Number(data.expenses.value) < 0)) {
    errors.data.expenses = "Ingresar gastos válidos";
  }
  if (data.expenses !== null && !(["ARS", "USD", "EUR", "BRL"].includes(data.expenses?.currency))) {
    errors.data.expensesCurrency = "Seleccionar";
  }

  if (data.operation === null || !(data.operation == "sale" || data.operation == "rent" || data.operation == "short-term")) {
    errors.data.operation = "Seleccionar operación";
  }

  if (!data.condition || !(data.condition === "new" || data.condition === "like-new" || data.condition === "good" || data.condition === "to-renovate")) {
    errors.data.condition = "Seleccionar condición";
  }

  if (
    data.age === null || data.age === "" ||
    (!Number.isInteger(Number(data.age)) || Number(data.age) < 0)
  ) {
    errors.data.age = "Ingresar";
  }

  if (!["inmediate", "date"].includes(data.availability?.type)) {
    errors.data.availability = "Seleccionar";
  }

  if (data.availability?.type === "date" && !data.availability?.date) {
    errors.data.availabilityDate = "Ingresar fecha";
  }

  if (
    data.surface?.covered === null ||
    isNaN(Number(data.surface.covered)) ||
    Number(data.surface.covered) < 0
  ) {
    errors.data.surfaceCovered = "Ingresar";
  }

  if (
    data.surface?.total === null ||
    isNaN(Number(data.surface.total)) ||
    Number(data.surface.total) < 0 || 
    data.surface.total < data.surface.covered
  ) {
    errors.data.surfaceTotal = "Ingresar";
  }

  ["light", "water", "gas"].forEach((service) => {
    if (typeof data.services?.[service] !== "boolean") {
      errors.data[`service_${service}`] = `Debe seleccionar si tiene ${service}`;
    }
  });

  ["rooms", "bedrooms", "bathrooms", "garages"].forEach((field) => {
    if (
      data[field] === null ||
      data[field] === "" &&
      (isNaN(Number(data[field])) || Number(data[field]) <= 0)
    ) {
      errors.data[field] = "Ingresar";
    }
  });

  // --- LOCATION ---
  const location = formData.location || {};

  if (!location.country?.value) {
    errors.location.country = "Ingresar país";
  }

  if (!location.province?.value) {
    errors.location.province = "Ingresar provincia";
  }

  if (!location.city?.value) {
    errors.location.city = "Ingresar ciudad";
  }

  if (!location.neighborhood?.value) {
    errors.location.neighborhood = "Ingresar barrio";
  }

  console.log(location, 'address');
  
  if (!location.address || location.address.trim().length < 5) {
    errors.location.address = "Ingresar dirección válida";
  }

  if (
    !location.mapLocation ||
    isNaN(Number(location.mapLocation.lat)) ||
    isNaN(Number(location.mapLocation.lng))
  ) {
    errors.location.mapLocation = "Ubicación no válida";
  }

  // --- MULTIMEDIA ---
  if (!formData.multimedia.images || formData.multimedia.images.length === 0) {
    errors.multimedia.images = "Agregar al menos una imagen";
  }

  // --- ROOMS OPCIONALES ---
  if (formData.rooms && Array.isArray(formData.rooms)) {
    errors.rooms = formData.rooms.map((room) => {
      const roomErrors = {};
      if (!room.value || room.value.trim().length < 3) {
        roomErrors.value = "Al menos 3 caracteres";
      }
      if (room.quantity !== undefined && (isNaN(room.quantity) || room.quantity < 1)) {
        roomErrors.quantity = "Cantidad inválida";
      }
      if (room.size && Array.isArray(room.size)) {
        room.size.forEach((s, i) => {
          if (isNaN(Number(s)) || Number(s) <= 0) {
            roomErrors[`size_${i}`] = "Tamaño inválido";
          }
        });
      }
      return roomErrors;
    });
  }

  // --- COMODITIES Y CHARACTERISTICS ---
  if (formData.comodities && Array.isArray(formData.comodities)) {
    errors.comodities = formData.comodities.map((c) =>
      !c.value || c.value.trim().length < 3 ? { value: "Campo inválido" } : {}
    );
  }

  if (formData.characteristics && Array.isArray(formData.characteristics)) {
    errors.characteristics = formData.characteristics.map((c) =>
      !c.value || c.value.trim().length < 3 ? { value: "Campo inválido" } : {}
    );
  }

  return errors;
};
