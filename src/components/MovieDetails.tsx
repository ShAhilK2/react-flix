import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Play, Star, Calendar, Clock } from "lucide-react";
import { useState } from "react";

const TMDB_IMAGES_ASSET_URL = "https://image.tmdb.org/t/p/original/";
const API_BASE_URL = "https://api.themoviedb.org/3";

type MovieDetail = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  genres: { id: number; name: string }[];
  tagline: string;
};

type Video = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
};

const fetchMovieDetails = async (movieId: string): Promise<MovieDetail> => {
  const token = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
  const response = await fetch(`${API_BASE_URL}/movie/${movieId}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  return response.json();
};

const fetchMovieVideos = async (movieId: string): Promise<Video[]> => {
  const token = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
  const response = await fetch(`${API_BASE_URL}/movie/${movieId}/videos`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch movie videos");
  }

  const data = await response.json();
  return data.results;
};

const MovieDetails = () => {
  const { movieId } = useParams({ from: "/movie/$movieId" });
  const [showPlayer, setShowPlayer] = useState(false);

  const {
    data: movie,
    isLoading: movieLoading,
    isError: movieError,
  } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => fetchMovieDetails(movieId),
  });

  const {
    data: videos,
    isLoading: videosLoading,
  } = useQuery({
    queryKey: ["movie-videos", movieId],
    queryFn: () => fetchMovieVideos(movieId),
    enabled: !!movieId,
  });

  if (movieLoading || videosLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (movieError || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-2xl">
          Failed to load movie details
        </div>
      </div>
    );
  }

  // Find trailer or teaser
  const trailer = videos?.find(
    (video) =>
      video.site === "YouTube" &&
      (video.type === "Trailer" || video.type === "Teaser")
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Video Player Overlay - Above everything */}
      {showPlayer && trailer && (
        <div className="fixed inset-0 z-[9999] bg-black">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`}
            title={movie.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <button
            onClick={() => setShowPlayer(false)}
            className="absolute top-16 sm:top-20 right-2 sm:right-4 bg-white/90 text-black px-3 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-white transition-colors font-semibold shadow-lg z-10 text-sm sm:text-base"
          >
            ✕ Close
          </button>
        </div>
      )}

      {/* Hero Section with Backdrop */}
      <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] w-full">
        {!showPlayer && (
          <>
            {/* Backdrop Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${TMDB_IMAGES_ASSET_URL}${movie.backdrop_path})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex items-center sm:items-end">
              <div className="container mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center sm:items-end">
                  {/* Poster */}
                  <img
                    src={`${TMDB_IMAGES_ASSET_URL}${movie.poster_path}`}
                    alt={movie.title}
                    className="w-32 sm:w-48 md:w-64 rounded-lg shadow-2xl flex-shrink-0"
                  />

                  {/* Movie Info */}
                  <div className="flex-1 pb-2 sm:pb-4 text-center sm:text-left">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3 drop-shadow-lg leading-tight">
                      {movie.title}
                    </h1>
                    {movie.tagline && (
                      <p className="text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl italic mb-3 sm:mb-4 md:mb-6 drop-shadow-md line-clamp-2 sm:line-clamp-none">
                        "{movie.tagline}"
                      </p>
                    )}

                    {/* Meta Info */}
                    <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
                      <div className="flex items-center gap-1 sm:gap-2 bg-black/50 px-2 sm:px-3 py-1 sm:py-2 rounded-lg backdrop-blur-sm">
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm sm:text-base lg:text-lg font-bold">
                          {movie.vote_average.toFixed(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 bg-black/50 px-2 sm:px-3 py-1 sm:py-2 rounded-lg backdrop-blur-sm">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base font-medium">
                          {new Date(movie.release_date).getFullYear()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 bg-black/50 px-2 sm:px-3 py-1 sm:py-2 rounded-lg backdrop-blur-sm">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base font-medium">
                          {movie.runtime} min
                        </span>
                      </div>
                    </div>

                    {/* Genres */}
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4 sm:mb-6 md:mb-8">
                      {movie.genres.slice(0, 4).map((genre) => (
                        <span
                          key={genre.id}
                          className="px-2 sm:px-4 py-1 sm:py-2 bg-white/15 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium border border-white/20"
                        >
                          {genre.name}
                        </span>
                      ))}
                      {movie.genres.length > 4 && (
                        <span className="px-2 sm:px-4 py-1 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium border border-white/20">
                          +{movie.genres.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Play Button */}
                    {trailer && (
                      <div className="flex justify-center sm:justify-start">
                        <button
                          onClick={() => setShowPlayer(true)}
                          className="flex items-center gap-2 sm:gap-3 bg-white text-black px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg font-bold text-sm sm:text-base md:text-lg hover:bg-gray-200 transition-all transform hover:scale-105 shadow-xl"
                        >
                          <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-black" />
                          Play Trailer
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Overview Section */}
      {!showPlayer && (
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            Overview
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-5xl">
            {movie.overview || "No overview available for this movie."}
          </p>
        </div>
      )}

      {/* Additional Videos */}
      {videos && videos.length > 0 && !showPlayer && (
        <div className="container mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            Videos & Clips
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {videos.slice(0, 6).map((video) => (
              <div
                key={video.id}
                className="bg-gray-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-white transition-all cursor-pointer"
                onClick={() => {
                  if (video.site === "YouTube") {
                    window.open(
                      `https://www.youtube.com/watch?v=${video.key}`,
                      "_blank"
                    );
                  }
                }}
              >
                <div className="relative aspect-video bg-gray-800">
                  <img
                    src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                    alt={video.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/20 transition-colors">
                    <Play className="w-8 h-8 sm:w-12 sm:h-12 text-white fill-white" />
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <p className="font-semibold truncate text-sm sm:text-base">
                    {video.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400 capitalize">
                    {video.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
