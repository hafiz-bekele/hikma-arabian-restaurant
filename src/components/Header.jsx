import React, { useState, useEffect } from 'react';
import { Phone, Menu as MenuIcon, X, MapPin, Globe, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function Header({ currentPath = '/', onNavigate }) {
  const { lang, setLang, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme, isDark } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: t('nav.home'), path: '/' },
    { id: 'menu', label: t('nav.menu'), path: '/menu' },
    { id: 'visit', label: t('nav.visit'), path: '/visit' },
    { id: 'about', label: t('nav.about'), path: '/about' },
    { id: 'gallery', label: t('nav.gallery'), path: '/gallery' },
    { id: 'reserve', label: t('nav.reserve'), path: '/reserve' },
  ];

  const handleNavClick = (path) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-cream-50/95 dark:bg-[#0B1712]/95 backdrop-blur-md shadow-sm border-b border-sand-300/80 dark:border-forest-800/80 py-3'
            : 'bg-cream-50 dark:bg-[#0B1712] py-4 border-b border-sand-200 dark:border-forest-800/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Lockup */}
            <button
              onClick={() => handleNavClick('/')}
              className="flex items-center gap-3 text-left focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg p-1 group"
            >
              <img
                src="/images/logo.jpg"
                alt="Hikma Arabian Restaurant Logo"
                className="w-11 h-11 rounded-full object-cover shadow-sm border border-amber-500/50 group-hover:scale-105 transition-transform"
              />
              <div>
                <span className="block font-bold text-lg sm:text-xl text-forest-900 dark:text-cream-50 leading-tight">
                  {lang === 'am' ? 'ሒክማ አረብያን' : 'Hikma Arabian'}
                </span>
                <span className="block text-xs font-medium text-amber-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 inline" />
                  {lang === 'am' ? 'ኮምቦልቻ · 2ኛ ፎቅ' : 'Kombolcha · 2nd Floor'}
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.path)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-forest-800 dark:bg-forest-700 text-cream-50 dark:text-amber-300 shadow-sm'
                        : 'text-charcoal-900 dark:text-sand-200 hover:text-forest-800 dark:hover:text-amber-400 hover:bg-sand-200/60 dark:hover:bg-forest-800/60'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Language Switcher + Dark Mode Toggle + Call CTA */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-full bg-sand-200 dark:bg-forest-800 text-charcoal-900 dark:text-amber-400 hover:bg-sand-300 dark:hover:bg-forest-700 transition-colors border border-sand-300 dark:border-forest-700 shadow-xs"
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold bg-sand-200 dark:bg-forest-800 hover:bg-sand-300 dark:hover:bg-forest-700 text-charcoal-900 dark:text-sand-200 transition-colors border border-sand-300 dark:border-forest-700"
                title="Switch Language"
                aria-label="Switch Language"
              >
                <Globe className="w-3.5 h-3.5 text-forest-800 dark:text-amber-400" />
                <span>{lang === 'am' ? 'EN' : 'አማ'}</span>
              </button>

              {/* Call CTA Desktop */}
              <a
                href="tel:+251991589097"
                className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest-800 dark:bg-amber-500 hover:bg-forest-700 dark:hover:bg-amber-400 text-cream-50 dark:text-charcoal-900 text-sm font-semibold shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4 text-amber-400 dark:text-charcoal-900" />
                <span>0991 589 097</span>
              </a>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-forest-900 dark:text-cream-50 hover:bg-sand-200 dark:hover:bg-forest-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="fixed top-0 right-0 w-3/4 max-w-xs h-full bg-cream-50 dark:bg-[#0E2A20] text-charcoal-900 dark:text-cream-50 shadow-2xl p-6 flex flex-col justify-between border-l border-sand-300 dark:border-forest-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-sand-300 dark:border-forest-700 mb-6">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/images/logo.jpg"
                    alt="Hikma Logo"
                    className="w-10 h-10 rounded-full object-cover border border-amber-500/50 shadow-sm"
                  />
                  <span className="font-bold text-forest-900 dark:text-cream-50 text-lg">
                    {lang === 'am' ? 'ሒክማ አረብያን' : 'Hikma Arabian'}
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-charcoal-600 dark:text-cream-50 hover:bg-sand-200 dark:hover:bg-forest-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = currentPath === link.path;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.path)}
                      className={`w-full text-left px-4 py-3 rounded-xl font-medium text-base transition-colors ${
                        isActive
                          ? 'bg-forest-800 dark:bg-forest-700 text-cream-50 dark:text-amber-300 font-bold'
                          : 'text-charcoal-900 dark:text-cream-100 hover:bg-sand-200 dark:hover:bg-forest-800'
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}
                <button
                  onClick={() => handleNavClick('/admin')}
                  className="w-full text-left px-4 py-3 rounded-xl font-medium text-sm text-charcoal-600 dark:text-cream-100 hover:bg-sand-200 dark:hover:bg-forest-800 border-t border-sand-200 dark:border-forest-700 mt-2"
                >
                  ⚙️ {t('nav.admin')}
                </button>
              </nav>
            </div>

            <div className="pt-6 border-t border-sand-300 dark:border-forest-700 flex flex-col gap-3">
              <div className="flex items-center justify-between px-2 py-1">
                <span className="text-xs text-charcoal-600 dark:text-cream-200">Theme</span>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sand-200 dark:bg-forest-800 text-xs font-semibold text-charcoal-900 dark:text-amber-400"
                >
                  {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                  <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
              <a
                href="tel:+251991589097"
                className="w-full py-3 px-4 rounded-xl bg-forest-800 dark:bg-amber-500 text-cream-50 dark:text-charcoal-900 flex items-center justify-center gap-2 font-semibold shadow-sm"
              >
                <Phone className="w-4 h-4 text-amber-400 dark:text-charcoal-900" />
                <span>0991 589 097</span>
              </a>
              <p className="text-xs text-charcoal-600 dark:text-cream-200 text-center">
                አቡቁተ ህንፃ 2ኛ ፎቅ · መሀል ኮምቦልቻ
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
