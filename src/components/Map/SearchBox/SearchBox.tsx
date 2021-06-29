import React, { MouseEvent } from 'react';
import { ChangeEvent } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLazySearchLocations } from '../../../queries/useSearchLocations';
import { GqlLocation } from '../../../types';

import { ReactComponent as SearchIcon } from './assets/svg/search-icon.svg';

interface SearchBoxProps {
  onSelectedLocation: (location: GqlLocation) => void;
}

export default function SearchBox({ onSelectedLocation }: SearchBoxProps) {
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);

  const onSearchStringChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const [searchLocations, { data, error }] = useLazySearchLocations();

  const onSubmit = (event: MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery) searchLocations({ variables: { searchQuery } });
  };

  useEffect(() => {
    if (data?.searchLocations.length)
      onSelectedLocation(data.searchLocations[0]);
    if (error) console.error(error);
  }, [data, error, onSelectedLocation]);

  return (
    <form
      action=""
      className="flex text-gray-600 bg-gray-100 p-1 place-items-center h-8"
      onSubmit={onSubmit}
    >
      <button type="submit" className="">
        <SearchIcon className="fill-current mx-1 focus:text-gray-800 hover:text-gray-800" />
      </button>
      <input
        type="text"
        name="search"
        id="search"
        className={`
        flex-1 mx-1 pl-2 pb-1 h-6 outline-none
        border rounded border-gray-200 bg-gray-100 
        font-thin text-md
        focus:border-gray-300 
        hover:border-gray-300`}
        onChange={onSearchStringChange}
      />
    </form>
  );
}
