import type { MovieListPros, Movies } from "../types";
import MovieCard from "./MovieCard";

const MovieList = ({ movies }: MovieListPros) => {
  return (
    <div className="relative">
      <ul
        className="flex overflow-x-scroll overflow-y-visible space-x-4 px-4 md:px-6 py-4 
      scrollbar-hide relative"
      >
        {movies.map((movie: Movies, index: number) => (
          <li key={movie.id} className="text-white flex-shrink-0">
            <MovieCard movie={movie} level={index + 1} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
