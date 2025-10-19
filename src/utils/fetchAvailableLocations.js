// utils/fetchAvailableLocations.js
export default async function fetchAvailableLocations(fatherLocation, token, tenantId) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/locations`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Tenant-Id": tenantId,
      },
      body: fatherLocation ? JSON.stringify(fatherLocation) : null,
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al obtener ubicaciones: ${errorText}`);
  }

  const data = await response.json();
  return data.data || data;
}
