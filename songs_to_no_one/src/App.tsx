import { useEffect, useState } from "react";
import NavigationBar from "./components/NavigationBar";
import SongCard from "./components/SongCard";
import type { Dedication } from "./types/dedication";

export default function App() {
  const [lastDedication, setLastDedication] = useState<Dedication>({
    id: "",
    songName: "",
    artistName: "",
    albumImage: "",
    spotifyLink: "",
    dedication: "",
    location: "",
  });
  const [featuredDedication, setFeaturedDedication] = useState<Dedication>({
    id: "",
    songName: "",
    artistName: "",
    albumImage: "",
    spotifyLink: "",
    dedication: "",
    location: "",
  });

  const fetchMostRecentDedication = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/dedication/most_recent",
      );
      const data = await response.json();
      setLastDedication(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFeaturedDedication = async () => {
    try {
      const response = await fetch("http://localhost:3000/dedication/featured");
      const data = await response.json();
      setFeaturedDedication(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMostRecentDedication();
    fetchFeaturedDedication();
  }, []);

  return (
    <div className="flex">
      <NavigationBar active="home"></NavigationBar>
      <div className="w-full text-white">
        <header className="min-h-100vh flex w-full justify-center py-5">
          <h1 className="text-red-500 font-extrabold text-2xl">
            Songs For No One
          </h1>
        </header>
        <main>
          <div className="flex flex-col items-center w-full">
            <h1 className="text-xl">Most recent dedication:</h1>
            <div className="w-1/2 p-5">
              {!lastDedication ? (
                <h1>Nothing found</h1>
              ) : (
                <SongCard
                  song={lastDedication.songName}
                  artistName={lastDedication.artistName}
                  albumImage={lastDedication.albumImage}
                  spotifyLink={lastDedication.spotifyLink}
                  dedication={lastDedication.dedication}
                  location={lastDedication.location}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col items-center w-full">
            <h1 className="text-xl">Featured song:</h1>
            <div className="w-1/2 p-5">
              {!featuredDedication ? (
                <h1>Nothing found</h1>
              ) : (
                <SongCard
                  song={featuredDedication.songName}
                  artistName={featuredDedication.artistName}
                  albumImage={featuredDedication.albumImage}
                  spotifyLink={featuredDedication.spotifyLink}
                  dedication="a lot of people"
                  location="around the world"
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
