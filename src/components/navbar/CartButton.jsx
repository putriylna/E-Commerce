import React from "react";

export default function CartButton({ cartItems, totalItems, setOpen }) {
  return (
    <div className="relative group">
      <button
        className="btn btn-ghost flex items-center gap-2 hover:bg-base-200 relative"
        onClick={() => setOpen(true)}
      >
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
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems > 99 ? "99+" : totalItems}
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
                  <div
                    key={item.id}
                    className="flex items-center py-2 border-b border-gray-300"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-10 w-10 object-cover rounded"
                    />
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
                className="w-full mt-3 btn btn-primary btn-sm"
              >
                View Full Cart
              </button>
            </>
          ) : (
            <p className="text-center text-gray-500 py-4">Your cart is empty</p>
          )}
        </div>
      </div>
    </div>
  );
}
