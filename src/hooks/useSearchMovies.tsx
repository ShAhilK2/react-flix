import { useSearchMovieStore } from "@/store/movieStore";
import useSearchStore from "@/store/searchstore";
import { useEffect, useState } from "react";

const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const url = ``;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
};
export const useSearchMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const setSearchMovies = useSearchMovieStore((store) => store.setSearchMovies);
  const setResults = useSearchStore((store) => store.setResults);
  const query = useSearchStore((store) => store.query);

  useEffect(() => {
    const fetchSearchMovies = async (query: string) => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
          options
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data.results);
        setMovies(data.results);
        setSearchMovies(data.results);
        setResults(data.results);
      } catch (error) {
        setError(error as Error);
        console.error("Error fetching trending movies", error);
      } finally {
        setLoading(false);
      }
    };
    if (query) {
      fetchSearchMovies(query);
    }
  }, [query]);
  return { movies, loading, error };
};
