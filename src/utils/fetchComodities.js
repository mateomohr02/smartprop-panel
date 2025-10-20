export const fetchComodities = async (token, tenantId) => {
    const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/properties/comodities`,
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
    console.log(data);
    return data;
  } else {
    throw new Error("Failed to fetch comodities");
  }

}