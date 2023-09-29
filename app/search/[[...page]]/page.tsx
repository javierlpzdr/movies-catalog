import MoviesCatalog from "./components/movies-catalog";
import { fetchPopularMovies, searchMovies } from "../../services/tmdb-service";
import SearchBar from "./components/search-bar";
import Paginator from "./components/paginator";
import { FetchPopularMoviesResponse } from "@/app/services/types";

async function getData(
  params: { page: number },
  searchParams: { query?: string }
) {
  if (searchParams.query) {
    return await searchMovies({
      query: searchParams.query,
      page: params.page || 1,
      options: { next: { revalidate: 60 } },
    });
  } else {
    return await fetchPopularMovies({
      page: params.page || 1,
      options: { next: { revalidate: 60 } },
    });
  }
}

export const SearchPage = ({
  results,
  page,
  totalPages,
  query,
}: FetchPopularMoviesResponse & { query: string }) => {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-10">
      <div className="container mx-auto">
        <SearchBar />
      </div>
      <div className="container mx-auto">
        <MoviesCatalog movies={results} />
      </div>
      <div className="container  flex justify-center">
        <Paginator page={page} totalPages={totalPages} query={query} />
      </div>
    </main>
  );
};

export default async function Search({
  params,
  searchParams,
}: {
  params: { page: number };
  searchParams: { query?: string };
}) {
  const data = await getData(params, searchParams);

  return <SearchPage {...data} query={searchParams.query || ""} />;
}
