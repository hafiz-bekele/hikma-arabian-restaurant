# ሒክማ አረብያን ሬስቶራንት — Website & Full-Stack System
**Hikma Arabian Restaurant (Kombolcha, Ethiopia)**

A full-stack, mobile-first website for **Hikma Arabian Restaurant (ሒክማ አረብያን ሬስቶራንት)** located on the 2nd floor of Abkute Building in central Kombolcha, Ethiopia.

Built with **Node.js + Express.js + React + Tailwind CSS + SQLite**.

---

## 🚀 Key Features

1. **Amharic-First & Bilingual (አማርኛ & English)**
   - Default language is Amharic with seamless English switching (`am` / `en`).
   - Authentic Ethiopian typography adjustments, tabular-nums price rendering.

2. **Accurate Local Navigation (Solves the #1 TikTok intent gap)**
   - 3-step landmark navigation:
     1. Locate Awash Bank (መሀል ኮምቦልቻ)
     2. Spot Tsedey Bank sign on Abkute Building (አቡቁተ ህንፃ)
     3. Take stairs to 2nd Floor (ወደ 2ኛ ፎቅ ይውጡ)
   - Coordinates: `11.0866268, 39.7382889`
   - One-tap links for Google Maps, phone dialer (`tel:+251991589097`), and WhatsApp.

3. **Live Status Pill (Open / Closed)**
   - Automatically computed against **Africa/Addis_Ababa (UTC+3)** time zone.
   - Shows "አሁን ክፍት ነው" (Open Now) or "አሁን ተዘግቷል" (Closed Now).
   - Operating hours: 08:00 – 22:00 daily.

4. **Complete Menu with Real Prices in Birr (ETB)**
   - Extracted directly from restaurant menu images and specs:
     - **ቁርስ (Breakfast)**: ዱለት ስፔሻል (500 Br), እንቁላል በስጋ (600 Br), ቋንጣ ፍርፍር (650 Br), ጥብስ ፍርፍር (700 Br), ኪንቼ (500 Br), ፉርኖ በቋንጣ (650 Br)...
     - **ዶሮ (Chicken)**: ሙሉ ዶሮ አረብኛ (4,000 Br), ግማሽ ዶሮ አረብኛ (2,000 Br), ሙሉ በረስት (4,000 Br), ግማሽ በረስት (2,000 Br), ሩብ ፍራይድ (1,000 Br), ሙሉ ቺክን ግሪል (4,000 Br)...
     - **የአረብ ስፔሻል (Arabian Specials)**: ወጋው ስፔሻል (1,200 Br), ማንዲ የበግ ስጋ (1,500 Br), ድስ ጥብስ (800 Br), ማንዲ የዶሮ (950 Br)...
     - **ጁስ እና መጠጦች (Fresh Juices)**: Energy Ayizer (400 Br), Smoothy (300 Br), Strawberry with milk (300 Br), Mango (270 Br), Avocado (270 Br), Sprice (270 Br)...
     - **ቡና እና ሻይ (Traditional Coffee & Tea)**: ጀበና ቡና (80 Br), የአረብ ሻይ (70 Br), ማኪያቶ (100 Br)...
     - **ጣፋጭ (Desserts)**: ከስተመር ስፔሻል (350 Br), ኡም አሊ (400 Br), ባቅላቫ (300 Br)...

5. **WhatsApp Instant Reservation**
   - Composes pre-filled booking message with name, phone, date, time, and guest count.
   - Simultaneously records booking in the SQLite `reservations` table.

6. **SQLite Self-Service Admin Panel (`/admin`)**
   - Directly view and update dish prices in real-time in SQLite.
   - Toggle availability (In Stock / Sold Out).
   - Add new dishes and delete outdated items.
   - Review all customer reservations.

7. **Mobile Sticky Action Bar**
   - Fixed at bottom on mobile devices: Call (`0991 589 097`), Directions (Google Maps), and Reserve (WhatsApp).

---

## 🛠️ Tech Stack

- **Backend**: Node.js & Express.js
- **Database**: SQLite (`data/hikma_restaurant.db`)
- **Frontend**: React 18 & Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite

---

## 🏃 Quick Start

### 1. Start the Express API & Production Server:
```bash
npm start
```
The server will start at `http://localhost:5000`.

### 2. Run in Development Mode:
```bash
# In terminal 1: start backend
node server/index.js

# In terminal 2: start Vite frontend
npm run dev
```

### 3. Rebuild the Frontend:
```bash
npm run build
```

---

## 📁 Project Structure

```
resturant/
├── data/
│   └── hikma_restaurant.db      # SQLite database file
├── server/
│   ├── index.js                 # Express server & static hosting
│   ├── db.js                    # SQLite database connection & schema
│   ├── seed.js                  # Pre-seeds authentic menu & restaurant info
│   └── routes/
│       ├── menu.js              # Categories & dish CRUD endpoints
│       ├── reservations.js      # Booking endpoints
│       └── info.js              # Operating hours & live status
├── src/
│   ├── components/
│   │   ├── Header.jsx           # Responsive header with language toggle
│   │   ├── Footer.jsx           # Four-column footer with NAP consistency
│   │   ├── StickyActionBar.jsx  # Mobile persistent conversion bar
│   │   ├── StatusPill.jsx       # Open/Closed live pill (Addis Ababa timezone)
│   │   ├── LandmarkSteps.jsx    # 3-step Kombolcha landmark guide
│   │   ├── DishCard.jsx         # Menu dish card with price in Birr
│   │   ├── HoursTable.jsx       # Weekly hours with today indicator
│   │   └── TrustBadges.jsx      # Halal, family section, parking badges
│   ├── context/
│   │   └── LanguageContext.jsx  # Amharic & English localization provider
│   ├── i18n/
│   │   ├── am.js                # Amharic strings
│   │   └── en.js                # English strings
│   ├── pages/
│   │   ├── HomePage.jsx         # Full conversion homepage
│   │   ├── MenuPage.jsx         # Searchable, filterable menu
│   │   ├── VisitPage.jsx        # Map, landmarks, transport guide
│   │   ├── AboutPage.jsx        # Story, craft, values
│   │   ├── GalleryPage.jsx      # Photo gallery with lightbox
│   │   ├── ReservePage.jsx      # WhatsApp reservation composer
│   │   └── AdminPage.jsx        # SQLite owner dashboard
│   ├── styles/
│   │   └── index.css            # Tailwind & Ethiopic typography styles
│   ├── App.jsx                  # Navigation & layout
│   └── main.jsx                 # Entry point
├── dist/                        # Production build
├── package.json
├── tailwind.config.js
└── vite.config.js
```
