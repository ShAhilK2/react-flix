import Header from "./components/Header";
import Hero from "./components/Hero";
import Movies from "./components/Movies";
import useSearchStore from "./store/searchstore";
import MovieCard from "./components/MovieCard";

const App = () => {
  return (
    <main>
      <div className="min-h-screen bg-black text-foreground transition-colors duration-300">
        <Hero />
        <Movies />
      </div>
    </main>
  );
};

export default App;
