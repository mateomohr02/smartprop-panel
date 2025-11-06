export const postPropertyInitialData = async (
  propertyData,
  token,
  tenantId
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/properties/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Tenant-Id": tenantId,
      },
      body: JSON.stringify(propertyData),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Error al agergar la propiedad: ${response.status} - ${errorText}`
    );
  }

  const data = await response.json();
  return data;
};
