import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import type { Dedication } from "../types/dedication";
import SongCard from "../components/SongCard";
import NavigationBar from "../components/NavigationBar";
import SearchInput from "../components/SearchInput";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const [dedications, setDedications] = useState<Dedication[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const locationQuery = searchParams.get("location");

  const loadDedications = async (query: string, pageToLoad: number) => {
    if (!query || isLoading) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/dedication?location=${encodeURIComponent(query)}&page=${pageToLoad}`,
      );
      const newData = await response.json();
      const entries = newData.data;

      if (entries.length < 10) {
        setHasMore(false);
      }

      setDedications((prev) =>
        pageToLoad === 1 ? entries : [...prev, ...entries],
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (locationQuery) {
      setDedications([]);
      setPage(1);
      setHasMore(true);
    }
  }, [locationQuery]);

  useEffect(() => {
    if (page === 1 && locationQuery) {
      loadDedications(locationQuery, page);
    }
  }, [page, locationQuery]);

  return (
    <div className="flex">
      <NavigationBar active="search" />
      <div className="flex flex-col items-center w-full py-5 px-8">
        <h1 className="text-white font-bold text-2xl">
          Search for Dedications
        </h1>
        <SearchInput />
        {!locationQuery ? (
          ""
        ) : (
          <div className="p-10">
            <h1 className="text-xl font-bold mb-4 text-white">
              Results for: {locationQuery}
            </h1>

            {isLoading && <p>Carregando...</p>}

            {!isLoading && dedications.length === 0 && (
              <p className="text-white">
                Nenhuma dedicatória encontrada nesta cidade.
              </p>
            )}

            <div className="flex flex-wrap gap-4">
              {dedications.map((item) => (
                <div key={item.id} className="flex w-130">
                  <SongCard
                    id={item.id}
                    song={item.songName}
                    artistName={item.artistName}
                    spotifyLink={item.spotifyLink}
                    albumImage={item.albumImage}
                    dedication={item.dedication}
                    location={item.location}
                  />
                </div>
              ))}
            </div>
            <div className="mt-10 flex justify-center pb-10">
              {hasMore ? (
                <button
                  onClick={() => loadDedications(locationQuery, page + 1)}
                  disabled={isLoading}
                  className="bg-white text-black px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform disabled:opacity-50"
                >
                  {isLoading ? "Carregando..." : "Carregar mais"}
                </button>
              ) : (
                <p className="text-zinc-500 block">
                  You reached the end of results for {locationQuery}.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
