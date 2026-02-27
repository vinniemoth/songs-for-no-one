import { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import type { userProfile } from "../types/userProfile";
import SongCard from "../components/SongCard";
import type { Dedication } from "../types/dedication";

export default function ProfilePage() {
  const [user, setUser] = useState<userProfile | null>(null);
  const [dedications, setDedications] = useState<Dedication[]>([]);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setUser(data);
    setDedications(data.dedications || []);

    return data;
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="flex">
      <NavigationBar active="user" />
      {user && (
        <div className="flex flex-col p-4 w-full">
          <div className="mb-6 text-white">
            <p className="text-xl font-bold">{user.username}</p>
            <p className="text-zinc-400">{user.email}</p>
          </div>
          <h2 className="text-lg text-center font-semibold mb-4 text-white">
            My dedications
          </h2>
          <div className="flex flex-wrap gap-4 w-full text-white">
            {dedications &&
              dedications.map((d) => (
                <div key={d.id} className="flex w-130">
                  <SongCard
                    song={d.songName}
                    artistName={d.artistName}
                    spotifyLink={d.spotifyLink}
                    albumImage={d.albumImage}
                    dedication={d.dedication}
                    location={d.location}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
