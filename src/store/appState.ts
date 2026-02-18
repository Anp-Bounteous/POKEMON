import { create } from "zustand";

interface AppState {
  search: string;
  setSearch: (value: string) => void;
}

export const useAppState = create<AppState>((set) => ({
  search: "",
  setSearch: (value: string) => set({ search: value }),
}));

