export const fetchOtherRooms = async (token, tenantId) => {
    const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/rooms`,
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

    return data.rooms;
  } else {
    throw new Error("Failed to fetch other rooms");
  }
}