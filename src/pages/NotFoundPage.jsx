import React from 'react';
import { Home, Utensils, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function NotFoundPage({ onNavigate }) {
  const { lang } = useLanguage();

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center space-y-8">
      <div className="w-20 h-20 rounded-full bg-forest-800 dark:bg-forest-700 text-amber-400 flex items-center justify-center font-bold text-3xl mx-auto shadow-md border border-amber-500/30">
        404
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-forest-900 dark:text-cream-50">
          {lang === 'am' ? 'ይህ ገፅ አልተገኘም' : 'Page Not Found'}
        </h1>
        <p className="text-sm sm:text-base text-charcoal-600 dark:text-sand-300 max-w-md mx-auto">
          {lang === 'am'
            ? 'የፈለጉት ገፅ ተንቀሳቅሶ ወይም ተሰርዞ ሊሆን ይችላል። ወደ ዋና ገፅ ወይም ወደ ምናሌ ይመለሱ።'
            : 'The page you are looking for may have been moved or does not exist. Please return to the homepage or explore our menu.'}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest-800 dark:bg-amber-500 hover:bg-forest-700 dark:hover:bg-amber-400 text-cream-50 dark:text-charcoal-900 font-bold text-sm shadow-sm transition-colors"
        >
          <Home className="w-4 h-4 text-amber-400 dark:text-charcoal-900" />
          <span>{lang === 'am' ? 'ዋና ገፅ' : 'Home'}</span>
        </button>

        <button
          onClick={() => onNavigate('/menu')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-forest-800 dark:border-forest-600 text-forest-800 dark:text-cream-100 hover:bg-sand-200 dark:hover:bg-forest-800 font-bold text-sm transition-colors"
        >
          <Utensils className="w-4 h-4" />
          <span>{lang === 'am' ? 'ምናሌ' : 'Menu'}</span>
        </button>

        <a
          href="tel:+251991589097"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-800 hover:bg-emerald-700 text-cream-50 font-bold text-sm transition-colors"
        >
          <Phone className="w-4 h-4 text-emerald-300" />
          <span>0991 589 097</span>
        </a>
      </div>
    </div>
  );
}
