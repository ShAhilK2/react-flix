import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SearchState {
  query: string;
  results: any[];
  setQuery: (query: string) => void;
  setResults: (results: any[]) => void;
}

const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      query: "",
      results: [],
      setQuery: (query: string) => set({ query }),
      setResults: (results: any[]) => set({ results }),
    }),
    {
      name: "search-storage",
    }
  )
);

export default useSearchStore;