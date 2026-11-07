import React, { useState } from 'react';
import { JewelleryItem, Currency, ScreenId } from '../types';
import { formatPrice } from '../data/jewelleryData';
import { JewelleryArtwork } from '../components/JewelleryArtwork';
import { Heart, SlidersHorizontal, ArrowUpDown, Sparkles, Check, X, ShieldCheck } from 'lucide-react';

interface CollectionsScreenProps {
  catalogue: JewelleryItem[];
  currency: Currency;
  onNavigate: (screen: ScreenId, itemId?: string) => void;
  onAddToCart: (item: JewelleryItem) => void;
  onToggleWishlist: (id: string) => void;
  wishlistIds: string[];
}

export const CollectionsScreen: React.FC<CollectionsScreenProps> = ({
  catalogue,
  currency,
  onNavigate,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedGemstone, setSelectedGemstone] = useState<string>('All');
  const [selectedKaratage, setSelectedKaratage] = useState<string>('All');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-desc' | 'price-asc' | 'hours-desc'>('featured');
  const [quickViewItem, setQuickViewItem] = useState<JewelleryItem | null>(null);

  const categories = [
    'All',
    'Kundan Sets',
    'Polki Diamonds',
    'Meenakari & Jadau',
    "Royal Men's Regalia",
    'Heirloom Rings & Bangles',
  ];

  const gemstones = ['All', 'Emeralds & Polki', 'Burmese Rubies', 'Basra Pearls', 'Syndicate Polki', 'Navratna'];
  const karatages = ['All', '22K Royal Gold', '24K Kundan Foil', '18K Rose Gold'];
  const occasions = ['All', 'Royal Groom', 'Imperial Gala', 'Bridal Heirloom', 'Heritage Collector'];

  // Filtering
  const filteredItems = catalogue.filter((item) => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    if (selectedGemstone !== 'All' && item.gemstone !== selectedGemstone) return false;
    if (selectedKaratage !== 'All' && item.karatage !== selectedKaratage) return false;
    if (selectedOccasion !== 'All' && item.occasion !== selectedOccasion) return false;
    return true;
  });

  // Sorting
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'price-desc') return b.priceINR - a.priceINR;
    if (sortBy === 'price-asc') return a.priceINR - b.priceINR;
    if (sortBy === 'hours-desc') return b.artisanHours - a.artisanHours;
    // Featured default
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedGemstone !== 'All' ||
    selectedKaratage !== 'All' ||
    selectedOccasion !== 'All';

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedGemstone('All');
    setSelectedKaratage('All');
    setSelectedOccasion('All');
    setSortBy('featured');
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8 space-y-10">
      {/* Editorial Page Header & Breadcrumbs */}
      <div className="space-y-4 border-b border-[#C5A059]/30 pb-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#6E6259]">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#58111A] cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#58111A] font-semibold">Curated Collections</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-bold">
              The Jaipur Atelier Archive
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#390009] leading-tight">
              Curated Collections
            </h1>
            <p className="text-xs sm:text-sm text-[#554242] leading-relaxed">
              Every creation is individually commissioned or handcrafted in limited archival runs. Stamped with Government of India BIS 916 hallmarks and verified by master gemologists.
            </p>
          </div>

          <div className="text-right shrink-0">
            <div className="text-xs font-mono font-semibold text-[#58111A]">
              Showing {sortedItems.length} of {catalogue.length} Archival Specimens
            </div>
            <div className="text-[11px] text-[#1B4332] font-semibold mt-0.5">
              Insured Worldwide Armored Transit
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Filter Suite */}
      <div className="space-y-4 bg-[#F5F0EB] p-4 sm:p-6 border border-[#C5A059]/30">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#58111A]">
            <SlidersHorizontal className="w-4 h-4 text-[#C5A059]" />
            <span>Refine Collection</span>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-[#877272] hover:text-[#58111A] flex items-center gap-1 cursor-pointer underline"
            >
              <X className="w-3.5 h-3.5" />
              Reset All Filters
            </button>
          )}
        </div>

        {/* 1. Category Segmented Tabs */}
        <div>
          <div className="text-[11px] uppercase tracking-wider text-[#6E6259] font-semibold mb-2">
            Collection Category:
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#58111A] text-white shadow-xs'
                      : 'bg-white text-[#554242] border border-[#C5A059]/40 hover:bg-[#FAF8F5]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Micro Filters: Gemstone, Karatage, Occasion, and Sort Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-[#C5A059]/25 text-xs">
          {/* Gemstone */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#6E6259] font-semibold mb-1">
              Gemstone Focus
            </label>
            <select
              value={selectedGemstone}
              onChange={(e) => setSelectedGemstone(e.target.value)}
              className="w-full p-2 bg-white border border-[#C5A059]/40 text-[#231B1B] text-xs focus:outline-hidden focus:border-[#58111A]"
            >
              {gemstones.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Karatage */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#6E6259] font-semibold mb-1">
              Metal & Karatage
            </label>
            <select
              value={selectedKaratage}
              onChange={(e) => setSelectedKaratage(e.target.value)}
              className="w-full p-2 bg-white border border-[#C5A059]/40 text-[#231B1B] text-xs focus:outline-hidden focus:border-[#58111A]"
            >
              {karatages.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>

          {/* Occasion */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#6E6259] font-semibold mb-1">
              Occasion & Purpose
            </label>
            <select
              value={selectedOccasion}
              onChange={(e) => setSelectedOccasion(e.target.value)}
              className="w-full p-2 bg-white border border-[#C5A059]/40 text-[#231B1B] text-xs focus:outline-hidden focus:border-[#58111A]"
            >
              {occasions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#6E6259] font-semibold mb-1">
              Sort Sequence
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full p-2 bg-white border border-[#C5A059]/40 text-[#231B1B] text-xs focus:outline-hidden focus:border-[#58111A]"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-desc">Price: Highest to Lowest</option>
              <option value="price-asc">Price: Lowest to Highest</option>
              <option value="hours-desc">Karigari: Master Hours</option>
            </select>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {sortedItems.length === 0 && (
        <div className="text-center py-20 bg-[#F5F0EB] border border-[#C5A059]/30 space-y-4">
          <div className="font-serif text-xl text-[#390009]">No Heirloom Specimens Matched</div>
          <p className="text-xs text-[#6E6259] max-w-md mx-auto">
            Try adjusting your gemstone or karatage criteria to discover royal pieces in our atelier archive.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 bg-[#58111A] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#6B1724] cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Curated Product Grid - 4:5 Vertical Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedItems.map((item) => {
          const isWishlisted = wishlistIds.includes(item.id);
          const isMaharani = item.id === 'maharani-royal-kundan-set';

          return (
            <div
              key={item.id}
              className={`bg-[#FAF8F5] border transition-all flex flex-col justify-between shadow-royal-sm relative group ${
                isMaharani
                  ? 'border-[#C5A059] ring-1 ring-[#C5A059]/40'
                  : 'border-[#C5A059]/30 hover:border-[#C5A059]'
              }`}
            >
              {/* Special Tag for Maharani Set */}
              {isMaharani && (
                <div className="absolute top-3 left-3 z-20 bg-[#58111A] text-[#FED488] px-3 py-1 text-[10px] uppercase font-bold tracking-[0.16em] shadow-xs">
                  Imperial Archive Flagship
                </div>
              )}

              {/* 4:5 Aspect Ratio Image Vitrine Canvas */}
              <div
                onClick={() => {
                  if (isMaharani) {
                    onNavigate('product-details');
                  } else {
                    setQuickViewItem(item);
                  }
                }}
                className="relative bg-[#F5F0EB] cursor-pointer overflow-hidden"
              >
                <JewelleryArtwork
                  type={item.artworkType}
                  showBadge={!isMaharani}
                />

                {/* Wishlist Toggle Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(item.id);
                  }}
                  className="absolute top-3 right-3 p-2 bg-white/85 backdrop-blur-xs text-[#58111A] hover:bg-white rounded-full transition-all cursor-pointer shadow-xs z-10"
                  aria-label="Save to Wishlist"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isWishlisted ? 'fill-[#58111A] text-[#58111A]' : 'text-[#877272]'
                    }`}
                  />
                </button>

                {/* Subtle Hover Action Bar */}
                <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isMaharani) {
                        onNavigate('product-details');
                      } else {
                        setQuickViewItem(item);
                      }
                    }}
                    className="flex-1 py-2.5 bg-[#58111A] text-white text-[11px] font-semibold uppercase tracking-wider hover:bg-[#6B1724] cursor-pointer text-center"
                  >
                    {isMaharani ? 'Inspect Maharani Set' : 'Examine Specifications'}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(item);
                    }}
                    className="px-3 py-2.5 bg-white text-[#58111A] border border-[#C5A059] text-[11px] font-semibold uppercase tracking-wider hover:bg-[#F5F0EB] cursor-pointer"
                  >
                    Add to Vault
                  </button>
                </div>
              </div>

              {/* Card Meta Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="text-[11px] uppercase tracking-wider text-[#6E6259]">
                    {item.category} · {item.karatage}
                  </div>

                  <h3
                    onClick={() => {
                      if (isMaharani) onNavigate('product-details');
                      else setQuickViewItem(item);
                    }}
                    className="font-serif text-lg font-medium text-[#231B1B] hover:text-[#58111A] transition-colors cursor-pointer leading-snug"
                  >
                    {item.name}
                  </h3>

                  <div className="text-xs text-[#6E6259]">
                    {item.subtitle}
                  </div>

                  {item.polkiCarats && (
                    <div className="text-[11px] text-[#554242] font-medium pt-1">
                      {item.polkiCarats}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#C5A059]/25 flex items-center justify-between">
                  <div>
                    <div className="font-mono text-base font-bold text-[#58111A]">
                      {formatPrice(item.priceINR, currency)}
                    </div>
                    <div className="text-[10px] text-[#1B4332] font-semibold">
                      BIS 916 Stamped · {item.artisanHours} Hours
                    </div>
                  </div>

                  {isMaharani ? (
                    <button
                      onClick={() => onNavigate('product-details')}
                      className="px-3 py-1.5 bg-[#58111A] text-white text-[11px] font-semibold uppercase tracking-wider hover:bg-[#6B1724] cursor-pointer"
                    >
                      View Details &rarr;
                    </button>
                  ) : (
                    <button
                      onClick={() => setQuickViewItem(item)}
                      className="text-xs font-semibold text-[#58111A] hover:underline cursor-pointer"
                    >
                      Details &rarr;
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick View Modal for Other Catalogue Pieces */}
      {quickViewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setQuickViewItem(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          <div className="relative w-full max-w-3xl bg-[#FAF8F5] border border-[#C5A059] shadow-royal-lg overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row">
            {/* Left Artwork */}
            <div className="md:w-1/2 bg-[#F5F0EB] p-4 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#C5A059]/30">
              <div className="w-full max-w-xs">
                <JewelleryArtwork type={quickViewItem.artworkType} />
              </div>
            </div>

            {/* Right Details */}
            <div className="md:w-1/2 p-6 overflow-y-auto space-y-4 text-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-[#C5A059] font-bold">
                    {quickViewItem.category} · {quickViewItem.karatage}
                  </span>
                  <button
                    onClick={() => setQuickViewItem(null)}
                    className="p-1 text-[#877272] hover:text-[#231B1B] cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="font-serif text-xl font-medium text-[#390009]">
                  {quickViewItem.name}
                </h3>

                <p className="text-xs text-[#554242] leading-relaxed">
                  {quickViewItem.description}
                </p>

                <div className="space-y-1.5 p-3 bg-[#F5F0EB] border border-[#C5A059]/30">
                  <div className="flex justify-between text-[#6E6259]">
                    <span>Gross Weight:</span>
                    <span className="font-semibold text-[#231B1B]">{quickViewItem.grossWeight}</span>
                  </div>
                  <div className="flex justify-between text-[#6E6259]">
                    <span>Net Pure Gold:</span>
                    <span className="font-semibold text-[#231B1B]">{quickViewItem.netGoldWeight}</span>
                  </div>
                  {quickViewItem.polkiCarats && (
                    <div className="flex justify-between text-[#6E6259]">
                      <span>Polki Carats:</span>
                      <span className="font-semibold text-[#231B1B]">{quickViewItem.polkiCarats}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#6E6259]">
                    <span>Artisan Karigari:</span>
                    <span className="font-semibold text-[#231B1B]">{quickViewItem.artisanHours} Master Hours</span>
                  </div>
                  <div className="flex justify-between text-[#6E6259]">
                    <span>Hallmark & Trust:</span>
                    <span className="font-semibold text-[#1B4332]">{quickViewItem.certification}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#C5A059]/30 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-[#6E6259] uppercase tracking-wider font-semibold">
                    Atelier Price:
                  </span>
                  <span className="font-mono text-xl font-bold text-[#58111A]">
                    {formatPrice(quickViewItem.priceINR, currency)}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      onAddToCart(quickViewItem);
                      setQuickViewItem(null);
                    }}
                    className="flex-1 py-3 bg-[#58111A] text-white font-semibold uppercase tracking-wider hover:bg-[#6B1724] cursor-pointer text-center"
                  >
                    Add to Heirloom Vault
                  </button>
                  <button
                    onClick={() => {
                      setQuickViewItem(null);
                      onNavigate('studio');
                    }}
                    className="px-4 py-3 border border-[#C5A059] text-[#58111A] font-semibold uppercase tracking-wider hover:bg-[#F5F0EB] cursor-pointer"
                  >
                    Book Viewing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
