import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function PrivacyPage({ onNavigate }) {
  const { lang } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <button
        onClick={() => onNavigate('/')}
        className="inline-flex items-center gap-2 text-sm font-semibold text-forest-800 dark:text-amber-400 hover:text-forest-700 dark:hover:text-amber-300"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{lang === 'am' ? 'ወደ ዋና ገፅ ተመለስ' : 'Back to Home'}</span>
      </button>

      <div className="space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-forest-800 dark:bg-amber-500 text-amber-400 dark:text-charcoal-900 flex items-center justify-center">
          <Shield className="w-6 h-6" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-forest-900 dark:text-cream-50">
          {lang === 'am' ? 'የግላዊነት መመሪያ (Privacy Policy)' : 'Privacy Policy'}
        </h1>
        <p className="text-xs text-charcoal-600 dark:text-sand-300">
          {lang === 'am' ? 'የመጨረሻ ማሻሻያ፡ ህዳር 2026' : 'Last Updated: November 2026'}
        </p>
      </div>

      <div className="bg-white dark:bg-[#13221C] rounded-3xl p-6 sm:p-10 border border-sand-300 dark:border-forest-800 shadow-sm space-y-6 text-sm sm:text-base text-charcoal-700 dark:text-cream-100 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-forest-900 dark:text-cream-50">
            {lang === 'am' ? '1. አጠቃላይ መረጃ' : '1. Overview'}
          </h2>
          <p>
            {lang === 'am'
              ? 'ሒክማ አረብያን ሬስቶራንት (ኮምቦልቻ) የደንበኞቹን ግላዊነት በጥብቅ ያከብራል። ይህ ዌብሳይት ለተጠቃሚዎች ቀላል፣ ፈጣን እና ደህንነቱ የተጠበቀ መረጃ ለመስጠት የተዘጋጀ ነው።'
              : 'Hikma Arabian Restaurant (Kombolcha) respects your privacy. This website is designed to be fast, simple, and privacy-respecting.'}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-forest-900 dark:text-cream-50">
            {lang === 'am' ? '2. የምንሰበስበው መረጃ እና የቦታ ማስያዣ ቅጽ' : '2. Reservation Form & Data'}
          </h2>
          <p>
            {lang === 'am'
              ? 'በ «ቦታ ያዙ» ገፅ ላይ የሚያስገቡት ስም፣ ስልክ ቁጥር እና ቀን በቀጥታ በ WhatsApp መተግበሪያ በኩል ወደ ሬስቶራንቱ የስራ ስልክ (0991 589 097) የሚላክ መልእክት ለማዘጋጀት ብቻ ያገለግላል። ምንም አይነት የባንክ ወይም የካርድ ቁጥር በዌብሳይቱ ላይ አይጠየቅም ወይም አይከማችም።'
              : 'The details submitted via our reservation form (name, phone, date, guest count) are used strictly to compose your booking message via WhatsApp to 0991 589 097 and log table reservations in our local database. No credit card or payment information is ever processed.'}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-forest-900 dark:text-cream-50">
            {lang === 'am' ? '3. ኩኪዎች እና ማስታወቂያዎች' : '3. Cookies & Tracking'}
          </h2>
          <p>
            {lang === 'am'
              ? 'ይህ ዌብሳይት የግል መረጃዎችን የሚከታተሉ ወይም ለሶስተኛ ወገን የሚያስተላልፉ የንግድ ማስታወቂያ ኩኪዎችን (Advertising cookies) አይጠቀምም።'
              : 'This website does not use tracking or advertising cookies. Any analytics collected are strictly anonymized for performance.'}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-forest-900 dark:text-cream-50">
            {lang === 'am' ? '4. አድራሻ እና ጥያቄዎች' : '4. Contact'}
          </h2>
          <p>
            {lang === 'am'
              ? 'ስለ ግላዊነት መመሪያችን ማንኛውም ጥያቄ ካለዎት በስልክ ቁጥር 0991 589 097 ወይም በአካል አቡቁተ ህንፃ 2ኛ ፎቅ፣ መሀል ኮምቦልቻ መጥተው ሊጠይቁን ይችላሉ።'
              : 'For any privacy inquiries, reach us at 0991 589 097 or in person at 2nd Floor, Abkute Building, central Kombolcha.'}
          </p>
        </section>
      </div>
    </div>
  );
}
