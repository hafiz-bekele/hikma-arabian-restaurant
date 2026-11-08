import React, { useState, useEffect } from 'react';
import { Search, Utensils, Sparkles, Filter, Phone, MessageCircle, Printer, X, Plus, Minus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import DishCard from '../components/DishCard';
import StatusPill from '../components/StatusPill';

export default function MenuPage({ onNavigate }) {
  const { lang, t } = useLanguage();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDish, setSelectedDish] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch('/api/menu/full')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCategories(data.data);
        }
      })
      .catch(err => console.error('Error loading menu:', err))
      .finally(() => setLoading(false));
  }, []);

  // Filter items
  const allItems = categories.flatMap(cat => cat.items || []);
  const filteredItems = (selectedCategory === 'all'
    ? allItems
    : allItems.filter(item => item.category_slug === selectedCategory)
  ).filter(item => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const nameAm = (item.name_am || '').toLowerCase();
    const nameEn = (item.name_en || '').toLowerCase();
    const descAm = (item.description_am || '').toLowerCase();
    const descEn = (item.description_en || '').toLowerCase();
    return nameAm.includes(q) || nameEn.includes(q) || descAm.includes(q) || descEn.includes(q);
  });

  const handleOrderWhatsApp = () => {
    if (!selectedDish) return;
    const dishName = lang === 'am' ? selectedDish.name_am : (selectedDish.name_en || selectedDish.name_am);
    const totalPrice = (selectedDish.price * quantity).toLocaleString();
    const msg = `ሰላም! ${quantity}x ${dishName} (${totalPrice} ብር) ከሒክማ አረብያን ሬስቶራንት ማዘዝ እፈልጋለሁ።`;
    window.open(`https://wa.me/251991589097?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 print:p-0">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="flex items-center justify-center gap-2 mb-2 print:hidden">
          <StatusPill />
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-sand-300 dark:border-forest-700 text-forest-900 dark:text-cream-100 bg-sand-100 dark:bg-[#13221C] hover:bg-sand-200 dark:hover:bg-forest-800 text-xs font-semibold shadow-xs transition-colors"
            title="Print Paper Menu"
          >
            <Printer className="w-3.5 h-3.5 text-amber-500" />
            <span>{lang === 'am' ? 'ምናሌ አትም' : 'Print Menu'}</span>
          </button>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-forest-900 dark:text-cream-50 tracking-tight">
          {t('menu.title')}
        </h1>
        <p className="text-sm sm:text-base text-charcoal-600 dark:text-cream-100">
          {t('menu.subtitle')}
        </p>
      </div>

      {/* Search and Category Filter Toolbar (Hidden on print) */}
      <div className="space-y-4 print:hidden">
        {/* Search Input */}
        <div className="max-w-md mx-auto relative">
          <Search className="w-5 h-5 text-charcoal-600 dark:text-sand-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('menu.searchPlaceholder')}
            className="w-full pl-11 pr-4 py-3 rounded-full bg-white dark:bg-[#13221C] border border-sand-300 dark:border-forest-700 text-charcoal-900 dark:text-cream-50 placeholder:text-charcoal-400 dark:placeholder:text-sand-400 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-charcoal-600 dark:text-sand-300 hover:text-forest-900 dark:hover:text-cream-50 bg-sand-200 dark:bg-forest-800 px-2 py-0.5 rounded-full"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Chips Bar (Sticky) */}
        <div className="sticky top-20 z-30 bg-cream-50/95 dark:bg-[#0B1712]/95 backdrop-blur-md py-3 -mx-4 px-4 sm:mx-0 sm:px-0 border-y border-sand-300/80 dark:border-forest-800/80">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-forest-800 dark:bg-amber-500 text-cream-50 dark:text-charcoal-900 shadow-sm'
                  : 'bg-sand-200 dark:bg-[#182E25] text-charcoal-900 dark:text-cream-100 hover:bg-sand-300 dark:hover:bg-forest-800'
              }`}
            >
              {t('menu.all')} ({allItems.length})
            </button>

            {categories.map((cat) => {
              const count = cat.items ? cat.items.length : 0;
              const isSelected = selectedCategory === cat.slug;
              const catName = lang === 'am' ? cat.name_am : cat.name_en;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-forest-800 dark:bg-amber-500 text-cream-50 dark:text-charcoal-900 shadow-sm'
                      : 'bg-sand-200 dark:bg-[#182E25] text-charcoal-900 dark:text-cream-100 hover:bg-sand-300 dark:hover:bg-forest-800'
                  }`}
                >
                  <span>{catName}</span>
                  <span className={`text-xs px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? 'bg-forest-700 dark:bg-amber-600 text-amber-300 dark:text-charcoal-950'
                      : 'bg-sand-300 dark:bg-forest-800 text-charcoal-600 dark:text-sand-300'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Menu Items Grid or Grouped Display */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} className="h-44 bg-sand-200 dark:bg-forest-900/60 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#13221C] rounded-2xl border border-sand-300 dark:border-forest-800 p-8">
          <Utensils className="w-12 h-12 text-sand-300 dark:text-forest-700 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-forest-900 dark:text-cream-50">ምንም ምግብ አልተገኘም (No dishes found)</h3>
          <p className="text-sm text-charcoal-600 dark:text-cream-100 mt-1">የፍለጋ ቃሉን ወይም የተመረጠውን ምድብ ይቀይሩ።</p>
        </div>
      ) : selectedCategory === 'all' && !searchQuery.trim() ? (
        // Render grouped by Category
        <div className="space-y-12">
          {categories.map((cat) => {
            const catItems = cat.items || [];
            if (catItems.length === 0) return null;
            return (
              <div key={cat.id} id={cat.slug} className="space-y-4 scroll-mt-36">
                <div className="flex items-center justify-between border-b border-sand-300 dark:border-forest-800 pb-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-forest-900 dark:text-cream-50 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span>{lang === 'am' ? cat.name_am : cat.name_en}</span>
                  </h2>
                  <span className="text-xs font-semibold text-charcoal-700 dark:text-sand-100 bg-sand-200 dark:bg-[#182E25] px-2.5 py-1 rounded-full">
                    {catItems.length} {lang === 'am' ? 'ምግቦች' : 'items'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {catItems.map((item) => (
                    <DishCard
                      key={item.id}
                      item={item}
                      onSelect={(dish) => {
                        setSelectedDish(dish);
                        setQuantity(1);
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Render filtered flat grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => (
            <DishCard
              key={item.id}
              item={item}
              onSelect={(dish) => {
                setSelectedDish(dish);
                setQuantity(1);
              }}
            />
          ))}
        </div>
      )}

      {/* Allergy and Customer Support Note (Hidden on print) */}
      <div className="bg-sand-100 dark:bg-[#13221C] rounded-2xl p-6 border border-sand-300 dark:border-forest-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left print:hidden">
        <div>
          <p className="text-sm font-semibold text-forest-900 dark:text-cream-50">
            ℹ️ {t('menu.allergyNote')}
          </p>
          <p className="text-xs text-charcoal-600 dark:text-cream-100 mt-0.5">
            ለቡድን ወይም ለክብረ በዓል ልዩ የዝግጅት ትዕዛዝ ካለዎት በደስታ እናዘጋጃለን።
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('/reserve')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-cream-50 text-sm font-bold shadow-sm transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t('nav.reserve')}</span>
          </button>
          <a
            href="tel:+251991589097"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-forest-800 dark:bg-amber-500 hover:bg-forest-700 dark:hover:bg-amber-400 text-cream-50 dark:text-charcoal-900 text-sm font-bold transition-colors"
          >
            <Phone className="w-4 h-4 text-amber-400 dark:text-charcoal-900" />
            <span>0991 589 097</span>
          </a>
        </div>
      </div>

      {/* INTERACTIVE DISH ORDER MODAL */}
      {selectedDish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200 print:hidden">
          <div
            className="relative w-full max-w-lg bg-white dark:bg-[#13221C] rounded-3xl border border-sand-300 dark:border-forest-700 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedDish(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Dish Photo if available */}
            {selectedDish.image && (
              <div className="relative h-56 sm:h-64 bg-forest-950 overflow-hidden">
                <img
                  src={selectedDish.image}
                  alt={selectedDish.name_am}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                {selectedDish.is_featured && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-charcoal-900 shadow-md">
                    ★ {t('menu.popular')}
                  </span>
                )}
              </div>
            )}

            {/* Modal Content */}
            <div className="p-6 space-y-5">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-bold font-display text-forest-900 dark:text-cream-50">
                    {lang === 'am' ? selectedDish.name_am : (selectedDish.name_en || selectedDish.name_am)}
                  </h3>
                  <span className="px-3.5 py-1 rounded-xl bg-amber-500 text-charcoal-900 font-extrabold text-lg tabular-nums shrink-0 shadow-xs">
                    {(selectedDish.price * quantity).toLocaleString()} {lang === 'am' ? 'ብር' : 'ETB'}
                  </span>
                </div>
                {selectedDish.name_en && (
                  <p className="text-xs text-charcoal-600 dark:text-sand-300 mt-0.5">
                    {selectedDish.name_en}
                  </p>
                )}
              </div>

              {selectedDish.description_am && (
                <p className="text-sm text-charcoal-700 dark:text-cream-100 leading-relaxed">
                  {lang === 'am' ? selectedDish.description_am : (selectedDish.description_en || selectedDish.description_am)}
                </p>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center justify-between pt-3 border-t border-sand-200 dark:border-forest-800">
                <span className="text-sm font-semibold text-forest-900 dark:text-cream-50">
                  {lang === 'am' ? 'ብዛት' : 'Quantity'}:
                </span>
                <div className="flex items-center gap-3 bg-sand-200 dark:bg-forest-900/90 rounded-full px-3 py-1.5 border border-sand-300 dark:border-forest-700">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-full bg-white dark:bg-forest-800 text-forest-900 dark:text-cream-50 flex items-center justify-center font-bold hover:bg-amber-500 hover:text-charcoal-900 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-base font-bold text-forest-900 dark:text-cream-50 w-6 text-center tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded-full bg-white dark:bg-forest-800 text-forest-900 dark:text-cream-50 flex items-center justify-center font-bold hover:bg-amber-500 hover:text-charcoal-900 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Order Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleOrderWhatsApp}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2 shadow-md transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{lang === 'am' ? 'በ WhatsApp እዘዙ' : 'Order via WhatsApp'}</span>
                </button>
                <a
                  href="tel:+251991589097"
                  className="w-full py-3.5 px-4 rounded-xl bg-forest-800 dark:bg-amber-500 hover:bg-forest-700 dark:hover:bg-amber-400 text-cream-50 dark:text-charcoal-900 font-bold flex items-center justify-center gap-2 shadow-sm transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>0991 589 097</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
