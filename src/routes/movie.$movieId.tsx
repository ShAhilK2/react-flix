import { createFileRoute } from "@tanstack/react-router";
import MovieDetails from "../components/MovieDetails";

export const Route = createFileRoute("/movie/$movieId")({
  component: MovieDetails,
});
