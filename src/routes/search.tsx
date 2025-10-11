import { createFileRoute } from "@tanstack/react-router";

import MovieCard from "@/components/MovieCard";
import useSearchStore from "@/store/searchstore";
import { useSearchMovieStore } from "@/store/movieStore";
import type { Movies } from "@/types";

type SearchParams = {
  movie?: string;
};

const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

export const Route = createFileRoute("/search")({
  component: SearchComponent,
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return {
      movie: (search.movie as string) || "",
    };
  },
  loaderDeps: ({ search }) => ({ query: search.movie }),
  loader: async ({ deps }) => {
    const query = deps.query;
    if (!query) {
      return { results: [] as Movies[] };
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Update the stores with the fetched data
      useSearchStore.getState().setQuery(query);
      useSearchStore.getState().setResults(data.results);
      useSearchMovieStore.getState().setSearchMovies(data.results);

      return { results: data.results as Movies[] };
    } catch (error) {
      console.error("Error fetching search results in loader", error);
      return { results: [] as Movies[] };
    }
  },
});

function SearchComponent() {
  const { movie } = Route.useSearch();
  const results = useSearchMovieStore((store) => store.searchMovies);

  return (
    <div className="pt-20  mx-auto !container">
      <h2 className="text-2xl py-6 !text-white mx-auto">
        Search Results : {movie}
      </h2>

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {movie ? `${results.length} results for ${movie}` : ""}
      </div>

      {results.length > 0 ? (
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
