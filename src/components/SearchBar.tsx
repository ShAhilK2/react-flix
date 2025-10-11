import React, { useEffect, useRef, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useNavigate } from "@tanstack/react-router";

import useSearchStore from "../store/searchstore";
import { RxCrossCircled } from "react-icons/rx";
import performSearch from "@/lib/performSearch";
import { useMovieStore, useSearchMovieStore } from "@/store/movieStore";

const SearchBar = () => {
  const [isSearchButtonClicked, setIsSearchButtonClicked] = useState(false);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();
  const setQuery = useSearchStore((state) => state.setQuery);
  const query = useSearchStore((state) => state.query);
  const setResults = useSearchStore((state) => state.setResults);

  const baseResults = useSearchMovieStore((state) => state.searchMovies);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsSearchButtonClicked(false);
      }
    };

    if (isSearchButtonClicked) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchButtonClicked]);

  // 👇 Your original search function
  const searchQuery = (q: string) => {
    const { data } = performSearch(q, baseResults);
    setResults(data);

    // Navigate to search route when query is not empty
    if (q.trim() !== "") {
      navigate({ to: "/search", search: { movie: q } });
    } else {
      // Navigate back to home when query is empty
      navigate({ to: "/" });
    }
  };

  // 👇 Debounced input handler
  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setQuery(value);
    searchQuery(value);
  };

  const handleResetButton = (query: string) => {
    setQuery("");
    setResults([]);
    // Navigate back to home when clearing search
    navigate({ to: "/" });
  };

  return (
    <div className="flex items-center gap-2" ref={searchContainerRef}>
      {isSearchButtonClicked && (
        <div className="relative">
          <input
            type="text"
            autoFocus
            placeholder="Title ,people,and genre "
            className="px-4 py-2  rounded-md border border-gray-300 focus:outline-none
          focus:ring-2 focus:ring-red-600 placeholder:text-gray-100 text-white"
            onChange={handleSearchQueryChange}
            value={query}
          />

          {query !== "" && (
            <div
              className="absolute right-[1rem] bottom-1/2 translate-y-1/2  flex items-center  !cursor-pointer z-10"
              onClick={() => handleResetButton(query)}
            >
              <RxCrossCircled
                color="white"
                className="!cursor-pointer w-6 h-6"
              />
            </div>
          )}
        </div>
      )}

      {!isSearchButtonClicked && (
        <button
          onClick={() => setIsSearchButtonClicked(true)}
          className="cursor-pointer"
        >
          <RiSearchLine className="text-white w-8 h-8" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
