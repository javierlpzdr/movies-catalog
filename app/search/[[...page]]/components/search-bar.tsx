"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, type FormEventHandler, ChangeEventHandler } from "react";
import { useTranslation } from "@/app/i18n/client";
import routesPaths from "@/app/routes";

const getSearchQuery = (query: string | string[]) => {
  return Array.isArray(query) ? query[0] : query;
};

const SearchBar = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const parsedUrlQuery = useParams();
  const [searchTerm, setSearchTerm] = useState<string>(
    getSearchQuery(parsedUrlQuery.query)
  );

  const handleSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    routesPaths.search.getPathWithQuery &&
      router.push(routesPaths.search.getPathWithQuery("1", searchTerm));
  };

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setSearchTerm(event?.target.value);

  return (
    <form className="join w-full" onSubmit={handleSearch}>
      <input
        type="text"
        role="search"
        value={searchTerm}
        placeholder="Type here"
        className="input input-bordered join-item"
        onChange={handleOnChange}
      />
      <button className="btn join-item rounded-r-full" type="submit">
        {t("searchButton")}
      </button>
    </form>
  );
};

export default SearchBar;
