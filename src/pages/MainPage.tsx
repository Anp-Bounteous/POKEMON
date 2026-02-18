import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList, fetchPokemonDetails } from "../api/pokemon";
import PokemonBox from "../components/PokemonBox";
import PokemonModal from "../components/PokemonModal";
import SearchInput from "../components/SearchInput";
import { useAppState } from "../store/appState";
import InfiniteScroll from "react-infinite-scroll-component";
import type { Pokemon, PokemonDetails } from "@/api/fetchPokemon";
 
const MainPage: React.FC = () => {
  const search = useAppState((state) => state.search) || "";
 
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
 
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [modalDetails, setModalDetails] = useState<PokemonDetails | null>(null);
 
  // Fetch Pokémon batch
  const fetchMore = async () => {
    const data = await fetchPokemonList(offset, 20);
    setPokemonList((prev) => [...prev, ...data.results]);
    setOffset(offset + 20);
    if (!data.next) setHasMore(false);
  };
 
  // Initial fetch using TanStack Query for caching & performance
  useQuery({
    queryKey: ["initial-pokemon"],
    queryFn: () => fetchMore(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
 
  const handleClick = async (name: string) => {
    const details = await fetchPokemonDetails(name);
    setModalDetails(details);
    setSelectedPokemon(name);
  };
 
  // Filtered list by search
  const filtered = pokemonList.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
 
  return (
    <div className="max-w-4xl mx-auto p-4">
      <SearchInput />
 
      <InfiniteScroll
        dataLength={filtered.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={<p className="text-center mt-4">Loading more Pokémon...</p>}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <PokemonBox key={p.name} pokemon={p} onClick={() => handleClick(p.name)} />
          ))}
        </div>
      </InfiniteScroll>
 
      {selectedPokemon && modalDetails && (
        <PokemonModal
          name={selectedPokemon}
          details={modalDetails}
          onClose={() => {
            setSelectedPokemon(null);
            setModalDetails(null);
          }}
        />
      )}
    </div>
  );
};
 
export default MainPage;




