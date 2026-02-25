import { useState, useEffect } from "react";

interface CitySearchProps {
  onChange: (value: string) => void;
}

export default function CitySearchInput({ onChange }: CitySearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!query || query.length < 3) {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5&featuretype=city`,
          { headers: { "User-Agent": "LettersToNoOne-App" } },
        );
        const data = await response.json();
        setResults(data);
        setIsOpen(true);
      } catch (error) {
        console.error("Search error:", error);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSelect = (displayName: string) => {
    const safeValue = displayName || "";
    setQuery(displayName);
    onChange(displayName);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query || ""}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type city name..."
        className="w-full bg-zinc-800 text-white p-3 rounded-lg border border-zinc-700 focus:ring-2 focus:ring-green-500 outline-none"
      />

      {isOpen && results.length > 0 && (
        <ul className="absolute z-50 w-full bg-zinc-900 border border-zinc-700 mt-1 rounded-lg shadow-xl max-h-60 overflow-y-auto">
          {results.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                handleSelect(
                  `${item.name}, ${item.address.state} - ${item.address.country}`,
                );
                console.log(
                  `${item.name}, ${item.address.state} - ${item.address.country}`,
                );
              }}
              className="p-3 text-white hover:bg-zinc-700 cursor-pointer border-b border-zinc-800 last:border-none text-sm"
            >
              {item.name}, {item.address.state} - {item.address.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
