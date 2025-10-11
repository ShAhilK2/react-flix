import { createFileRoute } from "@tanstack/react-router";

import MovieCard from "@/components/MovieCard";
import useSearchStore from "@/store/searchstore";
import { useSearchMovieStore } from "@/store/movieStore";
import { useSearchMovies } from "@/hooks/useSearchMovies";
import { useEffect } from "react";

type SearchParams = {
  movie?: string;
};

export const Route = createFileRoute("/search")({
  component: SearchComponent,
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return {
      movie: (search.movie as string) || "",
    };
  },
});

function SearchComponent() {
  const { movie } = Route.useSearch();
  const setQuery = useSearchStore((store) => store.setQuery);

  useEffect(() => {
    if (movie) {
      setQuery(movie);
    }
  }, [movie, setQuery]);

  const { loading } = useSearchMovies();
  const results = useSearchMovieStore((store) => store.searchMovies);

  return (
    <div className="pt-20  mx-auto !container">
      <h2 className="text-2xl py-6 !text-white mx-auto">
        Search Results : {movie}
      </h2>

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {movie ? `${results.length} results for ${movie}` : ""}
      </div>

      {loading ? (
        <div className=" text-white mx-auto">Loading...</div>
      ) : results.length > 0 ? (
        <div className="flex  flex-wrap space-x-4 space-y-4">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="pt-20 text-white  mx-auto ">No Movie Were Found</div>
      )}
    </div>
  );
}
