import React, { useState, useEffect } from 'react';
import {
  Phone,
  Navigation,
  Utensils,
  Flame,
  Coffee,
  Users,
  Sparkles,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  Clock,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import StatusPill from '../components/StatusPill';
import TrustBadges from '../components/TrustBadges';
import LandmarkSteps from '../components/LandmarkSteps';
import DishCard from '../components/DishCard';

export default function HomePage({ onNavigate }) {
  const { lang, t } = useLanguage();
  const [featuredDishes, setFeaturedDishes] = useState([]);
  const [loadingDishes, setLoadingDishes] = useState(true);
  const [activeHeroDish, setActiveHeroDish] = useState(0);

  const heroShowcase = [
    {
      id: 0,
      image: '/images/dishes/dish-mandi-feast.jpg',
      name_am: 'የሒክማ ማንዲ የበግ ስጋ ድግስ',
      name_en: 'Hikma Mandi Lamb Platter',
      badge_am: '★ የሒክማ ልዩ ማዕድ',
      badge_en: '★ Hikma Signature Feast',
      price: '1,500 ብር',
      desc_am: 'በአረብያን ቅመም የበሰለ ለስላሳ የበግ ስጋ ከባስማቲ ሩዝ እና ደቁስ ሳውስ ጋር',
      desc_en: 'Tender slow-cooked lamb over fragrant basmati rice with daqqoos dip'
    },
    {
      id: 1,
      image: '/images/dishes/dish-chicken-fries-dips.jpg',
      name_am: 'ሙሉ የተጠበሰ ዶሮ በ 4 ሳውሶችና ቺፕስ',
      name_en: 'Full Roasted Chicken with 4 Artisanal Dips',
      badge_am: '🍗 ክሪስፒ አረብኛ ዶሮ',
      badge_en: '🍗 Crispy Arabian Chicken',
      price: '4,000 ብር',
      desc_am: 'ትኩስ የተጠበሰ ዶሮ በነጭ ሽንኩርት ቶም፣ ሚንት ሳውስ፣ ቺሊ እና ቺፕስ',
      desc_en: 'Golden roasted chicken with toum garlic dip, mint sauce, and crispy fries'
    },
    {
      id: 2,
      image: '/images/dishes/dish-tibs-pan.jpg',
      name_am: 'ድስ ጥብስ በእንጀራና ባስማቲ ሩዝ',
      name_en: 'Sizzling Pan Tibs with Injera & Rice',
      badge_am: '🔥 ትኩስ ከመጋገሪያው',
      badge_en: '🔥 Fresh from the Pan',
      price: '800 ብር',
      desc_am: 'በትኩስ ድስት እየተንተከተከ የሚቀርብ የበሬ ጥብስ በትኩስ እንጀራ ፍርፍር',
      desc_en: 'Prime beef cubes sizzling in clay pot with fresh injera and spices'
    }
  ];

  useEffect(() => {
    fetch('/api/menu/items?featured=true')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFeaturedDishes(data.data);
        }
      })
      .catch(err => console.error('Error loading featured dishes:', err))
      .finally(() => setLoadingDishes(false));
  }, []);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION - SIMPLIFIED, ELEGANT & BALANCED */}
      <section className="relative pt-12 sm:pt-20 pb-14 sm:pb-24 bg-forest-950 text-cream-50 overflow-hidden border-b border-forest-800/80">
        {/* Real Interior & Floor Background Image with Soothing Dark Veil */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/images/restaurant-floor-bg.jpg"
            alt="Hikma Arabian Restaurant Interior"
            className="w-full h-full object-cover object-center"
          />
          {/* Calming gradient veil that softens visual noise and lets text breathe */}
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950/95 via-forest-950/90 to-forest-950/75"></div>
          <div className="absolute inset-0 bg-black/25"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Clean, confident typography and 2 clear CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Single tranquil eyebrow tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900/80 border border-forest-700/70 text-xs sm:text-sm text-sand-200 backdrop-blur-sm shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>
                  {lang === 'am'
                    ? 'አሁን ክፍት ነው · አቡቁተ ህንፃ 2ኛ ፎቅ፣ ኮምቦልቻ'
                    : 'Open Now · Abkute Building 2nd Floor, Kombolcha'}
                </span>
              </div>

              {/* Main Headline */}
              <div>
                <p className="text-amber-400 font-display text-lg sm:text-2xl font-medium tracking-wide mb-2">
                  {lang === 'am' ? 'በኮምቦልቻ ልብ ውስጥ' : 'In the Heart of Kombolcha'}
                </p>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                  {lang === 'am' ? 'ትክክለኛው የአረብያን ጣዕም' : 'A Taste of Arabia'}
                </h1>
                <p className="mt-4 text-base sm:text-lg text-sand-200 leading-relaxed max-w-xl">
                  {lang === 'am'
                    ? 'ትኩስ ከመጋገሪያው የሚወጡ ማዕዶች፣ ልዩ የበግ ማንዲ እና ሞቅ ያለ የቤተሰብ መስተንግዶ።'
                    : 'Fresh from the oven dishes, traditional spiced coffee, and a welcoming second-floor room for the whole family.'}
                </p>
              </div>

              {/* Streamlined Action Buttons (2 clear choices, no visual conflict) */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <button
                  onClick={() => onNavigate('/menu')}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-charcoal-900 font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Utensils className="w-5 h-5 text-charcoal-900" />
                  <span>{lang === 'am' ? 'ምናሌውን ይመልከቱ' : 'View Full Menu'}</span>
                </button>

                <a
                  href="tel:+251991589097"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-forest-900/80 hover:bg-forest-800 text-cream-50 font-bold text-sm sm:text-base border border-forest-700/80 backdrop-blur-sm transition-colors shadow-xs"
                >
                  <Phone className="w-5 h-5 text-amber-400" />
                  <span>0991 589 097</span>
                </a>
              </div>

              {/* Minimalist, Restful Key Features (Quiet inline styling, no bulky pills) */}
              <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-sand-300">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{lang === 'am' ? '100% ሃላል' : '100% Halal'}</span>
                </span>
                <span className="text-forest-700 hidden sm:inline">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{lang === 'am' ? 'የቤተሰብ ክፍል' : 'Family Dining'}</span>
                </span>
                <span className="text-forest-700 hidden sm:inline">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{lang === 'am' ? 'የጸሎት ቦታ' : 'Prayer Space'}</span>
                </span>
                <span className="text-forest-700 hidden sm:inline">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{lang === 'am' ? 'ነጻ ፓርኪንግ' : 'Free Parking'}</span>
                </span>
              </div>
            </div>

            {/* Right Column: Sleek, unified signature dish showcase */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Soft ambient back-glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-emerald-500/10 rounded-3xl blur-xl opacity-70"></div>

                {/* Dark-glass card container - blends gracefully into the atmosphere */}
                <div className="relative bg-forest-900/60 backdrop-blur-md rounded-3xl border border-white/10 p-3.5 sm:p-4 shadow-2xl space-y-3.5">
                  {/* Food Photo Frame */}
                  <div className="relative h-72 sm:h-84 rounded-2xl overflow-hidden bg-forest-950">
                    <img
                      src={heroShowcase[activeHeroDish].image}
                      alt={heroShowcase[activeHeroDish].name_am}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />

                    {/* Gradient overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-black/30"></div>

                    {/* Top Tag: Signature Badge & Logo */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-charcoal-900 shadow-md">
                        {lang === 'am' ? heroShowcase[activeHeroDish].badge_am : heroShowcase[activeHeroDish].badge_en}
                      </span>
                      <div className="w-9 h-9 rounded-full bg-forest-950/80 backdrop-blur-xs p-0.5 border border-amber-400/60 shadow-md">
                        <img
                          src="/images/logo.jpg"
                          alt="Hikma Logo"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </div>

                    {/* Bottom Caption directly on the photo */}
                    <div className="absolute bottom-3 inset-x-3 p-3 rounded-xl bg-forest-950/80 backdrop-blur-md border border-white/10 text-cream-50">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold text-base sm:text-lg font-display text-cream-50 leading-tight">
                          {lang === 'am' ? heroShowcase[activeHeroDish].name_am : heroShowcase[activeHeroDish].name_en}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-lg bg-amber-500 text-charcoal-900 font-extrabold text-sm tabular-nums shrink-0 shadow-xs">
                          {heroShowcase[activeHeroDish].price}
                        </span>
                      </div>
                      <p className="text-xs text-sand-200 mt-1 line-clamp-1">
                        {lang === 'am' ? heroShowcase[activeHeroDish].desc_am : heroShowcase[activeHeroDish].desc_en}
                      </p>
                    </div>
                  </div>

                  {/* Clean 3-Dish Switcher Tabs (Simple, peaceful, zero clutter) */}
                  <div className="grid grid-cols-3 gap-2">
                    {heroShowcase.map((dish, idx) => {
                      const isActive = activeHeroDish === idx;
                      const label = idx === 0
                        ? (lang === 'am' ? 'የበግ ማንዲ' : 'Mandi Lamb')
                        : idx === 1
                          ? (lang === 'am' ? 'የተጠበሰ ዶሮ' : 'Roasted Chicken')
                          : (lang === 'am' ? 'ድስ ጥብስ' : 'Pan Tibs');
                      return (
                        <button
                          key={dish.id}
                          onClick={() => setActiveHeroDish(idx)}
                          className={`py-2 px-1.5 rounded-xl text-xs font-bold transition-all text-center ${
                            isActive
                              ? 'bg-amber-500 text-charcoal-900 shadow-md'
                              : 'bg-forest-950/60 text-sand-300 hover:text-cream-50 hover:bg-forest-950 border border-forest-800'
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SIGNATURE DISHES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-forest-900 dark:text-amber-300 border border-amber-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{t('featured.title')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-forest-900 dark:text-cream-50 tracking-tight">
              {t('featured.title')}
            </h2>
            <p className="text-sm sm:text-base text-charcoal-600 dark:text-sand-300 mt-1 max-w-xl">
              {t('featured.subtitle')}
            </p>
          </div>
          <button
            onClick={() => onNavigate('/menu')}
            className="inline-flex items-center gap-2 text-sm font-bold text-forest-800 dark:text-amber-400 hover:text-amber-500 transition-colors group"
          >
            <span>{t('featured.viewFullMenu')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {loadingDishes ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-44 bg-sand-200 dark:bg-forest-900/60 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDishes.slice(0, 6).map(item => (
              <DishCard
                key={item.id}
                item={item}
                onSelect={() => onNavigate('/menu')}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <button
            onClick={() => onNavigate('/menu')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-forest-800 dark:bg-amber-500 hover:bg-forest-700 dark:hover:bg-amber-400 text-cream-50 dark:text-charcoal-900 font-bold text-sm sm:text-base shadow-sm transition-colors"
          >
            <Utensils className="w-4 h-4 text-amber-400 dark:text-charcoal-900" />
            <span>{t('featured.viewFullMenu')}</span>
          </button>
        </div>
      </section>

      {/* 3. LANDMARK NAVIGATION (HOW TO FIND US) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LandmarkSteps />
      </section>

      {/* 4. OUR CRAFT SECTION (OVEN & JEBENA COFFEE) */}
      <section className="bg-sand-100 dark:bg-[#0B1712] py-16 border-y border-sand-300 dark:border-forest-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-2">
              {t('craft.badge')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-forest-900 dark:text-cream-50">
              {lang === 'am' ? 'ትኩስ ከመጋገሪያው እና ከጀበናው' : 'Fresh from Oven & Jebena'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Craft Card 1: Oven */}
            <div className="bg-white dark:bg-[#13221C] rounded-3xl p-8 border border-sand-300 dark:border-forest-800 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6 border border-amber-500/30">
                  <Flame className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold text-forest-900 dark:text-cream-50 mb-3">
                  {t('craft.ovenTitle')}
                </h3>
                <p className="text-charcoal-600 dark:text-cream-100 leading-relaxed text-sm sm:text-base">
                  {t('craft.ovenDesc')}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-sand-200 dark:border-forest-800 flex items-center gap-2 text-xs font-semibold text-forest-800 dark:text-amber-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{lang === 'am' ? 'ትኩስ ዳቦ፣ ዶሮ እና ጥብስ' : 'Hot breads, chicken & grilled tibs'}</span>
              </div>
            </div>

            {/* Craft Card 2: Jebena Coffee */}
            <div className="bg-white dark:bg-[#13221C] rounded-3xl p-8 border border-sand-300 dark:border-forest-800 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-forest-800 dark:bg-amber-500 text-amber-400 dark:text-charcoal-900 flex items-center justify-center mb-6 border border-amber-500/30">
                  <Coffee className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-forest-900 dark:text-cream-50 mb-3">
                  {t('craft.coffeeTitle')}
                </h3>
                <p className="text-charcoal-600 dark:text-cream-100 leading-relaxed text-sm sm:text-base">
                  {t('craft.coffeeDesc')}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-sand-200 dark:border-forest-800 flex items-center gap-2 text-xs font-semibold text-forest-800 dark:text-amber-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{lang === 'am' ? 'የዕጣን መዓዛ እና የአረብ የሄል ሻይ' : 'Frankincense aroma & Cardamom tea'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY HIKMA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-900 dark:text-cream-50">
            {t('why.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#13221C] rounded-2xl p-6 border border-sand-300 dark:border-forest-800 text-center shadow-xs">
            <div className="w-12 h-12 rounded-full bg-forest-800 dark:bg-amber-500 text-amber-400 dark:text-charcoal-900 flex items-center justify-center mx-auto mb-4 shadow-xs">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-forest-900 dark:text-cream-50 mb-2">
              {t('why.reason1Title')}
            </h3>
            <p className="text-sm text-charcoal-600 dark:text-cream-100 leading-relaxed">
              {t('why.reason1Desc')}
            </p>
          </div>

          <div className="bg-white dark:bg-[#13221C] rounded-2xl p-6 border border-sand-300 dark:border-forest-800 text-center shadow-xs">
            <div className="w-12 h-12 rounded-full bg-forest-800 dark:bg-amber-500 text-amber-400 dark:text-charcoal-900 flex items-center justify-center mx-auto mb-4 shadow-xs">
              <Coffee className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-forest-900 dark:text-cream-50 mb-2">
              {t('why.reason2Title')}
            </h3>
            <p className="text-sm text-charcoal-600 dark:text-cream-100 leading-relaxed">
              {t('why.reason2Desc')}
            </p>
          </div>

          <div className="bg-white dark:bg-[#13221C] rounded-2xl p-6 border border-sand-300 dark:border-forest-800 text-center shadow-xs">
            <div className="w-12 h-12 rounded-full bg-forest-800 dark:bg-amber-500 text-amber-400 dark:text-charcoal-900 flex items-center justify-center mx-auto mb-4 shadow-xs">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-forest-900 dark:text-cream-50 mb-2">
              {t('why.reason3Title')}
            </h3>
            <p className="text-sm text-charcoal-600 dark:text-cream-100 leading-relaxed">
              {t('why.reason3Desc')}
            </p>
          </div>
        </div>
      </section>

      {/* 5.1 GUEST REVIEWS & SOCIAL PROOF */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-sand-100/70 dark:bg-[#0E2A20] rounded-3xl p-8 sm:p-12 border border-sand-300 dark:border-forest-800">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-2">
              {lang === 'am' ? 'የእንግዶቻችን አስተያየቶች' : 'Customer Reviews'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-900 dark:text-cream-50">
              {lang === 'am' ? 'ደንበኞቻችን ስለ ሒክማ ምን ይላሉ?' : 'What Diners Say About Hikma'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#13221C] rounded-2xl p-6 border border-sand-200 dark:border-forest-800 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex text-amber-500 gap-1 text-sm">
                  {'★'.repeat(5)}
                </div>
                <p className="text-sm text-charcoal-700 dark:text-cream-100 leading-relaxed italic">
                  {lang === 'am'
                    ? '«በኮምቦልቻ ውስጥ እንዲህ አይነት ጥራት ያለው የበግ ማንዲ እና ክሪስፒ ዶሮ ማግኘት አስደሳች ነው። ቤተሰባችን በጣም ነው የወደደው!»'
                    : '"Finding such high quality Mandi lamb and crispy roasted chicken in Kombolcha is wonderful. Our whole family loved the dining experience!"'}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-sand-200 dark:border-forest-800 flex items-center justify-between text-xs font-semibold text-forest-800 dark:text-amber-400">
                <span className="dark:text-cream-50 font-bold">አህመድ ሙሀመድ</span>
                <span className="text-charcoal-500 dark:text-sand-300">ኮምቦልቻ</span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#13221C] rounded-2xl p-6 border border-sand-200 dark:border-forest-800 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex text-amber-500 gap-1 text-sm">
                  {'★'.repeat(5)}
                </div>
                <p className="text-sm text-charcoal-700 dark:text-cream-100 leading-relaxed italic">
                  {lang === 'am'
                    ? '«ከደሴ ወደ አዲስ አበባ ስንጓዝ ምሳ ለመብላት አቡቁተ ህንፃ 2ኛ ፎቅ ጎራ አልን። ንጽህናቸው፣ ትኩስ ዳቦ እና ፈጣን መስተንግዷቸው ልዩ ነው።»'
                    : '"Stopped by for lunch while traveling between Dessie and Addis Ababa. The cleanliness, hot oven bread, and prompt service were remarkable."'}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-sand-200 dark:border-forest-800 flex items-center justify-between text-xs font-semibold text-forest-800 dark:text-amber-400">
                <span className="dark:text-cream-50 font-bold">ሰለሞን ተጓዥ</span>
                <span className="text-charcoal-500 dark:text-sand-300">የደሴ-አዲስ መስመር</span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#13221C] rounded-2xl p-6 border border-sand-200 dark:border-forest-800 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex text-amber-500 gap-1 text-sm">
                  {'★'.repeat(5)}
                </div>
                <p className="text-sm text-charcoal-700 dark:text-cream-100 leading-relaxed italic">
                  {lang === 'am'
                    ? '«የቤተሰብ ክፍሉ ጸጥታ ያለውና ለልጆች የተመቻቸ ነው። ባህላዊ ጀበና ቡናቸውና ከስተመር ጣፋጫቸው በጣም ተመችቶናል።»'
                    : '"The family section is peaceful and comfortable with kids. Their traditional jebena coffee and custard dessert bowl are fantastic."'}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-sand-200 dark:border-forest-800 flex items-center justify-between text-xs font-semibold text-forest-800 dark:text-amber-400">
                <span className="dark:text-cream-50 font-bold">ፋጡማ ኤም.</span>
                <span className="text-charcoal-500 dark:text-sand-300">ኮምቦልቻ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BAND */}
      <section className="bg-forest-900 text-cream-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-block px-3 py-1 bg-forest-800 text-amber-400 border border-forest-700 rounded-full text-xs font-semibold">
            {lang === 'am' ? 'ሒክማ አረብያን ሬስቶራንት' : 'Hikma Arabian Restaurant'}
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display">
            {lang === 'am' ? 'ይመጡ፣ በክብር ይቀመጡ!' : 'Come and Enjoy Real Hospitality!'}
          </h2>
          <p className="text-sand-200 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {t('reserve.subtitle')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('/reserve')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-cream-50 font-bold text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{t('nav.reserve')}</span>
            </button>

            <a
              href="tel:+251991589097"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-forest-800 hover:bg-forest-700 text-cream-50 border border-forest-700 font-bold text-base transition-colors"
            >
              <Phone className="w-5 h-5 text-amber-400" />
              <span>0991 589 097</span>
            </a>
          </div>
        </div>
      </section>

      {/* 7. TIKTOK & SOCIAL PROOF STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-sand-200/60 dark:bg-[#13221C] rounded-3xl p-6 sm:p-8 border border-sand-300 dark:border-forest-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
              @hikmaarebiyanrestaurant
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-forest-900 dark:text-cream-50">
              {lang === 'am' ? 'በ TikTok ገጻችን ላይ ይከታተሉን' : 'Follow Us on TikTok'}
            </h3>
            <p className="text-sm text-charcoal-600 dark:text-cream-100">
              {lang === 'am'
                ? 'ከ 5,700+ ተከታዮች ጋር በኮምቦልቻ ሞቅ ያለውን የአረብ ጣዕም ይመልከቱ'
                : 'Over 5,700 followers enjoying our culinary videos in Kombolcha'}
            </p>
          </div>
          <a
            href="https://www.tiktok.com/@hikmaarebiyanrestaurant"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest-800 hover:bg-forest-700 text-cream-50 font-bold text-sm transition-colors shadow-sm shrink-0"
          >
            <span>{lang === 'am' ? 'TikTok ክፈት' : 'Open TikTok'}</span>
            <ExternalLink className="w-4 h-4 text-amber-400" />
          </a>
        </div>
      </section>
    </div>
  );
}
