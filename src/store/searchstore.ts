import { create } from 'zustand'
import type { Movies } from '../types'
import MOVIE_DATA from '../data/moviesData.json'




type SearchState = {
    query: string
    results: Movies[]
    setQuery: (q: string) => void
    setResults: (r: Movies[]) => void
    
}

export const useSearchStore = create<SearchState>((set) => ({
    query: '',
    results: [] as Movies[],
    setQuery: (q: string) => set({ query: q }),
    setResults: (r: Movies[]) => set({ results: r })
}))

export default useSearchStore