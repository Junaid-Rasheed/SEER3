import React from 'react';
import { SearchIcon } from '@heroicons/react/outline';

const SearchBar = () => {
  return (
    <div className="relative">
      <SearchIcon className="w-6 h-6 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
      <input
        className="pl-10 input bg-gray-900 text-white"
        placeholder="search"
      />
    </div>
  );
};

export default SearchBar;
