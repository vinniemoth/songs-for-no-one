import type { Song } from "../types/song";

interface SongListProps {
  songs: Song[];
  isLoading: boolean;
  searchTerm: string;
  onSongSelect: (song: Song) => void;
  onChosenSong: (value: string) => void;
}

export default function SongList(props: SongListProps) {
  if (props.searchTerm.trim().length === 0) return null;

  return (
    <div className="bg-zinc-400 w-full rounded-md p-2 mt-2">
      <ul className="divide-y divide-zinc-500">
        {props.isLoading ? (
          <li className="flex items-center p-2 animate-pulse">
            <div className="w-20 h-20 bg-zinc-600 rounded-sm mr-4" />
            <div className="flex flex-col gap-2">
              <div className="h-4 w-32 bg-zinc-600 rounded" />
              <div className="h-3 w-20 bg-zinc-600 rounded" />
            </div>
          </li>
        ) : (
          props.songs.map((song, index) => (
            <li
              key={index}
              className="flex p-2 w-full hover:bg-zinc-600 hover:cursor-pointer transition-colors rounded-md"
              onClick={() => {
                props.onSongSelect(song);
                props.onChosenSong("");
              }}
            >
              <img
                src={song.album}
                className="w-20 h-20 rounded-sm mr-4 object-cover"
                alt={song.name}
              />
              <div className="flex flex-col px-2 justify-center text-white">
                <h3 className="font-bold text-lg">{song.name}</h3>
                <p className="text-zinc-200">{song.artist}</p>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
