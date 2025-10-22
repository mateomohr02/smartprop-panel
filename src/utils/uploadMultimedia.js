export const uploadMultimedia = async (formData, token, tenantId) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/properties/multimedia/upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Tenant-Id": tenantId,
      },
      body: formData, // el navegador define el boundary
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al subir multimedia: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  console.log("Uploaded multimedia response:", data);
  return data;
};
