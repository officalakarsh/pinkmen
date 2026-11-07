import React, { useState } from 'react';
import { ScreenId, Currency } from '../types';
import { Search, Heart, ShoppingBag, Globe, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  currency,
  onCurrencyChange,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const currencies: Currency[] = ['INR', 'USD', 'GBP', 'AED'];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#C5A059]/30 transition-colors">
      {/* Editorial Announcement Bar */}
      <div className="bg-[#58111A] text-[#FAF8F5] text-[11px] uppercase tracking-[0.12em] py-1.5 px-4 text-center font-medium border-b border-[#C5A059]/30">
        <span className="hidden sm:inline">Johari Bazaar Haveli Atelier · </span>
        <span>BIS 916 Hallmarked Heirloom Jewellery</span>
        <span className="hidden md:inline"> · Insured White-Glove Global Delivery</span>
      </div>

      {/* Main Navigation Bar - Strictly 3-Zone Contract */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single line display face) */}
        <button
          onClick={() => {
            onNavigate('home');
            setMobileMenuOpen(false);
          }}
          className="text-left group cursor-pointer focus:outline-hidden"
        >
          <div className="text-xl sm:text-2xl font-serif tracking-[0.08em] font-medium text-[#390009] group-hover:text-[#6B1724] transition-colors whitespace-nowrap shrink-0">
            PINK MEN JEWELLERY
          </div>
          <div className="text-[9px] uppercase tracking-[0.24em] text-[#C5A059] font-sans font-semibold">
            Jaipur · Royal Rajputana Contemporary
          </div>
        </button>

        {/* Zone 2: Navigation Links (Single line clean text links) */}
        <nav className="hidden lg:flex items-center gap-8 text-[13px] uppercase tracking-[0.1em] font-semibold text-[#554242]">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors hover:text-[#58111A] relative py-1 cursor-pointer whitespace-nowrap shrink-0 ${
              currentScreen === 'home' ? 'text-[#58111A] font-bold' : ''
            }`}
          >
            Home
            {currentScreen === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A059]" />
            )}
          </button>

          <button
            onClick={() => onNavigate('collections')}
            className={`transition-colors hover:text-[#58111A] relative py-1 cursor-pointer whitespace-nowrap shrink-0 ${
              currentScreen === 'collections' ? 'text-[#58111A] font-bold' : ''
            }`}
          >
            Curated Collections
            {currentScreen === 'collections' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A059]" />
            )}
          </button>

          <button
            onClick={() => onNavigate('product-details')}
            className={`transition-colors hover:text-[#58111A] relative py-1 cursor-pointer whitespace-nowrap shrink-0 ${
              currentScreen === 'product-details' ? 'text-[#58111A] font-bold' : ''
            }`}
          >
            Maharani Royal Kundan Set
            {currentScreen === 'product-details' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A059]" />
            )}
          </button>

          <button
            onClick={() => onNavigate('studio')}
            className={`transition-colors hover:text-[#58111A] relative py-1 cursor-pointer whitespace-nowrap shrink-0 ${
              currentScreen === 'studio' ? 'text-[#58111A] font-bold' : ''
            }`}
          >
            Visit Jaipur Studio
            {currentScreen === 'studio' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A059]" />
            )}
          </button>
        </nav>

        {/* Zone 3: Utilities & Primary Action */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Currency Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs tracking-wider uppercase font-semibold text-[#554242] border border-[#C5A059]/40 bg-[#FAF8F5] hover:border-[#C5A059] transition-all cursor-pointer"
              title="Select Currency"
            >
              <Globe className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{currency}</span>
            </button>

            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-1 w-28 bg-[#FAF8F5] border border-[#C5A059] shadow-lg py-1 z-50">
                {currencies.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      onCurrencyChange(c);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                      currency === c ? 'bg-[#58111A] text-white' : 'text-[#231B1B] hover:bg-[#F5F0EB]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#554242] hover:text-[#58111A] transition-colors cursor-pointer"
            aria-label="Search Collection"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Wishlist Trigger */}
          <button
            onClick={onOpenWishlist}
            className="p-2 text-[#554242] hover:text-[#58111A] transition-colors relative cursor-pointer"
            aria-label="View Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C5A059] text-[#390009] text-[10px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Heirloom Vault / Bag Trigger */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3 py-2 bg-[#58111A] text-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.08em] hover:bg-[#6B1724] transition-all cursor-pointer shadow-royal-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#FED488]" />
            <span className="hidden sm:inline">Vault</span>
            <span className="w-4 h-4 rounded-full bg-[#FED488] text-[#390009] text-[10px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          </button>

          {/* Mobile Navigation Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#58111A] lg:hidden cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#C5A059]/30 bg-[#FAF8F5] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-sm font-semibold tracking-wider uppercase text-[#554242]">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className={`text-left py-2 border-b border-[#C5A059]/20 ${
                currentScreen === 'home' ? 'text-[#58111A] font-bold' : ''
              }`}
            >
              1. Home Screen
            </button>
            <button
              onClick={() => {
                onNavigate('collections');
                setMobileMenuOpen(false);
              }}
              className={`text-left py-2 border-b border-[#C5A059]/20 ${
                currentScreen === 'collections' ? 'text-[#58111A] font-bold' : ''
              }`}
            >
              2. Curated Collections
            </button>
            <button
              onClick={() => {
                onNavigate('product-details');
                setMobileMenuOpen(false);
              }}
              className={`text-left py-2 border-b border-[#C5A059]/20 ${
                currentScreen === 'product-details' ? 'text-[#58111A] font-bold' : ''
              }`}
            >
              3. Maharani Royal Kundan Set (PDP)
            </button>
            <button
              onClick={() => {
                onNavigate('studio');
                setMobileMenuOpen(false);
              }}
              className={`text-left py-2 ${
                currentScreen === 'studio' ? 'text-[#58111A] font-bold' : ''
              }`}
            >
              4. Visit Jaipur Studio
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
