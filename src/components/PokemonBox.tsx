import type { Pokemon } from "@/api/fetchPokemon";
import React from "react";

interface Props {
  pokemon: Pokemon;
  onClick?: () => void;
}

const PokemonBox: React.FC<Props> = ({ pokemon, onClick }) => {
  const id = pokemon.url.split("/").filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div
      onClick={onClick}
      className="pokemon-box cursor-pointer bg-white p-4 shadow rounded text-center transition-transform hover:scale-105 hover:shadow-lg"
    >
      <img src={imageUrl} alt={pokemon.name} loading="lazy" className="mx-auto mb-2" />
      <h2 className="capitalize font-bold">{pokemon.name}</h2>
    </div>
  );
};

export default PokemonBox;

