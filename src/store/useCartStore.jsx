import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  // STATE
  cartItems: [],

  // Helper function untuk parse price
  parsePrice: (price) => {
    if (price === null || price === undefined) return 0;
    
    // Jika sudah number
    if (typeof price === 'number') return price;
    
    // Jika string, hapus simbol non-digit kecuali titik desimal
    if (typeof price === 'string') {
      const cleaned = price.replace(/[^0-9.]/g, '');
      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? 0 : parsed;
    }  
    return 0;
  },

  // ACTIONS
  addToCart: (product) => {
    set((state) => {
      // Parse price
      const parsedPrice = get().parsePrice(product.price);
      
      // Cek apakah product sudah ada di cart
      const existingItem = state.cartItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update quantity jika sudah ada
        return {
          cartItems: state.cartItems.map(item =>
            item.id === product.id
              ? { ...item, qty: item.qty + (product.qty || 1) }
              : item
          )
        };
      }
      
      // Tambah item baru
      return {
        cartItems: [
          ...state.cartItems,
          {
            id: product.id,
            title: product.title || 'Product',
            price: parsedPrice,
            qty: product.qty || 1,
            image: product.image || '',
            category: product.category || ''
          }
        ]
      };
    });
  },

  incrementQty: (id) => {
    set((state) => ({
      cartItems: state.cartItems.map(item =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    }));
  },

  decrementQty: (id) => {
    set((state) => ({
      cartItems: state.cartItems
        .map(item =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter(item => item.qty > 0) // Hapus jika qty = 0
    }));
  },

  removeFromCart: (id) => {
    set((state) => ({
      cartItems: state.cartItems.filter(item => item.id !== id)
    }));
  },

  clearCart: () => {
    set({ cartItems: [] });
  },

  // GETTERS
  getSubtotal: () => {
    return get().cartItems.reduce((total, item) => {
      return total + (get().parsePrice(item.price) * item.qty);
    }, 0);
  },

  getTotalItems: () => {
    return get().cartItems.reduce((total, item) => total + item.qty, 0);
  }
}));