import React from 'react';
import { JewelleryItem, Currency, ScreenId } from '../types';
import { formatPrice } from '../data/jewelleryData';
import { JewelleryArtwork } from './JewelleryArtwork';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  catalogue: JewelleryItem[];
  onRemoveWishlist: (id: string) => void;
  onAddToCart: (item: JewelleryItem) => void;
  currency: Currency;
  onNavigate: (screen: ScreenId, itemId?: string) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  catalogue,
  onRemoveWishlist,
  onAddToCart,
  currency,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const savedItems = catalogue.filter((item) => wishlistIds.includes(item.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#C5A059] shadow-royal-lg flex flex-col">
          {/* Header */}
          <div className="p-6 bg-[#58111A] text-[#FAF8F5] flex items-center justify-between border-b border-[#C5A059]/40">
            <div>
              <div className="font-serif text-xl tracking-wide font-medium flex items-center gap-2">
                Curated Wishlist
                <Heart className="w-4 h-4 text-[#FED488] fill-[#FED488]" />
              </div>
              <div className="text-[10px] uppercase tracking-[0.16em] text-[#FED488] font-semibold mt-0.5">
                Saved Masterpieces ({savedItems.length})
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-white/70 hover:text-white p-1 cursor-pointer"
              aria-label="Close Wishlist"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {savedItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto bg-[#F5F0EB] border border-[#C5A059]/40 flex items-center justify-center text-[#58111A]">
                  <Heart className="w-8 h-8 text-[#C5A059]" />
                </div>
                <div className="font-serif text-lg text-[#231B1B]">No Saved Jewels</div>
                <p className="text-xs text-[#6E6259] max-w-xs mx-auto">
                  Click the heart icon on any piece across our Curated Collections or the Maharani set to save it for your private salon viewing.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      onNavigate('collections');
                    }}
                    className="px-5 py-2.5 bg-[#58111A] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#6B1724] cursor-pointer"
                  >
                    View Collections
                  </button>
                </div>
              </div>
            ) : (
              savedItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-[#F5F0EB] border border-[#C5A059]/30 flex gap-3 relative"
                >
                  <div
                    onClick={() => {
                      onClose();
                      if (item.id === 'maharani-royal-kundan-set') {
                        onNavigate('product-details');
                      } else {
                        onNavigate('collections');
                      }
                    }}
                    className="w-20 h-24 shrink-0 bg-white border border-[#C5A059]/30 cursor-pointer overflow-hidden"
                  >
                    <JewelleryArtwork type={item.artworkType} showBadge={false} />
                  </div>

                  <div className="flex-1 flex flex-col justify-between text-xs">
                    <div>
                      <button
                        onClick={() => {
                          onClose();
                          if (item.id === 'maharani-royal-kundan-set') {
                            onNavigate('product-details');
                          } else {
                            onNavigate('collections');
                          }
                        }}
                        className="font-serif text-sm font-medium text-[#231B1B] hover:text-[#58111A] text-left cursor-pointer"
                      >
                        {item.name}
                      </button>
                      <div className="text-[11px] text-[#6E6259] mt-0.5">
                        {item.karatage} · {item.gemstone}
                      </div>
                      <div className="font-mono text-sm font-semibold text-[#58111A] mt-1">
                        {formatPrice(item.priceINR, currency)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#C5A059]/20">
                      <button
                        onClick={() => onAddToCart(item)}
                        className="px-3 py-1.5 bg-[#58111A] text-white text-[11px] font-semibold uppercase tracking-wider hover:bg-[#6B1724] flex items-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3 text-[#FED488]" />
                        <span>Move to Vault</span>
                      </button>

                      <button
                        onClick={() => onRemoveWishlist(item.id)}
                        className="p-1.5 text-[#877272] hover:text-[#ba1a1a] cursor-pointer"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
