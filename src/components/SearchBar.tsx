import React, { useEffect, useRef, useState } from "react";
import { RiSearchLine } from "react-icons/ri";

import MOVIES_DATA from "../data/moviesData.json";
import type { Movies } from "../types";

const SearchBar = () => {
  const [isSearchButtonClicked, setIsSearchButtonClicked] = useState(false);
  const searchContainerRef = useRef(null);

  // 👇 Create a ref to store the debounce timer
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
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
  const searchQuery = (query: string) => {
    const result = MOVIES_DATA.results.filter((movie: Movies) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );

    console.log(`Matched Result: ${JSON.stringify(result, null, 2)}`);
  };

  // 👇 Debounced input handler
  const handleSearchQueryChange = (event) => {
    const query = event.target.value;
    console.log("Search Input:", query);

    // clear previous timer
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // set new debounce timer
    debounceRef.current = setTimeout(() => {
      searchQuery(query);
    }, 1000); // wait 500ms after typing stops
  };

  return (
    <div className="flex items-center gap-2">
      {isSearchButtonClicked && (
        <input
          type="text"
          autoFocus
          placeholder="Search"
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none
          focus:ring-2 focus:ring-red-600 placeholder:text-gray-400 text-white"
          ref={searchContainerRef}
          onChange={handleSearchQueryChange}
        />
      )}

      <button
        onClick={() => setIsSearchButtonClicked(true)}
        className="cursor-pointer"
      >
        <RiSearchLine className="text-white w-8 h-8" />
      </button>
    </div>
  );
};

export default SearchBar;
