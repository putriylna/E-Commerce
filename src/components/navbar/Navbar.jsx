import { useNavbar } from "./useNavbar";
import { Link } from "react-router-dom";
import Cart from "../../carts/Cart";
import TopBanner from "./TopBanner";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import SearchBar from "./SearchBar";
import CartButton from "./CartButton";
import AccountDropdown from "./AccountDropdown";

export default function Navbar({ onSearch }) {
  const {
    cartItems,
    totalItems,
    open,
    setOpen,
    searchQuery,
    setSearchQuery,
    showMobileSearch,
    setShowMobileSearch,
    searchInputRef,
    mobileMenuOpen,
    setMobileMenuOpen,
    handleSearch,
    handleKeyDown,
    handleClearSearch,
  } = useNavbar(onSearch);

  return (
    <>
      {/* Top Banner */}
      <TopBanner onDismiss={() => {}} />

      {/* Main Navbar */}
      <div className="navbar bg-base-100 shadow-sm sticky top-12 z-40">
        <div className="navbar-start">
          {/* Mobile Menu Button */}
          <MobileMenu
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            setShowMobileSearch={setShowMobileSearch}
          />

          {/* Mobile Dropdown Menu */}

          {/* Logo */}
          <span className="flex items-center gap-3 font-extrabold text-xl ml-2">
            <Link
              to="/"
              className="heading-logo leading-none hidden sm:inline hover:opacity-80 transition-opacity"
            >
              ONLINE <br /> SHOP
            </Link>
            <Link
              to="/"
              className="heading-logo leading-none sm:hidden hover:opacity-80 transition-opacity"
            >
              OS
            </Link>
          </span>

          {/* Desktop Menu */}
          <DesktopMenu />
        </div>

        {/* Mobile Search Overlay */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onKeyDown={handleKeyDown}
          onSubmit={handleSearch}
          onClear={handleClearSearch}
          isMobile={false}
        />

        <div className="navbar-end flex items-center gap-2">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onKeyDown={handleKeyDown}
            onSubmit={handleSearch}
            onClear={handleClearSearch}
            isMobile={true}
            onCloseMobile={() => setShowMobileSearch(false)}
            show={showMobileSearch}
            ref={searchInputRef}
          />
          {/* Mobile Search Button - Hidden on desktop */}

          {/* Cart */}
          <CartButton
            cartItems={cartItems}
            totalItems={totalItems}
            setOpen={setOpen}
          />

          {/* Register - Hidden on mobile */}
          <AccountDropdown />
        </div>

        <Cart open={open} setOpen={setOpen} />
      </div>
    </>
  );
}
