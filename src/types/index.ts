export type ScreenId = 'home' | 'collections' | 'product-details' | 'studio';

export type Currency = 'INR' | 'USD' | 'GBP' | 'AED';

export interface JewelleryItem {
  id: string;
  name: string;
  subtitle: string;
  category: 'Kundan Sets' | 'Polki Diamonds' | 'Meenakari & Jadau' | "Royal Men's Regalia" | 'Heirloom Rings & Bangles';
  priceINR: number;
  karatage: '22K Royal Gold' | '24K Kundan Foil' | '18K Rose Gold';
  gemstone: 'Emeralds & Polki' | 'Burmese Rubies' | 'Basra Pearls' | 'Syndicate Polki' | 'Navratna';
  occasion: 'Royal Groom' | 'Imperial Gala' | 'Bridal Heirloom' | 'Heritage Collector';
  grossWeight: string;
  netGoldWeight: string;
  polkiCarats?: string;
  gemstoneCarats?: string;
  artisanHours: number;
  certification: string;
  inStock: boolean;
  featured?: boolean;
  editionNote?: string;
  description: string;
  specs: {
    dimensions: string;
    closure: string;
    artisanOrigin: string;
    hallmark: string;
    includes: string[];
  };
  artworkType: 'maharani-set' | 'kalgi-brooch' | 'emerald-haar' | 'sherwani-buttons' | 'kangan-pair' | 'signet-ring' | 'gulbandh-choker' | 'bazuband-armlet';
}

export interface CartItem {
  product: JewelleryItem;
  quantity: number;
  selectedSize?: string;
  bespokeEngraving?: string;
}

export interface StudioBooking {
  experienceType: 'haveli-salon' | 'royal-suite' | 'virtual-hd';
  date: string;
  timeSlot: string;
  guestCount: number;
  fullName: string;
  phone: string;
  email: string;
  city: string;
  consultationFocus: string;
  specialRequests?: string;
}
