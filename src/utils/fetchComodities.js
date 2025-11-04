export const fetchComodities = async (token, tenantId) => {
    const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/comodities`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Tenant-Id": tenantId,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();

    return data.comodities;
  } else {
    throw new Error("Failed to fetch comodities");
  }

}