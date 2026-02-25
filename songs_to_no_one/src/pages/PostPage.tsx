import { useEffect, useState } from "react";
import SongInput from "../components/SongInput";
import SongList from "../components/SongList";
import ChosenSong from "../components/ChosenSong";
import type { Song } from "../types/song";
import DedicatoryInput from "../components/DedicatoryInput";
import NavigationBar from "../components/NavigationBar";
import useNotification from "../hooks/useNotification";
import Toast from "../components/Toast";

export default function PostPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [song, setSong] = useState<Song>({ name: "", artist: "", album: "" });
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [dedication, setDedication] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (dedication.trim().length === 0 || location.trim().length === 0) {
      useNotification("All fields required", "error");
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
        useNotification("Dedication Saved!", "success");
      } else {
        useNotification("Dedication Failed!", "error");
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
      <div className="flex flex-col items-center w-full py-5 ">
        <h1 className="text-white font-bold text-2xl">Send a Dedicatory</h1>
        <SongInput searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <div className="px-8 w-full">
          <SongList
            songs={songs}
            isLoading={isLoading}
            searchTerm={searchTerm}
            onChosenSong={setSearchTerm}
            onSongSelect={setSong}
          />
        </div>
        {song.name !== "" && (
          <div className="bg-zinc-400 flex justify-between items-center m-2 gap-30 rounded-lg">
            <div className="flex">
              <ChosenSong song={song} />
            </div>
            <DedicatoryInput
              onDedicationChange={setDedication}
              onLocationChange={setLocation}
              onSubmit={handleSubmit}
            />
          </div>
        )}
      </div>
      <Toast />
    </div>
  );
}
