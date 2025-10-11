import React from "react";
import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import MovieCard from "../components/MovieCard";
import type { Movies } from "../types";

const mockMovie: Movies = {
  id: 1,
  title: "Inception",
  poster_path: "/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
};

// Mock the Card component that's imported via path alias so tests don't need path-mapping.
vi.mock("@/components/ui/card", () => ({
  Card: (props: any) => {
    // eslint-disable-next-line react/prop-types
    return React.createElement("div", props);
  },
}));

test("renders movie poster and is clickable", () => {
  render(<MovieCard movie={mockMovie} />);

  // MovieCard currently renders the poster image inside a button.
  const imgElement = screen.getByAltText(/Inception/i);
  expect(imgElement).toBeTruthy();
  expect(imgElement.getAttribute("src")).toContain(mockMovie.poster_path!);

  const button = screen.getByRole("button");
  expect(button).toBeTruthy();
});
test("renders placeholder image when poster_path is null", () => {
  const movieWithNoPoster: Movies = { ...mockMovie, poster_path: null };
  render(<MovieCard movie={movieWithNoPoster} />);

  const imgElement = screen.getByAltText(/Inception/i);
  expect(imgElement).toBeTruthy();
  expect(imgElement.getAttribute("src")).toContain("placeholder");
});

test("renders placeholder image when poster_path is undefined", () => {
  const movieWithNoPoster: Movies = { ...mockMovie, poster_path: undefined };
  render(<MovieCard movie={movieWithNoPoster} />);

  const imgElement = screen.getByAltText(/Inception/i);
  expect(imgElement).toBeTruthy();
  expect(imgElement.getAttribute("src")).toContain("placeholder");
});
