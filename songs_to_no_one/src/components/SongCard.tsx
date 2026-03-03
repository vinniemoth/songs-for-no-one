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
    <div className="card flex flex-col xs:flex-row p-4 rounded-lg w-full min-h-40 text-white relative gap-2 sm:gap-4 bg-zinc-900/50">
      <div className="relative shrink-0 flex justify-center xs:block">
        <img
          src={props.albumImage}
          alt={props.song}
          className="w-24 h-24 sm:w-30 sm:h-30 rounded-md object-cover shadow-lg"
        />
        <div
          className="bg-green-600 p-3 sm:p-4 rounded-full w-fit absolute -right-3 bottom-0 xs:top-15 xs:-right-6 hover:cursor-pointer hover:bg-green-500 transition-all shadow-xl"
          onClick={() => window.open(props.spotifyLink, "_blank")}
        >
          <FaPlay size={14} className="sm:text-base" />
        </div>
      </div>

      <div className="flex flex-col flex-1 gap-2 sm:gap-4 px-2 sm:px-10 min-w-0 mt-4 xs:mt-0">
        <div className="flex flex-col h-full justify-between min-w-0">
          <div className="flex flex-col min-w-0">
            <h2 className="font-semibold text-lg sm:text-2xl truncate">
              {props.song}
            </h2>
            <p className="text-sm sm:text-md text-zinc-400 truncate">
              {props.artistName}
            </p>

            <p className="mt-2 italic text-sm sm:text-base line-clamp-2 xs:truncate">
              to <strong>{props.dedication}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <FaLocationDot className="text-zinc-500" size={12} />
            <p className="italic text-xs sm:text-sm text-zinc-400 truncate">
              from {props.location}
            </p>
          </div>
        </div>

        {props.onDelete && (
          <button
            onClick={() => props.onDelete!(props.id)}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-zinc-500 hover:text-red-500 transition-colors p-2 hover:cursor-pointer"
            title="Excluir dedicatória"
          >
            <FaTrash size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
