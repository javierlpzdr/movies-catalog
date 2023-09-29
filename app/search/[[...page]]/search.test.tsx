import { render, screen } from "@testing-library/react";

import { SearchPage } from "./page";
require("next");

import { rest } from "msw";
import { setupAppServer } from "@/app/utils/test-utils";
import { Movie } from "@/app/services/types";
import StoreProvider from "@/app/store/Provider";

jest.mock("next/navigation", () => ({
  useParams() {
    return { query: "" };
  },
  useRouter() {
    return {
      pathname: "",
      // ... whatever else you you call on `router`
    };
  },
}));

describe("Search", () => {
  setupAppServer();

  it("renders the page", async () => {
    rest.get("/movies", (req, res, ctx) => {
      return res(ctx.json({ result: [] }));
    });

    const result: Movie = {
      adult: false,
      backdrop_path: "",
      genre_ids: [],
      id: 0,
      original_language: "",
      original_title: "",
      overview: "Lorem ipsum",
      popularity: 10000,
      poster_path: "",
      release_date: "",
      title: "Title 1",
      video: false,
      vote_average: 8,
      vote_count: 0,
      rating: 0,
    };

    render(
      <StoreProvider>
        <SearchPage results={[result]} page={1} totalPages={1} query="" />
      </StoreProvider>
    );

    expect(screen.getByText("Title 1"));
    expect(screen.getByText("10K"));
    expect(screen.getByText("8"));
    expect(screen.getByText("Lorem ipsum"));
  });
});
