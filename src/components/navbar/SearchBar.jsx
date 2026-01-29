import React from "react";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function SearchBar({
  showMobileSearch,
  setShowMobileSearch,
  searchQuery,
  setSearchQuery,
  searchInputRef,
  handleSearch,
  handleKeyDown,
  handleClearSearch,
}) {
  if (!showMobileSearch) return null;
  return (
    <>
      {showMobileSearch && (
        <div className="fixed inset-0 bg-base-100 z-50 md:hidden">
          <div className="navbar bg-base-100">
            <div className="navbar-start">
              <button
                onClick={() => setShowMobileSearch(false)}
                className="btn btn-ghost btn-circle"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="navbar-center w-full px-2">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <input
                    ref={searchInputRef}
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search products..."
                    className="input input-bordered w-full pl-10 pr-10 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                  />
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <XMarkIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>
              </form>
            </div>
            <div className="navbar-end">
              <button onClick={handleSearch} className="btn btn-primary ml-2">
                Search
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        className="btn btn-ghost btn-circle md:hidden"
        onClick={() => setShowMobileSearch(true)}
      >
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
      </button>

      <div className="navbar-end hidden md:flex">
        <form onSubmit={handleSearch} className="form-control max-w-md">
          <div className="relative w-64">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search products..."
              className="input input-bordered w-full pl-10 pr-10 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 hover:bg-gray-100 p-1 rounded"
              >
                <XMarkIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
