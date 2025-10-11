import { useInfiniteQuery } from "@tanstack/react-query";
import type { TMBDRESPONSE } from "../types";

const API_URL =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc";

async function fetchMoviesPage(
  page: number,
  token: string
): Promise<TMBDRESPONSE> {
  const url = `${API_URL}&page=${page}`;

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return (await response.json()) as TMBDRESPONSE;
}

export const useInfiniteMovies = () => {
  const token = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
  return useInfiniteQuery({
    queryKey: ["infinite-movies"],
    queryFn: ({ pageParam = 1 }) => {
        if(!token){
            return {page : 1 , results : [],total_pages : 0,total_results : 0}
        }
        return fetchMoviesPage(pageParam, token);
    },
    getNextPageParam: (lastPage : TMBDRESPONSE) => {
        if(!lastPage) return undefined;
        const next = lastPage.page + 1;
        return next <= lastPage.total_pages ? next : undefined;
    },
    initialPageParam : 1,
  });
};
