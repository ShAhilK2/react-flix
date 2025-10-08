import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Movies from "./components/Movies";

const App = () => {
  return (
    <main>
      <div className="min-h-screen bg-black text-foreground transition-colors duration-300">
        <Header />
        <Hero />
        <Movies />
      </div>
    </main>
  );
};

export default App;
