import React, { useState } from 'react';
import { Currency, ScreenId, StudioBooking } from '../types';
import { STUDIO_EXPERIENCES } from '../data/jewelleryData';
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Car,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Mail,
  Sparkles,
  ArrowRight,
  Compass,
} from 'lucide-react';

interface StudioScreenProps {
  currency: Currency;
  onNavigate: (screen: ScreenId) => void;
}

export const StudioScreen: React.FC<StudioScreenProps> = ({ currency, onNavigate }) => {
  const [selectedExperience, setSelectedExperience] = useState<'haveli-salon' | 'royal-suite' | 'virtual-hd'>('haveli-salon');
  const [selectedDate, setSelectedDate] = useState('2026-11-14');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('11:30 AM – 01:00 PM');
  const [guestCount, setGuestCount] = useState(2);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [consultationFocus, setConsultationFocus] = useState('The Maharani Royal Kundan Set & Bridal Trousseau');
  const [requestChauffeur, setRequestChauffeur] = useState(true);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingReference, setBookingReference] = useState('');

  const timeSlots = [
    '10:30 AM – 12:00 PM',
    '11:30 AM – 01:00 PM',
    '02:30 PM – 04:00 PM',
    '04:30 PM – 06:00 PM',
    '06:00 PM – 07:30 PM',
  ];

  const focusOptions = [
    'The Maharani Royal Kundan Set & Bridal Trousseau',
    'Royal Men’s Groom Regalia (Kalgi, Kantha & Buttons)',
    'Uncut Syndicate Polki Diamond Inspection',
    'Custom Bespoke Commission & Family Crest Signet',
    'Heirloom Restorations & Appraisals',
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `JP-HAVELI-${Math.floor(10000 + Math.random() * 90000)}`;
    setBookingReference(ref);
    setBookingConfirmed(true);
  };

  const currentExperienceData = STUDIO_EXPERIENCES.find((e) => e.id === selectedExperience) || STUDIO_EXPERIENCES[0];

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8 space-y-16">
      {/* Editorial Header & Breadcrumbs */}
      <div className="space-y-4 border-b border-[#C5A059]/30 pb-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#6E6259]">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#58111A] cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#58111A] font-semibold">Visit Jaipur Studio</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-2">
            <div className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-bold">
              Johari Bazaar Haveli Atelier · Jaipur
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#390009] leading-tight">
              Visit The Jaipur Studio & Salon
            </h1>
            <p className="text-xs sm:text-sm text-[#554242] leading-relaxed max-w-2xl">
              An exclusive invitation into our restored 18th-century palace salon in the royal quarter of Johari Bazaar. Private viewings are conducted in secluded salon suites, accompanied by traditional Rajasthani saffron hospitality.
            </p>
          </div>

          <div className="lg:col-span-4 bg-[#F5F0EB] p-4 border border-[#C5A059]/40 text-xs space-y-1.5">
            <div className="font-serif text-sm font-semibold text-[#58111A]">
              Atelier Protocol: By Prior Appointment
            </div>
            <div className="text-[#6E6259]">
              Tuesday – Sunday: 10:30 AM to 7:30 PM (IST)
            </div>
            <div className="text-[#1B4332] font-semibold text-[11px] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Strict Confidentiality & Armored Security
            </div>
          </div>
        </div>
      </div>

      {/* Main Booking Suite & Experience Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Form Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          {!bookingConfirmed ? (
            <form onSubmit={handleBookingSubmit} className="space-y-8 bg-[#FAF8F5] border border-[#C5A059]/40 p-6 sm:p-8 shadow-royal-sm">
              <div className="space-y-1 border-b border-[#C5A059]/30 pb-4">
                <div className="text-xs uppercase tracking-[0.16em] text-[#C5A059] font-bold">
                  Step 1 of 3
                </div>
                <h2 className="font-serif text-2xl text-[#390009]">
                  Select Your Viewing Experience
                </h2>
              </div>

              {/* 3 Experience Choices */}
              <div className="space-y-3">
                {STUDIO_EXPERIENCES.map((exp) => {
                  const isSelected = selectedExperience === exp.id;
                  return (
                    <div
                      key={exp.id}
                      onClick={() => setSelectedExperience(exp.id as any)}
                      className={`p-4 border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#F5F0EB] border-[#58111A] ring-1 ring-[#C5A059]'
                          : 'bg-white border-[#C5A059]/30 hover:border-[#C5A059]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-serif text-base font-semibold text-[#390009]">
                          {exp.title}
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[#FAF8F5] text-[#58111A] border border-[#C5A059]/40">
                          {exp.duration}
                        </span>
                      </div>
                      <div className="text-xs text-[#6E6259] mt-0.5">
                        {exp.subtitle}
                      </div>

                      {isSelected && (
                        <div className="mt-3 pt-3 border-t border-[#C5A059]/20 space-y-1.5 text-xs text-[#554242]">
                          {exp.highlights.map((h, hi) => (
                            <div key={hi} className="flex items-start gap-1.5 text-[11px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#1B4332] mt-1 shrink-0" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Step 2: Date & Time Picker */}
              <div className="space-y-4 pt-4 border-t border-[#C5A059]/30">
                <div className="space-y-1">
                  <div className="text-xs uppercase tracking-[0.16em] text-[#C5A059] font-bold">
                    Step 2 of 3
                  </div>
                  <h3 className="font-serif text-xl text-[#390009]">
                    Reserve Date & Viewing Slot
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#554242] mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#C5A059]/40 focus:outline-hidden focus:border-[#58111A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#554242] mb-1">
                      Guest Entourage Count
                    </label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full p-2.5 bg-white border border-[#C5A059]/40 focus:outline-hidden focus:border-[#58111A]"
                    >
                      <option value={1}>1 Guest (Private Confidential)</option>
                      <option value={2}>2 Guests (Patron & Spouse / Stylist)</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests (Private Salon Capacity)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#554242] mb-2">
                    Available Salon Slots:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {timeSlots.map((slot) => {
                      const isSelected = selectedTimeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`p-2 text-center border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#58111A] text-white border-[#58111A]'
                              : 'bg-white text-[#231B1B] border-[#C5A059]/40 hover:bg-[#FAF8F5]'
                          }`}
                        >
                          <div className="font-semibold text-[11px]">{slot}</div>
                          <div className="text-[10px] opacity-75">Senior Gemologist Confirmed</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Step 3: Patron Details */}
              <div className="space-y-4 pt-4 border-t border-[#C5A059]/30">
                <div className="space-y-1">
                  <div className="text-xs uppercase tracking-[0.16em] text-[#C5A059] font-bold">
                    Step 3 of 3
                  </div>
                  <h3 className="font-serif text-xl text-[#390009]">
                    Patron Coordinates & Focus
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#554242] mb-1">
                      Full Name & Title
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Kunwar Vikramaditya / Mrs. Aditi"
                      className="w-full p-2.5 bg-white border border-[#C5A059]/40 focus:outline-hidden focus:border-[#58111A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#554242] mb-1">
                      Direct WhatsApp / Phone
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98290 XXXXX / +1 415 XXX XXXX"
                      className="w-full p-2.5 bg-white border border-[#C5A059]/40 focus:outline-hidden focus:border-[#58111A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#554242] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="patron@estate.com"
                      className="w-full p-2.5 bg-white border border-[#C5A059]/40 focus:outline-hidden focus:border-[#58111A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#554242] mb-1">
                      Resident City / Hotel in Jaipur
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Rambagh Palace, Jaipur / London"
                      className="w-full p-2.5 bg-white border border-[#C5A059]/40 focus:outline-hidden focus:border-[#58111A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#554242] mb-1">
                    Curation & Viewing Focus
                  </label>
                  <select
                    value={consultationFocus}
                    onChange={(e) => setConsultationFocus(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#C5A059]/40 text-xs focus:outline-hidden focus:border-[#58111A]"
                  >
                    {focusOptions.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-3 bg-[#F5F0EB] border border-[#C5A059]/30 flex items-start gap-2 text-xs">
                  <input
                    type="checkbox"
                    id="chauffeur"
                    checked={requestChauffeur}
                    onChange={(e) => setRequestChauffeur(e.target.checked)}
                    className="mt-0.5 accent-[#58111A]"
                  />
                  <label htmlFor="chauffeur" className="text-[11px] text-[#554242]">
                    Request complimentary private chauffeured Mercedes transfer from Jaipur International Airport (JAI) or Rambagh Palace.
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 bg-[#58111A] text-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.14em] hover:bg-[#6B1724] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-royal-md"
              >
                <span>Reserve Private Salon Appointment</span>
                <ArrowRight className="w-4 h-4 text-[#FED488]" />
              </button>
            </form>
          ) : (
            <div className="bg-[#FAF8F5] border border-[#C5A059] p-8 text-center space-y-6 shadow-royal-lg">
              <div className="w-16 h-16 mx-auto bg-[#1B4332] text-white rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-[#FED488]" />
              </div>

              <div className="space-y-1">
                <div className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-bold">
                  Viewing Confirmed · Private Atelier Dossier
                </div>
                <h2 className="font-serif text-3xl text-[#390009]">
                  Khamaghani, {fullName}
                </h2>
                <div className="font-mono text-sm font-bold text-[#58111A] pt-1">
                  Voucher Reference: {bookingReference}
                </div>
              </div>

              <div className="p-6 bg-[#F5F0EB] border border-[#C5A059]/40 text-left text-xs space-y-2.5 max-w-lg mx-auto">
                <div className="flex justify-between border-b border-[#C5A059]/20 pb-2">
                  <span className="text-[#6E6259]">Experience Type:</span>
                  <span className="font-semibold text-[#231B1B]">{currentExperienceData.title}</span>
                </div>
                <div className="flex justify-between border-b border-[#C5A059]/20 pb-2">
                  <span className="text-[#6E6259]">Date & Time:</span>
                  <span className="font-semibold text-[#231B1B]">{selectedDate} at {selectedTimeSlot}</span>
                </div>
                <div className="flex justify-between border-b border-[#C5A059]/20 pb-2">
                  <span className="text-[#6E6259]">Guests:</span>
                  <span className="font-semibold text-[#231B1B]">{guestCount} Guests</span>
                </div>
                <div className="flex justify-between border-b border-[#C5A059]/20 pb-2">
                  <span className="text-[#6E6259]">Curation Focus:</span>
                  <span className="font-semibold text-[#58111A]">{consultationFocus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6E6259]">Chauffeur Pickup:</span>
                  <span className="font-semibold text-[#1B4332]">
                    {requestChauffeur ? `Arranged for ${city}` : 'Self-Drive with Atelier Valet'}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#554242] max-w-md mx-auto leading-relaxed">
                A formal calendar invite and security clearance protocol have been dispatched to <strong>{email}</strong>. Our Senior Royal Stylist Gayatri Rathore will send a WhatsApp confirmation to <strong>{phone}</strong>.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setBookingConfirmed(false)}
                  className="px-6 py-2.5 border border-[#C5A059] text-[#58111A] text-xs font-semibold uppercase tracking-wider hover:bg-[#F5F0EB] cursor-pointer"
                >
                  Modify Appointment
                </button>
                <button
                  onClick={() => onNavigate('product-details')}
                  className="px-6 py-2.5 bg-[#58111A] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#6B1724] cursor-pointer"
                >
                  Review Maharani Set Dossier &rarr;
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Architectural & Vicinity Guide (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Atelier Heritage Card */}
          <div className="p-6 bg-[#390009] text-white border border-[#C5A059] shadow-royal-md space-y-4">
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#FED488] font-bold">
              The Johari Bazaar Haveli
            </div>
            <h3 className="font-serif text-2xl text-[#FAF8F5]">
              Haveli 14 · Pink City
            </h3>
            <p className="text-xs text-white/80 leading-relaxed">
              Johari Bazaar (&ldquo;The Jewelers&rsquo; Market&rdquo;) was laid out in 1727 by Maharaja Sawai Jai Singh II as the exclusive gemological trading district of the royal court. Pink Men Jewellery operates from an uninterrupted ancestral haveli featuring original jharokha stone balconies and vaulted chambers.
            </p>

            <div className="pt-2 border-t border-[#C5A059]/30 space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FED488] shrink-0 mt-0.5" />
                <span className="text-white/90">
                  Haveli 14, Johari Bazaar (Adjacent to Badi Chaupar), Jaipur, Rajasthan 302003
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FED488] shrink-0" />
                <span className="text-white/90">+91 (141) 256-8800 · Direct Salon Desk</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FED488] shrink-0" />
                <span className="text-white/90">concierge@pinkmenjewellery.com</span>
              </div>
            </div>
          </div>

          {/* Interactive Vicinity & Landmark Map Guide */}
          <div className="p-6 bg-[#FAF8F5] border border-[#C5A059]/40 space-y-4 shadow-royal-sm">
            <div className="flex items-center justify-between border-b border-[#C5A059]/30 pb-3">
              <div className="font-serif text-lg font-medium text-[#390009] flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#C5A059]" />
                Royal Jaipur Landmarks
              </div>
              <span className="text-[10px] uppercase tracking-wider text-[#1B4332] font-semibold">
                Johari Bazaar Quarter
              </span>
            </div>

            <div className="space-y-3 text-xs">
              {[
                { name: 'Hawa Mahal (Palace of Winds)', dist: '400 meters', walk: '5 min walk', dir: 'North' },
                { name: 'City Palace of Jaipur', dist: '650 meters', walk: '8 min walk', dir: 'North-West' },
                { name: 'Jantar Mantar Royal Observatory', dist: '700 meters', walk: '9 min walk', dir: 'North-West' },
                { name: 'Rambagh Palace (Taj Luxury Hotel)', dist: '4.8 km', walk: '15 min drive', dir: 'South' },
                { name: 'Jaipur International Airport (JAI)', dist: '11.2 km', walk: '25 min drive', dir: 'South' },
              ].map((lm, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-[#F5F0EB] border border-[#C5A059]/25 flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold text-[#231B1B]">{lm.name}</div>
                    <div className="text-[10px] text-[#6E6259]">{lm.walk} · {lm.dir}</div>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#58111A]">
                    {lm.dist}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-[#FAF8F5] border border-[#C5A059]/30 text-[11px] text-[#6E6259] flex items-center gap-2">
              <Car className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>Valet parking is reserved exclusively for patrons directly in front of Haveli 14.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
