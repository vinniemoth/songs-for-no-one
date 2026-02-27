import { FaPlay, FaTrash } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

interface SongCardProps {
  id: string;
  song: string;
  artistName: string;
  albumImage: string;
  spotifyLink: string;
  dedication: string;
  location: string;
  onDelete?: (id: string) => void;
}

export default function SongCard(props: SongCardProps) {
  return (
    <div className="card flex p-4 rounded-lg w-full h-40 text-white relative">
      <div className="relative shrink-0">
        <img
          src={props.albumImage}
          alt={props.song}
          className="w-30 h-30 rounded-md object-fill "
        />
        <div
          className="bg-green-700 p-4 rounded-full w-fit absolute -right-6 top-15 hover:cursor-pointer"
          onClick={() => window.open(props.spotifyLink, "_blank")}
        >
          <FaPlay></FaPlay>
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-4 px-10 min-w-0">
        <div className="flex flex-col h-full justify-between min-w-0">
          <div className="flex flex-col min-w-0">
            <h2 className="font-semibold text-2xl truncate">{props.song}</h2>
            <p className="text-md text-zinc-400 truncate">{props.artistName}</p>
            <p className="mt-2 italic truncate">
              to <strong>{props.dedication}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <FaLocationDot color="grey" />
            <p className="italic truncate text-sm">from {props.location}</p>
          </div>
        </div>
        {props.onDelete && (
          <button
            onClick={() => {
              props.onDelete!(props.id);
            }}
            className="absolute top-4 right-4 text-zinc-500 hover:text-red-500 transition-colors p-1 hover:cursor-pointer"
            title="Excluir dedicatória"
          >
            <FaTrash size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
