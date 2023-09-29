import type { Movie } from "@/app/services/types";
import MovieTile from "./movie-tile";

type MoviesCatalogProps = {
  movies: Movie[];
};

const MoviesCatalog = ({ movies }: MoviesCatalogProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <MovieTile key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesCatalog;
