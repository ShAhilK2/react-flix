import {create} from "zustand";
import type { Movies } from "../types";

type BaseMoviesProps ={
    baseMovies : Movies[],
    setBaseMovies : (m : Movies[])=>void

}

export const useMovieStore = create<BaseMoviesProps>((set) => ({
    baseMovies: [] as Movies[],
    setBaseMovies: (m: Movies[]) => set({baseMovies: m})
}))


type SearchMoviesProps = {
    searchMovies: Movies[],
    setSearchMovies: (m: Movies[]) => void
}

export const useSearchMovieStore = create<SearchMoviesProps>((set) => ({
    searchMovies: [] as Movies[],
    setSearchMovies: (m: Movies[]) => set({searchMovies: m})
}));