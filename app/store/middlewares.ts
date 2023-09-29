import {
  ThunkMiddleware,
  type ConfigureStoreOptions,
  CombinedState,
} from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { actions } from "./guest-session/slice";
import { createGuestSessionThunk } from "./guest-session/thunks";
import { CreateGuestSessionResponse } from "../services/types";

const checkGuestSessionValid = (guestSession: CreateGuestSessionResponse) =>
  guestSession.guest_session_id ||
  new Date() < new Date(guestSession.expires_at);

const guestSessionMiddleware: ThunkMiddleware = (api) => (next) => (action) => {
  if (action.type === actions.removeGuestSession.type) {
    localStorage.removeItem("guest_session");
    next(action);
    return;
  }

  if (action.type === createGuestSessionThunk.pending.type) {
    const guestSession = localStorage.getItem("guest_session");

    if (guestSession) {
      const guestSessionParsed = JSON.parse(
        guestSession
      ) as CreateGuestSessionResponse;

      if (checkGuestSessionValid(guestSessionParsed))
        api.dispatch(actions.setGuestSession(guestSessionParsed));
    }
  }

  if (action.type === createGuestSessionThunk.fulfilled.type) {
    localStorage.setItem("guest_session", JSON.stringify(action.payload));
    next(action);
    return;
  }

  next(action);
};

const middlewares = [guestSessionMiddleware];

export default middlewares;
