"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/store";
import { actions, selectors } from "./store/guest-session/slice";

const GuestSessionButton = ({
  action,
  children,
}: {
  action: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button className="btn btn-secondary btn-xs" onClick={action}>
      {children}
    </button>
  );
};

export default function GuestSession() {
  const dispatch = useAppDispatch();
  const guestSessionId = useAppSelector(selectors.guestSessionId);

  useEffect(() => {
    const guestSession = localStorage.getItem("guest_session");

    if (guestSession) {
      dispatch(actions.setGuestSession(JSON.parse(guestSession)));
    }
  }, [dispatch]);

  useEffect(() => {
    guestSessionId &&
      dispatch(actions.getRatedMoviesList({ guestSessionId, page: 1 }));
  }, [dispatch, guestSessionId]);

  return guestSessionId ? (
    <GuestSessionButton action={() => dispatch(actions.removeGuestSession())}>
      Remove session
    </GuestSessionButton>
  ) : (
    <GuestSessionButton action={() => dispatch(actions.createGuestSession())}>
      Create session
    </GuestSessionButton>
  );
}
