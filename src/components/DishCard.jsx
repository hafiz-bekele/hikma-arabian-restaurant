import React from 'react';
import { Flame, Sparkles, Check, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function DishCard({ item, onSelect }) {
  const { lang, t } = useLanguage();

  const name = lang === 'am' ? item.name_am : (item.name_en || item.name_am);
  const secondaryName = lang === 'am' ? item.name_en : item.name_am;
  const description = lang === 'am' ? item.description_am : (item.description_en || item.description_am);
  const currency = lang === 'am' ? 'ብር' : 'Br.';

  return (
    <div
      onClick={onSelect ? () => onSelect(item) : undefined}
      className={`bg-white dark:bg-[#13221C] rounded-2xl border border-sand-300/80 dark:border-forest-800 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group overflow-hidden ${
        onSelect ? 'cursor-pointer hover:border-amber-500/80 dark:hover:border-amber-500/60' : ''
      }`}
    >
      <div>
        {/* Dish Image if available */}
        {item.image && (
          <div className="mb-3.5 -mx-4 -mt-4 sm:-mx-5 sm:-mt-5 h-44 overflow-hidden bg-forest-900/10 dark:bg-forest-950/40 relative">
            <img
              src={item.image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            {item.is_featured && (
              <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-forest-900/90 backdrop-blur-xs text-amber-400 font-bold text-xs border border-amber-500/40 shadow-sm">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{t('menu.popular')}</span>
              </span>
            )}
          </div>
        )}

        {/* Header: Title and Price */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h4 className="font-bold text-forest-900 dark:text-cream-50 text-lg group-hover:text-forest-700 dark:group-hover:text-amber-400 transition-colors leading-snug">
              {name}
            </h4>
            {secondaryName && secondaryName !== name && (
              <span className="text-xs text-charcoal-600 dark:text-sand-200 block mt-0.5">
                {secondaryName}
              </span>
            )}
          </div>
          <div className="text-right shrink-0">
            <span className="inline-block px-3 py-1 bg-sand-200 dark:bg-forest-800 text-forest-900 dark:text-amber-300 font-bold rounded-lg text-base tabular-nums border border-sand-300 dark:border-forest-700">
              {item.price.toLocaleString()} {currency}
            </span>
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-charcoal-600 dark:text-cream-100 line-clamp-2 mt-1 mb-3 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Tags and Availability */}
      <div className="flex items-center justify-between pt-3 border-t border-sand-200/60 dark:border-forest-800 mt-2 text-xs">
        <div className="flex flex-wrap gap-1.5">
          {item.is_featured && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-900 dark:text-amber-300 font-semibold border border-amber-500/30">
              <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
              <span>{t('menu.popular')}</span>
            </span>
          )}
          {item.tags && item.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md bg-sand-100 dark:bg-[#182E25] text-charcoal-700 dark:text-sand-200 font-medium border border-sand-300 dark:border-forest-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <div>
          {item.is_available ? (
            <span className="text-emerald-700 dark:text-emerald-400 font-medium inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              {t('menu.available')}
            </span>
          ) : (
            <span className="text-rose-600 dark:text-rose-400 font-medium">
              {t('menu.unavailable')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
