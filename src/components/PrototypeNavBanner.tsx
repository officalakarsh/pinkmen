import React from 'react';
import { ScreenId } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';

interface PrototypeNavBannerProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

export const PrototypeNavBanner: React.FC<PrototypeNavBannerProps> = ({ currentScreen, onNavigate }) => {
  const screens: { id: ScreenId; step: number; label: string; desc: string }[] = [
    { id: 'home', step: 1, label: 'Home', desc: 'Pink Men Jewellery - Home' },
    { id: 'collections', step: 2, label: 'Curated Collections', desc: 'Curated Collections - Pink Men Jewellery' },
    { id: 'product-details', step: 3, label: 'Maharani Kundan Set', desc: 'Maharani Royal Kundan Set - Product Details' },
    { id: 'studio', step: 4, label: 'Visit Jaipur Studio', desc: 'Visit Jaipur Studio' },
  ];

  return (
    <aside aria-label="Prototype navigation" className="bg-[#390009] text-[#FAF8F5] border-b border-[#C5A059]/40 sticky top-0 z-50 py-1.5 px-4 shadow-sm text-xs">
      <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="font-semibold uppercase tracking-[0.1em] text-[11px] text-[#FED488]">
            Prototype Navigation Spec
          </span>
          <span className="text-white/40 hidden sm:inline">|</span>
          <span className="text-white/70 text-[11px] hidden md:inline">
            Active: <span className="text-white font-medium">{screens.find(s => s.id === currentScreen)?.desc}</span>
          </span>
        </div>

        {/* 4 Screen Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
          {screens.map((s, idx) => {
            const isActive = currentScreen === s.id;
            return (
              <React.Fragment key={s.id}>
                <button
                  onClick={() => onNavigate(s.id)}
                  className={`px-2.5 py-1 text-[11px] uppercase tracking-wider font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#C5A059] text-[#390009] font-bold shadow-xs'
                      : 'bg-white/10 text-white/85 hover:bg-white/20 hover:text-white'
                  }`}
                  title={s.desc}
                >
                  <span className={`w-4 h-4 rounded-full text-[9px] flex items-center justify-center ${isActive ? 'bg-[#390009] text-[#FED488]' : 'bg-white/20 text-white'}`}>
                    {s.step}
                  </span>
                  <span>{s.label}</span>
                </button>
                {idx < screens.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-white/30 shrink-0 hidden lg:inline" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
