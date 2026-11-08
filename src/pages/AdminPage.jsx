import React, { useState, useEffect } from 'react';
import {
  Database,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  RefreshCw,
  Calendar,
  DollarSign,
  AlertCircle,
  Upload,
  Image as ImageIcon,
  Link as LinkIcon
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AdminPage() {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' | 'reservations'
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  // New item form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [imageInputMode, setImageInputMode] = useState('file'); // 'file' | 'url'
  const [newItem, setNewItem] = useState({
    name_am: '',
    name_en: '',
    category_slug: 'breakfast',
    price: '',
    description_am: '',
    description_en: '',
    is_featured: false,
    is_available: true,
    image: '',
  });

  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDim = 1200;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
        setNewItem(prev => ({ ...prev, image: dataUrl }));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [catRes, itemsRes, resRes] = await Promise.all([
        fetch('/api/menu/categories').then(r => r.json()),
        fetch('/api/menu/items').then(r => r.json()),
        fetch('/api/reservations').then(r => r.json()),
      ]);

      if (catRes.success) setCategories(catRes.data);
      if (itemsRes.success) setMenuItems(itemsRes.data);
      if (resRes.success) setReservations(resRes.data);
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdatePrice = async (item, newPrice) => {
    try {
      const res = await fetch(`/api/menu/items/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price: Number(newPrice) })
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage(`የ "${item.name_am}" ዋጋ ወደ ${newPrice} ብር ተቀይሯል።`);
        setEditingItem(null);
        loadData();
      }
    } catch (err) {
      console.error('Error updating price:', err);
    }
  };

  const handleToggleAvailable = async (item) => {
    try {
      await fetch(`/api/menu/items/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_available: !item.is_available })
      });
      loadData();
    } catch (err) {
      console.error('Error toggling availability:', err);
    }
  };

  const handleReservationStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/reservations/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage(`የቦታ ማስያዣ ሁኔታ ወደ "${newStatus}" ተቀይሯል።`);
        loadData();
      }
    } catch (err) {
      console.error('Error changing reservation status:', err);
    }
  };

  const handleDeleteItem = async (item) => {
    if (!window.confirm(`እርግጠኛ ነዎት "${item.name_am}" ከ SQLite ዳታቤዝ እንዲሰረዝ ይፈልጋሉ?`)) {
      return;
    }
    try {
      const res = await fetch(`/api/menu/items/${item.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setStatusMessage(`"${item.name_am}" ተሰርዟል።`);
        loadData();
      }
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItem.name_am || !newItem.price) {
      alert('እባክዎ የምግብ ስም እና ዋጋ ያስገቡ።');
      return;
    }
    try {
      const res = await fetch('/api/menu/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage('አዲስ ምግብ በፎቶው እና በዋጋው ወደ SQLite ዳታቤዝ ተጨምሯል!');
        setShowAddForm(false);
        setNewItem({
          name_am: '',
          name_en: '',
          category_slug: 'breakfast',
          price: '',
          description_am: '',
          description_en: '',
          is_featured: false,
          is_available: true,
          image: '',
        });
        loadData();
      }
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-sand-300 dark:border-forest-800 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-forest-800 dark:bg-forest-700 text-amber-400">
              SQLite 3 Engine
            </span>
            <span className="text-xs text-charcoal-600 dark:text-sand-400 font-mono">
              /data/hikma_restaurant.db
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-900 dark:text-cream-50">
            {lang === 'am' ? 'የሒክማ ሬስቶራንት ዳታቤዝ ማስተዳደሪያ' : 'Hikma Restaurant SQLite Admin'}
          </h1>
          <p className="text-sm text-charcoal-600 dark:text-cream-100">
            {lang === 'am'
              ? 'የምግብ ዝርዝር፣ የዋጋ ማስተካከያ እና የተያዙ ቦታዎችን በቀጥታ ከ SQLite ዳታቤዝ ያስተዳድሩ።'
              : 'Directly view and manage menu items, prices, and reservations in SQLite.'}
          </p>
        </div>

        <button
          onClick={loadData}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sand-200 dark:bg-[#182E25] hover:bg-sand-300 dark:hover:bg-forest-800 text-forest-900 dark:text-cream-100 border border-sand-300 dark:border-forest-700 text-sm font-semibold transition-colors shrink-0"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>{lang === 'am' ? 'ዳታ አድስ' : 'Refresh Data'}</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-sm flex items-center justify-between">
          <span>{statusMessage}</span>
          <button onClick={() => setStatusMessage('')} className="text-emerald-700 dark:text-emerald-300">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-sand-300 dark:border-forest-800 pb-2">
        <button
          onClick={() => setActiveTab('menu')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
            activeTab === 'menu'
              ? 'bg-forest-800 dark:bg-amber-500 text-cream-50 dark:text-charcoal-900'
              : 'text-charcoal-600 dark:text-sand-300 hover:bg-sand-200 dark:hover:bg-forest-800'
          }`}
        >
          🍽️ {lang === 'am' ? 'የምግብ ዝርዝር እና ዋጋ' : 'Menu & Prices'} ({menuItems.length})
        </button>
        <button
          onClick={() => setActiveTab('reservations')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
            activeTab === 'reservations'
              ? 'bg-forest-800 dark:bg-amber-500 text-cream-50 dark:text-charcoal-900'
              : 'text-charcoal-600 dark:text-sand-300 hover:bg-sand-200 dark:hover:bg-forest-800'
          }`}
        >
          📅 {lang === 'am' ? 'የተያዙ ቦታዎች' : 'Reservations'} ({reservations.length})
        </button>
      </div>

      {/* MENU TAB */}
      {activeTab === 'menu' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-forest-900 dark:text-cream-50">
              {lang === 'am' ? 'የምግቦች ዝርዝር (በ SQLite)' : 'Menu Items in SQLite'}
            </h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-700 hover:bg-emerald-600 text-cream-50 font-bold text-sm transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>{lang === 'am' ? 'አዲስ ምግብ ጨምር' : 'Add New Item'}</span>
            </button>
          </div>

          {/* Add Item Form Modal */}
          {showAddForm && (
            <div className="bg-white dark:bg-[#13221C] rounded-2xl p-6 border-2 border-forest-800 dark:border-forest-700 shadow-lg space-y-4">
              <h3 className="font-bold text-lg text-forest-900 dark:text-cream-50">
                {lang === 'am' ? 'አዲስ ምግብ ወደ ዳታቤዝ ማከል' : 'Add Dish to SQLite'}
              </h3>
              <form onSubmit={handleAddItem} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 dark:text-sand-200 mb-1">የምግብ ስም (አማርኛ) *</label>
                  <input
                    type="text"
                    required
                    value={newItem.name_am}
                    onChange={e => setNewItem({ ...newItem, name_am: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-cream-50 dark:bg-[#0B1712] border border-sand-300 dark:border-forest-700 text-charcoal-900 dark:text-cream-50 text-sm"
                    placeholder="ለምሳሌ፡ ድስ ጥብስ ስፔሻል"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 dark:text-sand-200 mb-1">Dish Name (English)</label>
                  <input
                    type="text"
                    value={newItem.name_en}
                    onChange={e => setNewItem({ ...newItem, name_en: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-cream-50 dark:bg-[#0B1712] border border-sand-300 dark:border-forest-700 text-charcoal-900 dark:text-cream-50 text-sm"
                    placeholder="e.g. Sizzling Pot Tibs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 dark:text-sand-200 mb-1">ምድብ (Category) *</label>
                  <select
                    value={newItem.category_slug}
                    onChange={e => setNewItem({ ...newItem, category_slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-cream-50 dark:bg-[#0B1712] border border-sand-300 dark:border-forest-700 text-charcoal-900 dark:text-cream-50 text-sm"
                  >
                    {categories.map(c => (
                      <option key={c.slug} value={c.slug} className="bg-white dark:bg-[#13221C] text-charcoal-900 dark:text-cream-50">
                        {c.name_am} ({c.name_en})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 dark:text-sand-200 mb-1">ዋጋ በብር (ETB) *</label>
                  <input
                    type="number"
                    required
                    value={newItem.price}
                    onChange={e => setNewItem({ ...newItem, price: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-cream-50 dark:bg-[#0B1712] border border-sand-300 dark:border-forest-700 text-charcoal-900 dark:text-cream-50 text-sm"
                    placeholder="500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-charcoal-700 dark:text-sand-200 mb-1">መግለጫ (አማርኛ)</label>
                  <input
                    type="text"
                    value={newItem.description_am}
                    onChange={e => setNewItem({ ...newItem, description_am: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-cream-50 dark:bg-[#0B1712] border border-sand-300 dark:border-forest-700 text-charcoal-900 dark:text-cream-50 text-sm"
                    placeholder="አጭር መግለጫ"
                  />
                </div>

                {/* Dish Photo: Link or Device Upload */}
                <div className="sm:col-span-2 p-4 rounded-xl bg-sand-100/70 dark:bg-[#0B1712] border border-sand-300 dark:border-forest-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-forest-900 dark:text-cream-50">
                      የምግብ ፎቶ (Dish Image)
                    </label>
                    <div className="flex items-center gap-1 bg-sand-200 dark:bg-forest-800 p-0.5 rounded-lg text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() => setImageInputMode('file')}
                        className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
                          imageInputMode === 'file'
                            ? 'bg-white dark:bg-forest-900 text-forest-900 dark:text-amber-400 shadow-xs'
                            : 'text-charcoal-600 dark:text-sand-300'
                        }`}
                      >
                        <Upload className="w-3 h-3" />
                        <span>ከመሳሪያ ይስቀሉ (Device)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageInputMode('url')}
                        className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
                          imageInputMode === 'url'
                            ? 'bg-white dark:bg-forest-900 text-forest-900 dark:text-amber-400 shadow-xs'
                            : 'text-charcoal-600 dark:text-sand-300'
                        }`}
                      >
                        <LinkIcon className="w-3 h-3" />
                        <span>ሊንክ (URL)</span>
                      </button>
                    </div>
                  </div>

                  {imageInputMode === 'file' ? (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="block w-full text-xs text-charcoal-600 dark:text-sand-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-forest-800 file:text-cream-50 hover:file:bg-forest-700 cursor-pointer"
                      />
                      <p className="text-[11px] text-charcoal-500 dark:text-sand-400 mt-1">
                        ከስልክዎ ካሜራ ወይም ከኮምፒውተር ፎቶ ይምረጡ (በራስ-ሰር ተመጥኖ በዳታቤዝ ይቀመጣል)።
                      </p>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="text"
                        value={newItem.image}
                        onChange={e => setNewItem({ ...newItem, image: e.target.value })}
                        placeholder="https://example.com/dish.jpg ወይም /images/dishes/..."
                        className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#13221C] border border-sand-300 dark:border-forest-700 text-charcoal-900 dark:text-cream-50 text-xs"
                      />
                    </div>
                  )}

                  {/* Photo Preview if selected */}
                  {newItem.image && (
                    <div className="flex items-center gap-3 pt-2">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-forest-950 border border-amber-500/50 shadow-sm shrink-0">
                        <img
                          src={newItem.image}
                          alt="Dish Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-xs space-y-1">
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold block">
                          ✓ ፎቶ ተመርጧል (Photo Selected)
                        </span>
                        <button
                          type="button"
                          onClick={() => setNewItem({ ...newItem, image: '' })}
                          className="text-rose-600 dark:text-rose-400 hover:underline font-semibold"
                        >
                          ፎቶውን አስወግድ (Remove)
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 rounded-lg bg-sand-200 dark:bg-[#182E25] text-charcoal-800 dark:text-sand-200 text-sm font-semibold border border-sand-300 dark:border-forest-700"
                  >
                    ሰርዝ (Cancel)
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-cream-50 text-sm font-bold shadow-xs"
                  >
                    በዳታቤዝ አስቀምጥ (Save)
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Table */}
          <div className="bg-white dark:bg-[#13221C] rounded-2xl border border-sand-300 dark:border-forest-800 overflow-x-auto shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-sand-200/80 dark:bg-[#182E25] text-forest-900 dark:text-cream-50 border-b border-sand-300 dark:border-forest-800 font-bold">
                <tr>
                  <th className="py-3 px-4">ፎቶ (Photo)</th>
                  <th className="py-3 px-4">ምግብ (Name)</th>
                  <th className="py-3 px-4">ምድብ (Category)</th>
                  <th className="py-3 px-4">ዋጋ (Price)</th>
                  <th className="py-3 px-4">ሁኔታ (Status)</th>
                  <th className="py-3 px-4 text-right">ድርጊት (Actions)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-200 dark:divide-forest-800">
                {menuItems.map((item) => {
                  const isEditing = editingItem && editingItem.id === item.id;
                  return (
                    <tr key={item.id} className="hover:bg-sand-100/50 dark:hover:bg-forest-900/40 transition-colors">
                      <td className="py-3 px-4">
                        {item.image ? (
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-forest-950 border border-sand-300 dark:border-forest-700 shadow-xs">
                            <img
                              src={item.image}
                              alt={item.name_am}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-sand-200 dark:bg-forest-800 text-charcoal-400 dark:text-sand-400 flex items-center justify-center border border-dashed border-sand-300 dark:border-forest-700">
                            <ImageIcon className="w-5 h-5" />
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 font-semibold text-forest-900 dark:text-cream-50">
                        <div>{item.name_am}</div>
                        <div className="text-xs text-charcoal-600 dark:text-sand-400">{item.name_en}</div>
                      </td>
                      <td className="py-3 px-4 text-xs font-medium text-charcoal-700 dark:text-sand-300">
                        {item.category_slug}
                      </td>
                      <td className="py-3 px-4">
                        {isEditing ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              className="w-24 px-2 py-1 rounded bg-cream-50 dark:bg-[#0B1712] border border-amber-500 font-bold text-sm text-charcoal-900 dark:text-cream-50"
                              value={editingItem.price}
                              onChange={e => setEditingItem({ ...editingItem, price: e.target.value })}
                            />
                            <button
                              onClick={() => handleUpdatePrice(item, editingItem.price)}
                              className="p-1 rounded bg-emerald-600 text-white"
                              title="አስቀምጥ"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingItem(null)}
                              className="p-1 rounded bg-sand-300 dark:bg-forest-800 text-charcoal-700 dark:text-sand-200"
                              title="ሰርዝ"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="font-bold tabular-nums text-forest-900 dark:text-amber-400">
                              {item.price.toLocaleString()} ብር
                            </span>
                            <button
                              onClick={() => setEditingItem({ id: item.id, price: item.price })}
                              className="p-1 text-charcoal-600 dark:text-sand-400 hover:text-amber-600 dark:hover:text-amber-300"
                              title="ዋጋ ቀይር"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleToggleAvailable(item)}
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            item.is_available
                              ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300/50 dark:border-emerald-700/50'
                              : 'bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 border border-rose-300/50 dark:border-rose-700/50'
                          }`}
                        >
                          {item.is_available ? 'አለ (Available)' : 'አልተገኘም (Sold Out)'}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDeleteItem(item)}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                          title="ሰርዝ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* RESERVATIONS TAB */}
      {activeTab === 'reservations' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-forest-900 dark:text-cream-50">
              {lang === 'am' ? 'በ SQLite የተቀመጡ የተያዙ ቦታዎች' : 'Reservations in SQLite'}
            </h2>
          </div>

          {reservations.length === 0 ? (
            <div className="bg-white dark:bg-[#13221C] rounded-2xl p-8 border border-sand-300 dark:border-forest-800 text-center text-charcoal-700 dark:text-cream-100 text-sm">
              እስካሁን ምንም የተያዘ ቦታ የለም። (No reservations registered yet).
            </div>
          ) : (
            <div className="bg-white dark:bg-[#13221C] rounded-2xl border border-sand-300 dark:border-forest-800 overflow-x-auto shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-sand-200/80 dark:bg-[#182E25] text-forest-900 dark:text-cream-50 border-b border-sand-300 dark:border-forest-800 font-bold">
                  <tr>
                    <th className="py-3 px-4">ስም (Name)</th>
                    <th className="py-3 px-4">ስልክ (Phone)</th>
                    <th className="py-3 px-4">ቀን እና ሰዓት</th>
                    <th className="py-3 px-4">የሰው ብዛት</th>
                    <th className="py-3 px-4">ማስታወሻ</th>
                    <th className="py-3 px-4">ሁኔታ</th>
                    <th className="py-3 px-4 text-right">ማስተካከያ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-200 dark:divide-forest-800">
                  {reservations.map((res) => (
                    <tr key={res.id} className="hover:bg-sand-100/50 dark:hover:bg-forest-900/40 transition-colors">
                      <td className="py-3 px-4 font-bold text-forest-900 dark:text-cream-50">{res.name}</td>
                      <td className="py-3 px-4 font-mono">
                        <a href={`tel:${res.phone}`} className="text-forest-800 dark:text-amber-400 hover:underline">
                          {res.phone}
                        </a>
                      </td>
                      <td className="py-3 px-4 font-medium text-charcoal-900 dark:text-cream-100">
                        {res.date} · {res.time}
                      </td>
                      <td className="py-3 px-4 text-charcoal-900 dark:text-cream-100">{res.guests} ሰው</td>
                      <td className="py-3 px-4 text-xs text-charcoal-600 dark:text-cream-200 max-w-xs truncate">
                        {res.notes || '—'}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          res.status === 'confirmed'
                            ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300/50 dark:border-emerald-700/50'
                            : res.status === 'cancelled'
                            ? 'bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 border border-rose-300/50 dark:border-rose-700/50'
                            : 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300/50 dark:border-amber-700/50'
                        }`}>
                          {res.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                        {res.status !== 'confirmed' && (
                          <button
                            onClick={() => handleReservationStatus(res.id, 'confirmed')}
                            className="px-2 py-1 rounded bg-emerald-700 text-cream-50 text-xs font-semibold hover:bg-emerald-600 shadow-xs"
                            title="አረጋግጥ"
                          >
                            ✓ አረጋግጥ
                          </button>
                        )}
                        {res.status !== 'completed' && res.status === 'confirmed' && (
                          <button
                            onClick={() => handleReservationStatus(res.id, 'completed')}
                            className="px-2 py-1 rounded bg-forest-800 text-cream-50 text-xs font-semibold hover:bg-forest-700 shadow-xs"
                            title="ተጠናቋል"
                          >
                            ተጠናቋል
                          </button>
                        )}
                        {res.status !== 'cancelled' && (
                          <button
                            onClick={() => handleReservationStatus(res.id, 'cancelled')}
                            className="px-2 py-1 rounded bg-sand-300 dark:bg-forest-800 text-charcoal-800 dark:text-sand-200 text-xs font-semibold hover:bg-rose-100 hover:text-rose-800"
                            title="ሰርዝ"
                          >
                            ሰርዝ
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
