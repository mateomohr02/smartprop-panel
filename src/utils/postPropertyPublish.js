export const postPropertyPublish = async (propertyId, token, tenantId) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/properties/publish/${propertyId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Tenant-Id": tenantId,
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Error al publicar la propiedad: ${response.status} - ${errorText}`
    );
  }

  const data = await response.json();
  return data;

};
