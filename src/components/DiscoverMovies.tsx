import React, { useEffect, useRef } from "react";
import { useInfiniteMovies } from "../hooks/useInfiniteMovies";
import MovieCard from "./MovieCard";
import type { Movies, TMBDRESPONSE } from "../types";

const DiscoverMovies = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteMovies();

  const observerTarget = useRef<HTMLDivElement>(null);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Flatten all pages into a single array of movies
  const allMovies =
    data?.pages.flatMap((page: TMBDRESPONSE) => page.results) ?? [];

  if (isLoading) {
    return (
      <div className="container mt-6 px-6">
        <h3 className="text-2xl py-6 !text-white">Discover Movies</h3>
        <div className="text-white text-center py-12">Loading movies...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mt-6 px-6">
        <h3 className="text-2xl py-6 !text-white">Discover Movies</h3>
        <div className="text-red-500 text-center py-12">
          Error: {error?.message || "Failed to load movies"}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-6 px-6 pb-12">
      <h3 className="text-2xl py-6 !text-white">Discover Movies</h3>

      {/* Grid layout for discover movies */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {allMovies.map((movie: Movies, index: number) => (
          <div key={`${movie.id}-${index}`} className="flex justify-center">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      {/* Loading indicator for next page */}
      {isFetchingNextPage && (
        <div className="text-white text-center py-8">
          Loading more movies...
        </div>
      )}

      {/* Observer target for infinite scroll */}
      <div ref={observerTarget} className="h-10" />

      {/* End of results message */}
      {!hasNextPage && allMovies.length > 0 && (
        <div className="text-gray-400 text-center py-8">
          No more movies to load
        </div>
      )}
    </div>
  );
};

export default DiscoverMovies;
