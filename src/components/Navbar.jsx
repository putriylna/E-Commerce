import Cart from '../carts/Cart'
import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid'
import { useCartStore } from "../store/useCartStore";

export default function Navbar(){
    // Navbar.jsx
    const cartItems = useCartStore((state) => state.cartItems);

    // Menghitung jumlah barang untuk badge
    const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const [open, setOpen] = useState(false)

    return (
    <>
    <div className="isolate flex items-center gap-x-6 overflow-hidden bg-black px-6 py-2.5 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10 sm:px-3.5 sm:before:flex-1 sticky top-0 z-10 ">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm/6 text-gray-100">
          <strong className="font-semibold">Online Shop</strong>
          <svg viewBox="0 0 2 2" aria-hidden="true" className="mx-2 inline size-0.5 fill-current">
            <circle r={1} cx={1} cy={1} />
          </svg>
          get free delivery on order overs 100$
        </p>
        <a
          href="#"
          className="flex-none rounded-full bg-white/10 px-3.5 py-1 text-sm font-semibold text-white shadow-xs inset-ring-white/20 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Register now <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
      <div className="flex flex-1 justify-end">
        <button type="button" className="-m-3 p-3 focus-visible:-outline-offset-4">
          <span className="sr-only">Dismiss</span>
          <XMarkIcon aria-hidden="true" className="size-5 text-gray-100" />
        </button>
      </div>
    </div>
         
    <div className="navbar bg-base-100 shadow-sm sticky top-12 z-5">

        <div className="navbar-start gap-8">
            <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
            </div>
            <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-4 w-52 p-2 shadow">
                <li><a>Homepage</a></li>
                <li><a>Products</a></li>
                <li><a>About</a></li>
            </ul>
            </div>
            <span className='flex items-center gap-3 font-extrabold text-1xl '>
                {/* <img className='w-18 h-18 object-contain' src='logo-shop.png'></img> */}
                <span className='heading-logo leading-none'>ONLINE SHOP</span>
            </span>
        </div>
        {/* Search */}
        <label className="input navbar-center">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
            <input type="search" required placeholder="Search" />
            <button className='bg-rounded'></button>
        </label>

        <div className="navbar-end flex items-center gap-1">
            {/* Cart */}
            <button className="btn btn-ghost flex items-center gap-2 hover:bg-base-200" onClick={() => setOpen(true)}>
                    <div className="indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    {/* UBAH ANGKA 0 MENJADI totalItems */}
                    {totalItems > 0 && (
                        <span className="badge badge-sm badge-primary indicator-item">
                            {totalItems}
                        </span>
                    )}
                    </div>
                    <span className="text-sm font-medium">Cart</span>
            </button>

            {/* Register */}
            <button className="btn btn-ghost flex items-center gap-2 hover:bg-base-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>
                <span className="text-sm font-medium">Register</span>
            </button>
        </div>

    <Cart open={open} setOpen={setOpen} />
    </div>
    </>
    );  
}