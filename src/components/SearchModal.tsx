import React, { useState } from 'react';
import { JewelleryItem, Currency, ScreenId } from '../types';
import { formatPrice } from '../data/jewelleryData';
import { JewelleryArtwork } from './JewelleryArtwork';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  catalogue: JewelleryItem[];
  currency: Currency;
  onNavigate: (screen: ScreenId, itemId?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  catalogue,
  currency,
  onNavigate,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = catalogue.filter((item) => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return true;
    return (
      item.name.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.gemstone.toLowerCase().includes(q) ||
      item.karatage.toLowerCase().includes(q) ||
      item.occasion.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  });

  const popularSearches = ['Maharani Kundan', 'Polki Diamonds', 'Royal Groom', 'Emerald Kantha', 'Kalgi', '22K Gold'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" />

      <div className="relative w-full max-w-2xl bg-[#FAF8F5] border border-[#C5A059] shadow-royal-lg overflow-hidden z-10">
        {/* Search Input Bar */}
        <div className="p-4 bg-white border-b border-[#C5A059]/40 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#C5A059]" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search jewels by name, gemstone, caratage, or occasion..."
            className="flex-1 text-sm bg-transparent border-none focus:outline-hidden text-[#231B1B]"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-[#877272] hover:text-[#231B1B] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs uppercase font-semibold tracking-wider text-[#58111A] hover:underline cursor-pointer pl-2 border-l border-[#C5A059]/30"
          >
            Esc
          </button>
        </div>

        {/* Quick Search Tag Pills */}
        <div className="px-4 py-2 bg-[#F5F0EB] border-b border-[#C5A059]/20 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-[11px] font-semibold text-[#6E6259] uppercase tracking-wider shrink-0">
            Suggested:
          </span>
          {popularSearches.map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              className="px-2.5 py-0.5 bg-white text-[#58111A] border border-[#C5A059]/40 rounded-full text-[11px] font-medium hover:bg-[#58111A] hover:text-white transition-colors shrink-0 cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
          <div className="text-[11px] uppercase tracking-wider text-[#6E6259] font-semibold">
            {filtered.length} Heirloom Specimen{filtered.length === 1 ? '' : 's'} Found
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-12 text-[#6E6259] text-xs">
              No matching royal pieces found for &ldquo;{searchTerm}&rdquo;. Try searching for &ldquo;Kundan&rdquo;, &ldquo;Polki&rdquo;, or &ldquo;Emerald&rdquo;.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onClose();
                  if (item.id === 'maharani-royal-kundan-set') {
                    onNavigate('product-details');
                  } else {
                    onNavigate('collections');
                  }
                }}
                className="p-3 bg-[#F5F0EB] border border-[#C5A059]/30 hover:border-[#C5A059] flex items-center justify-between gap-4 cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-16 bg-white border border-[#C5A059]/30 shrink-0 overflow-hidden">
                    <JewelleryArtwork type={item.artworkType} showBadge={false} />
                  </div>
                  <div>
                    <div className="font-serif text-sm font-medium text-[#231B1B] group-hover:text-[#58111A]">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-[#6E6259]">
                      {item.category} · {item.karatage} · {item.gemstone}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-right">
                  <div>
                    <div className="font-mono text-xs font-semibold text-[#58111A]">
                      {formatPrice(item.priceINR, currency)}
                    </div>
                    <div className="text-[10px] text-[#1B4332] font-semibold">
                      BIS 916 Stamped
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
