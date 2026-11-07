import React, { useState } from 'react';
import { ScreenId } from '../types';
import { ShieldCheck, MapPin, Phone, Mail, Award, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (screen: ScreenId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#390009] text-[#FAF8F5] border-t border-[#C5A059]/40 pt-16 pb-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-16">
        {/* Top Trust & Karigari Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[#C5A059]/25 text-xs">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-white/5 border border-[#C5A059]/30 text-[#FED488] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-serif text-sm font-semibold text-[#FED488] tracking-wide">
                BIS 916 Hallmarked
              </div>
              <p className="text-white/70 text-[11px] mt-1 leading-relaxed">
                100% certified 22K pure gold purity stamped with unique Indian Government HUID identifier.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-white/5 border border-[#C5A059]/30 text-[#FED488] shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="font-serif text-sm font-semibold text-[#FED488] tracking-wide">
                IGI Certified Polki
              </div>
              <p className="text-white/70 text-[11px] mt-1 leading-relaxed">
                Every uncut syndicate polki diamond and Colombian/Zambian emerald is independently verified.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-white/5 border border-[#C5A059]/30 text-[#FED488] shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="font-serif text-sm font-semibold text-[#FED488] tracking-wide">
                Johari Bazaar Atelier
              </div>
              <p className="text-white/70 text-[11px] mt-1 leading-relaxed">
                4 generations of master court karigars operating in our restored 18th-century Jaipur haveli salon.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-white/5 border border-[#C5A059]/30 text-[#FED488] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-serif text-sm font-semibold text-[#FED488] tracking-wide">
                Armored Global Transit
              </div>
              <p className="text-white/70 text-[11px] mt-1 leading-relaxed">
                Fully insured worldwide transit with sealed wax authentication and optional armed courier handover.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Manifesto */}
          <div className="md:col-span-4 space-y-4">
            <div className="font-serif text-2xl font-medium tracking-wide text-[#FAF8F5]">
              PINK MEN JEWELLERY
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold">
              Jaipur · Royal Rajputana Contemporary
            </div>
            <p className="text-xs text-white/70 leading-relaxed pr-6">
              Rooted in the royal gemstone ateliers of Jaipur, we synthesize historic Rajasthani royal patronage with razor-sharp contemporary high luxury for sovereign collectors and high-net-worth grooms.
            </p>
            <div className="text-xs text-[#FED488] font-medium pt-2">
              Private Salon Viewings: Johari Bazaar & Rambagh Palace Suites
            </div>
          </div>

          {/* Quick Prototype Navigation */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FED488]">
              Prototype Flow
            </div>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#FED488] transition-colors cursor-pointer text-left"
                >
                  1. Home — Initial Screen
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collections')}
                  className="hover:text-[#FED488] transition-colors cursor-pointer text-left"
                >
                  2. Curated Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('product-details')}
                  className="hover:text-[#FED488] transition-colors cursor-pointer text-left"
                >
                  3. Maharani Royal Kundan Set (PDP)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('studio')}
                  className="hover:text-[#FED488] transition-colors cursor-pointer text-left"
                >
                  4. Visit Jaipur Studio
                </button>
              </li>
            </ul>
          </div>

          {/* Atelier Coordinates */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FED488]">
              Jaipur Salon
            </div>
            <div className="space-y-2 text-xs text-white/80">
              <p className="leading-relaxed">
                Haveli 14, Johari Bazaar<br />
                Pink City, Jaipur<br />
                Rajasthan 302003
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] text-[#FED488]">
                <Phone className="w-3.5 h-3.5" /> +91 (141) 256-8800
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#FED488]">
                <Mail className="w-3.5 h-3.5" /> salon@pinkmenjewellery.com
              </div>
            </div>
          </div>

          {/* Archival Gazette / Newsletter */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FED488]">
              The Jaipur Gazette
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Receive private invitations to archival gemstone releases, private palace viewings, and heritage karigari monographs.
            </p>
            {isSubscribed ? (
              <div className="p-3 bg-white/10 border border-[#C5A059] text-xs text-[#FED488] flex items-center gap-2">
                <Check className="w-4 h-4 text-[#25D366]" />
                <span>You are inducted into the Jaipur Private Gazette.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your private email..."
                  className="w-full px-3 py-2 bg-white/10 border border-[#C5A059]/40 text-xs text-white placeholder-white/40 focus:outline-hidden focus:border-[#FED488]"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#C5A059] text-[#390009] text-xs font-bold uppercase tracking-wider hover:bg-[#FED488] transition-colors cursor-pointer"
                >
                  Request Royal Invitations
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 border-t border-[#C5A059]/20 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/50 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Pink Men Jewellery Jaipur. All rights reserved. Registered Indian Goldsmith Guild.
          </div>
          <div className="flex items-center gap-6">
            <span>BIS Certificate Reg: #JP-14-916</span>
            <span>·</span>
            <span>RJC Certified Conflict-Free</span>
            <span>·</span>
            <button onClick={() => onNavigate('studio')} className="hover:text-white underline cursor-pointer">
              Atelier Appointments
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
