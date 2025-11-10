export const fetchPropertyDetail = async (propertyId, token, tenantId) => {

    console.log(propertyId, 'en fx');
    

    const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/properties/detail/${propertyId}`,
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
    
    console.log(data.propertyDetail);
    

    return data.propertyDetail;
  } else {
    throw new Error("Failed to fetch properties");
  }

}