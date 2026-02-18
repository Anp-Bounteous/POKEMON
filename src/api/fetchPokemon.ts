import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export interface PokemonDetails {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other?: {
      ["official-artwork"]?: {
        front_default: string;
      };
    };
  };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  height: number;
  weight: number;
}

// Fetch list of Pokémon
export const fetchPokemonList = async (
  offset: number,
  limit: number = 20
): Promise<PokemonListResponse> => {
  const response = await axios.get<PokemonListResponse>(
    `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
  );
  return response.data;
};

// Fetch details of a single Pokémon
export const fetchPokemonDetails = async (
  name: string
): Promise<PokemonDetails> => {
  const response = await axios.get<PokemonDetails>(`${BASE_URL}/pokemon/${name}`);
  return response.data;
};

