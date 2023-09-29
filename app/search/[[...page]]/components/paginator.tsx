import Link from "next/link";
import cln from "classnames";

type PaginatorProps = {
  page: number;
  totalPages: number;
  query: string;
};

export default function Paginator({ page, query, totalPages }: PaginatorProps) {
  return (
    <div className="join grid grid-cols-2 w-96">
      <Link
        className={cln("btn join-item", {
          "btn-disabled": page === 1,
        })}
        href={`/search/${page - 1}`}
      >
        Previous
      </Link>
      <Link
        className={cln("btn join-item", {
          "btn-disabled": page === totalPages,
        })}
        href={`/search/${page + 1}?query=${query}`}
      >
        Next
      </Link>
    </div>
  );
}
