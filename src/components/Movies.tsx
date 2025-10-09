import MovieList from "./MovieList";

import MOVIES_DATA from "../data/moviesData.json";
const Movies = () => {
  return (
    <div className="container mt-6 px-6">
      <h3>Trending Now</h3>
      {MOVIES_DATA?.results?.length > 0 ? (
        <MovieList movies={MOVIES_DATA.results} />
      ) : (
        <div>No Movie Were Found</div>
      )}
    </div>
  );
};

export default Movies;
