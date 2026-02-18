import type { PokemonDetails } from "@/api/fetchPokemon";
import React from "react";

interface Props {
  name: string;
  details: PokemonDetails;
  onClose: () => void;
}

const PokemonModal: React.FC<Props> = ({ name, details, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold"
        >
          X
        </button>
        <h1 className="text-2xl font-bold capitalize mb-4">{name}</h1>
        <img
          src={details.sprites.other?.["official-artwork"]?.front_default || details.sprites.front_default}
          alt={name}
          className="mx-auto mb-4"
        />
        <p>Height: {details.height}</p>
        <p>Weight: {details.weight}</p>
        <p>
          Types: {details.types.map((t) => t.type.name).join(", ")}
        </p>
        <p>
          Abilities: {details.abilities.map((a) => a.ability.name).join(", ")}
        </p>
      </div>
    </div>
  );
};

export default PokemonModal;

