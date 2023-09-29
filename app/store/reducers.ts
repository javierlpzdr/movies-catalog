import { combineReducers } from "redux";

import guestSession from "./guest-session/slice";

const reducers = combineReducers({
  guestSession,
});

export default reducers;
