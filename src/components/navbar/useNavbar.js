import { useState, useEffect, useRef } from "react";
import { useCartStore } from "../../store/useCartStore";

export function useNavbar(onSearch) {
  const cartItems = useCartStore((state) => state.cartItems);
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (showMobileSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showMobileSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
    if (showMobileSearch) setShowMobileSearch(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch(e);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    if (onSearch) onSearch('');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.mobile-menu-dropdown')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  // Kembalikan semua state dan function agar bisa dipakai di Navbar.jsx
  return {
    cartItems,
    totalItems,
    open,
    setOpen,
    searchQuery,
    setSearchQuery,
    showMobileSearch,
    setShowMobileSearch,
    mobileMenuOpen,
    setMobileMenuOpen,
    searchInputRef,
    handleSearch,
    handleKeyDown,
    handleClearSearch
  };
}
