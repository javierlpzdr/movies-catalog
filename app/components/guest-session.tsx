"use client";

import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { actions, selectors } from "../store/guest-session/slice";

const useGuestSession = () => {
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

  const createGuestSession = useCallback(
    () => dispatch(actions.removeGuestSession()),
    [dispatch]
  );
  const removeGuestSession = useCallback(
    () => dispatch(actions.createGuestSession()),
    [dispatch]
  );

  return {
    guestSessionId,
    createGuestSession,
    removeGuestSession,
  };
};

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
  const { guestSessionId, createGuestSession, removeGuestSession } =
    useGuestSession();

  return guestSessionId ? (
    <GuestSessionButton action={createGuestSession}>
      Remove session
    </GuestSessionButton>
  ) : (
    <GuestSessionButton action={removeGuestSession}>
      Create session
    </GuestSessionButton>
  );
}
