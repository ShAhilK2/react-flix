import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Hero from "./components/Hero";
import TrendingMovies from "./components/Movies";
import { useTrendingMovies } from "./hooks/useTrendingMovies";
import DiscoverMovies from "./components/DiscoverMovies";

const App = () => {
  const { movies, loading, error } = useTrendingMovies();

  return (
    <main>
      <div className="min-h-screen bg-black text-foreground transition-colors duration-300">
        <Hero />

        <SignedIn>
          {loading && (
            <div className="text-white text-center py-12">Loading...</div>
          )}
          {error && (
            <div className="text-white pt-12 mx-auto text-center">
              Error: {error.message}
            </div>
          )}
          {!loading && !error && !movies && (
            <div className="text-white text-center py-12">No movies found</div>
          )}
          {!loading && !error && movies && <TrendingMovies movies={movies} />}
          <DiscoverMovies />
        </SignedIn>

        {/* <SignedOut>
          <div className="text-white text-center py-20">
            <h2 className="text-3xl font-bold mb-4">
              Sign in to browse movies
            </h2>
            <p className="text-gray-400">
              Create an account or sign in to access our full catalog
            </p>
          </div>
        </SignedOut> */}
      </div>
    </main>
  );
};

export default App;
