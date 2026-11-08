import React from 'react';
import { CheckCircle2, Users, Sparkles, Car, Wifi } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function TrustBadges() {
  const { lang, t } = useLanguage();

  const badges = [
    { id: 'halal', icon: CheckCircle2, label: t('trust.halal') },
    { id: 'family', icon: Users, label: t('trust.family') },
    { id: 'prayer', icon: Sparkles, label: t('trust.prayer') },
    { id: 'parking', icon: Car, label: t('trust.parking') },
    { id: 'wifi', icon: Wifi, label: t('trust.wifi') },
  ];

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2">
      <div className="flex items-center gap-2 sm:gap-3 min-w-max">
        {/* Signature ከምቦልቻ badge */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500 text-charcoal-900 shadow-sm border border-amber-600/20">
          📍 {t('city')}
        </span>

        {badges.map((badge) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.id}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-sand-200/90 dark:bg-forest-900/90 text-forest-900 dark:text-sand-200 border border-sand-300 dark:border-forest-700 shadow-xs"
            >
              <Icon className="w-3.5 h-3.5 text-forest-700 dark:text-amber-400" />
              <span>{badge.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
