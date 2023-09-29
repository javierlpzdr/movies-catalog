import type {
  CreateGuestSessionResponse,
  FetchPopularMoviesResponse,
  RateMovieResponse,
  RatedMoviesList,
} from "./types";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

type FetchPopularMoviesRequest = {
  page: number;
  options: {};
};

type SearchMoviesRequest = FetchPopularMoviesRequest & {
  query: string;
};

export const fetchPopularMovies: (
  requestParams: FetchPopularMoviesRequest
) => Promise<FetchPopularMoviesResponse> = async ({
  page,
  options: customOptions,
}) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    { ...options, ...customOptions }
  );

  const data: FetchPopularMoviesResponse = await response.json();

  if (response.ok && data) {
    return data;
  }

  return Promise.reject();
};

export const searchMovies: (
  requestParams: SearchMoviesRequest
) => Promise<FetchPopularMoviesResponse> = async ({
  query,
  page,
  options: customOptions,
}) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?language=en-US&query=${query}&page=${page}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    {
      ...options,
      ...customOptions,
    }
  );

  const data: FetchPopularMoviesResponse = await response.json();

  if (response.ok && data) {
    return data;
  }

  return Promise.reject();
};

export const createGuestSession: () => Promise<CreateGuestSessionResponse> =
  async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/authentication/guest_session/new?language=en-US&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      {
        ...options,
      }
    );

    const data: CreateGuestSessionResponse = await response.json();

    if (response.ok && data) {
      return data;
    }

    return Promise.reject();
  };

type RateMovieConfig = {
  guestSessionId: string;
  movieId: number;
  rate: number;
};

export const rateMovie: (
  config: RateMovieConfig
) => Promise<RateMovieResponse> = async ({ guestSessionId, movieId, rate }) => {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
    },
    body: `{"value":${rate}}`,
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${guestSessionId}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    options
  );

  return response.json();
};

export const getRatedMoviesList: (config: {
  page: number;
  guestSessionId: string;
}) => Promise<RatedMoviesList> = async ({ page, guestSessionId }) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    {
      ...options,
      cache: "no-cache",
    }
  );

  return await response.json();
};
