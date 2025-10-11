import { useMovieStore } from "@/store/movieStore";
import useSearchStore from "@/store/searchstore";
import { useEffect, useState } from "react";

const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
};
export const useTrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const setBaseMovies = useMovieStore((store) => store.setBaseMovies);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data.results);
        setMovies(data.results);
        setBaseMovies(data.results);
        // updated the search store with the results
      } catch (error) {
        setError(error as Error);
        console.error("Error fetching trending movies", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingMovies();
  }, []);
  return { movies, loading, error };
};
