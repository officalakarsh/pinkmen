import React, { useState } from 'react';
import { MessageCircle, X, Send, Award, Clock } from 'lucide-react';
import { ScreenId } from '../types';

interface WhatsAppConciergeProps {
  onNavigate: (screen: ScreenId) => void;
}

export const WhatsAppConcierge: React.FC<WhatsAppConciergeProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'stylist' | 'user'; text: string; time: string }>>([
    {
      sender: 'stylist',
      text: 'Khamaghani & Welcome to Pink Men Jewellery Jaipur. I am Gayatri Rathore, Senior Royal Gemologist & Atelier Stylist. How may I assist your jewellery curation or private viewing today?',
      time: '10:32 AM',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    'Inquire about Maharani Royal Kundan Set',
    'Book Private Haveli Salon in Jaipur',
    'Custom Groom Sherwani Regalia Inquiry',
    'BIS 916 & IGI Certification Details',
  ];

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    const newMsg = {
      sender: 'user' as const,
      text: userText,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputValue('');
    setIsTyping(true);

    // Contextual responses from Gayatri Rathore
    setTimeout(() => {
      let reply = 'Thank you for your inquiry. Our Master Goldsmiths and Senior Curators are at your service.';
      const lower = userText.toLowerCase();

      if (lower.includes('maharani') || lower.includes('kundan')) {
        reply = 'The Maharani Royal Kundan Set is our most celebrated masterwork. Featuring 38.50 carats of syndicate polki diamonds in 24K pure gold foil, accompanied by 54.20 carats of Zambian emerald drops and reverse peacock meenakari enameling. Only 3 sets are crafted annually. Would you like to review the complete gemological dossier or book a private salon viewing?';
      } else if (lower.includes('haveli') || lower.includes('jaipur') || lower.includes('book') || lower.includes('salon')) {
        reply = 'We would be honored to host you at our Johari Bazaar Haveli Atelier. Private viewings include full vault access, examination under 20x magnification, and traditional Rajasthani saffron hospitality. You can select your date and time in our Studio section!';
      } else if (lower.includes('groom') || lower.includes('kalgi') || lower.includes('sherwani') || lower.includes('men')) {
        reply = 'Our Royal Men’s Regalia includes imperial turban Kalgis, 5-strand Basra pearl & emerald Kanthas, and hand-enameled Navratna sherwani buttons. Each piece is calibrated to harmonize with traditional royal bandhgala and sherwani fabrics.';
      } else if (lower.includes('certif') || lower.includes('hallmark') || lower.includes('gold')) {
        reply = 'Every heirloom piece carries the Government of India BIS 916 Hallmark with unique HUID traceability. Uncut diamonds are certified by IGI (International Gemological Institute), ensuring 100% natural, untreated provenance.';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'stylist',
          text: reply,
          time: 'Just now',
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <aside aria-label="Concierge assistance" className="fixed bottom-6 right-6 z-50">
      {/* Floating Concierge Action Trigger (Pill Shaped per Design System) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group flex items-center gap-2.5 px-4 py-2.5 bg-[#1B4332] text-[#FAF8F5] rounded-full shadow-royal-md hover:bg-[#083323] transition-all cursor-pointer border border-[#C5A059]/60 hover:scale-[1.02]"
          aria-label="Consult Jaipur Stylist via Concierge"
        >
          {/* Subtle pulsating gold ring */}
          <span className="absolute -inset-1 rounded-full border border-[#D4AF37] opacity-60 animate-ping pointer-events-none" />

          {/* Stylist Avatar with Royal Emerald Badge */}
          <div className="relative w-7 h-7 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#58111A] font-serif font-bold text-xs border border-[#C5A059]">
            GR
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#25D366] border-2 border-[#1B4332]" />
          </div>

          <div className="text-left">
            <div className="text-[10px] uppercase tracking-[0.14em] text-[#FED488] font-semibold leading-tight">
              Jaipur Atelier
            </div>
            <div className="text-xs font-semibold tracking-wide text-white">
              Consult Royal Stylist
            </div>
          </div>

          <MessageCircle className="w-4 h-4 text-[#25D366] ml-1" />
        </button>
      )}

      {/* Concierge Dialog Panel */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] max-h-[85vh] bg-[#FAF8F5] border border-[#C5A059] shadow-royal-lg flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-[#58111A] text-[#FAF8F5] p-4 flex items-center justify-between border-b border-[#C5A059]/40">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#58111A] font-serif font-bold text-sm border border-[#C5A059]">
                GR
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#25D366] border-2 border-[#58111A]" />
              </div>
              <div>
                <div className="font-serif text-sm tracking-wide font-medium flex items-center gap-1.5">
                  Gayatri Rathore
                  <Award className="w-3.5 h-3.5 text-[#FED488]" />
                </div>
                <div className="text-[10px] text-[#FED488] uppercase tracking-wider">
                  Senior Royal Gemologist · Jaipur Haveli
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white p-1 cursor-pointer"
              aria-label="Close Concierge"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick status bar */}
          <div className="bg-[#F5F0EB] px-4 py-1.5 border-b border-[#C5A059]/20 flex items-center justify-between text-[11px] text-[#6E6259]">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#1B4332]" /> Direct Line to Atelier: Johari Bazaar
            </span>
            <span className="text-[#1B4332] font-semibold">Available Now</span>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF8F5] text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 leading-relaxed shadow-xs ${
                    m.sender === 'user'
                      ? 'bg-[#58111A] text-white rounded-t-lg rounded-bl-lg'
                      : 'bg-[#F5F0EB] text-[#231B1B] border border-[#C5A059]/30 rounded-t-lg rounded-br-lg'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-[#877272] mt-1 px-1">{m.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-xs text-[#877272] italic bg-[#F5F0EB] p-2 rounded-md w-fit border border-[#C5A059]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1 text-[10px]">Stylist is reviewing archive records...</span>
              </div>
            )}
          </div>

          {/* Quick Prompt Pill Tags */}
          <div className="px-3 py-2 bg-[#F5F0EB] border-t border-[#C5A059]/20 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="shrink-0 text-[10px] px-2.5 py-1 bg-white border border-[#C5A059]/50 hover:bg-[#58111A] hover:text-white transition-colors cursor-pointer text-[#58111A] rounded-full whitespace-nowrap font-medium"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-[#C5A059]/30 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend(inputValue);
              }}
              placeholder="Ask Gayatri about jewels, karigari, or viewings..."
              className="flex-1 text-xs px-3 py-2 bg-[#FAF8F5] border border-[#C5A059]/40 focus:outline-hidden focus:border-[#C5A059] text-[#231B1B]"
            />
            <button
              onClick={() => handleSend(inputValue)}
              className="p-2 bg-[#1B4332] text-white hover:bg-[#083323] transition-colors cursor-pointer shrink-0"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Footer Shortcuts */}
          <div className="bg-[#FAF8F5] px-3 py-1.5 border-t border-[#C5A059]/20 flex items-center justify-between text-[10px] text-[#6E6259]">
            <button
              onClick={() => {
                setIsOpen(false);
                onNavigate('studio');
              }}
              className="hover:text-[#58111A] underline font-medium cursor-pointer"
            >
              Schedule Haveli Salon Viewing &rarr;
            </button>
            <span className="text-[9px] uppercase tracking-wider text-[#877272]">Direct WhatsApp</span>
          </div>
        </div>
      )}
    </aside>
  );
};
