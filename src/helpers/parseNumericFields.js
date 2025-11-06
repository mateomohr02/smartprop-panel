import { stringToNumberParser } from "@/helpers/stringToNumberParser";

export const parseNumericFields = (property) => {
  if (!property) return property;

  return {
    ...property,
    price: property.price
      ? {
          ...property.price,
          value: stringToNumberParser(property.price.value),
        }
      : null,
    expenses: property.expenses
      ? {
          ...property.expenses,
          value: stringToNumberParser(property.expenses.value),
        }
      : null,
    surface: property.surface
      ? {
          ...property.surface,
          covered: stringToNumberParser(property.surface.covered),
          total: stringToNumberParser(property.surface.total),
        }
      : null,
    mapLocation: property.mapLocation
      ? {
          ...property.mapLocation,
          lat: stringToNumberParser(property.mapLocation.lat),
          lng: stringToNumberParser(property.mapLocation.lng),
        }
      : null,
    age: stringToNumberParser(property.age),
    rooms: stringToNumberParser(property.rooms),
    bedrooms: stringToNumberParser(property.bedrooms),
    bathrooms: stringToNumberParser(property.bathrooms),
  };
};
