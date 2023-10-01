import Link from "next/link";
import cln from "classnames";
import routesPaths from "@/app/routes";

type PaginatorProps = {
  page: number;
  totalPages: number;
  query: string;
};

const getPaginationPage = (page: number, query: string) =>
  (routesPaths.search.getPathWithQuery &&
    routesPaths.search.getPathWithQuery(page.toString(), query)) ||
  routesPaths.search.path;

export default function Paginator({ page, query, totalPages }: PaginatorProps) {
  return (
    <div className="join grid grid-cols-2 w-96">
      <Link
        className={cln("btn join-item", {
          "btn-disabled": page === 1,
        })}
        href={getPaginationPage(page - 1, query)}
      >
        Previous
      </Link>
      <Link
        className={cln("btn join-item", {
          "btn-disabled": page === totalPages,
        })}
        href={getPaginationPage(page + 1, query)}
      >
        Next
      </Link>
    </div>
  );
}
