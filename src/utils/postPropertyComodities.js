export const postPropertyComodities = async ( propertyId, comodities, token, tenantId) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/properties/add/comodities/${propertyId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Tenant-Id": tenantId,
      },
      body: JSON.stringify({"comodities":comodities}),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Error al agergar las comodidades: ${response.status} - ${errorText}`
    );
  }
  const data = await response.json();
  return data;
};
