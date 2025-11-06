export const postPropertyRooms = async (  propertyId, rooms, token, tenantId) => {
    const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/properties/add/rooms/${propertyId}`,
    {   
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Tenant-Id": tenantId,
        },
        body: JSON.stringify({"rooms":rooms}),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Error al agergar la información de los ambientes: ${response.status} - ${errorText}`
    );
  }

  const data = await response.json();
  return data;
}