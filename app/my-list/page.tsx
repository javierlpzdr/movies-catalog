"use client";

import { type MouseEventHandler } from "react";

import { actions, selectors } from "../store/guest-session/slice";
import store, { useAppDispatch, useAppSelector } from "../store/store";
import MyListTable from "./components/my-list-table";

export default function MyList() {
  const guestSessionId = useAppSelector(selectors.guestSessionId);
  const ratedMoviesList = selectors.ratedMoviesList.selectAll(store.getState());
  const dispatch = useAppDispatch();
  const handleCreateSession: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    dispatch(actions.createGuestSession());
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-10">
      My list
      {!guestSessionId && (
        <button onClick={handleCreateSession}>Create a new session</button>
      )}
      <MyListTable ratedMoviesList={ratedMoviesList} />
    </main>
  );
}
