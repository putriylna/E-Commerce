import { Link } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function MobileMenu({
  mobileMenuOpen,
  setMobileMenuOpen,
  setShowMobileSearch,
}) {
  return (
    <div className="dropdown mobile-menu-dropdown lg:hidden">
      <button
        type="button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="btn btn-ghost btn-circle"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </button>

      {mobileMenuOpen && (
        <div className="dropdown-content absolute left-0 mt-3 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            <Link
              to="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Homepage
            </Link>
            <Link
              to="/products"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <div className="relative group">
              <button className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Categories
                <ChevronDownIcon className="h-4 w-4 ml-1" />
              </button>
              <div className="absolute left-full top-0 ml-1 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  to="/category/electronics"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Electronics
                </Link>
                <Link
                  to="/category/clothing"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Clothing
                </Link>
                <Link
                  to="/category/home"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Home & Garden
                </Link>
              </div>
            </div>
            <Link
              to="/about"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>

            <button
              onClick={() => {
                setShowMobileSearch(true);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
