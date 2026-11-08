import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function TermsPage({ onNavigate }) {
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
          <FileText className="w-6 h-6" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-forest-900 dark:text-cream-50">
          {lang === 'am' ? 'የአገልግሎት ደንብ (Terms of Service)' : 'Terms of Service'}
        </h1>
        <p className="text-xs text-charcoal-600 dark:text-sand-300">
          {lang === 'am' ? 'የመጨረሻ ማሻሻያ፡ ህዳር 2026' : 'Last Updated: November 2026'}
        </p>
      </div>

      <div className="bg-white dark:bg-[#13221C] rounded-3xl p-6 sm:p-10 border border-sand-300 dark:border-forest-800 shadow-sm space-y-6 text-sm sm:text-base text-charcoal-700 dark:text-cream-100 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-forest-900 dark:text-cream-50">
            {lang === 'am' ? '1. የምናሌ እና ዋጋ ማስተካከያ' : '1. Menu & Prices'}
          </h2>
          <p>
            {lang === 'am'
              ? 'በዚህ ዌብሳይት ላይ የተዘረዘሩ የምግብ ዓይነቶችና ዋጋዎች እንደ ግብአት አቅርቦት ሁኔታ ሊለወጡ ይችላሉ። ሬስቶራንቱ ሁልጊዜ ትኩስ እና ጥራት ያለው ምግብ ለማቅረብ ይተጋል።'
              : 'Dishes and prices listed on this site reflect current offerings and may vary based on market availability. We strive to maintain absolute freshness and transparency.'}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-forest-900 dark:text-cream-50">
            {lang === 'am' ? '2. የጠረጴዛ ማስያዣ ጥያቄዎች' : '2. Table Reservations'}
          </h2>
          <p>
            {lang === 'am'
              ? 'በዌብሳይቱ ወይም በ WhatsApp የሚላኩ የጠረጴዛ ማስያዣ ጥያቄዎች በሬስቶራንቱ ሰራተኞች መልስ ተሰጥቶባቸው ማረጋገጫ ሲያገኙ ብቻ የጸኑ ይሆናሉ።'
              : 'Reservation requests submitted via website or WhatsApp become final upon direct confirmation by our team.'}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-forest-900 dark:text-cream-50">
            {lang === 'am' ? '3. ንብረትነት እና የይዘት መብት' : '3. Intellectual Property'}
          </h2>
          <p>
            {lang === 'am'
              ? 'የሒክማ አረብያን ሬስቶራንት አርማ (Logo)፣ የምግብ ፎቶዎች እና ጽሑፎች የሬስቶራንቱ የንግድ ንብረቶች ናቸው።'
              : 'The Hikma Arabian Restaurant logo, culinary photography, and branding materials are property of Hikma Arabian Restaurant.'}
          </p>
        </section>
      </div>
    </div>
  );
}
