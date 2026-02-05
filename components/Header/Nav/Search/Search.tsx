"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import { usePathname } from "next/navigation";

import { SearchResult } from "@/utils/types";

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

export default function Search() {
  const [results, setResults] = useState<{ name: string; articleId: string }[]>(
    []
  );
  const [open, setOpen] = useState(false);
  const [_loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  const closeDialog = (leaveInput = false) => {
    setOpen(false);
    setResults([]);
    if (!leaveInput && inputRef.current) inputRef.current.value = "";
  };

  useEffect(() => {
    closeDialog();
  }, [pathname]);

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  return (
    <div className="relative flex items-center border-b border-gray-400 px-2 py-1 transition-colors ease-in-out focus-within:border-gray-600 hover:border-gray-600">
      <input
        id="artist-search-input"
        name="artist-search-input"
        ref={inputRef}
        type="search"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const searchValue = e.target.value;

          if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

          if (searchValue.length < 3) return closeDialog(true);

          searchTimeoutRef.current = setTimeout(async () => {
            try {
              setLoading(true);

              const response = await fetch(`/api/artists?q=${searchValue}`);
              if (!response.ok) return { artists: [] };
              setResults((await response.json()) as Awaited<SearchResult[]>);

              setOpen(true);
            } catch (error) {
              console.error("[Search] failed to fetch artists:", error);
              closeDialog();
            } finally {
              setLoading(false);
            }
          }, 300);
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
                <Link href={`/article/${articleId}`} prefetch={false}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </dialog>
      )}
    </div>
  );
}
