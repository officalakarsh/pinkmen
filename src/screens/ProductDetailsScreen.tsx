import React, { useState } from 'react';
import { JewelleryItem, Currency, ScreenId } from '../types';
import { formatPrice } from '../data/jewelleryData';
import { JewelleryArtwork } from '../components/JewelleryArtwork';
import {
  ShieldCheck,
  Award,
  Heart,
  ShoppingBag,
  Sparkles,
  Calendar,
  MessageCircle,
  Check,
  RotateCcw,
  Maximize2,
  Lock,
} from 'lucide-react';

interface ProductDetailsScreenProps {
  product: JewelleryItem;
  currency: Currency;
  onNavigate: (screen: ScreenId, itemId?: string) => void;
  onAddToCart: (item: JewelleryItem, size?: string) => void;
  onToggleWishlist: (id: string) => void;
  isWishlisted: boolean;
}

export const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({
  product,
  currency,
  onNavigate,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  const [activeAngle, setActiveAngle] = useState<'full' | 'choker' | 'earrings' | 'tikka' | 'reverse'>('full');
  const [selectedNeckSize, setSelectedNeckSize] = useState('14.5" (Standard Royal)');
  const [activeTab, setActiveTab] = useState<'cert' | 'craft' | 'styling' | 'care'>('cert');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const angleOptions = [
    { id: 'full', label: 'Full Royal Set', desc: 'Choker, Jhumkis & Tikka ensemble' },
    { id: 'choker', label: '24K Foil Macro', desc: 'Extreme close-up of Kundan setting' },
    { id: 'earrings', label: 'Chandbali Jhumkis', desc: 'Emerald drops & pearl latkans' },
    { id: 'tikka', label: 'Imperial Maang Tikka', desc: 'Sunburst medallion forehead jewel' },
    { id: 'reverse', label: 'Reverse Meenakari', desc: 'Peacock garden hand enameling' },
  ] as const;

  const neckSizes = [
    { size: '13.5"', label: 'Petite Collar' },
    { size: '14.5" (Standard Royal)', label: 'Standard Collar' },
    { size: '15.5"', label: 'Extended Collar' },
    { size: '17.0" (Adjustable Dori)', label: 'Generous Collar' },
  ];

  const handleAdd = () => {
    onAddToCart(product, selectedNeckSize);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 3000);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8 space-y-12">
      {/* Editorial Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#6E6259]">
        <button
          onClick={() => onNavigate('home')}
          className="hover:text-[#58111A] cursor-pointer"
        >
          Home
        </button>
        <span>/</span>
        <button
          onClick={() => onNavigate('collections')}
          className="hover:text-[#58111A] cursor-pointer"
        >
          Curated Collections
        </button>
        <span>/</span>
        <span className="text-[#58111A] font-semibold">{product.name}</span>
      </nav>

      {/* Main PDP Split Layout - Contiguous Purchase Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Sticky Gallery Column (7 Cols on Desktop) */}
        <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-28">
          {/* Main Visual Display Frame (4:5 Aspect Ratio) */}
          <div className="relative bg-[#F5F0EB] border border-[#C5A059] shadow-royal-md overflow-hidden">
            <JewelleryArtwork
              type={product.artworkType}
              viewAngle={activeAngle}
              showBadge={false}
            />

            {/* Corner Badge */}
            <div className="absolute top-4 left-4 bg-[#58111A] text-[#FED488] px-3 py-1 text-[10px] uppercase font-bold tracking-[0.16em] shadow-xs">
              {product.editionNote || 'Archival Masterwork'}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => onToggleWishlist(product.id)}
              className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-xs text-[#58111A] hover:bg-white rounded-full transition-all cursor-pointer shadow-xs"
              aria-label="Save to Wishlist"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isWishlisted ? 'fill-[#58111A] text-[#58111A]' : 'text-[#877272]'
                }`}
              />
            </button>

            {/* Active Angle Descriptor Pill */}
            <div className="absolute bottom-4 left-4 bg-[#FAF8F5]/90 backdrop-blur-xs px-3 py-1.5 border border-[#C5A059]/40 text-xs font-semibold text-[#58111A] flex items-center gap-1.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#1B4332]" />
              <span>Inspection View: {angleOptions.find((a) => a.id === activeAngle)?.label}</span>
            </div>
          </div>

          {/* Gallery Angle Thumbnails */}
          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {angleOptions.map((opt) => {
              const active = activeAngle === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setActiveAngle(opt.id)}
                  className={`p-1.5 bg-[#FAF8F5] border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    active
                      ? 'border-[#58111A] ring-2 ring-[#C5A059] shadow-xs'
                      : 'border-[#C5A059]/30 hover:border-[#C5A059]'
                  }`}
                >
                  <div className="aspect-square bg-[#F5F0EB] flex items-center justify-center overflow-hidden mb-1">
                    <JewelleryArtwork
                      type="maharani-set"
                      viewAngle={opt.id}
                      showBadge={false}
                      className="scale-90"
                    />
                  </div>
                  <div className="text-[10px] font-bold text-[#58111A] truncate">
                    {opt.label}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Gemological Inspection Note */}
          <div className="p-3 bg-[#F5F0EB] border border-[#C5A059]/30 flex items-center justify-between text-xs text-[#6E6259]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#1B4332]" />
              Government of India BIS 916 Stamped · Unique HUID Verified
            </span>
            <span className="font-mono text-[#58111A] font-semibold">
              420 Karigari Hours
            </span>
          </div>
        </div>

        {/* Right Sticky Purchase Module Column (5 Cols on Desktop) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header & Badges */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#FAF8F5] border border-[#C5A059] rounded-full text-[10px] font-bold uppercase tracking-wider text-[#58111A] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1B4332]" />
                BIS 916 Hallmarked
              </span>
              <span className="px-2.5 py-0.5 bg-[#F5F0EB] border border-[#C5A059]/40 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#554242]">
                IGI Certified Syndicate Polki
              </span>
              <span className="px-2.5 py-0.5 bg-[#F3E8E2] border border-[#C5A059]/40 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#58111A]">
                Reverse Meenakari
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#390009] leading-tight">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-[#6E6259] leading-relaxed">
              {product.subtitle}
            </p>
          </div>

          {/* Pricing & Valuation Box */}
          <div className="p-5 bg-[#FAF8F5] border border-[#C5A059]/40 space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] uppercase tracking-wider text-[#6E6259] font-semibold">
                Private Atelier Valuation:
              </span>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-[#58111A]">
                {formatPrice(product.priceINR, currency)}
              </span>
            </div>
            <div className="text-[11px] text-[#6E6259] flex items-center justify-between border-t border-[#C5A059]/20 pt-2">
              <span>All Taxes & Armored Insured Transit Included</span>
              <span className="text-[#1B4332] font-semibold">In Stock (1 Vault Unit)</span>
            </div>
          </div>

          {/* Precious Material Metrics Breakdown */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-[#F5F0EB] border border-[#C5A059]/30 text-xs">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#6E6259]">Net Pure Gold Weight</div>
              <div className="font-semibold text-sm text-[#231B1B] mt-0.5">{product.netGoldWeight}</div>
              <div className="text-[10px] text-[#877272]">22K Base & 24K Kundan Foil</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#6E6259]">Uncut Polki Diamonds</div>
              <div className="font-semibold text-sm text-[#231B1B] mt-0.5">{product.polkiCarats}</div>
              <div className="text-[10px] text-[#877272]">Syndicate Natural Grade</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#6E6259]">Zambian Emerald Drops</div>
              <div className="font-semibold text-sm text-[#231B1B] mt-0.5">{product.gemstoneCarats}</div>
              <div className="text-[10px] text-[#877272]">Natural untreated deep green</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#6E6259]">Total Gross Weight</div>
              <div className="font-semibold text-sm text-[#231B1B] mt-0.5">{product.grossWeight}</div>
              <div className="text-[10px] text-[#877272]">Including silk cord clasps</div>
            </div>
          </div>

          {/* Custom Neck Choker Sizing Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="uppercase tracking-wider text-[#554242]">
                Choker Collar Circumference & Fitting:
              </span>
              <span className="text-[#58111A] text-[11px] font-mono">{selectedNeckSize}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {neckSizes.map((n) => {
                const isSelected = selectedNeckSize === n.size;
                return (
                  <button
                    key={n.size}
                    onClick={() => setSelectedNeckSize(n.size)}
                    className={`p-2.5 text-center text-xs border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#58111A] text-white border-[#58111A] shadow-xs'
                        : 'bg-white text-[#231B1B] border-[#C5A059]/40 hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="font-bold">{n.size}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">{n.label}</div>
                  </button>
                );
              })}
            </div>
            <p className="text-[10px] text-[#6E6259]">
              * Handcrafted silk zardozi cord allows micro-adjustments from 13.5&quot; to 17.5&quot; for high-neck bridal or gala collars.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAdd}
              className="w-full py-4 bg-[#58111A] text-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.14em] hover:bg-[#6B1724] transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-royal-md"
            >
              <ShoppingBag className="w-4 h-4 text-[#FED488]" />
              <span>Acquire Heirloom / Add to Vault</span>
            </button>

            {addedSuccess && (
              <div className="p-3 bg-[#1B4332] text-white text-xs flex items-center justify-between shadow-xs">
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FED488]" />
                  Heirloom allocated to your private vault drawer.
                </span>
                <button
                  onClick={() => onNavigate('studio')}
                  className="underline text-[11px] text-[#FED488] font-semibold cursor-pointer"
                >
                  Book Viewing &rarr;
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => onNavigate('studio')}
                className="py-3 px-4 border border-[#C5A059] bg-white text-[#58111A] text-xs font-semibold uppercase tracking-wider hover:bg-[#F5F0EB] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#C5A059]" />
                <span>Book Haveli Viewing</span>
              </button>

              <button
                onClick={() => {
                  const event = new CustomEvent('open-concierge', { detail: { prompt: 'Inquire about Maharani Set' } });
                  window.dispatchEvent(event);
                }}
                className="py-3 px-4 bg-[#1B4332] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#083323] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Stylist</span>
              </button>
            </div>
          </div>

          {/* White-Glove Reassurance Strip */}
          <div className="p-4 bg-[#FAF8F5] border border-[#C5A059]/30 space-y-2 text-xs text-[#554242]">
            <div className="flex items-center gap-2 font-semibold text-[#58111A]">
              <Lock className="w-4 h-4 text-[#C5A059]" />
              <span>Armored Delivery & Private Vault Guarantee</span>
            </div>
            <ul className="text-[11px] text-[#6E6259] space-y-1 list-disc list-inside">
              <li>Complimentary lifetime ultrasonic restoration and repolishing in Jaipur</li>
              <li>100% Buyback and royal estate exchange guarantee under guild charter</li>
              <li>Includes Teakwood presentation casket and embossed certificates</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tabbed In-Depth Product Dossier */}
      <section className="bg-[#FAF8F5] border border-[#C5A059]/40 p-6 sm:p-8 space-y-6">
        <div className="border-b border-[#C5A059]/30 flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('cert')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'cert'
                ? 'border-[#58111A] text-[#58111A]'
                : 'border-transparent text-[#6E6259] hover:text-[#231B1B]'
            }`}
          >
            1. Gemological Certificate & Hallmarking
          </button>
          <button
            onClick={() => setActiveTab('craft')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'craft'
                ? 'border-[#58111A] text-[#58111A]'
                : 'border-transparent text-[#6E6259] hover:text-[#231B1B]'
            }`}
          >
            2. Karigari Craftsmanship Story (420 Hours)
          </button>
          <button
            onClick={() => setActiveTab('styling')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'styling'
                ? 'border-[#58111A] text-[#58111A]'
                : 'border-transparent text-[#6E6259] hover:text-[#231B1B]'
            }`}
          >
            3. Royal Styling & Trousseau Pairings
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'care'
                ? 'border-[#58111A] text-[#58111A]'
                : 'border-transparent text-[#6E6259] hover:text-[#231B1B]'
            }`}
          >
            4. Lifetime Vault Care & Armored Delivery
          </button>
        </div>

        {/* Tab 1: Certification */}
        {activeTab === 'cert' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed">
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-medium text-[#390009]">
                Dual Authentication Guarantee
              </h3>
              <p className="text-[#554242]">
                Every sovereign piece from Pink Men Jewellery passes rigorous two-tier gemological authentication before leaving our Johari Bazaar atelier.
              </p>
              <div className="space-y-2 p-4 bg-[#F5F0EB] border border-[#C5A059]/30">
                <div className="flex justify-between font-semibold">
                  <span className="text-[#58111A]">BIS Hallmarking:</span>
                  <span>916 (22 Carat Gold Purity)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6E6259]">HUID Identification:</span>
                  <span className="font-mono">JP982-KUNDAN-420-BIS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6E6259]">IGI Polki Certificate:</span>
                  <span className="font-mono">#JP-98241-K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6E6259]">Diamond Grade:</span>
                  <span>Syndicate Polki (Untreated Natural)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6E6259]">Emerald Provenance:</span>
                  <span>Natural Zambian Deep Green Drops</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-lg font-medium text-[#390009]">
                Included in Your Archive Casket
              </h3>
              <ul className="space-y-2 text-[#554242]">
                {product.specs.includes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#1B4332] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Craftsmanship */}
        {activeTab === 'craft' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed">
            <div className="p-4 bg-[#F5F0EB] border border-[#C5A059]/30 space-y-2">
              <div className="font-serif text-base font-semibold text-[#58111A]">
                Cold Foil Compression
              </div>
              <p className="text-[#554242]">
                Unlike modern prong settings that stress gemstones with heat, traditional Kundan setting compresses 24K pure gold leaf at room temperature using agate and steel burnishers. The pure gold bonds molecularly to hold each polki diamond forever.
              </p>
            </div>

            <div className="p-4 bg-[#F5F0EB] border border-[#C5A059]/30 space-y-2">
              <div className="font-serif text-base font-semibold text-[#58111A]">
                Reverse Peacock Meenakari
              </div>
              <p className="text-[#554242]">
                The back of the choker is meticulously engraved with Jaipur court peacock and lotus patterns, filled with ground cobalt, copper, and tin mineral powders, and fired at 850°C in ceramic muffles.
              </p>
            </div>

            <div className="p-4 bg-[#F5F0EB] border border-[#C5A059]/30 space-y-2">
              <div className="font-serif text-base font-semibold text-[#58111A]">
                Zardozi Hand-Twisted Cord
              </div>
              <p className="text-[#554242]">
                Terminated in pure mulberry silk and gold zari cords hand-twisted by master patowas in Johari Bazaar, ensuring supple comfort that never snags delicate silk or zardozi wedding attire.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Styling */}
        {activeTab === 'styling' && (
          <div className="space-y-4 text-xs leading-relaxed text-[#554242]">
            <h3 className="font-serif text-lg font-medium text-[#390009]">
              Royal Stylist Trousseau Guidance
            </h3>
            <p>
              Curated by Jaipur royal wedding consultants for sovereign brides and imperial gala attendees:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#F5F0EB] border border-[#C5A059]/30">
                <div className="font-semibold text-[#58111A] text-sm mb-1">Bridal Lehengas & Poshaks:</div>
                <p>
                  Pairs harmoniously with crimson, vermilion, deep emerald, and ivory raw silk bridal poshaks. The dark green Zambian drops provide regal contrast against warm golds.
                </p>
              </div>
              <div className="p-4 bg-[#F5F0EB] border border-[#C5A059]/30">
                <div className="font-semibold text-[#58111A] text-sm mb-1">High-Neck Gala Ensembles:</div>
                <p>
                  Adjust the silk dori to 14.5&quot; to allow the kundan collar to rest flush against a high mandarin velvet collar or hand-woven Banarasi silk sari drape.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Care */}
        {activeTab === 'care' && (
          <div className="space-y-4 text-xs leading-relaxed text-[#554242]">
            <h3 className="font-serif text-lg font-medium text-[#390009]">
              Preserving Heirlooms for Centuries
            </h3>
            <p>
              Kundan jadau jewellery requires gentle care to protect the 24K pure gold foil from humidity and moisture.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3 bg-[#F5F0EB] border border-[#C5A059]/30">
                <div className="font-semibold text-[#58111A]">Storage:</div>
                <p className="text-[11px] mt-1">Always store in the provided velvet-lined teakwood box wrapped in pure raw cotton cloth.</p>
              </div>
              <div className="p-3 bg-[#F5F0EB] border border-[#C5A059]/30">
                <div className="font-semibold text-[#58111A]">Cosmetics & Perfume:</div>
                <p className="text-[11px] mt-1">Don jewellery only after perfumes and lotions have completely evaporated.</p>
              </div>
              <div className="p-3 bg-[#F5F0EB] border border-[#C5A059]/30">
                <div className="font-semibold text-[#58111A]">Guild Repolish:</div>
                <p className="text-[11px] mt-1">Send to our Jaipur atelier every 3 years for complimentary ultrasonic restoration.</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Cross-Link to Jaipur Studio for In-Person Viewing */}
      <div className="p-8 bg-[#390009] text-white border border-[#C5A059] flex flex-col md:flex-row items-center justify-between gap-6 shadow-royal-md">
        <div className="space-y-2 text-center md:text-left">
          <div className="text-xs uppercase tracking-[0.2em] text-[#FED488] font-bold">
            Private Atelier Viewing
          </div>
          <h3 className="font-serif text-2xl text-white">
            Experience The Maharani Set in Jaipur
          </h3>
          <p className="text-xs text-white/80 max-w-lg">
            Reserve a private salon suite at our Johari Bazaar Haveli Atelier or your palace suite at Rambagh Palace to examine this masterwork in person.
          </p>
        </div>

        <button
          onClick={() => onNavigate('studio')}
          className="px-8 py-3.5 bg-[#C5A059] text-[#390009] text-xs font-bold uppercase tracking-[0.14em] hover:bg-[#FED488] transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          Schedule Private Salon Viewing &rarr;
        </button>
      </div>
    </div>
  );
};
