import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function GalleryPage() {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    { id: 'all', labelAm: 'ሁሉም', labelEn: 'All' },
    { id: 'food', labelAm: 'ምግቦች', labelEn: 'Food & Specials' },
    { id: 'chicken', labelAm: 'የተጠበሰ ዶሮ', labelEn: 'Roasted Chicken' },
    { id: 'coffee', labelAm: 'ጀበና ቡናና መጠጦች', labelEn: 'Coffee & Juices' },
    { id: 'room', labelAm: 'አዳራሹና ውስጡ', labelEn: 'The Room & Ambience' },
  ];

  // Gallery items with authentic photography
  const galleryItems = [
    {
      id: 1,
      category: 'food',
      image: '/images/dishes/dish-mandi-feast.jpg',
      titleAm: 'ማንዲ የበግ ስጋ ከባስማቲ ሩዝ ጋር',
      titleEn: 'Mandi Lamb with Fragrant Rice & Sauce',
      descAm: 'በአረብያን ቅመም የበሰለ ለስላሳ የበግ ስጋ ከትኩስ ሎሚ፣ ደቁስ እና ቃሪያ ጋር',
      descEn: 'Slow-cooked lamb over basmati rice with dipping sauces',
      tag: 'ተመራጭ'
    },
    {
      id: 2,
      category: 'chicken',
      image: '/images/dishes/dish-chicken-fries-dips.jpg',
      titleAm: 'ሙሉ የተጠበሰ ዶሮ በቺፕስ እና በ 4 ሳውሶች',
      titleEn: 'Roasted Arabian Chicken with French Fries & Dips',
      descAm: 'የአረብያን ክሪስፒ በረስት ዶሮ ከነጭ ሽንኩርት ቶም፣ ሚንት እና ቺሊ ሳውሶች ጋር',
      descEn: 'Golden crispy chicken platter with seasoned fries and 4 artisanal dips',
      tag: 'ክሪስፒ'
    },
    {
      id: 3,
      category: 'food',
      image: '/images/dishes/dish-tibs-pan.jpg',
      titleAm: 'ድስ ጥብስ በእንጀራ እና ባስማቲ ሩዝ',
      titleEn: 'Claypan Beef Tibs with Fresh Injera & Rice',
      descAm: 'ትኩስ የበሬ ጥብስ በሸክላ ድስት ከቅቤና ሮዝመሪ ጋር',
      descEn: 'Sizzling prime beef cubes served with fresh rolled injera',
      tag: 'ትኩስ'
    },
    {
      id: 4,
      category: 'food',
      image: '/images/dishes/dish-table-spread.jpg',
      titleAm: 'የተሟላ የሒክማ ማዕድ ለቤተሰብና ለቡድን',
      titleEn: 'Full Hikma Dining Feast for Families',
      descAm: 'የተጠበሰ ዶሮ፣ የበግ ማንዲ፣ ሳውሶችና ትኩስ መጠጦች በአንድ ላይ',
      descEn: 'Generous platter spread featuring roasted chicken, lamb, sauces, and drinks',
      tag: 'የቡድን'
    },
    {
      id: 5,
      category: 'food',
      image: '/images/dishes/dish-beef-rice-salad.jpg',
      titleAm: 'የበሬ ስጋ ጥብስ በቢጫ ባስማቲ ሩዝ',
      titleEn: 'Tender Sautéed Beef over Saffron Rice',
      descAm: 'የተጠበሰ የበሬ ስጋ በጣፋጭ ባስማቲ ሩዝ እና ሰላጣ',
      descEn: 'Seasoned beef cuts over spiced yellow basmati rice with crisp salad',
      tag: 'ተመራጭ'
    },
    {
      id: 6,
      category: 'food',
      image: '/images/dishes/dish-lamb-rice.jpg',
      titleAm: 'የበግ ማንዲ በቅመም ሩዝ እና ቃሪያ',
      titleEn: 'Spiced Lamb Mandi with Fragrant Rice',
      descAm: 'በዝግታ በእሳት የበሰለ ለስላሳ የበግ ስጋ በትኩስ የአረብኛ ዳቦ',
      descEn: 'Slow-roasted fall-off-the-bone lamb served with warm flatbread',
      tag: 'አረብኛ'
    },
    {
      id: 7,
      category: 'coffee',
      image: '/images/dishes/hero-combo.jpg',
      titleAm: 'ባህላዊ የጀበና ቡና ከዕጣን መዓዛ ጋር',
      titleEn: 'Traditional Jebena Coffee Ceremony',
      descAm: 'በሸክላ ጀበና ላይ ተፈልቶ የሚቀርብ ጥሩ መዓዛ ያለው ቡና',
      descEn: 'Freshly roasted Ethiopian coffee brewed in clay pot with frankincense',
      tag: 'ባህላዊ'
    },
    {
      id: 8,
      category: 'coffee',
      image: '/images/logo.jpg',
      titleAm: 'Energy Ayizer እና ስፕሪስ ጁስ',
      titleEn: 'Energy Ayizer & Multi-layer Sprice Juice',
      descAm: 'ከንጹህ ፍራፍሬዎች፣ ማር እና ለውዝ የተዘጋጁ ጁሶች',
      descEn: 'Natural fruit layered juices with honey and nuts',
      tag: 'ትኩስ ጁስ'
    },
    {
      id: 9,
      category: 'room',
      image: '/images/restaurant-floor-bg.jpg',
      titleAm: 'የሁለተኛ ፎቅ ሰፊ የመመገቢያ አዳራሽ',
      titleEn: 'Spacious Second Floor Dining Hall & Floor',
      descAm: 'በአቡቁተ ህንፃ 2ኛ ፎቅ ላይ የተዘጋጀ ሞቅ ያለ የእንጨት ወለል፣ የአረብያን ፋኖሶችና ምቹ መቀመጫዎች',
      descEn: 'Warm polished wood floors, glowing brass lanterns, and comfortable family seating on the 2nd floor',
      tag: '2ኛ ፎቅ'
    }
  ];

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(i => i.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-charcoal-900 border border-amber-600/30">
          {lang === 'am' ? 'የእውነተኛ ምግቦች ጋለሪ' : 'Real Dishes & Ambience'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-forest-900 dark:text-cream-50 tracking-tight">
          {t('nav.gallery')}
        </h1>
        <p className="text-sm sm:text-base text-charcoal-600 dark:text-cream-100">
          {lang === 'am'
            ? 'በሒክማ አረብያን ሬስቶራንት የሚቀርቡ እውነተኛ ምግቦች፣ የጀበና ቡና እና የሁለተኛ ፎቅ አዳራሻችን ፎቶዎች'
            : 'Unedited, honest photographs of our kitchen, dishes, coffee, and dining space.'}
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-2">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                isSelected
                  ? 'bg-forest-800 dark:bg-amber-500 text-cream-50 dark:text-charcoal-900 shadow-sm'
                  : 'bg-sand-200 dark:bg-[#182E25] text-charcoal-900 dark:text-cream-100 hover:bg-sand-300 dark:hover:bg-forest-800'
              }`}
            >
              {lang === 'am' ? cat.labelAm : cat.labelEn}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item)}
            className="group cursor-pointer bg-white dark:bg-[#13221C] rounded-3xl border border-sand-300 dark:border-forest-800 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            {/* Photo Container */}
            <div className="h-60 relative overflow-hidden bg-forest-900">
              <img
                src={item.image}
                alt={item.titleAm}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-transparent to-black/20"></div>

              <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-charcoal-900 shadow-sm">
                  {item.tag}
                </span>
                <span className="text-[11px] text-cream-50 font-bold bg-forest-900/70 backdrop-blur-xs px-2.5 py-1 rounded-full">
                  ኮምቦልቻ
                </span>
              </div>

              <div className="absolute bottom-3 inset-x-3">
                <h3 className="font-bold text-base sm:text-lg text-cream-50 font-display line-clamp-1 drop-shadow-sm">
                  {lang === 'am' ? item.titleAm : item.titleEn}
                </h3>
              </div>
            </div>

            {/* Caption */}
            <div className="p-5 border-t border-sand-200 dark:border-forest-800">
              <p className="text-xs sm:text-sm text-charcoal-600 dark:text-cream-100 line-clamp-2 leading-relaxed">
                {lang === 'am' ? item.descAm : item.descEn}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs font-semibold text-forest-800 dark:text-amber-400">
                <span>{lang === 'am' ? 'ሙሉ ዝርዝር ይመልከቱ' : 'Tap to expand'}</span>
                <span className="text-amber-500">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-cream-50 dark:bg-[#0E2A20] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-sand-300 dark:border-forest-700"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-sand-200 dark:bg-forest-800 text-charcoal-900 dark:text-cream-50 hover:bg-sand-300 dark:hover:bg-forest-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lightbox Image Preview */}
            <div className="h-72 sm:h-84 rounded-2xl overflow-hidden mb-6 relative border border-sand-300 dark:border-forest-700 bg-forest-900 shadow-inner">
              <img
                src={selectedImage.image}
                alt={selectedImage.titleAm}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-charcoal-900 shadow-md">
                {selectedImage.tag}
              </span>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-forest-900 dark:text-cream-50 text-lg">
                {lang === 'am' ? selectedImage.titleAm : selectedImage.titleEn}
              </h4>
              <p className="text-sm text-charcoal-600 dark:text-cream-100 leading-relaxed">
                {lang === 'am' ? selectedImage.descAm : selectedImage.descEn}
              </p>
              <div className="pt-4 border-t border-sand-300 dark:border-forest-700 text-xs text-charcoal-600 dark:text-sand-200 flex items-center justify-between">
                <span>📍 አቡቁተ ህንፃ 2ኛ ፎቅ · ኮምቦልቻ</span>
                <a
                  href="tel:+251991589097"
                  className="font-bold text-forest-800 dark:text-amber-400 hover:underline"
                >
                  0991 589 097
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
