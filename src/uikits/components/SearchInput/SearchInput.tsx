import { FaSearch } from "react-icons/fa";

import type React from "react";

type SearchInputProps = {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  placeholder,
  onChange,
}) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        className="rounded-md border border-gray-300  bg-white py-2 pl-12 pr-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        value={value}
        onChange={onChange}
      />
      <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center pr-3">
        <FaSearch className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
};

export { SearchInput };
