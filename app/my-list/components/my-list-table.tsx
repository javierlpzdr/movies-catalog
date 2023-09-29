import { RatedMoviesList } from "@/app/services/types";

type MyListTableProps = {
  ratedMoviesList: RatedMoviesList["results"];
};

export default function MyListTable({ ratedMoviesList }: MyListTableProps) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th>Title</th>
          <th>Your rating</th>
        </tr>
      </thead>
      <tbody>
        {ratedMoviesList &&
          ratedMoviesList.map((movie, index) => (
            <tr key={movie.id}>
              <th>{index + 1}</th>
              <td>{movie.title} </td>
              <td>{movie.rating}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
