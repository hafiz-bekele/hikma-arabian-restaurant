import React from 'react';
import { Heart, Flame, Coffee, Users, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import TrustBadges from '../components/TrustBadges';

export default function AboutPage({ onNavigate }) {
  const { lang, t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-charcoal-900 border border-amber-600/30">
          {lang === 'am' ? 'የሒክማ ታሪክ እና እሴት' : 'Our Story & Heritage'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-forest-900 dark:text-cream-50 tracking-tight">
          {t('about.h1')}
        </h1>
        <p className="text-base sm:text-lg text-charcoal-600 dark:text-cream-100 leading-relaxed">
          {t('about.lead')}
        </p>
      </div>

      {/* Story & Philosophy Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-charcoal-700 dark:text-cream-100 leading-relaxed text-base sm:text-lg">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-900 dark:text-cream-50">
            {lang === 'am'
              ? 'በኮምቦልቻ ሞቅ ያለውን የአረብ ጣዕም እና መስተንግዶ እናቀርባለን'
              : 'Bringing Warm Arabian Hospitality to Kombolcha'}
          </h2>
          <p>
            {lang === 'am'
              ? 'ሒክማ አረብያን ሬስቶራንት የተመሰረተው ለኮምቦልቻ ነዋሪዎች፣ ለቤተሰቦች እንዲሁም በደሴ እና በአዲስ አበባ መስመር ለሚጓዙ መንገደኞች ምቹ፣ ንጹህ እና እውነተኛ የአረብያን የምግብ ባህል ለማቅረብ ነው።'
              : 'Hikma Arabian Restaurant was founded to bring authentic Arabian cuisine, fresh oven-baked breads, and genuine hospitality to the families and travelers of Kombolcha.'}
          </p>
          <p>
            {lang === 'am'
              ? 'በእኛ እምነት ምግብ ፈጥኖ የሚቀርብ ብቻ ሳይሆን ትኩስ ከመጋገሪያው የሚወጣ፣ በቅንነት እና በጥሩ ቅመሞች የሚዘጋጅ መሆን አለበት። ከአረብያን ዶሮና ማንዲ ጀምሮ እስከ ባህላዊ የጀበና ቡና እና ትኩስ ጁስ ድረስ እያንዳንዱ ዝግጅት በክብር ይቀርባል።'
              : 'We believe food should never be pre-made or rushed. From our slow-roasted Arabian chickens and fragrant Mandi platters to traditional jebena coffee and fresh fruit juices, everything is crafted with care and served with respect.'}
          </p>

          <div className="pt-2">
            <TrustBadges />
          </div>
        </div>

        {/* Feature Box with Signature Arch & Official Logo */}
        <div className="lg:col-span-5 bg-forest-900 text-cream-50 rounded-3xl p-8 border border-forest-800 shadow-xl relative overflow-hidden text-center sm:text-left">
          <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl"></div>
          
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-forest-800">
            <img
              src="/images/logo.jpg"
              alt="Hikma Official Logo"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400/80 shadow-md bg-white p-1 shrink-0"
            />
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-amber-400 block mb-0.5">
                {lang === 'am' ? 'የእኛ መርሆዎች' : 'Our Core Commitments'}
              </span>
              <h3 className="text-xl font-bold font-display text-cream-50">
                {lang === 'am' ? 'ሒክማ አረብያን ሬስቶራንት' : 'Hikma Arabian Restaurant'}
              </h3>
            </div>
          </div>

          <h4 className="text-base font-bold text-amber-300 mb-4">
            {lang === 'am' ? 'ምንጊዜም የማንደራደርባቸው እሴቶች' : 'Principles We Stand By'}
          </h4>

          <ul className="space-y-4 text-sm text-sand-200">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>{lang === 'am' ? 'ትኩስ ከመጋገሪያው፦' : 'Baked Fresh: '}</strong>
                {lang === 'am' ? 'ምንም አይነት የቀዘቀዘ ወይም የቆየ ምግብ አናቀርብም።' : 'We never serve reheated or pre-prepared meals.'}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>{lang === 'am' ? '100% ሃላል፦' : '100% Halal: '}</strong>
                {lang === 'am' ? 'ስጋችን እና ግብአቶቻችን በሙሉ በሃላል ስርዓት የታረዱና የተረጋገጡ ናቸው።' : 'All meats and ingredients are strictly Halal-certified.'}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>{lang === 'am' ? 'የቤተሰብ ክብርና ጸጥታ፦' : 'Family Section: '}</strong>
                {lang === 'am' ? 'ለቤተሰብና ለቡድን የተከበረና ምቹ ሁለተኛ ፎቅ።' : 'Spacious second floor built for family dignity and peace.'}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>{lang === 'am' ? 'የቡና ባህል፦' : 'Coffee Tradition: '}</strong>
                {lang === 'am' ? 'የጀበና ቡና በዕጣን ታጅቦ ባህላዊ ስነ ስርዓቱን ጠብቆ ይቀርባል።' : 'Traditional jebena coffee brewed fresh over glowing coals.'}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* The Venue & Atmosphere Details */}
      <div className="bg-sand-100 dark:bg-[#0E2A20] rounded-3xl p-8 border border-sand-300 dark:border-forest-800">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-900 dark:text-cream-50">
            {lang === 'am' ? 'የአዳራሻችን ገፅታ' : 'The Room & Venue'}
          </h2>
          <p className="text-sm text-charcoal-600 dark:text-cream-100 mt-1">
            {lang === 'am'
              ? 'አቡቁተ ህንፃ 2ኛ ፎቅ ላይ ሰፊ፣ በአረንጓዴ ተክሎች እና በሞቀ መብራት ያጌጠ ቦታ'
              : 'Spacious second-floor ambiance with amber lights, wooden accents, and comfortable seating'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-[#13221C] rounded-2xl p-5 border border-sand-200 dark:border-forest-800 text-center">
            <span className="text-3xl font-extrabold text-forest-800 dark:text-amber-400 block mb-1">2ኛ ፎቅ</span>
            <p className="text-xs text-charcoal-600 dark:text-cream-100 font-medium">አቡቁተ ህንፃ፣ ከአዋሽ ባንክ አጠገብ</p>
          </div>
          <div className="bg-white dark:bg-[#13221C] rounded-2xl p-5 border border-sand-200 dark:border-forest-800 text-center">
            <span className="text-3xl font-extrabold text-forest-800 dark:text-amber-400 block mb-1">08:00 – 22:00</span>
            <p className="text-xs text-charcoal-600 dark:text-cream-100 font-medium">በየቀኑ ክፍት (7 Days a week)</p>
          </div>
          <div className="bg-white dark:bg-[#13221C] rounded-2xl p-5 border border-sand-200 dark:border-forest-800 text-center">
            <span className="text-3xl font-extrabold text-forest-800 dark:text-amber-400 block mb-1">100% ሃላል</span>
            <p className="text-xs text-charcoal-600 dark:text-cream-100 font-medium">የጸሎት ቦታና ንጹህ ውዱዕ የተመቻቸ</p>
          </div>
          <div className="bg-white dark:bg-[#13221C] rounded-2xl p-5 border border-sand-200 dark:border-forest-800 text-center">
            <span className="text-3xl font-extrabold text-forest-800 dark:text-amber-400 block mb-1">0991 589 097</span>
            <p className="text-xs text-charcoal-600 dark:text-cream-100 font-medium">ቀጥታ የስልክና የ WhatsApp ጥሪ</p>
          </div>
        </div>
      </div>
    </div>
  );
}
