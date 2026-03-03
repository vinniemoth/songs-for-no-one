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
    <div className="flex flex-col md:flex-row min-h-screen bg-black">
      <NavigationBar active="search" />

      <div className="flex flex-col items-center w-full py-5 px-4 md:px-8 pb-24 md:pb-5">
        <header className="text-center mb-6">
          <h1 className="text-white font-bold text-2xl md:text-3xl">
            Search for Dedications
          </h1>
        </header>

        <div className="w-full max-w-md md:max-w-xl">
          <SearchInput />
        </div>

        {!locationQuery ? (
          <div className="mt-20 text-zinc-500 text-center">
            <p>Search for a city to find dedications.</p>
          </div>
        ) : (
          <div className="w-full mt-8">
            <h2 className="text-xl font-bold mb-6 text-white text-center md:text-left">
              Results for: <span className="text-red-500">{locationQuery}</span>
            </h2>

            {isLoading && page === 1 ? (
              <div className="flex justify-center py-10">
                <p className="text-white animate-pulse">Searching...</p>
              </div>
            ) : (
              <>
                {dedications.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-zinc-400">
                      No dedications found in this city.
                    </p>
                  </div>
                ) : (
                  /* Grid responsivo: 1 coluna no mobile, 2 em telas grandes */
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
                    {dedications.map((item) => (
                      <SongCard
                        key={item.id}
                        id={item.id}
                        song={item.songName}
                        artistName={item.artistName}
                        spotifyLink={item.spotifyLink}
                        albumImage={item.albumImage}
                        dedication={item.dedication}
                        location={item.location}
                      />
                    ))}
                  </div>
                )}

                {/* Botão Carregar Mais */}
                <div className="mt-12 flex flex-col items-center pb-10">
                  {hasMore ? (
                    <button
                      onClick={() => loadDedications(locationQuery, page + 1)}
                      disabled={isLoading}
                      className="bg-white text-black px-10 py-3 rounded-full font-bold hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
                    >
                      {isLoading ? "Loading..." : "Load more"}
                    </button>
                  ) : (
                    dedications.length > 0 && (
                      <p className="text-zinc-500 text-sm italic">
                        You reached the end of results for {locationQuery}.
                      </p>
                    )
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
