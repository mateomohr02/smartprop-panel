import { stringToNumberParser } from "@/helpers/stringToNumberParser";

export const parseNumericFields = (property) => {
  return {
    ...property,
    price: stringToNumberParser(property.price),
    expenses: property.expenses ? stringToNumberParser(property.expenses) : null,
    surface: {
      ...property.surface,
      covered: stringToNumberParser(property.surface?.covered),
      total: stringToNumberParser(property.surface?.total),
    },
    mapLocation: {
      ...property.mapLocation,
      lat: stringToNumberParser(property.mapLocation?.lat),
      lng: stringToNumberParser(property.mapLocation?.lng),
    },
    age: stringToNumberParser(property.age),
    rooms: stringToNumberParser(property.rooms),
    bedrooms: stringToNumberParser(property.bedrooms),
    bathrooms: stringToNumberParser(property.bathrooms),
  };
};
