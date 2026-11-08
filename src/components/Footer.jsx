import React from 'react';
import { Phone, MapPin, Clock, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer({ onNavigate }) {
  const { lang, t } = useLanguage();

  return (
    <footer className="bg-forest-900 text-cream-50 pt-12 pb-24 md:pb-12 border-t border-forest-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo.jpg"
                alt="Hikma Logo"
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/50 shadow-md bg-white p-0.5"
              />
              <div>
                <span className="font-bold text-lg text-cream-50 block leading-tight">
                  {lang === 'am' ? 'ሒክማ አረብያን ሬስቶራንት' : 'Hikma Arabian Restaurant'}
                </span>
                <span className="text-xs text-amber-400 font-medium">
                  {lang === 'am' ? 'ኮምቦልቻ' : 'Kombolcha'}
                </span>
              </div>
            </div>
            <p className="text-sm text-sand-300 leading-relaxed mb-4">
              {t('footer.aboutText')}
            </p>
            <div className="inline-block px-3 py-1 bg-forest-800 text-amber-400 border border-forest-700 rounded-full text-xs font-semibold">
              📍 {t('footer.floorNote')}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-bold text-amber-400 text-sm uppercase tracking-wider mb-4">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="text-sand-300 hover:text-cream-50 transition-colors"
                >
                  {t('nav.home')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/menu')}
                  className="text-sand-300 hover:text-cream-50 transition-colors"
                >
                  {t('nav.menu')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/visit')}
                  className="text-sand-300 hover:text-cream-50 transition-colors"
                >
                  {t('nav.visit')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="text-sand-300 hover:text-cream-50 transition-colors"
                >
                  {t('nav.about')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/gallery')}
                  className="text-sand-300 hover:text-cream-50 transition-colors"
                >
                  {t('nav.gallery')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/reserve')}
                  className="text-sand-300 hover:text-cream-50 transition-colors"
                >
                  {t('nav.reserve')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Hours */}
          <div>
            <h4 className="font-bold text-amber-400 text-sm uppercase tracking-wider mb-4">
              {t('footer.contactUs')}
            </h4>
            <ul className="space-y-3 text-sm text-sand-300">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                <div>
                  <a
                    href="tel:+251991589097"
                    className="hover:text-cream-50 transition-colors font-medium text-cream-50 block"
                  >
                    0991 589 097
                  </a>
                  <span className="text-xs text-sand-300">
                    {lang === 'am' ? 'ጥሪ እና WhatsApp' : 'Phone & WhatsApp'}
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                <span>
                  {t('quickInfo.addressDesc')}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                <span>
                  {t('quickInfo.hoursDesc')}
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Social / TikTok */}
          <div>
            <h4 className="font-bold text-amber-400 text-sm uppercase tracking-wider mb-4">
              {t('footer.socialMedia')}
            </h4>
            <p className="text-sm text-sand-300 mb-4">
              {lang === 'am'
                ? 'በ TikTok ገጻችን ላይ አዳዲስ ቪዲዮዎችንና የምግብ ዝግጅቶችን ይመልከቱ።'
                : 'Follow our official TikTok for latest videos, specials, and events.'}
            </p>
            <a
              href="https://www.tiktok.com/@hikmaarebiyanrestaurant"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-forest-800 hover:bg-forest-700 text-cream-50 border border-forest-700 text-sm font-semibold transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-amber-400" />
              <span>@hikmaarebiyanrestaurant</span>
            </a>
            <div className="mt-4">
              <button
                onClick={() => onNavigate('/admin')}
                className="text-xs text-sand-200 hover:text-amber-400 transition-colors"
              >
                ⚙️ {t('nav.admin')} (SQLite DB)
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-forest-800 flex flex-col sm:flex-row items-center justify-between text-xs text-sand-300 gap-4">
          <p>
            © {new Date().getFullYear()} {lang === 'am' ? 'ሒክማ አረብያን ሬስቶራንት' : 'Hikma Arabian Restaurant'}. {t('footer.allRightsReserved')}
          </p>
          <p className="text-center sm:text-right">
            መሀል ኮምቦልቻ · አቡቁተ ህንፃ 2ኛ ፎቅ (ፀደይ ባንክ ያለበት)
          </p>
        </div>
      </div>
    </footer>
  );
}
