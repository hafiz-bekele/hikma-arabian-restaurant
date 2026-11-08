import React from 'react';
import { Phone, Navigation, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function StickyActionBar({ onNavigate }) {
  const { lang, t } = useLanguage();

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-forest-900 text-cream-50 border-t border-forest-700/80 shadow-[0_-4px_16px_rgba(14,42,32,0.2)] pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-3 divide-x divide-forest-800">
        {/* Call button */}
        <a
          href="tel:+251991589097"
          className="flex flex-col items-center justify-center py-2.5 px-1 hover:bg-forest-800 active:bg-forest-700 transition-colors"
          aria-label="Call Hikma Restaurant"
        >
          <Phone className="w-5 h-5 text-amber-400 mb-0.5" />
          <span className="text-[11px] font-semibold tracking-tight">
            {lang === 'am' ? 'ይደውሉ' : 'Call'}
          </span>
        </a>

        {/* Directions button */}
        <a
          href="https://www.google.com/maps/place/HIKMA+ARABIAN+RESTAURANT/@11.0866268,39.7382889,17z"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2.5 px-1 hover:bg-forest-800 active:bg-forest-700 transition-colors"
          aria-label="Directions to Restaurant"
        >
          <Navigation className="w-5 h-5 text-amber-400 mb-0.5" />
          <span className="text-[11px] font-semibold tracking-tight">
            {lang === 'am' ? 'አቅጣጫ' : 'Directions'}
          </span>
        </a>

        {/* Reserve / WhatsApp */}
        <button
          onClick={() => onNavigate('/reserve')}
          className="flex flex-col items-center justify-center py-2.5 px-1 bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-600 transition-colors"
          aria-label="Reserve a Table"
        >
          <MessageCircle className="w-5 h-5 text-emerald-300 mb-0.5" />
          <span className="text-[11px] font-semibold tracking-tight text-cream-50">
            {lang === 'am' ? 'ቦታ ያዙ' : 'Reserve'}
          </span>
        </button>
      </div>
    </div>
  );
}
