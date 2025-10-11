import MovieList from "./MovieList";

const TrendingMovies = ({ movies }: any) => {
  return (
    <div className="container mt-6 px-6  ">
      <h3 className="text-2xl py-6 !text-white">Trending Now</h3>
      <MovieList movies={movies} />
    </div>
  );
};

export default TrendingMovies;
