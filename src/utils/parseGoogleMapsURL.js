export const parseGoogleMapsUrl = async (url, token, tenantId) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/location/parse`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Tenant-Id": tenantId,
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al obtener la ubicación: ${errorText}`);
  }

  const data = await response.json();
  return data.data || data;
};
