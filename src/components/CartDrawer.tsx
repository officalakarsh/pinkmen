import React, { useState } from 'react';
import { CartItem, Currency, ScreenId } from '../types';
import { formatPrice } from '../data/jewelleryData';
import { JewelleryArtwork } from './JewelleryArtwork';
import { X, ShieldCheck, Trash2, ArrowRight, CheckCircle2, Lock } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  currency: Currency;
  onNavigate: (screen: ScreenId) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  currency,
  onNavigate,
  onClearCart,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'success'>('cart');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [specialEscort, setSpecialEscort] = useState(true);

  if (!isOpen) return null;

  const totalINR = items.reduce((sum, item) => sum + item.product.priceINR * item.quantity, 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#C5A059] shadow-royal-lg flex flex-col">
          {/* Header */}
          <div className="p-6 bg-[#58111A] text-[#FAF8F5] flex items-center justify-between border-b border-[#C5A059]/40">
            <div>
              <div className="font-serif text-xl tracking-wide font-medium flex items-center gap-2">
                Heirloom Vault
                <Lock className="w-4 h-4 text-[#FED488]" />
              </div>
              <div className="text-[10px] uppercase tracking-[0.16em] text-[#FED488] font-semibold mt-0.5">
                Pink Men Jewellery · Jaipur Atelier
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-white/70 hover:text-white p-1 cursor-pointer"
              aria-label="Close Vault Drawer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {checkoutStep === 'cart' && (
              <>
                {items.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-16 h-16 mx-auto bg-[#F5F0EB] border border-[#C5A059]/40 flex items-center justify-center text-[#58111A]">
                      <ShieldCheck className="w-8 h-8 text-[#C5A059]" />
                    </div>
                    <div className="font-serif text-lg text-[#231B1B]">Your Heirloom Vault is Empty</div>
                    <p className="text-xs text-[#6E6259] max-w-xs mx-auto">
                      Explore our hand-wrought Kundan, Polki, and royal regalia to add sovereign pieces to your private vault.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          onClose();
                          onNavigate('collections');
                        }}
                        className="px-5 py-2.5 bg-[#58111A] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#6B1724] cursor-pointer"
                      >
                        Explore Curated Collections
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#6E6259] flex items-center justify-between border-b border-[#C5A059]/20 pb-2">
                      <span>Acquisition Items ({items.length})</span>
                      <span className="text-[#1B4332]">BIS 916 Verified</span>
                    </div>

                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="p-3 bg-[#F5F0EB] border border-[#C5A059]/30 flex gap-3 relative group"
                      >
                        {/* Thumbnail Artwork */}
                        <div className="w-20 h-24 shrink-0 bg-white border border-[#C5A059]/30 overflow-hidden">
                          <JewelleryArtwork
                            type={item.product.artworkType}
                            showBadge={false}
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between text-xs">
                          <div>
                            <div className="font-serif text-sm font-medium text-[#231B1B] leading-snug">
                              {item.product.name}
                            </div>
                            <div className="text-[11px] text-[#6E6259] mt-0.5">
                              {item.product.karatage} · {item.product.gemstone}
                            </div>
                            {item.selectedSize && (
                              <div className="text-[10px] text-[#58111A] font-semibold mt-1">
                                Spec: {item.selectedSize}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#C5A059]/20">
                            <div className="flex items-center border border-[#C5A059]/40 bg-white">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, -1)}
                                className="px-2 py-0.5 text-xs text-[#58111A] hover:bg-[#F5F0EB] cursor-pointer"
                              >
                                -
                              </button>
                              <span className="px-2 py-0.5 text-xs font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, 1)}
                                className="px-2 py-0.5 text-xs text-[#58111A] hover:bg-[#F5F0EB] cursor-pointer"
                              >
                                +
                              </button>
                            </div>

                            <div className="font-semibold text-sm text-[#58111A] font-mono">
                              {formatPrice(item.product.priceINR * item.quantity, currency)}
                            </div>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="absolute top-2 right-2 text-[#877272] hover:text-[#ba1a1a] p-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}

                    {/* Trust badges */}
                    <div className="bg-[#FAF8F5] border border-[#C5A059]/40 p-3 space-y-2 text-[11px] text-[#554242]">
                      <div className="flex items-center gap-2 text-[#1B4332] font-semibold">
                        <ShieldCheck className="w-4 h-4 text-[#1B4332]" />
                        <span>Insured Armored White-Glove Transit Included</span>
                      </div>
                      <p className="text-[10px] text-[#6E6259]">
                        All vault acquisitions ship sealed with tamper-proof royal wax marks and independent IGI gemological certificates.
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}

            {checkoutStep === 'details' && (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs">
                <div className="font-serif text-base text-[#58111A] font-semibold border-b border-[#C5A059]/30 pb-2">
                  Private Heirloom Acquisition Dossier
                </div>
                <p className="text-[#6E6259] text-[11px]">
                  Please furnish confidential delivery and verification coordinates. Our Chief Liaison Officer will contact you within 2 hours.
                </p>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#554242] mb-1">
                    Full Legal Name / Patron Title
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Maharaval / Shri Vikramaditya Singhania"
                    className="w-full p-2.5 bg-white border border-[#C5A059]/50 focus:outline-hidden focus:border-[#58111A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#554242] mb-1">
                    Direct Phone / WhatsApp (For Armored Courier Dispatch)
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+91 98290 XXXXX / +44 7911 XXXXXX"
                    className="w-full p-2.5 bg-white border border-[#C5A059]/50 focus:outline-hidden focus:border-[#58111A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#554242] mb-1">
                    Secure Delivery Residence or Private Suite Address
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                    placeholder="Estate / Palace Suite / Residence address, City & Postal Code"
                    className="w-full p-2.5 bg-white border border-[#C5A059]/50 focus:outline-hidden focus:border-[#58111A]"
                  />
                </div>

                <div className="p-3 bg-[#F5F0EB] border border-[#C5A059]/30 flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="escort"
                    checked={specialEscort}
                    onChange={(e) => setSpecialEscort(e.target.checked)}
                    className="mt-0.5 accent-[#58111A]"
                  />
                  <label htmlFor="escort" className="text-[11px] text-[#554242]">
                    Request private armed gemological courier handoff with on-site ultrasonic purity testing verification.
                  </label>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="w-1/3 py-2.5 border border-[#C5A059] text-[#58111A] font-semibold uppercase tracking-wider hover:bg-[#F5F0EB] cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-2.5 bg-[#58111A] text-white font-semibold uppercase tracking-wider hover:bg-[#6B1724] cursor-pointer shadow-royal-sm"
                  >
                    Confirm Acquisition Order
                  </button>
                </div>
              </form>
            )}

            {checkoutStep === 'success' && (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 mx-auto bg-[#1B4332] text-[#FAF8F5] rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-[#FED488]" />
                </div>
                <div className="font-serif text-2xl text-[#58111A]">Acquisition Order Confirmed</div>
                <div className="text-xs font-semibold uppercase tracking-widest text-[#C5A059]">
                  Dossier #JP-ROYAL-{Math.floor(1000 + Math.random() * 9000)}
                </div>
                <p className="text-xs text-[#554242] leading-relaxed max-w-sm mx-auto">
                  Namaste, {clientName || 'Patron'}. Your bespoke heirloom allocation has been locked in the Johari Bazaar vault.
                  Our Senior Liaison Officer will reach out via phone ({clientPhone}) to verify insurance seal protocol and schedule dispatch.
                </p>
                <div className="p-4 bg-[#F5F0EB] border border-[#C5A059]/40 text-left text-xs space-y-1">
                  <div className="font-semibold text-[#58111A]">Acquisition Summary:</div>
                  <div className="text-[#6E6259]">Total Valued: {formatPrice(totalINR, currency)}</div>
                  <div className="text-[#6E6259]">Hallmarking: BIS 916 Stamped & Insured</div>
                  <div className="text-[#6E6259]">Destination: {clientAddress}</div>
                </div>
                <div className="pt-4 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      onClearCart();
                      setCheckoutStep('cart');
                      onClose();
                      onNavigate('studio');
                    }}
                    className="w-full py-2.5 bg-[#58111A] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#6B1724] cursor-pointer"
                  >
                    Book Private Haveli Salon Viewing &rarr;
                  </button>
                  <button
                    onClick={() => {
                      onClearCart();
                      setCheckoutStep('cart');
                      onClose();
                      onNavigate('home');
                    }}
                    className="w-full py-2 border border-[#C5A059] text-[#58111A] text-xs font-semibold uppercase tracking-wider hover:bg-[#F5F0EB] cursor-pointer"
                  >
                    Return to Atelier Home
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {checkoutStep === 'cart' && items.length > 0 && (
            <div className="p-6 bg-[#F5F0EB] border-t border-[#C5A059]/40 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#6E6259]">
                  <span>Vault Subtotal</span>
                  <span className="font-mono font-medium">{formatPrice(totalINR, currency)}</span>
                </div>
                <div className="flex justify-between text-[#6E6259]">
                  <span>Insured Armored Delivery</span>
                  <span className="text-[#1B4332] font-semibold uppercase">Complimentary</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#231B1B] pt-2 border-t border-[#C5A059]/30">
                  <span className="font-serif">Total Valuation</span>
                  <span className="font-mono text-[#58111A] text-base">{formatPrice(totalINR, currency)}</span>
                </div>
              </div>

              <button
                onClick={() => setCheckoutStep('details')}
                className="w-full py-3.5 bg-[#58111A] text-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.1em] hover:bg-[#6B1724] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-royal-sm"
              >
                <span>Proceed to Private Acquisition</span>
                <ArrowRight className="w-4 h-4 text-[#FED488]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
