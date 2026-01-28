import { useRef } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useCartStore } from "../store/useCartStore"

export default function Cart({ open, setOpen }) {
  const {
    cartItems,
    incrementQty,
    decrementQty,
    removeFromCart,
    clearCart,
    getSubtotal,
    getTotalItems,
    parsePrice
  } = useCartStore()

  const closeButtonRef = useRef(null)
  const subtotal = getSubtotal()
  const totalItems = getTotalItems()

  // Format angka dengan 2 desimal
  const formatPrice = (price) => {
    const num = typeof price === 'number' ? price : parsePrice(price)
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  // Handle decrement dengan konfirmasi jika qty = 1
  const handleDecrement = (id) => {
    const product = cartItems.find(item => item.id === id)
    if (!product) return

    if (product.qty === 1) {
      if (window.confirm('Remove this item from cart?')) {
        removeFromCart(id)
      }
    } else {
      decrementQty(id)
    }
  }

  // Handle checkout
  const handleCheckout = (e) => {
    e.preventDefault()
    if (cartItems.length === 0) {
      alert('Your cart is empty!')
      return
    }
    
    // Di sini biasanya redirect ke checkout page
    alert(`Proceeding to checkout with ${totalItems} items totaling $${formatPrice(subtotal)}`)
    // Contoh: window.location.href = '/checkout'
  }

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      initialFocus={closeButtonRef}
      className="relative z-50"
    >
      {/* Overlay */}
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      {/* Side Panel */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel className="pointer-events-auto w-screen max-w-md transform transition duration-300 ease-in-out data-closed:translate-x-full">
              <div className="flex h-full flex-col bg-white shadow-xl">
                
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-4 sm:px-6 bg-gray-50 border-b border-gray-300">
                  <div>
                    <DialogTitle className="text-lg font-bold text-gray-900">
                      Shopping Cart
                    </DialogTitle>
                    {cartItems.length > 0 && (
                      <p className="text-sm text-gray-600 mt-1">
                        {totalItems} {totalItems === 1 ? 'item' : 'items'} in cart
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {cartItems.length > 0 && (
                      <button
                        onClick={() => {
                          if (window.confirm('Clear all items from cart?')) {
                            clearCart()
                          }
                        }}
                        className="text-sm text-red-600 hover:text-red-800 hover:underline"
                      >
                        Clear All
                      </button>
                    )}
                    
                    <button
                      ref={closeButtonRef}
                      onClick={() => setOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="Close cart"
                    >
                      <XMarkIcon className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Cart Items - Scrollable Area */}
                <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
                  {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Your cart is empty
                      </h3>
                      <p className="text-gray-500 mb-6">
                        Add some products to your cart
                      </p>
                      <button
                        onClick={() => setOpen(false)}
                        className="px-6 py-2 bg-yellow-500 text-white font-medium rounded-md hover:bg-yellow-600 transition-colors"
                      >
                        Browse Products
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((product) => {
                        const itemPrice = parsePrice(product.price)
                        const itemTotal = itemPrice * product.qty
                        
                        return (
                          <div key={product.id} className="flex py-4 border-b border-gray-300 last:border-b-0">
                            {/* Product Image */}
                            <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Product Info */}
                            <div className="ml-4 flex-1">
                              <div className="flex justify-between">
                                <div className="pr-4">
                                  <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                                    {product.title}
                                  </h4>
                                  {product.category && (
                                    <p className="text-xs text-gray-500 mt-1 capitalize">
                                      {product.category}
                                    </p>
                                  )}
                                </div>
                                <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                                  ${formatPrice(itemPrice)}
                                </p>
                              </div>

                              {/* Quantity Controls */}
                              <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center space-x-3">
                                  <button
                                    onClick={() => handleDecrement(product.id)}
                                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={product.qty <= 1}
                                    aria-label="Decrease quantity"
                                  >
                                    <span className="text-gray-600">−</span>
                                  </button>
                                  
                                  <span className="font-medium text-gray-900 min-w-8 text-center">
                                    {product.qty}
                                  </span>
                                  
                                  <button
                                    onClick={() => incrementQty(product.id)}
                                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                                    aria-label="Increase quantity"
                                  >
                                    <span className="text-gray-600">+</span>
                                  </button>
                                </div>

                                <div className="text-right">
                                  <p className="text-sm font-semibold text-gray-900">
                                    ${formatPrice(itemTotal)}
                                  </p>
                                  <button
                                    onClick={() => {
                                      if (window.confirm('Remove this item from cart?')) {
                                        removeFromCart(product.id)
                                      }
                                    }}
                                    className="text-xs font-medium text-red-600 hover:text-red-800 hover:underline transition-colors mt-1"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Footer - Only show when cart has items */}
                {cartItems.length > 0 && (
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6 bg-gray-50">
                    {/* Order Summary */}
                    <div className="space-y-4">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${formatPrice(subtotal)}</p>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-600">
                        <p>Items</p>
                        <p>{totalItems}</p>
                      </div>

                      <div className="border-t border-gray-300 pt-4">
                        <div className="flex justify-between text-lg font-bold text-gray-900">
                          <p>Total</p>
                          <p>${formatPrice(subtotal)}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Shipping and taxes calculated at checkout
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 space-y-3">
                      <button
                        onClick={handleCheckout}
                        className="w-full flex items-center justify-center rounded-md bg-yellow-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-yellow-600 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                      >
                        Proceed to Checkout
                      </button>

                      <button
                        onClick={() => setOpen(false)}
                        className="w-full text-center text-sm font-medium text-yellow-600 hover:text-yellow-700 hover:underline transition-colors py-2"
                      >
                        Continue Shopping →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}