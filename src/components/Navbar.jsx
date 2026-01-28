import Cart from '../carts/Cart'
import { useState, useEffect, useRef } from 'react';
import { XMarkIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { useCartStore } from "../store/useCartStore";
import { Link } from "react-router-dom";

export default function Navbar({ onSearch }) {
    const cartItems = useCartStore((state) => state.cartItems);
    const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const searchInputRef = useRef(null);

    // Fokus ke input search saat mobile search dibuka
    useEffect(() => {
        if (showMobileSearch && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [showMobileSearch]);

    // Handle search submission
    const handleSearch = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(searchQuery);
        }
        // Close mobile search after submission
        if (showMobileSearch) {
            setShowMobileSearch(false);
        }
    };

    // Handle search with Enter key
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    // Clear search
    const handleClearSearch = () => {
        setSearchQuery('');
        if (onSearch) {
            onSearch('');
        }
    };

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mobileMenuOpen && !event.target.closest('.mobile-menu-dropdown')) {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [mobileMenuOpen]);

    return (
        <>
            {/* Top Banner */}
            <div className="isolate flex items-center gap-x-6 overflow-hidden bg-black px-6 py-2.5 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10 sm:px-3.5 sm:before:flex-1 sticky top-0 z-50">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <p className="text-sm/6 text-gray-100">
                        <strong className="font-semibold">Online Shop</strong>
                        <svg viewBox="0 0 2 2" aria-hidden="true" className="mx-2 inline size-0.5 fill-current">
                            <circle r={1} cx={1} cy={1} />
                        </svg>
                        <span className="hidden sm:inline">get free delivery on order over 100$</span>
                        <span className="inline sm:hidden">free delivery over 100$</span>
                    </p>
                    <a
                        href="#"
                        className="hidden sm:flex flex-none rounded-full bg-white/10 px-3.5 py-1 text-sm font-semibold text-white shadow-xs inset-ring-white/20 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                        Register now <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
                <div className="flex flex-1 justify-end">
                    <button 
                        type="button" 
                        className="-m-3 p-3 focus-visible:-outline-offset-4"
                        onClick={() => {/* Add dismiss functionality */}}
                    >
                        <span className="sr-only">Dismiss</span>
                        <XMarkIcon aria-hidden="true" className="size-5 text-gray-100" />
                    </button>
                </div>
            </div>

            {/* Main Navbar */}
            <div className="navbar bg-base-100 shadow-sm sticky top-12 z-40">
                <div className="navbar-start">
                    {/* Mobile Menu Button */}
                    <div className="dropdown mobile-menu-dropdown lg:hidden">
                        <button 
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="btn btn-ghost btn-circle"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </button>
                        
                        {/* Mobile Dropdown Menu */}
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
                                            <Link to="/category/electronics" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Electronics</Link>
                                            <Link to="/category/clothing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Clothing</Link>
                                            <Link to="/category/home" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Home & Garden</Link>
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
                    
                    {/* Logo */}
                    <span className='flex items-center gap-3 font-extrabold text-xl ml-2'>
                        <Link to="/" className='heading-logo leading-none hidden sm:inline hover:opacity-80 transition-opacity'>ONLINE <br/> SHOP</Link>
                        <Link to="/" className='heading-logo leading-none sm:hidden hover:opacity-80 transition-opacity'>OS</Link>
                    </span>
                    
                    {/* Desktop Menu */}
                    <div className="hidden lg:flex ml-6">
                        <div className="flex items-center space-x-4">
                            <Link to="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-yellow-600 hover:bg-gray-100 rounded-md transition-colors">
                                Homepage
                            </Link>
                            <Link to="/products" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-yellow-600 hover:bg-gray-100 rounded-md transition-colors">
                                Products
                            </Link>
                            
                            {/* Desktop Dropdown */}
                            <div className="relative group">
                                <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-yellow-600 hover:bg-gray-100 rounded-md transition-colors">
                                    Categories
                                    <ChevronDownIcon className="h-4 w-4 ml-1" />
                                </button>
                                
                                {/* Desktop Dropdown Content */}
                                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <Link to="/category/electronics" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-yellow-600">Electronics</Link>
                                    <Link to="/category/clothing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-yellow-600">Clothing</Link>
                                    <Link to="/category/home" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-yellow-600">Home & Garden</Link>
                                    <Link to="/category/books" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-yellow-600">Books</Link>
                                </div>
                            </div>
                            
                            <Link to="/about" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-yellow-600 hover:bg-gray-100 rounded-md transition-colors">
                                About
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Desktop Search - Hidden on mobile */}


                {/* Mobile Search Overlay */}
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
                                <button
                                    onClick={handleSearch}
                                    className="btn btn-primary ml-2"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="navbar-end flex items-center gap-2">
                    {/* Mobile Search Button - Hidden on desktop */}
                    <button 
                        className="btn btn-ghost btn-circle md:hidden"
                        onClick={() => setShowMobileSearch(true)}
                    >
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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


                    {/* Cart */}
                    <div className="relative group">
                        <button 
                            className="btn btn-ghost flex items-center gap-2 hover:bg-base-200 relative" 
                            onClick={() => setOpen(true)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {totalItems > 99 ? '99+' : totalItems}
                                </span>
                            )}
                            <span className="hidden sm:inline text-sm font-medium">Cart</span>
                        </button>
                        
                        {/* Cart Preview Dropdown (Desktop Only) */}
                        <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-300">
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-semibold">Shopping Cart</h3>
                                    <span className="text-sm text-gray-500">{totalItems} items</span>
                                </div>
                                {cartItems.length > 0 ? (
                                    <>
                                        <div className="max-h-60 overflow-y-auto">
                                            {cartItems.slice(0, 3).map((item) => (
                                                <div key={item.id} className="flex items-center py-2 border-b border-gray-300">
                                                    <img src={item.image} alt={item.title} className="h-10 w-10 object-cover rounded" />
                                                    <div className="ml-3 flex-1">
                                                        <p className="text-sm truncate">{item.title}</p>
                                                        <p className="text-xs text-gray-500">
                                                            {item.qty} × ${item.price.toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => setOpen(true)}
                                            className="w-full mt-3 btn btn-primary btn-sm">
                                            View Full Cart
                                        </button>
                                    </>
                                ) : (
                                    <p className="text-center text-gray-500 py-4">Your cart is empty</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Register - Hidden on mobile */}
                    <div className="relative group hidden sm:block">
                        <button className="btn btn-ghost flex items-center gap-2 hover:bg-base-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                            </svg>
                            <span className="text-sm font-medium">Account</span>
                        </button>
                        
                        {/* Account Dropdown (Desktop Only) */}
                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-300">
                            <div className="py-2">
                                <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login</Link>
                                <Link to="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Register</Link>
                                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</Link>
                                <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Orders</Link>
                                <div className="border-t border-gray-300 mt-2 pt-2">
                                    <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Cart open={open} setOpen={setOpen} />
            </div>
        </>
    );
}