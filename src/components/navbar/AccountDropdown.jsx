import React from "react";
import { Link } from "react-router-dom";

export default function AccountDropdown() {
  return (
    <div className="relative group hidden sm:block">
      <button className="btn btn-ghost flex items-center gap-2 hover:bg-base-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
          />
        </svg>
        <span className="text-sm font-medium">Account</span>
      </button>

      {/* Account Dropdown (Desktop Only) */}
      <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-300">
        <div className="py-2">
          <Link
            to="/login"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Register
          </Link>
          <Link
            to="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            My Profile
          </Link>
          <Link
            to="/orders"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            My Orders
          </Link>
          <div className="border-t border-gray-300 mt-2 pt-2">
            <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
