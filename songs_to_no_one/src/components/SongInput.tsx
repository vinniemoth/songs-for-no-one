import { FaMusic } from "react-icons/fa";

interface SongInputProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function SongInput({
  searchTerm,
  onSearchChange,
}: SongInputProps) {
  return (
    <div className="relative flex flex-col items-center justify-center w-full m-2 px-8">
      <input
        type="text"
        className="bg-white rounded-lg h-10 w-full px-8 outline-none"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search for a song..."
      />
      <FaMusic className="absolute left-10" color="grey" />
    </div>
  );
}
