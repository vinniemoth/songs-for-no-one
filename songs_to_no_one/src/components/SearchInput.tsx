import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router";

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim().length > 0) {
      navigate(`/search?location=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleEnterKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="w-full relative m-2">
        <input
          className="bg-white rounded-lg h-10 w-full px-8 outline-none"
          type="text"
          placeholder="Search for a city..."
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleEnterKey}
        />
        <FaLocationDot color={"grey"} className="absolute top-3 left-2" />
        <div
          className="absolute top-3 right-2 hover:cursor-pointer"
          onClick={handleSearch}
        >
          <FaSearch />
        </div>
      </div>
    </>
  );
}
