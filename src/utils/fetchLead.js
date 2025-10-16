export const fetchLead = async (leadId, token, tenantId) => {


  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/lead/${leadId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Tenant-Id": tenantId,
      }
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al obtener la consulta: ${errorText}`);
  }

  const data = await response.json();
  return data.data || data;
};
