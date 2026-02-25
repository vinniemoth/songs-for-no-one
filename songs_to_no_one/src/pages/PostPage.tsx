import { lazy, useEffect, useState } from "react";
import SongInput from "../components/SongInput";
import SongList from "../components/SongList";
import type { Song } from "../types/song";
import NavigationBar from "../components/NavigationBar";
import showNotification from "../utils/notify";
import Toast from "../components/Toast";
const CitySearchInput = lazy(() => import("../components/CitySearchInput"));

export default function PostPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [song, setSong] = useState<Song | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dedication, setDedication] = useState("");
  const [location, setLocation] = useState("");
  const [isReady, setIsReady] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (dedication.trim().length === 0 || location.trim().length === 0) {
      showNotification("All fields required", "error");
      return;
    }
    const url = "http://localhost:3000/dedication";
    const payload = {
      song,
      dedication,
      location,
    };
    console.log(payload);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSong({ name: "", artist: "", album: "" });
        showNotification("Dedication Saved!", "success");
      } else {
        showNotification("Dedication Failed!", "error");
      }
    } catch (error) {
      throw new Error("Error saving on the database");
    }
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSongs([]);
      return;
    }

    const searchSongs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/song/search?q=${searchTerm}`,
        );
        const data = await response.json();
        setSongs(data.result || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      searchSongs();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="flex">
      <NavigationBar active="post" />
      <div className="flex flex-col items-center w-full py-5">
        <h1 className="text-white font-bold text-2xl mb-6">
          Send a Dedicatory
        </h1>

        {!song ? (
          <div className="w-full px-8 max-w-2xl">
            <SongInput searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <SongList
              songs={songs}
              isLoading={isLoading}
              searchTerm={searchTerm}
              onChosenSong={setSearchTerm}
              onSongSelect={(selected) => {
                setSong(selected);
                setTimeout(() => {
                  setIsReady(true);
                }, 100);
              }}
            />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl px-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <div className="flex items-center gap-4 mb-6 bg-zinc-800 p-4 rounded-lg border border-zinc-700">
              <img
                src={song.album}
                className="w-16 h-16 rounded shadow-lg"
                alt="Album"
              />
              <div>
                <p className="text-white font-bold">{song.name}</p>
                <p className="text-zinc-400 text-sm">{song.artist}</p>
              </div>
              <button
                type="button"
                onClick={() => setSong(null)}
                className="ml-auto text-xs text-red-400 hover:underline"
              >
                Change Song
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Where does the person live?
                </label>
                {isReady && <CitySearchInput onChange={setLocation} />}
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Name of the person
                </label>
                <input
                  value={dedication}
                  onChange={(e) => setDedication(e.target.value)}
                  placeholder="Write your dedication..."
                  className="w-full bg-zinc-800 text-white p-3 rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-black font-bold py-3 rounded-full hover:bg-green-400 transition-colors mt-2"
              >
                Post Dedication
              </button>
            </div>
          </form>
        )}
        <Toast />
      </div>
    </div>
  );
}
