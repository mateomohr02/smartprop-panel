export const putLeadStatus = async (leadId, status, token) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/lead/${leadId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Error al actualizar el estado del lead: ${response.status} - ${errorText}`
    );
  }

  const data = await response.json();
  return data;
};
