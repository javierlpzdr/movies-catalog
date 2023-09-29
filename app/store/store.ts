import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./reducers";
import middlewares from "./middlewares";

import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;

export default store;
