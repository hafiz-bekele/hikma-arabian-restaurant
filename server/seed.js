import { db } from './db.js';

export function seedDatabase() {
  const count = db.prepare('SELECT COUNT(*) as count FROM categories').get().count;
  if (count > 0) {
    console.log('[Database] Database already populated with categories and menu items.');
    return;
  }

  console.log('[Database] Seeding initial data for Hikma Arabian Restaurant...');

  const insertCategory = db.prepare(`
    INSERT INTO categories (slug, name_am, name_en, display_order, icon)
    VALUES (?, ?, ?, ?, ?)
  `);

  const categories = [
    { slug: 'breakfast', name_am: 'ቁርስ', name_en: 'Breakfast', order: 1, icon: 'Utensils' },
    { slug: 'chicken', name_am: 'ዶሮ', name_en: 'Chicken', order: 2, icon: 'Flame' },
    { slug: 'arabian-mains', name_am: 'የአረብ ስፔሻል እና ዋና ምግብ', name_en: 'Arabian Specials & Mains', order: 3, icon: 'Sparkles' },
    { slug: 'juices', name_am: 'ጁስ እና መጠጦች', name_en: 'Fresh Juices & Drinks', order: 4, icon: 'Wine' },
    { slug: 'coffee-tea', name_am: 'ቡና እና ሻይ', name_en: 'Traditional Coffee & Tea', order: 5, icon: 'Coffee' },
    { slug: 'desserts', name_am: 'ጣፋጭ', name_en: 'Desserts', order: 6, icon: 'Cake' }
  ];

  for (const cat of categories) {
    insertCategory.run(cat.slug, cat.name_am, cat.name_en, cat.order, cat.icon);
  }

  const insertItem = db.prepare(`
    INSERT INTO menu_items (
      category_slug, slug, name_am, name_en, description_am, description_en,
      price, is_featured, is_available, tags, image, display_order
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const items = [
    // Breakfast / ቁርስ
    {
      category_slug: 'breakfast',
      slug: 'dulet-special',
      name_am: 'ዱለት ስፔሻል',
      name_en: 'Dulet Special',
      description_am: 'ትኩስ የበግ ወይም የበሬ ዱለት በቅቤ እና በሚጣፍጥ ቅመም',
      description_en: 'Fresh minced tripe, liver, and lean beef sautéed in spiced butter and herbs',
      price: 500,
      is_featured: 1,
      is_available: 1,
      tags: 'ተመራጭ,ትኩስ',
      image: '/images/menu/dulet.jpg',
      display_order: 1
    },
    {
      category_slug: 'breakfast',
      slug: 'egg-with-meat',
      name_am: 'እንቁላል በስጋ',
      name_en: 'Egg with Meat',
      description_am: 'የተጠበሰ ስጋ ከትኩስ እንቁላል እና ቃሪያ ጋር',
      description_en: 'Scrambled eggs prepared with tender spiced minced meat and hot peppers',
      price: 600,
      is_featured: 0,
      is_available: 1,
      tags: 'ፕሮቲን',
      image: null,
      display_order: 2
    },
    {
      category_slug: 'breakfast',
      slug: 'quanta-firfir',
      name_am: 'ቋንጣ ፍርፍር',
      name_en: 'Quanta Firfir',
      description_am: 'በፀሐይ የደረቀ ጥራት ያለው የበሬ ቋንጣ በትኩስ እንጀራ ፍርፍር',
      description_en: 'Sun-dried seasoned beef simmered in rich spicy berbere sauce with injera',
      price: 650,
      is_featured: 1,
      is_available: 1,
      tags: 'ተመራጭ,ቅመም',
      image: '/images/menu/quanta.jpg',
      display_order: 3
    },
    {
      category_slug: 'breakfast',
      slug: 'tibs-firfir',
      name_am: 'ጥብስ ፍርፍር',
      name_en: 'Tibs Firfir',
      description_am: 'የበሬ ጥብስ ከተጣፈጠ የወጥ እንጀራ ፍርፍር ጋር',
      description_en: 'Savory sautéed beef strips tossed with shredded injera in rich sauce',
      price: 700,
      is_featured: 0,
      is_available: 1,
      tags: 'ስፔሻል',
      image: null,
      display_order: 4
    },
    {
      category_slug: 'breakfast',
      slug: 'siga-firfir',
      name_am: 'ስጋ ፍርፍር',
      name_en: 'Siga Firfir',
      description_am: 'በጣፋጭ ቅመም የበሰለ የስጋ ፍርፍር',
      description_en: 'Tender beef stew blended with fresh injera rolls',
      price: 600,
      is_featured: 0,
      is_available: 1,
      tags: '',
      image: null,
      display_order: 5
    },
    {
      category_slug: 'breakfast',
      slug: 'kinche',
      name_am: 'ኪንቼ',
      name_en: 'Kinche (Cracked Wheat)',
      description_am: 'በንፁህ ለጋ ቅቤ የተዘጋጀ የኪንቼ ቁርስ',
      description_en: 'Traditional cracked wheat cooked to perfection with Ethiopian clarified spiced butter',
      price: 500,
      is_featured: 0,
      is_available: 1,
      tags: 'ቀላል',
      image: null,
      display_order: 6
    },
    {
      category_slug: 'breakfast',
      slug: 'furno-be-quanta',
      name_am: 'ፉርኖ በቋንጣ',
      name_en: 'Furno be Quanta',
      description_am: 'ትኩስ ከመጋገሪያ የወጣ የፉርኖ ዳቦ በጣፋጭ የቋንጣ ወጥ',
      description_en: 'Fresh oven-baked bread served with seasoned dried beef sauce',
      price: 650,
      is_featured: 0,
      is_available: 1,
      tags: 'መጋገሪያ',
      image: null,
      display_order: 7
    },

    // Chicken / ዶሮ
    {
      category_slug: 'chicken',
      slug: 'mulu-doro-arabian',
      name_am: 'ሙሉ ዶሮ አረብኛ',
      name_en: 'Full Arabian Roasted Chicken',
      description_am: 'በአረብያን ቅመማ ቅመሞች በእሳት የተጠበሰ ሙሉ ዶሮ ከልዩ ሳውሶች ጋር',
      description_en: 'Slow-roasted whole chicken marinated in authentic Arabian herbs and spices with dipping sauces',
      price: 4000,
      is_featured: 1,
      is_available: 1,
      tags: 'ተመራጭ,የቡድን',
      image: '/images/menu/chicken-arabian.jpg',
      display_order: 1
    },
    {
      category_slug: 'chicken',
      slug: 'gimash-doro-arabian',
      name_am: 'ግማሽ ዶሮ አረብኛ',
      name_en: 'Half Arabian Roasted Chicken',
      description_am: 'በአረብያን ቅመሞች የተጠበሰ ግማሽ ዶሮ ከትኩስ ሰላጣ ጋር',
      description_en: 'Half roasted chicken infused with fragrant Middle Eastern seasoning',
      price: 2000,
      is_featured: 0,
      is_available: 1,
      tags: 'ተመራጭ',
      image: null,
      display_order: 2
    },
    {
      category_slug: 'chicken',
      slug: 'mulu-broast',
      name_am: 'ሙሉ በረስት',
      name_en: 'Full Broast Crispy Chicken',
      description_am: 'ትኩስ እና ቆንጆ ጥርት ያለ ሙሉ ክሪስፒ ቺክን ከቺፕስ እና ቺሊ ሳውስ ጋር',
      description_en: 'Crispy golden fried full chicken served with French fries and signature dips',
      price: 4000,
      is_featured: 1,
      is_available: 1,
      tags: 'ክሪስፒ',
      image: '/images/menu/broast.jpg',
      display_order: 3
    },
    {
      category_slug: 'chicken',
      slug: 'gimash-broast',
      name_am: 'ግማሽ በረስት',
      name_en: 'Half Broast Crispy Chicken',
      description_am: 'ግማሽ ክሪስፒ ዶሮ ከቺፕስ እና ነጭ ሽንኩርት ሳውስ (ቶም) ጋር',
      description_en: 'Half golden crispy broasted chicken with crispy fries and garlic toum',
      price: 2000,
      is_featured: 0,
      is_available: 1,
      tags: 'ክሪስፒ',
      image: null,
      display_order: 4
    },
    {
      category_slug: 'chicken',
      slug: 'rub-fried',
      name_am: 'ሩብ ፍራይድ',
      name_en: 'Quarter Fried Chicken',
      description_am: 'ሩብ የተጠበሰ ዶሮ ከቺፕስ ጋር',
      description_en: 'Quarter portion of crispy fried chicken with French fries',
      price: 1000,
      is_featured: 0,
      is_available: 1,
      tags: '',
      image: null,
      display_order: 5
    },
    {
      category_slug: 'chicken',
      slug: 'mulu-chicken-grill',
      name_am: 'ሙሉ ቺክን ግሪል',
      name_en: 'Full Charcoal Grilled Chicken',
      description_am: 'በከሰል የተጠበሰ ጥሩ መዓዛ ያለው ሙሉ ግሪል ዶሮ',
      description_en: 'Charcoal-grilled full chicken with smoky aroma, pita bread, and condiments',
      price: 4000,
      is_featured: 0,
      is_available: 1,
      tags: 'ግሪል',
      image: null,
      display_order: 6
    },
    {
      category_slug: 'chicken',
      slug: 'gimash-chicken-grill',
      name_am: 'ግማሽ ቺክን ግሪል',
      name_en: 'Half Charcoal Grilled Chicken',
      description_am: 'በከሰል የተጠበሰ ግማሽ ግሪል ዶሮ ከትኩስ ሰላጣ ጋር',
      description_en: 'Charcoal-grilled half chicken with seasoned herbs and flatbread',
      price: 2000,
      is_featured: 0,
      is_available: 1,
      tags: 'ግሪል',
      image: null,
      display_order: 7
    },
    {
      category_slug: 'chicken',
      slug: 'rub-chicken-grill',
      name_am: 'ሩብ ቺክን ግሪል',
      name_en: 'Quarter Charcoal Grilled Chicken',
      description_am: 'ሩብ ግሪል ዶሮ ከሳውሶች ጋር',
      description_en: 'Quarter grilled chicken with garlic sauce and salad',
      price: 1000,
      is_featured: 0,
      is_available: 1,
      tags: '',
      image: null,
      display_order: 8
    },

    // Arabian Mains & Specials / የአረብ ስፔሻል እና ዋና ምግብ
    {
      category_slug: 'arabian-mains',
      slug: 'wagaw-special',
      name_am: 'ወጋው ስፔሻል',
      name_en: 'Wagaw Special Platter',
      description_am: 'የሒክማ ልዩ የበሬ እና የበግ ስጋ ጥብስ ከትኩስ የአረብኛ ዳቦ እና እንጀራ ጋር',
      description_en: 'Signature house platter of marinated tender beef and lamb, oven bread, and condiments',
      price: 1200,
      is_featured: 1,
      is_available: 1,
      tags: 'የሼፍ ምርጫ,ተመራጭ',
      image: '/images/menu/wagaw-special.jpg',
      display_order: 1
    },
    {
      category_slug: 'arabian-mains',
      slug: 'mandi-lamb',
      name_am: 'ማንዲ የበግ ስጋ',
      name_en: 'Mandi Lamb with Basmati Rice',
      description_am: 'በዝግታ የበሰለ ለስላሳ የበግ ስጋ ከረጅም ባስማቲ ሩዝ፣ ዛፍራን እና ደቁስ ሳውስ ጋር',
      description_en: 'Traditional slow-cooked fall-off-the-bone lamb on a bed of spiced fragrant basmati rice with daqqoos sauce',
      price: 1500,
      is_featured: 1,
      is_available: 1,
      tags: 'ተመራጭ,አረብኛ',
      image: '/images/menu/mandi-lamb.jpg',
      display_order: 2
    },
    {
      category_slug: 'arabian-mains',
      slug: 'mandi-chicken',
      name_am: 'ማንዲ የዶሮ ስጋ',
      name_en: 'Mandi Chicken with Fragrant Rice',
      description_am: 'በአረብኛ ቅመም የተጠበሰ የዶሮ ማንዲ ከጣፋጭ ባስማቲ ሩዝ ጋር',
      description_en: 'Spiced aromatic chicken roasted over aromatic basmati rice served with house sauces',
      price: 950,
      is_featured: 0,
      is_available: 1,
      tags: 'አረብኛ',
      image: null,
      display_order: 3
    },
    {
      category_slug: 'arabian-mains',
      slug: 'dis-tibs',
      name_am: 'ድስ ጥብስ',
      name_en: 'Clay Pot Beef Tibs',
      description_am: 'በትኩስ የሸክላ ድስት እየተንተከተከ የሚቀርብ የበሬ ጥብስ በሮዝመሪ እና ቅቤ',
      description_en: 'Sizzling prime beef cubes in traditional clay pan with rosemary, onions, and spiced butter',
      price: 800,
      is_featured: 1,
      is_available: 1,
      tags: 'ትኩስ,ተመራጭ',
      image: '/images/menu/dis-tibs.jpg',
      display_order: 4
    },
    {
      category_slug: 'arabian-mains',
      slug: 'fitfit-special',
      name_am: 'ፍትፊት ስፔሻል',
      name_en: 'Fitfit Special',
      description_am: 'በልዩ አረብያን ወይም ሀበሻ ቅመም የተዘጋጀ የበለጸገ ፍትፊት',
      description_en: 'Rich and hearty shredded bread or injera soaked in seasoned aromatic broth and meat',
      price: 650,
      is_featured: 0,
      is_available: 1,
      tags: '',
      image: null,
      display_order: 5
    },

    // Juices & Drinks / ጁስ እና መጠጦች
    {
      category_slug: 'juices',
      slug: 'energy-ayizer',
      name_am: 'Energy Ayizer',
      name_en: 'Energy Ayizer Special',
      description_am: 'ከፍራፍሬ፣ ማር እና ለውዝ የተዘጋጀ ጉልበት የሚሰጥ ልዩ ጁስ',
      description_en: 'Energizing fresh juice blend crafted with selected fruits, pure honey, and crushed nuts',
      price: 400,
      is_featured: 1,
      is_available: 1,
      tags: 'ተመራጭ,ስፔሻል',
      image: '/images/menu/energy-ayizer.jpg',
      display_order: 1
    },
    {
      category_slug: 'juices',
      slug: 'smoothy',
      name_am: 'Smoothy',
      name_en: 'Fresh Fruit Smoothie',
      description_am: 'ቀዝቃዛ እና ወፍራም የተፈጥሮ ፍራፍሬ ስሙዚ',
      description_en: 'Velvety cold mixed fruit smoothie blended fresh to order',
      price: 300,
      is_featured: 0,
      is_available: 1,
      tags: 'ቀዝቃዛ',
      image: null,
      display_order: 2
    },
    {
      category_slug: 'juices',
      slug: 'strawberry-milk',
      name_am: 'Strawberry with Milk',
      name_en: 'Fresh Strawberry with Milk',
      description_am: 'ትኩስ እንጆሪ ከጥራት ወተት ጋር የተፈጨ',
      description_en: 'Fresh hand-picked strawberries blended with rich chilled milk',
      price: 300,
      is_featured: 0,
      is_available: 1,
      tags: 'ተመራጭ',
      image: null,
      display_order: 3
    },
    {
      category_slug: 'juices',
      slug: 'sprice',
      name_am: 'ስፕሪስ (Sprice)',
      name_en: 'Layered Sprice Juice',
      description_am: 'የአቮካዶ፣ ማንጎ እና ፓፓያ ባለቀለም ንብርብር ጁስ በሎሚ ጭማቂ',
      description_en: 'Classic Ethiopian multi-layered fresh juice of ripe avocado, mango, and papaya with lime',
      price: 270,
      is_featured: 1,
      is_available: 1,
      tags: 'ተመራጭ',
      image: '/images/menu/sprice.jpg',
      display_order: 4
    },
    {
      category_slug: 'juices',
      slug: 'mango-juice',
      name_am: 'ማንጎ ጁስ',
      name_en: 'Pure Mango Juice',
      description_am: '100% የተፈጥሮ የበሰለ ማንጎ ጭማቂ',
      description_en: '100% sweet and thick pure mango juice',
      price: 270,
      is_featured: 0,
      is_available: 1,
      tags: '',
      image: null,
      display_order: 5
    },
    {
      category_slug: 'juices',
      slug: 'avocado-juice',
      name_am: 'አቮካዶ ጁስ',
      name_en: 'Fresh Avocado Juice',
      description_am: 'ወፍራም አቮካዶ ከቪምቶ ወይም ሎሚ ጣዕም ጋር',
      description_en: 'Creamy rich avocado pureed with a dash of lime and sweet syrup',
      price: 270,
      is_featured: 0,
      is_available: 1,
      tags: '',
      image: null,
      display_order: 6
    },

    // Coffee & Tea / ቡና እና ሻይ
    {
      category_slug: 'coffee-tea',
      slug: 'jebena-buna',
      name_am: 'ጀበና ቡና',
      name_en: 'Traditional Jebena Coffee',
      description_am: 'በሸክላ ጀበና ላይ በባህላዊ መንገድ የተፈላ ጥሩ መዓዛ ያለው የሀበሻ ቡና ከዕጣን ጋር',
      description_en: 'Freshly roasted and brewed Ethiopian coffee served in traditional clay jebena with frankincense aroma',
      price: 80,
      is_featured: 1,
      is_available: 1,
      tags: 'ተመራጭ,ባህላዊ',
      image: '/images/menu/jebena.jpg',
      display_order: 1
    },
    {
      category_slug: 'coffee-tea',
      slug: 'arabian-spiced-tea',
      name_am: 'የአረብ ሻይ በቅመም',
      name_en: 'Arabian Cardamom Spiced Tea',
      description_am: 'በሄል (cardamom)፣ ቅርንፉድ እና ሚንት ቅጠል የተፈላ የአረብያን ሻይ',
      description_en: 'Black tea brewed with fragrant cardamom pods, cloves, and fresh mint',
      price: 70,
      is_featured: 0,
      is_available: 1,
      tags: 'አረብኛ',
      image: null,
      display_order: 2
    },
    {
      category_slug: 'coffee-tea',
      slug: 'macchiato',
      name_am: 'ማኪያቶ',
      name_en: 'Steamed Macchiato',
      description_am: 'በጥሩ ኤስፕሬሶ እና በሞቀ ወተት አረፋ የተዘጋጀ ማኪያቶ',
      description_en: 'Rich espresso topped with velvety steamed milk foam',
      price: 100,
      is_featured: 0,
      is_available: 1,
      tags: '',
      image: null,
      display_order: 3
    },

    // Desserts / ጣፋጭ
    {
      category_slug: 'desserts',
      slug: 'custard-special',
      name_am: 'ከስተመር ስፔሻል',
      name_en: 'Hikma Custard Special',
      description_am: 'ለስላሳ ከስተርድ ክሬም ከትኩስ ፍራፍሬዎች፣ ማር እና ፒስታቺዮ ለውዝ ጋር',
      description_en: 'Rich creamy dessert bowl loaded with diced seasonal fruits, honey, and chopped pistachios',
      price: 350,
      is_featured: 1,
      is_available: 1,
      tags: 'ተመራጭ',
      image: '/images/menu/custard.jpg',
      display_order: 1
    },
    {
      category_slug: 'desserts',
      slug: 'umm-ali',
      name_am: 'ኡም አሊ',
      name_en: 'Umm Ali Arabian Pudding',
      description_am: 'ከመጋገሪያ የወጣ ትኩስ የአረብያን የዳቦ ፑዲንግ በወተት፣ ዘቢብ እና ለውዝ',
      description_en: 'Warm traditional Egyptian/Arabian bread pudding baked with milk, cream, raisins, and roasted almonds',
      price: 400,
      is_featured: 0,
      is_available: 1,
      tags: 'አረብኛ',
      image: null,
      display_order: 2
    },
    {
      category_slug: 'desserts',
      slug: 'baklava',
      name_am: 'ባቅላቫ',
      name_en: 'Pistachio Baklava',
      description_am: 'በማር ሽሮፕ እና በፒስታቺዮ የተሞላ ጥርት ያለ የአረብያን ባቅላቫ',
      description_en: 'Crisp layered filo pastry filled with pistachios and soaked in fragrant sugar syrup',
      price: 300,
      is_featured: 0,
      is_available: 1,
      tags: '',
      image: null,
      display_order: 3
    }
  ];

  for (const item of items) {
    insertItem.run(
      item.category_slug,
      item.slug,
      item.name_am,
      item.name_en,
      item.description_am,
      item.description_en,
      item.price,
      item.is_featured,
      item.is_available,
      item.tags,
      item.image,
      item.display_order
    );
  }

  // Insert Site Info
  const insertInfo = db.prepare('INSERT OR REPLACE INTO site_info (key, value_json) VALUES (?, ?)');
  
  const siteInfo = {
    name_am: 'ሒክማ አረብያን ሬስቶራንት',
    name_en: 'Hikma Arabian Restaurant',
    tagline_am: 'የአረብ ጣዕም በኮምቦልቻ ልብ ውስጥ',
    tagline_en: 'A Taste of Arabia in the Heart of Kombolcha',
    phone: '0991 589 097',
    phone_international: '+251991589097',
    whatsapp: '251991589097',
    tiktok: 'https://www.tiktok.com/@hikmaarebiyanrestaurant',
    building_am: 'አቡቁተ ህንፃ 2ኛ ፎቅ (ፀደይ ባንክ ያለበት)',
    building_en: 'Abkute Building, 2nd Floor (where Tsedey Bank is located)',
    address_am: 'መሀል ኮምቦልቻ፣ ወደ በርበሬ ወንዝ ሰፈር በሚወስደው መንገድ፣ ከአዋሽ ባንክ አጠገብ፣ ፀደይ ባንክ ያለበት አቡቁተ ህንፃ 2ኛ ፎቅ',
    address_en: '2nd floor, Abkute Building (with Tsedey Bank), next to Awash Bank, on the road toward Berbere River, central Kombolcha',
    city_am: 'ኮምቦልቻ',
    city_en: 'Kombolcha',
    region_am: 'አማራ ክልል፣ ኢትዮጵያ',
    region_en: 'Amhara Region, Ethiopia',
    coordinates: {
      lat: 11.0866268,
      lng: 39.7382889
    },
    google_maps_url: 'https://www.google.com/maps/place/HIKMA+ARABIAN+RESTAURANT/@11.0866268,39.7382889,17z',
    opening_hours: {
      daily_open: '08:00',
      daily_close: '22:00',
      timezone: 'Africa/Addis_Ababa',
      days: ['ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሐሙስ', 'አርብ', 'ቅዳሜ', 'እሁድ']
    },
    amenities: [
      { id: 'halal', name_am: 'ሃላል የተረጋገጠ', name_en: '100% Halal Food', icon: 'CheckCircle' },
      { id: 'family', name_am: 'ሰፊ የቤተሰብ ክፍል', name_en: 'Dedicated Family Section', icon: 'Users' },
      { id: 'prayer', name_am: 'ንጹህ የጸሎት ቦታ', name_en: 'Prayer Space (Musalla)', icon: 'Sparkles' },
      { id: 'parking', name_am: 'ነጻ የተመቻቸ ፓርኪንግ', name_en: 'Free Parking', icon: 'Car' },
      { id: 'wifi', name_am: 'ፈጣን ነጻ ዋይፋይ', name_en: 'Free Wi-Fi', icon: 'Wifi' }
    ]
  };

  insertInfo.run('general', JSON.stringify(siteInfo));

  console.log(`[Database] Seeding complete: ${categories.length} categories, ${items.length} menu items.`);
}
