export const fetchGeoInfo = async (latitude: number, longitude: number) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.address
      ? `${data.address.road}, ${data.address.city}`
      : "Not found";
  } catch (error) {
    console.error("Error fetching geolocation data:", error);
    return "Error";
  }
};
