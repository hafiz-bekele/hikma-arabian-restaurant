import React from 'react';
import { Clock, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function HoursTable({ className = '' }) {
  const { lang, t } = useLanguage();

  // Current day index in Addis Ababa (0 is Sunday, 1 is Monday, ...)
  const now = new Date();
  const currentDayIndex = now.getDay();

  const daysAm = ['እሁድ', 'ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሐሙስ', 'አርብ', 'ቅዳሜ'];
  const daysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const schedule = daysAm.map((dayAm, idx) => ({
    dayAm,
    dayEn: daysEn[idx],
    hours: '08:00 – 22:00',
    isToday: idx === currentDayIndex,
  }));

  return (
    <div className={`bg-cream-50 dark:bg-[#13221C] rounded-2xl border border-sand-300 dark:border-forest-800 p-6 shadow-sm ${className}`}>
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-sand-300 dark:border-forest-800">
        <Clock className="w-5 h-5 text-forest-800 dark:text-amber-400" />
        <h3 className="font-bold text-lg text-forest-900 dark:text-cream-50">
          {lang === 'am' ? 'የሳምንቱ የስራ ሰዓታት' : 'Weekly Opening Hours'}
        </h3>
      </div>

      <div className="space-y-2 text-sm">
        {schedule.map((row, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-between py-2 px-3 rounded-lg transition-colors ${
              row.isToday
                ? 'bg-amber-500/15 dark:bg-amber-500/20 border border-amber-500/40 font-bold text-forest-900 dark:text-amber-300'
                : 'text-charcoal-700 dark:text-cream-100 font-medium hover:bg-sand-200/50 dark:hover:bg-forest-900/60'
            }`}
          >
            <div className="flex items-center gap-2">
              {row.isToday && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              )}
              <span>{lang === 'am' ? row.dayAm : row.dayEn}</span>
              {row.isToday && (
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500 text-charcoal-900 font-bold ml-1">
                  {lang === 'am' ? 'ዛሬ' : 'Today'}
                </span>
              )}
            </div>
            <div className="font-mono tabular-nums text-forest-900 dark:text-cream-50 font-bold">
              {row.hours}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-sand-200 dark:border-forest-800 text-xs text-charcoal-600 dark:text-cream-200 flex items-center justify-between">
        <span>🕒 Africa/Addis_Ababa (EAT, UTC+3)</span>
        <span className="text-emerald-700 dark:text-emerald-400 font-medium">
          {lang === 'am' ? 'በየቀኑ ክፍት ነው' : 'Open 7 Days a Week'}
        </span>
      </div>
    </div>
  );
}
