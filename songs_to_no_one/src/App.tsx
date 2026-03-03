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
      setLastDedication(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFeaturedDedication = async () => {
    try {
      const response = await fetch("http://localhost:3000/dedication/featured");
      const data = await response.json();
      setFeaturedDedication(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMostRecentDedication();
    fetchFeaturedDedication();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black">
      <NavigationBar active="home" />

      <div className="flex-1 text-white">
        <header className="flex w-full justify-center py-8">
          <h1 className="text-red-500 font-extrabold text-3xl md:text-4xl tracking-tighter">
            Songs For No One
          </h1>
        </header>

        <main className="space-y-10 pb-20">
          {/* Seção Recent */}
          <section className="flex flex-col items-center w-full">
            <h2 className="text-lg md:text-xl font-medium opacity-80">
              Most recent dedication:
            </h2>
            <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl p-4">
              {!lastDedication ? (
                <h1 className="text-center italic">Nothing found</h1>
              ) : (
                <SongCard song={lastDedication.songName} {...lastDedication} />
              )}
            </div>
          </section>

          {/* Seção Featured */}
          <section className="flex flex-col items-center w-full">
            <h2 className="text-lg md:text-xl font-medium opacity-80">
              Featured song:
            </h2>
            <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl p-4">
              {!featuredDedication ? (
                <h1 className="text-center italic">Nothing found</h1>
              ) : (
                <SongCard
                  song={featuredDedication.songName}
                  {...featuredDedication}
                  dedication="a lot of people"
                  location="around the world"
                />
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
