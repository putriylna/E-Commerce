import React from "react";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function DesktopMenu() {
  return (
    <div className="hidden lg:flex ml-6">
      <div className="flex items-center space-x-4">
        {/* Homepage */}
        <Link
          to="/"
          className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-yellow-600 hover:bg-gray-100 rounded-md transition-colors"
        >
          Homepage
        </Link>

        {/* Products */}
        <Link
          to="/products"
          className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-yellow-600 hover:bg-gray-100 rounded-md transition-colors"
        >
          Products
        </Link>

        {/* Categories Dropdown */}
        <div className="relative group">
          <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-yellow-600 hover:bg-gray-100 rounded-md transition-colors">
            Categories
            <ChevronDownIcon className="h-4 w-4 ml-1" />
          </button>

          {/* Dropdown content */}
          <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <Link
              to="/category/electronics"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-yellow-600"
            >
              Electronics
            </Link>
            <Link
              to="/category/clothing"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-yellow-600"
            >
              Clothing
            </Link>
            <Link
              to="/category/home"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-yellow-600"
            >
              Home & Garden
            </Link>
            <Link
              to="/category/books"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-yellow-600"
            >
              Books
            </Link>
          </div>
        </div>

        {/* About */}
        <Link
          to="/about"
          className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-yellow-600 hover:bg-gray-100 rounded-md transition-colors"
        >
          About
        </Link>
      </div>
    </div>
  );
}
