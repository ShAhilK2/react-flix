import { createFileRoute } from "@tanstack/react-router";

import MovieCard from "@/components/MovieCard";
import useSearchStore from "@/store/searchstore";

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
  console.log("Search in Titlebar  " + movie);

  const results = useSearchStore((store) => store.results);

  return (
    <div className="container">
      {results.length > 0 ? (
        <div className="flex pt-20  flex-wrap space-x-4 space-y-4">
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
