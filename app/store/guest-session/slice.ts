import {
  EntityAdapter,
  EntityState,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import {
  createGuestSessionThunk,
  getRatedMoviesListThunk,
  rateMovieThunk,
} from "./thunks";
import { CreateGuestSessionResponse, Movie } from "@/app/services/types";
import { RootState } from "../store";

const moviesAdapter: EntityAdapter<Movie> = createEntityAdapter({
  selectId: (movie) => movie.id,
});

type State = {
  isLoading: boolean;
  sessionData: CreateGuestSessionResponse;
  ratedMovieList: EntityState<Movie>;
  isRatingLoading: boolean;
};

let initialState: State = {
  sessionData: {
    expires_at: "",
    guest_session_id: "",
    success: false,
  },
  isLoading: false,
  isRatingLoading: false,
  ratedMovieList: moviesAdapter.getInitialState(),
};

const counterSlice = createSlice({
  name: "guestSession",
  initialState,
  reducers: {
    setGuestSession: (state, { payload }) => {
      state.sessionData = payload;
    },
    removeGuestSession: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createGuestSessionThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createGuestSessionThunk.fulfilled, (state, { payload }) => {
      state.sessionData = {
        ...payload,
      };

      state.isLoading = false;
    });
    builder.addCase(createGuestSessionThunk.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getRatedMoviesListThunk.fulfilled, (state, { payload }) => {
      moviesAdapter.addMany(state.ratedMovieList, payload.results);
    });
    builder.addCase(rateMovieThunk.pending, (state) => {
      state.isRatingLoading = true;
    });
    builder.addCase(rateMovieThunk.fulfilled, (state, { payload: movie }) => {
      state.isRatingLoading = false;
      moviesAdapter.addOne(state.ratedMovieList, movie);
    });
    builder.addCase(rateMovieThunk.rejected, (state) => {
      state.isRatingLoading = false;
    });
  },
});

export const actions = {
  ...counterSlice.actions,
  createGuestSession: createGuestSessionThunk,
  getRatedMoviesList: getRatedMoviesListThunk,
  rateMovie: rateMovieThunk,
};

const guestSessionSelector = (state: RootState) => {
  return state.guestSession;
};
const sessionData = createSelector(
  guestSessionSelector,
  (guestSession) => guestSession.sessionData
);

export const selectors = {
  guestSessionId: createSelector(sessionData, (sessionData) => {
    return sessionData["guest_session_id"];
  }),
  ratedMoviesList: moviesAdapter.getSelectors<RootState>(
    (state) => state.guestSession.ratedMovieList
  ),
  isRatingLoading: createSelector(guestSessionSelector, (guestSession) => {
    return guestSession.isRatingLoading;
  }),
};

export default counterSlice.reducer;
