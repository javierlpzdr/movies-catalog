import { Movie } from "@/app/services/types";
import RateMovie from "./rate-movie";

const MovieTile = ({ movie }: { movie: Movie }) => {
  const { title, popularity, backdrop_path, overview, vote_average } = movie;

  return (
    <div className="card card-compact w-90 bg-base-100 shadow-xl">
      <figure>
        <img
          src={"https://image.tmdb.org/t/p/w500" + backdrop_path}
          alt={title + " poster"}
          width={600}
          height={600}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {title} <b />
        </h2>
        <p>{overview}</p>
        <div className="card-actions">
          <div className="stats shadow overflow-hidden">
            <div className="stat">
              <div className="stat-title">Total Rates</div>
              <div className="stat-value">
                {Intl.NumberFormat("en-US", {
                  notation: "compact",
                  maximumFractionDigits: 1,
                }).format(popularity)}
              </div>
              <div className="stat-desc">From tmdb users</div>
            </div>

            <div className="stat">
              <div className="state-title">Rated</div>
              <div className="stat-value">{vote_average}</div>
              <div className="stat-actions">
                <RateMovie movie={movie} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieTile;
