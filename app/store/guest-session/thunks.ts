import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createGuestSession,
  getRatedMoviesList,
  rateMovie,
} from "@/app/services/tmdb-service";
import { Movie } from "@/app/services/types";
import { RootState } from "../store";

export const createGuestSessionThunk = createAsyncThunk(
  "guestSession/createNewSession",
  async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    if (state.guestSession.sessionData.guest_session_id) {
      thunkApi.abort();
    }

    const data = await createGuestSession();
    return data;
  }
);

export const getRatedMoviesListThunk = createAsyncThunk(
  "guestSession/getRatedMoviesList",
  async ({
    guestSessionId,
    page,
  }: {
    guestSessionId: string;
    page: number;
  }) => {
    const data = await getRatedMoviesList({ guestSessionId, page });
    return data;
  }
);

export const rateMovieThunk = createAsyncThunk(
  "guestSession/rateMovie",
  async (
    {
      guestSessionId,
      rate,
      movie,
    }: {
      guestSessionId: string;
      rate: number;
      movie: Movie;
    },
    thunkApi
  ) => {
    await rateMovie({
      guestSessionId,
      movieId: movie.id,
      rate,
    });

    await thunkApi.dispatch(
      getRatedMoviesListThunk({ guestSessionId, page: 1 })
    );

    thunkApi.fulfillWithValue(movie);
    return movie;
  }
);
