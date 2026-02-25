export const searchCities = async (query: string) => {
  if (query.length < 3) return [];

  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "SongsToNoOneApp",
      },
    });
    const data = await response.json();
    return data.map((item: any) => {
      const city =
        item.address.city ||
        item.address.town ||
        item.address.village ||
        item.address.municipality;
      const state = item.address.state;
      const country = item.address.country;

      const label = state
        ? `${city} - ${state} - ${country}`
        : `${city} - ${country}`;

      return {
        label: label,
        value: label,
      };
    });
  } catch (error) {
    console.error("Error during city search:", error);
    return [];
  }
};
