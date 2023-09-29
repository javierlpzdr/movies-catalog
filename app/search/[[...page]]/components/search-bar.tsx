"use client";

import { useParams, useRouter } from "next/navigation";
import {
  useState,
  type FormEventHandler,
  ChangeEventHandler,
  Suspense,
} from "react";
import { useTranslation } from "@/app/i18n/client";

const SearchBar = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const parsedUrlQuery = useParams();
  const [searchTerm, setSearchTerm] = useState(parsedUrlQuery.query);

  const handleSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    router.push("/search?query=" + searchTerm);
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

const SearchBarWithSuspense = () => {
  // The suspense is only required while the translations are loading
  return (
    <Suspense fallback="loading">
      <SearchBar />
    </Suspense>
  );
};

export default SearchBarWithSuspense;
