export const putProperty = async (property, token, tenantId) => {

    console.log(property, token, tenantId, 'fx');
    

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/properties/edit`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Tenant-Id": tenantId,
      },
      body: JSON.stringify(property), // ya pasamos directamente {id, isActive: true/false}
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Error al actualizar la propiedad: ${response.status} - ${errorText}`
    );
  }

  const data = await response.json();
  return data;
};
