import type { MovieListPros, Movies } from "../types";

const MovieList = ({ movies }: MovieListPros) => {
  return (
    <div>
      <ul>
        {movies.map((movie: Movies) => (
          <li key={movie.id} className="text-white">
            {movie.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
