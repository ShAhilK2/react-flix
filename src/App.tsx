import Hero from "./components/Hero";
import TrendingMovies from "./components/Movies";
import { useTrendingMovies } from "./hooks/useTrendingMovies";

const App = () => {
  const { movies, loading, error } = useTrendingMovies();
  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="text-white pt-12 mx-auto text-center">
        Error: {error.message}
      </div>
    );
  if (!movies) return <div className="text-white">No movies found</div>;
  return (
    <main>
      <div className="min-h-screen bg-black text-foreground transition-colors duration-300">
        <Hero />
        <TrendingMovies movies={movies} />
      </div>
    </main>
  );
};

export default App;
