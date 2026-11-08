import React from 'react';
import { Landmark, Building2, Footprints, Navigation, Phone, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LandmarkSteps({ className = '' }) {
  const { lang, t } = useLanguage();

  const steps = [
    {
      num: t('landmarks.step1Num'),
      icon: Landmark,
      title: t('landmarks.step1Title'),
      desc: t('landmarks.step1Desc'),
      highlight: lang === 'am' ? 'አዋሽ ባንክ' : 'Awash Bank',
    },
    {
      num: t('landmarks.step2Num'),
      icon: Building2,
      title: t('landmarks.step2Title'),
      desc: t('landmarks.step2Desc'),
      highlight: lang === 'am' ? 'አቡቁተ ህንፃ (ፀደይ ባንክ)' : 'Abkute Building (Tsedey Bank)',
    },
    {
      num: t('landmarks.step3Num'),
      icon: Footprints,
      title: t('landmarks.step3Title'),
      desc: t('landmarks.step3Desc'),
      highlight: lang === 'am' ? '2ኛ ፎቅ' : '2nd Floor',
    },
  ];

  return (
    <div className={`bg-sand-200/50 dark:bg-[#13221C] rounded-2xl p-6 sm:p-8 border border-sand-300 dark:border-forest-800 ${className}`}>
      <div className="mb-6">
        <div className="inline-block px-3 py-1 bg-amber-500/20 text-forest-900 dark:text-amber-300 border border-amber-500/30 rounded-full text-xs font-semibold mb-2">
          {lang === 'am' ? 'የመድረሻ መመሪያ' : 'Navigation Guide'}
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-forest-900 dark:text-cream-50">
          {t('landmarks.title')}
        </h3>
        <p className="text-sm text-charcoal-600 dark:text-sand-300 mt-1">
          {t('landmarks.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="bg-cream-50 dark:bg-[#182E25] rounded-xl p-5 border border-sand-300/80 dark:border-forest-700/80 shadow-sm flex flex-col justify-between relative hover:border-forest-700 dark:hover:border-amber-500/50 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-full bg-forest-800 dark:bg-amber-500 text-amber-400 dark:text-charcoal-900 flex items-center justify-center font-bold text-lg shadow-xs">
                    {step.num}
                  </div>
                  <Icon className="w-6 h-6 text-forest-700 dark:text-amber-400" />
                </div>
                <h4 className="font-bold text-forest-900 dark:text-cream-50 text-base mb-1">
                  {step.title}
                </h4>
                <p className="text-sm text-charcoal-600 dark:text-cream-100 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-sand-200 dark:border-forest-800 text-xs font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span>{step.highlight}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="mt-6 pt-6 border-t border-sand-300 dark:border-forest-800 flex flex-wrap gap-3 items-center justify-between">
        <div className="text-sm font-medium text-charcoal-600 dark:text-cream-100">
          📍 {t('quickInfo.addressDesc')}
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <a
            href="https://www.google.com/maps/place/HIKMA+ARABIAN+RESTAURANT/@11.0866268,39.7382889,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-forest-800 dark:bg-amber-500 hover:bg-forest-700 dark:hover:bg-amber-400 text-cream-50 dark:text-charcoal-900 text-sm font-semibold shadow-sm transition-colors"
          >
            <Navigation className="w-4 h-4 text-amber-400 dark:text-charcoal-900" />
            <span>{t('landmarks.openInMaps')}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="tel:+251991589097"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-forest-800 dark:border-forest-700 text-forest-800 dark:text-sand-200 hover:bg-sand-200 dark:hover:bg-forest-800 text-sm font-semibold transition-colors"
          >
            <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{t('landmarks.callNow')}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
