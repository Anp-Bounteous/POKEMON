import React, { useState } from "react";
import { useAppState } from "../store/appState";
import { inputCheck } from "../validation/inputCheck";

const SearchInput: React.FC = () => {
  const [input, setInput] = useState("");
  const setSearch = useAppState((state) => state.setSearch);

  const handleSearch = () => {
    const result = inputCheck.safeParse({ name: input });
    if (!result.success) {
      alert(result.error.issues[0].message);
      return;
    }
    setSearch(input.toLowerCase());
  };

  return (
    <div className="flex justify-center gap-2 mb-4">
      <input
        type="text"
        placeholder="Search Pokémon"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border rounded p-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white font-bold px-4 rounded hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;

