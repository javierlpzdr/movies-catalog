"use client";

import { Movie } from "@/app/services/types";
import { actions, selectors } from "@/app/store/guest-session/slice";
import store, { useAppDispatch, useAppSelector } from "@/app/store/store";
import { useState } from "react";

type ModalElement = (HTMLElement & { showModal: () => void }) | null;

export default function RateMovie({ movie }: { movie: Movie }) {
  const [rate, setRate] = useState<number | undefined>();
  const isLoading = useAppSelector(selectors.isRatingLoading);
  const dispatch = useAppDispatch();
  const guestSessionId = useAppSelector(selectors.guestSessionId);
  const ratedMoviesList = selectors.ratedMoviesList;

  const isMovieRated =
    !guestSessionId ||
    (ratedMoviesList && ratedMoviesList.selectById(store.getState(), movie.id));

  if (!guestSessionId) return null;

  return !isMovieRated ? (
    <>
      <button
        className="btn btn-sm btn-secondary"
        onClick={() => {
          const modal = document?.getElementById(
            "rating-modal"
          ) as ModalElement;
          if (modal) modal.showModal();
        }}
      >
        {isLoading ? "Loading..." : "Rate"}
      </button>
      <dialog id="rating-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Rate it:</h3>
          <div className="rating rating-lg">
            {[...Array(10)].map((_, i) => (
              <input
                key={i}
                type="radio"
                className={`mask mask-star-2`}
                value={i + 1}
                checked={rate === i + 1}
                onChange={() => setRate(i + 1)}
              />
            ))}
          </div>
          <div className="modal-action">
            <form method="dialog" className="join">
              <button className="btn join-item">Cancel</button>
              <button
                className="btn btn-secondary join-item"
                onClick={() => {
                  rate &&
                    dispatch(
                      actions.rateMovie({ guestSessionId, rate, movie })
                    );
                }}
              >
                Save
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  ) : (
    <p>Already Rated!</p>
  );
}
