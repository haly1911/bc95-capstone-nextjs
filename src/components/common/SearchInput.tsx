"use client";

import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

interface SearchInputProps {
  placeholder?: string;
  defaultValue?: string;
  onSearch: (keyword: string) => void;
  className?: string;
}

const SearchInput = ({ placeholder = "Search...", defaultValue = "", onSearch, className = "" }: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState(defaultValue);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center rounded-full border border-border bg-card px-4 py-2 ${className}`}
    >
      <FaMagnifyingGlass className="text-muted-foreground shrink-0" />
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
      <button
        type="submit"
        className="ml-2 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shrink-0 cursor-pointer"
      >
        Search
      </button>
    </form>
  );
};

export default SearchInput;
