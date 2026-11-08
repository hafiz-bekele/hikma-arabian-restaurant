import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Navigation,
  MessageCircle,
  Share2,
  ExternalLink,
  Car,
  Footprints,
  Clock,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import StatusPill from '../components/StatusPill';
import LandmarkSteps from '../components/LandmarkSteps';
import HoursTable from '../components/HoursTable';
import TrustBadges from '../components/TrustBadges';

export default function VisitPage() {
  const { lang, t } = useLanguage();
  const [showEmbedMap, setShowEmbedMap] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Hikma Arabian Restaurant - Kombolcha',
          text: 'ሒክማ አረብያን ሬስቶራንት - አቡቁተ ህንፃ 2ኛ ፎቅ፣ መሀል ኮምቦልቻ (ከአዋሽ ባንክ አጠገብ) · ስልክ፡ 0991 589 097',
          url: 'https://www.google.com/maps/place/HIKMA+ARABIAN+RESTAURANT/@11.0866268,39.7382889,17z',
        });
      } catch {
        // Ignored if cancelled
      }
    } else {
      navigator.clipboard.writeText(
        'ሒክማ አረብያን ሬስቶራንት - አቡቁተ ህንፃ 2ኛ ፎቅ፣ መሀል ኮምቦልቻ (ከአዋሽ ባንክ አጠገብ) · ስልክ፡ 0991 589 097'
      );
      alert('የአድራሻው መረጃ ተገልብጧል (Address copied to clipboard)!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* 1. Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="flex items-center justify-center gap-2 mb-2">
          <StatusPill />
          <span className="px-3 py-1 bg-amber-500 text-charcoal-900 font-bold text-xs rounded-full">
            2ኛ ፎቅ (2nd Floor)
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-forest-900 dark:text-cream-50 tracking-tight">
          {t('visit.h1')}
        </h1>
        <p className="text-sm sm:text-base text-charcoal-600 dark:text-sand-300">
          {t('visit.lead')}
        </p>
      </div>

      {/* 2. Action Buttons Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
        <a
          href="https://www.google.com/maps/place/HIKMA+ARABIAN+RESTAURANT/@11.0866268,39.7382889,17z"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-4 bg-forest-800 dark:bg-forest-700 hover:bg-forest-700 dark:hover:bg-forest-600 text-cream-50 rounded-2xl shadow-sm transition-transform hover:-translate-y-0.5 font-semibold text-sm text-center border border-transparent dark:border-forest-600"
        >
          <Navigation className="w-5 h-5 text-amber-400 mb-1.5" />
          <span>{t('hero.ctaPrimary')}</span>
        </a>

        <a
          href="tel:+251991589097"
          className="flex flex-col items-center justify-center p-4 bg-forest-800 dark:bg-forest-700 hover:bg-forest-700 dark:hover:bg-forest-600 text-cream-50 rounded-2xl shadow-sm transition-transform hover:-translate-y-0.5 font-semibold text-sm text-center border border-transparent dark:border-forest-600"
        >
          <Phone className="w-5 h-5 text-emerald-300 mb-1.5" />
          <span>{t('hero.ctaCall')}</span>
        </a>

        <a
          href="https://wa.me/251991589097?text=%E1%88%B0%E1%8C%8B%E1%88%9D%21%20%E1%8B%AD%E1%89%85%E1%88%AD%E1%89%B3%20%E1%8A%A0%E1%8B%B5%E1%88%AB%E1%84%8B%20%E1%8B%88%E1%8B%AD%E1%88%9D%20%E1%89%A6%E1%89%B3%20%E1%88%9B%E1%88%B5%E1%8B%AB%E1%8B%9D%20%E1%8A%A5%E1%8D%88%E1%88%8D%E1%8C%8B%E1%88%88%E1%88%81%E1%8D%A2"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-4 bg-emerald-700 hover:bg-emerald-600 text-cream-50 rounded-2xl shadow-sm transition-transform hover:-translate-y-0.5 font-semibold text-sm text-center"
        >
          <MessageCircle className="w-5 h-5 text-cream-50 mb-1.5" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={handleShare}
          className="flex flex-col items-center justify-center p-4 bg-sand-200 dark:bg-[#182E25] hover:bg-sand-300 dark:hover:bg-forest-800 text-forest-900 dark:text-cream-100 border border-sand-300 dark:border-forest-700 rounded-2xl shadow-xs transition-colors font-semibold text-sm text-center"
        >
          <Share2 className="w-5 h-5 text-forest-800 dark:text-amber-400 mb-1.5" />
          <span>{lang === 'am' ? 'አጋራ' : 'Share'}</span>
        </button>
      </div>

      {/* 3. Landmark Navigation Steps (The core fix) */}
      <LandmarkSteps />

      {/* 4. Map & Hours Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Map Card (Google Maps embed or interactive visual card) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#13221C] rounded-3xl border border-sand-300 dark:border-forest-800 overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="p-6 border-b border-sand-200 dark:border-forest-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-xl text-forest-900 dark:text-cream-50">
                  {lang === 'am' ? 'የካርታ መገኛ' : 'Map Location'}
                </h3>
                <p className="text-xs text-charcoal-600 dark:text-cream-100 mt-1">
                  11.0866268° N, 39.7382889° E · Kombolcha, Ethiopia
                </p>
              </div>
              <a
                href="https://www.google.com/maps/place/HIKMA+ARABIAN+RESTAURANT/@11.0866268,39.7382889,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-forest-800 dark:bg-amber-500 hover:bg-forest-700 dark:hover:bg-amber-400 text-cream-50 dark:text-charcoal-900 rounded-full text-xs font-semibold"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Interactive Styled Map View with Click-to-Load Iframe */}
          <div className="relative h-72 sm:h-96 bg-sand-200 dark:bg-forest-950 flex items-center justify-center overflow-hidden">
            {showEmbedMap ? (
              <iframe
                title="Hikma Arabian Restaurant Map"
                className="w-full h-full border-0"
                loading="lazy"
                src="https://www.openstreetmap.org/export/embed.html?bbox=39.7332889%2C11.0826268%2C39.7432889%2C11.0906268&layer=mapnik&marker=11.0866268%2C39.7382889"
              ></iframe>
            ) : (
              <div className="text-center p-6 bg-white/95 dark:bg-[#0E2A20]/95 backdrop-blur-md rounded-2xl border border-sand-300 dark:border-forest-700 shadow-md max-w-sm m-4">
                <div className="w-12 h-12 rounded-full bg-forest-800 dark:bg-forest-700 text-amber-400 flex items-center justify-center mx-auto mb-3 shadow-sm border border-amber-500/30">
                  <MapPin className="w-6 h-6 animate-bounce" />
                </div>
                <h4 className="font-bold text-forest-900 dark:text-cream-50 text-base mb-1">
                  ሒክማ አረብያን ሬስቶራንት
                </h4>
                <p className="text-xs text-charcoal-600 dark:text-cream-100 mb-4 leading-relaxed">
                  አቡቁተ ህንፃ 2ኛ ፎቅ (ፀደይ ባንክ ያለበት)፣ ከአዋሽ ባንክ አጠገብ፣ መሀል ኮምቦልቻ
                </p>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setShowEmbedMap(true)}
                    className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 bg-sand-200 dark:bg-[#182E25] hover:bg-sand-300 dark:hover:bg-forest-800 text-forest-900 dark:text-cream-100 rounded-xl text-xs font-bold transition-colors border border-sand-300 dark:border-forest-700"
                  >
                    <span>{lang === 'am' ? '🗺️ የቀጥታ ካርታ እዚህ አሳይ' : '🗺️ Load Interactive Map Here'}</span>
                  </button>
                  <a
                    href="https://www.google.com/maps/place/HIKMA+ARABIAN+RESTAURANT/@11.0866268,39.7382889,17z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-forest-800 dark:bg-amber-500 hover:bg-forest-700 dark:hover:bg-amber-400 text-cream-50 dark:text-charcoal-900 rounded-xl text-xs font-bold transition-colors shadow-sm"
                  >
                    <Navigation className="w-4 h-4 text-amber-400 dark:text-charcoal-900" />
                    <span>{lang === 'am' ? 'Google Maps ላይ ክፈት' : 'Open in Google Maps'}</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-sand-100 dark:bg-[#0E2A20] text-xs text-charcoal-600 dark:text-cream-100 flex items-center justify-between border-t border-sand-200 dark:border-forest-800">
            <span>📍 አቡቁተ ህንፃ 2ኛ ፎቅ</span>
            <span>📞 0991 589 097</span>
          </div>
        </div>

        {/* Hours Table */}
        <div className="lg:col-span-5">
          <HoursTable />
        </div>
      </div>

      {/* 5. How to get here (Transportation modes) */}
      <div className="bg-sand-100 dark:bg-[#0E2A20] rounded-3xl p-6 sm:p-8 border border-sand-300 dark:border-forest-800">
        <h3 className="text-xl font-bold text-forest-900 dark:text-cream-50 mb-6">
          {lang === 'am' ? 'ወደ እኛ ለመምጣት የተመቻቹ መንገዶች' : 'Getting Here (Transportation)'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#13221C] rounded-2xl p-5 border border-sand-200 dark:border-forest-800">
            <Footprints className="w-6 h-6 text-forest-800 dark:text-amber-400 mb-2" />
            <h4 className="font-bold text-forest-900 dark:text-cream-50 text-base mb-1">
              {lang === 'am' ? 'በእግር' : 'On Foot'}
            </h4>
            <p className="text-xs sm:text-sm text-charcoal-600 dark:text-cream-100 leading-relaxed">
              {lang === 'am'
                ? 'ከመሀል ኮምቦልቻ ወደ በርበሬ ወንዝ ሰፈር በሚወስደው መንገድ አዋሽ ባንክን ተሻግረው አቡቁተ ህንፃ 2ኛ ፎቅ ላይ በቀላሉ ይደርሳሉ።'
                : 'Central Kombolcha on the road to Berbere River, directly adjacent to Awash Bank.'}
            </p>
          </div>

          <div className="bg-white dark:bg-[#13221C] rounded-2xl p-5 border border-sand-200 dark:border-forest-800">
            <Car className="w-6 h-6 text-forest-800 dark:text-amber-400 mb-2" />
            <h4 className="font-bold text-forest-900 dark:text-cream-50 text-base mb-1">
              {lang === 'am' ? 'በባጃጅ / በታክሲ' : 'By Bajaj / Taxi'}
            </h4>
            <p className="text-xs sm:text-sm text-charcoal-600 dark:text-cream-100 leading-relaxed">
              {lang === 'am'
                ? 'ለባጃጅ አሽከርካሪው "አዋሽ ባንክ አጠገብ አቡቁተ ህንፃ ወይም ፀደይ ባንክ ጋር" ይበሉት።'
                : 'Tell your Bajaj driver: "Abkute Building next to Awash Bank (where Tsedey Bank is located)".'}
            </p>
          </div>

          <div className="bg-white dark:bg-[#13221C] rounded-2xl p-5 border border-sand-200 dark:border-forest-800">
            <Car className="w-6 h-6 text-forest-800 dark:text-amber-400 mb-2" />
            <h4 className="font-bold text-forest-900 dark:text-cream-50 text-base mb-1">
              {lang === 'am' ? 'በመኪና (ከደሴ ወይም ከአዲስ አበባ)' : 'By Car (From Dessie/Addis)'}
            </h4>
            <p className="text-xs sm:text-sm text-charcoal-600 dark:text-cream-100 leading-relaxed">
              {lang === 'am'
                ? 'ከዋናው አስፋልት መንገድ ወጥተው በህንፃው ፊት ለፊት በቂና ሰላማዊ የመኪና ማቆሚያ (ፓርኪንግ) ያገኛሉ።'
                : 'Convenient road access from the Dessie corridor with available parking in front of the building.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
