import React, { useState } from 'react';
import { JewelleryItem, Currency, ScreenId } from '../types';
import { formatPrice } from '../data/jewelleryData';
import { JewelleryArtwork } from '../components/JewelleryArtwork';
import { ArrowRight, ShieldCheck, Sparkles, Heart, Eye, Check, ChevronRight } from 'lucide-react';

interface HomeScreenProps {
  catalogue: JewelleryItem[];
  currency: Currency;
  onNavigate: (screen: ScreenId, itemId?: string) => void;
  onAddToCart: (item: JewelleryItem) => void;
  onToggleWishlist: (id: string) => void;
  wishlistIds: string[];
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  catalogue,
  currency,
  onNavigate,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}) => {
  const [activeMaharaniAngle, setActiveMaharaniAngle] = useState<'full' | 'choker' | 'earrings' | 'reverse'>('full');
  const maharaniProduct = catalogue.find((item) => item.id === 'maharani-royal-kundan-set') || catalogue[0];

  const featuredItems = catalogue.filter((item) => item.featured && item.id !== 'maharani-royal-kundan-set').slice(0, 3);

  return (
    <div className="space-y-24 md:space-y-32">
      {/* 1. HERO CAMPAIGN SECTION */}
      <section className="relative pt-6 pb-12 sm:pb-20 border-b border-[#C5A059]/25">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Hero Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              {/* Sovereign Kicker */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5F0EB] border border-[#C5A059]/50 text-[#58111A] text-xs uppercase tracking-[0.18em] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1B4332]" />
                Royal Rajputana Contemporary
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#390009] leading-[1.12] tracking-tight text-balance">
                Heirloom Jewels for Sovereign Souls.
              </h1>

              {/* Editorial Subtext */}
              <p className="text-base sm:text-lg text-[#554242] leading-relaxed max-w-xl font-normal">
                Born in the historic gemstone ateliers of Johari Bazaar, Jaipur. We fuse historic Rajasthani royal patronage—kundan jadau, syndicate polki, and meenakari—with contemporary high-luxury restraint.
              </p>

              {/* Key Quantitative Proofs */}
              <div className="grid grid-cols-3 gap-4 pt-2 border-t border-[#C5A059]/30 text-xs">
                <div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-[#58111A] font-mono">
                    22K
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-[#6E6259] mt-0.5">
                    BIS 916 Pure Gold
                  </div>
                </div>
                <div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-[#58111A] font-mono">
                    420+
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-[#6E6259] mt-0.5">
                    Karigari Hours / Set
                  </div>
                </div>
                <div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-[#58111A] font-mono">
                    100%
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-[#6E6259] mt-0.5">
                    Natural Certified Polki
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('collections')}
                  className="px-8 py-4 bg-[#58111A] text-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.14em] hover:bg-[#6B1724] transition-all flex items-center justify-center gap-3 cursor-pointer shadow-royal-sm group"
                >
                  <span>Explore Curated Collections</span>
                  <ArrowRight className="w-4 h-4 text-[#FED488] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('studio')}
                  className="px-6 py-4 border border-[#C5A059] bg-transparent text-[#58111A] text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#F5F0EB] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Visit Jaipur Studio</span>
                </button>
              </div>

              {/* Atelier Note */}
              <div className="text-xs text-[#6E6259] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1B4332]" />
                <span>Private salon viewings by prior appointment in Johari Bazaar, Jaipur.</span>
              </div>
            </div>

            {/* Right Vitrine Hero Card - Highlighting the Flagship Maharani Set */}
            <div className="lg:col-span-6">
              <div className="relative bg-[#F5F0EB] border border-[#C5A059]/40 p-4 sm:p-6 shadow-royal-md group">
                {/* Special Corner Ribbon */}
                <div className="absolute top-4 right-4 z-10 bg-[#58111A] text-[#FED488] px-3 py-1 text-[10px] uppercase font-bold tracking-[0.16em] shadow-xs">
                  Flagship Masterpiece
                </div>

                {/* Artwork Canvas */}
                <div
                  onClick={() => onNavigate('product-details')}
                  className="cursor-pointer overflow-hidden relative"
                >
                  <JewelleryArtwork
                    type="maharani-set"
                    viewAngle={activeMaharaniAngle}
                  />

                  {/* Hover Overlay Hint */}
                  <div className="absolute inset-0 bg-[#390009]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="px-4 py-2 bg-[#FAF8F5] text-[#58111A] text-xs font-semibold uppercase tracking-wider shadow-md">
                      Inspect Product Details &rarr;
                    </span>
                  </div>
                </div>

                {/* Quick Angle Switcher for Hero Showcase */}
                <div className="mt-4 pt-3 border-t border-[#C5A059]/30 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-[#6E6259]">
                    <span className="text-[10px] uppercase tracking-wider font-semibold">View Angle:</span>
                    {(['full', 'choker', 'earrings', 'reverse'] as const).map((angle) => (
                      <button
                        key={angle}
                        onClick={() => setActiveMaharaniAngle(angle)}
                        className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium cursor-pointer transition-colors ${
                          activeMaharaniAngle === angle
                            ? 'bg-[#58111A] text-white'
                            : 'bg-white text-[#58111A] border border-[#C5A059]/40 hover:bg-[#FAF8F5]'
                        }`}
                      >
                        {angle === 'full' ? 'Full Set' : angle === 'choker' ? 'Choker' : angle === 'earrings' ? 'Jhumkis' : 'Meenakari'}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => onNavigate('product-details')}
                    className="text-xs font-semibold text-[#58111A] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    View Details &rarr;
                  </button>
                </div>

                {/* Card Title & Value */}
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-medium text-[#231B1B]">
                      The Maharani Royal Kundan Set
                    </h3>
                    <p className="text-xs text-[#6E6259]">
                      22K Pure Gold · 38.5ct Syndicate Polki · Zambian Emeralds
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-base font-bold text-[#58111A]">
                      {formatPrice(maharaniProduct.priceINR, currency)}
                    </div>
                    <span className="text-[10px] text-[#1B4332] font-semibold uppercase tracking-wider">
                      BIS 916 Stamped
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE MAHARANI ROYAL KUNDAN SET SPOTLIGHT BANNER */}
      <section className="bg-[#F5F0EB] py-16 sm:py-20 border-y border-[#C5A059]/30 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="bg-[#FAF8F5] border border-[#C5A059] p-4 shadow-royal-md">
                <JewelleryArtwork type="maharani-set" viewAngle="full" />
              </div>
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <div className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-bold">
                Archival Masterwork Spotlight
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#390009] leading-tight">
                The Maharani Royal Kundan Set
              </h2>
              <p className="text-sm sm:text-base text-[#554242] leading-relaxed">
                Directly inspired by the ceremonial trousseau of Amber Palace sovereigns. Each Syndicate uncut polki diamond is individually encased in 24K pure gold foil, accompanied by 54 carats of cascading Zambian emerald drops and hand-painted peacock garden Meenakari on the reverse.
              </p>

              {/* Spec Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-[#C5A059]/25 text-xs">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#6E6259]">Karatage</div>
                  <div className="font-semibold text-sm text-[#231B1B] mt-0.5">22K / 24K Foil</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#6E6259]">Polki Diamonds</div>
                  <div className="font-semibold text-sm text-[#231B1B] mt-0.5">38.50 Carats</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#6E6259]">Zambian Drops</div>
                  <div className="font-semibold text-sm text-[#231B1B] mt-0.5">54.20 Carats</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#6E6259]">Artisan Hours</div>
                  <div className="font-semibold text-sm text-[#231B1B] mt-0.5">420 Hours</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('product-details')}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#58111A] text-white text-xs font-semibold uppercase tracking-[0.14em] hover:bg-[#6B1724] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-royal-sm"
                >
                  <span>Examine Product Details & Dossier</span>
                  <ArrowRight className="w-4 h-4 text-[#FED488]" />
                </button>

                <button
                  onClick={() => onAddToCart(maharaniProduct)}
                  className="w-full sm:w-auto px-6 py-3.5 border border-[#C5A059] bg-white text-[#58111A] text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                >
                  Add to Heirloom Vault
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR PILLARS OF RAJPUTANA CRAFTSMANSHIP */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-bold">
            The Living Heritage
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#390009]">
            Four Pillars of Royal Karigari
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6259] leading-relaxed">
            Preserving centuries of unbroken court goldsmith traditions under the royal patronage of Jaipur’s historical guilds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              pillar: '01. Kundan Jadau',
              subtitle: '24K Pure Gold Foil Setting',
              desc: 'Refined pure 24K gold foil is compressed cold using steel styluses around each gemstone, holding polki diamonds securely without claws or heat.',
            },
            {
              pillar: '02. Syndicate Polki',
              subtitle: 'Raw Natural Diamond Brilliance',
              desc: 'Uncut, untreated diamonds mined with natural cleavage tables, capturing candlelit palace illumination with subtle, regal fire.',
            },
            {
              pillar: '03. Gulabi Meenakari',
              subtitle: 'Vibrant Reverse Enamel Art',
              desc: 'Mineral pigments fired in clay kilns over engraved gold on the reverse. Historically worn cool against royal skin to soothe wearers.',
            },
            {
              pillar: '04. Sovereign Regalia',
              subtitle: 'Royal Groom Accessories',
              desc: 'Ceremonial Kalgis, 5-strand Basra pearl Kanthas, and Navratna buttons calibrated specifically for royal Indian groom ensembles.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#FAF8F5] border border-[#C5A059]/30 space-y-3 hover:border-[#C5A059] transition-all"
            >
              <div className="font-serif text-lg font-medium text-[#58111A]">
                {item.pillar}
              </div>
              <div className="text-[11px] uppercase tracking-wider text-[#C5A059] font-semibold">
                {item.subtitle}
              </div>
              <p className="text-xs text-[#554242] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CURATED MASTERPIECES SHOWCASE GRID */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#C5A059]/30 pb-6">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-bold">
              The Sovereign Collection
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#390009] mt-1">
              Curated Masterpieces of the Court
            </h2>
          </div>

          <button
            onClick={() => onNavigate('collections')}
            className="text-xs font-semibold uppercase tracking-[0.12em] text-[#58111A] hover:underline flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
          >
            <span>View All Curated Collections</span>
            <ChevronRight className="w-4 h-4 text-[#C5A059]" />
          </button>
        </div>

        {/* 3-Column Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems.map((item) => {
            const isWishlisted = wishlistIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="bg-[#FAF8F5] border border-[#C5A059]/30 group hover:border-[#C5A059] transition-all shadow-royal-sm flex flex-col"
              >
                {/* 4:5 Aspect Ratio Image Canvas */}
                <div className="relative bg-[#F5F0EB] overflow-hidden">
                  <JewelleryArtwork type={item.artworkType} />

                  {/* Wishlist Button */}
                  <button
                    onClick={() => onToggleWishlist(item.id)}
                    className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-xs text-[#58111A] hover:bg-white rounded-full transition-all cursor-pointer shadow-xs"
                    aria-label="Toggle Wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isWishlisted ? 'fill-[#58111A] text-[#58111A]' : 'text-[#877272]'
                      }`}
                    />
                  </button>

                  {/* Quick Action Overlay */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <button
                      onClick={() => onNavigate('collections')}
                      className="flex-1 py-2 bg-[#58111A] text-white text-[11px] font-semibold uppercase tracking-wider hover:bg-[#6B1724] cursor-pointer text-center"
                    >
                      View In Collections
                    </button>
                    <button
                      onClick={() => onAddToCart(item)}
                      className="px-3 py-2 bg-white text-[#58111A] border border-[#C5A059] text-[11px] font-semibold uppercase tracking-wider hover:bg-[#F5F0EB] cursor-pointer"
                    >
                      Add to Vault
                    </button>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="text-[11px] uppercase tracking-wider text-[#6E6259]">
                      {item.category} · {item.karatage}
                    </div>
                    <h3 className="font-serif text-lg font-medium text-[#231B1B] group-hover:text-[#58111A] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#6E6259] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#C5A059]/20 flex items-center justify-between">
                    <div>
                      <div className="font-mono text-base font-bold text-[#58111A]">
                        {formatPrice(item.priceINR, currency)}
                      </div>
                      <div className="text-[10px] text-[#1B4332] font-semibold">
                        {item.certification}
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigate('collections')}
                      className="text-xs font-semibold uppercase tracking-wider text-[#58111A] hover:underline cursor-pointer"
                    >
                      Details &rarr;
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. JOHARI BAZAAR HAVELI ATELIER INVITATION */}
      <section className="bg-[#390009] text-[#FAF8F5] py-20 border-y border-[#C5A059]/40 relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs uppercase tracking-[0.2em] text-[#FED488] font-bold">
                The Jaipur Experience
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#FAF8F5] leading-tight">
                Private Haveli Salon Viewings in Johari Bazaar
              </h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
                Step into our restored 18th-century palace salon in the historic gemstone quarter of Pink City. Experience private viewings of uncut diamond lots, examine loose untreated emeralds under 20x gemological magnification, and savor traditional Rajasthani saffron hospitality.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-white/90">
                <div className="p-3 bg-white/5 border border-[#C5A059]/30">
                  <div className="font-semibold text-[#FED488]">By Prior Appointment Only</div>
                  <div className="text-[11px] text-white/70 mt-1">Tuesday – Sunday, 10:30 AM – 7:30 PM</div>
                </div>
                <div className="p-3 bg-white/5 border border-[#C5A059]/30">
                  <div className="font-semibold text-[#FED488]">Private Salon Suites</div>
                  <div className="text-[11px] text-white/70 mt-1">Reserved exclusively for you & entourage</div>
                </div>
                <div className="p-3 bg-white/5 border border-[#C5A059]/30">
                  <div className="font-semibold text-[#FED488]">Palace Chauffeur Pickup</div>
                  <div className="text-[11px] text-white/70 mt-1">From Rambagh Palace or Jaipur Airport</div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => onNavigate('studio')}
                  className="px-8 py-4 bg-[#C5A059] text-[#390009] text-xs font-bold uppercase tracking-[0.14em] hover:bg-[#FED488] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Reserve Private Salon Viewing</span>
                  <ArrowRight className="w-4 h-4 text-[#390009]" />
                </button>

                <button
                  onClick={() => onNavigate('studio')}
                  className="px-6 py-4 border border-[#C5A059]/60 text-white text-xs font-semibold uppercase tracking-[0.12em] hover:bg-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Atelier Coordinates & Suites</span>
                </button>
              </div>
            </div>

            {/* Right Architectural Haveli Graphic */}
            <div className="lg:col-span-5">
              <div className="p-6 bg-white/5 border border-[#C5A059]/40 space-y-4">
                <div className="font-serif text-xl font-medium text-[#FED488]">
                  Haveli 14 · Johari Bazaar
                </div>
                <div className="text-xs text-white/75 leading-relaxed space-y-2">
                  <p>
                    Nestled just 400 meters from the iconic Hawa Mahal, our atelier occupies an ancestral haveli where master jewellers have served royal maharajas since 1727.
                  </p>
                  <p>
                    We welcome connoisseurs, royal wedding patrons, and international collectors for confidential bespoke consultations.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#C5A059]/30 flex items-center justify-between text-xs text-[#FED488]">
                  <span>Jaipur PIN 302003, Rajasthan</span>
                  <button
                    onClick={() => onNavigate('studio')}
                    className="underline hover:text-white cursor-pointer font-semibold"
                  >
                    View Atelier Map &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ROYAL TESTIMONIALS & PROVENANCE */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-bold">
            Patron Reflections
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#390009]">
            Heirlooms Cherished Across Generations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: 'The Maharani Royal Kundan Set was the crowning glory of our royal wedding in Udaipur. The craftsmanship on the reverse meenakari is as breathtaking as the polki diamonds themselves.',
              author: 'Kunwarani Aditi Singh of Mewar',
              detail: 'Royal Udaipur Wedding · Heirloom Archive',
            },
            {
              quote: 'Commissioned the Maharaja Kalgi and Emerald Kantha for my groom ensemble. In an era of mass-manufactured jewellery, Pink Men Jewellery maintains the uncompromising standard of 18th-century Jaipur court goldsmiths.',
              author: 'Vikramaditya Singhania',
              detail: 'Private Collector · London & Mumbai',
            },
            {
              quote: 'Visiting their Johari Bazaar Haveli atelier was an unhurried, royal privilege. To see the master karigars pressing 24K gold leaf into the kundan bezels gave us immense reverence for our heirloom.',
              author: 'Dr. Sameer & Natasha Chawla',
              detail: 'Anniversary Commission · Delhi & Dubai',
            },
          ].map((t, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#FAF8F5] border border-[#C5A059]/30 flex flex-col justify-between space-y-4 hover:border-[#C5A059] transition-all"
            >
              <p className="font-serif text-sm sm:text-base text-[#231B1B] italic leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="pt-3 border-t border-[#C5A059]/20">
                <div className="font-sans text-xs font-bold text-[#58111A]">
                  {t.author}
                </div>
                <div className="text-[11px] text-[#6E6259]">
                  {t.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
