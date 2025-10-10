import { create } from 'zustand'
import type { Movies } from '../types'
import MOVIE_DATA from '../data/moviesData.json'

let debounceTimer:ReturnType<typeof setTimeout> | null= null;
const DEBOUNCE_MS = 500;


type SearchState = {
    query: string
    results: Movies[]
    setQuery: (q: string) => void
    setResults: (r: Movies[]) => void
    performSearch: (q: string) => void
}

export const useSearchStore = create<SearchState>((set) => ({
    query: '',
    results: [] as Movies[],
    setQuery: (q: string) => set({ query: q }),
    setResults: (r: Movies[]) => set({ results: r }),
    performSearch: (q: string) => {
        // update query immediately so UI can reflect the current text
        set({ query: q })

        const qTrim = q.trim()

        // IF QUERY IS EMPTY ,clear any pending debounce and clear results 
        if(debounceTimer){
            clearTimeout(debounceTimer);
            debounceTimer = null;
        }

        if (qTrim === '') {
            set({ results: [] })
            return
        }

        // debounce the expensive filtering operation
        debounceTimer = setTimeout(()=>{
            const results = (MOVIE_DATA.results as Movies[]).filter((movie: Movies) =>
                movie.title.toLowerCase().includes(qTrim.toLowerCase())
            ) as Movies[]
            set({ results })
            console.log('Search results:', results)

        },DEBOUNCE_MS)

    },
}))

export default useSearchStore