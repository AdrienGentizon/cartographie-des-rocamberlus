"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import { usePathname } from "next/navigation";

import { ArtistsHookType } from "../../../../types";
import Link from "../../../Link/Link";

function Icon() {
  return (
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="#000000"
    >
      <path
        d="M17 17l4 4M3 11a8 8 0 1016 0 8 8 0 00-16 0z"
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}

interface SearchResult {
  name: string;
  articleId: string;
}

const getResultName = ({ artistName, articleTitle }: ArtistsHookType) => {
  if (!articleTitle && artistName) return `${artistName}`;
  if (articleTitle && !artistName) return `${articleTitle}`;
  if (articleTitle && artistName) return `${artistName} - ${articleTitle}`;
  return undefined;
};
const computeResultName = (
  artist: ArtistsHookType
): SearchResult | undefined => {
  const name = getResultName(artist);
  if (!name) return undefined;
  return {
    name,
    articleId: artist.articleId,
  };
};
const filteroutUnnamedResult = (
  a: SearchResult | undefined
): a is SearchResult => a !== undefined;

const filterResultNameMatchingSearch =
  (e: ChangeEvent<HTMLInputElement>) =>
  ({ name }: SearchResult) =>
    name?.toLowerCase().includes(e.target.value.toLowerCase());

const sortResultsInPlace = (
  { name: a }: SearchResult,
  { name: b }: SearchResult
) => a.toUpperCase().localeCompare(b.toUpperCase());

interface PropsType {
  artists: ArtistsHookType[];
}

export default function Search({ artists }: PropsType) {
  const [results, setResults] = useState<{ name: string; articleId: string }[]>(
    []
  );
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  const closeDialog = (leaveInput = false) => {
    setOpen(false);
    setResults([]);
    if (!leaveInput && inputRef.current) inputRef.current.value = "";
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    closeDialog();
  }, [pathname]);

  return (
    <div className="relative flex items-center border-b border-gray-400 px-2 py-1 transition-colors ease-in-out focus-within:border-gray-600 hover:border-gray-600">
      <label className="hide-me" htmlFor="artist-search-input" />
      <input
        id="artist-search-input"
        name="artist-search-input"
        ref={inputRef}
        type="search"
        onChange={(e) => {
          const results = artists
            .map(computeResultName)
            .filter(filteroutUnnamedResult)
            .filter(filterResultNameMatchingSearch(e));

          if (results.length === 0 || e.target.value === "")
            return closeDialog(true);

          setOpen(true);
          results.sort(sortResultsInPlace);
          setResults(results);
        }}
        className="w-full font-extralight text-gray-700 outline-none"
      />
      <Icon />
      {results.length > 0 && (
        <dialog
          open={open}
          className="absolute top-11 left-0 max-w-full min-w-full rounded p-0 shadow-md lg:top-11 lg:left-2 lg:max-w-none"
        >
          <ul>
            {results.map(({ name, articleId }, n) => (
              <li
                key={`search-result-${n}`}
                className="cursor-pointer overflow-x-hidden px-2 py-1 text-ellipsis whitespace-nowrap transition-colors ease-in-out hover:bg-gray-50 hover:text-gray-700"
              >
                <Link href={`/article/${articleId}`}>{name}</Link>
              </li>
            ))}
          </ul>
        </dialog>
      )}
      <ul className="hide-me">
        {artists
          .map(computeResultName)
          .filter(filteroutUnnamedResult)
          .map(({ name, articleId }, n) => (
            <li key={`search-result-${n}`}>
              <Link
                style={{
                  width: 0,
                  height: 0,
                  pointerEvents: "none",
                  opacity: 0,
                  position: "absolute",
                  zIndex: -10000,
                }}
                href={`/article/${articleId}`}
              >
                {name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
