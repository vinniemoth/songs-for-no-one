async function getSpotifyToken() {
  const url = "https://accounts.spotify.com/api/token";

  const data = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  });

  const result = await response.json();
  return result.access_token;
}

async function searchTracks(query) {
  const token = await getSpotifyToken();
  const url = `https://api.spotify.com/v1/search?q=${query}&type=track&market=BR&limit=10`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();
  const simpleResult = result.tracks.items.map((item) => {
    return {
      name: item.name,
      artist: item.artists[0].name,
      album: item.album.images[0].url,
      link: item.external_urls.spotify,
    };
  });

  return simpleResult;
}

export default { getSpotifyToken, searchTracks };
