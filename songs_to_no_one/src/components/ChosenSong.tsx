import type { Song } from "../types/song";

interface ChosenSongProps {
  song: Song;
}

export default function ChosenSong(props: ChosenSongProps) {
  return (
    <>
      <img
        src={props.song.album}
        alt=""
        className="w-50 h-50 p-2 rounded-2xl"
      />
      <div className="p-2">
        <p className="font-bold">{props.song.name}</p>
        <p>{props.song.artist}</p>
      </div>
    </>
  );
}
