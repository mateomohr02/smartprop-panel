export const sendPropertyMultimedia = async (propertyId, multimedia, token, tenantId) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/properties/add/multimedia/${propertyId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Tenant-Id": tenantId,
        },
        body: JSON.stringify({"multimedia":multimedia}),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al agergar la ubicación de la propiedad: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data;

}