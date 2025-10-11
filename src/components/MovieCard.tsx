import React from "react";
import type { Movies } from "../types";
import { Card } from "../components/ui/card";

const TMDB_IMAGES_ASSET_URL = "https://image.tmdb.org/t/p/w500/";

import MoviePlaceholderImage from "../assets/placeholderMovie.jpeg";

const MovieCard = ({ movie, level }: { movie: Movies; level?: number }) => {
  return (
    <div className="relative flex-shrink-0">
      {/* Large ranking number with outline */}

      <Card
        className="group relative overflow-hidden cursor-pointer transition-all 
        duration-300 hover:scale-105 hover:shadow-xl outline-blue-200 p-0 border-0 w-[7rem]
        h-[9.8rem] rounded-sm ml-12 z-10"
        role="button"
        tabIndex={0}
        aria-label={`Open details for ${movie.title}`}
      >
        <img
          src={
            movie?.poster_path
              ? TMDB_IMAGES_ASSET_URL + movie?.poster_path
              : MoviePlaceholderImage
          }
          alt={movie?.title || "Movie poster"}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {movie?.title}
      </Card>
      <div
        className="absolute bottom-0 left-6 z-20 text-[80px] font-black leading-none"
        style={{
          WebkitTextStroke: "4px #fff",
          WebkitTextFillColor: "black",

          paintOrder: "stroke fill",
          fontFamily: "Impact, sans-serif",
        }}
      >
        {level}
      </div>
    </div>
  );
};

export default MovieCard;
