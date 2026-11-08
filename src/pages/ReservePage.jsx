import React, { useState } from 'react';
import {
  MessageCircle,
  Phone,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Copy,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import StatusPill from '../components/StatusPill';

export default function ReservePage() {
  const { lang, t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '18:00',
    guests: '2',
    notes: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [encodedMsg, setEncodedMsg] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage(
        lang === 'am' ? 'እባክዎ ስምዎን እና ስልክ ቁጥርዎን ያስገቡ' : 'Please provide your name and phone number.'
      );
      return;
    }

    setSubmitting(true);

    try {
      // 1. Save to SQLite database via backend API
      await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (err) {
      console.warn('Could not save reservation to local server:', err);
    }

    // 2. Build WhatsApp formatted message per spec §11.7
    const msg = `ሰላም! ሒክማ አረብያን ሬስቶራንት ቦታ ማስያዝ እፈልጋለሁ።

ስም: ${formData.name}
ስልክ: ${formData.phone}
ቀን: ${formData.date}
ሰዓት: ${formData.time}
የሰው ብዛት: ${formData.guests}
${formData.notes ? `ማስታወሻ: ${formData.notes}\n` : ''}
(ከዌብሳይት ተልኳል)`;

    const waUrl = `https://wa.me/251991589097?text=${encodeURIComponent(msg)}`;
    setEncodedMsg(msg);
    setSubmitted(true);
    setSubmitting(false);

    // 3. Open WhatsApp in new window
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const copyMessage = () => {
    navigator.clipboard.writeText(encodedMsg);
    alert(lang === 'am' ? 'መልእክቱ ተገልብጧል!' : 'Message copied to clipboard!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="flex items-center justify-center gap-2 mb-2">
          <StatusPill />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-forest-900 dark:text-cream-50 tracking-tight">
          {t('reserve.title')}
        </h1>
        <p className="text-sm sm:text-base text-charcoal-600 dark:text-cream-100">
          {t('reserve.subtitle')}
        </p>
      </div>

      {submitted ? (
        // Confirmation View
        <div className="bg-emerald-50 dark:bg-[#0E2A20] rounded-3xl p-8 sm:p-10 border border-emerald-300 dark:border-emerald-800 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-emerald-950 dark:text-emerald-300">
              {lang === 'am' ? 'WhatsApp ተከፍቷል!' : 'WhatsApp Opened!'}
            </h2>
            <p className="text-sm sm:text-base text-emerald-800 dark:text-emerald-200 max-w-lg mx-auto leading-relaxed">
              {lang === 'am'
                ? 'በ WhatsApp መስኮት ላይ «Send» ወይም «ላክ» የሚለውን ይጫኑ። የሒክማ ቡድን በአጭር ጊዜ ውስጥ ቦታዎን ያረጋግጥልዎታል።'
                : 'Please press "Send" in WhatsApp. Our team will promptly confirm your table reservation.'}
            </p>
          </div>

          <div className="bg-white dark:bg-[#13221C] rounded-2xl p-4 sm:p-6 text-left max-w-md mx-auto border border-emerald-200 dark:border-forest-700 text-xs sm:text-sm font-mono whitespace-pre-line text-charcoal-800 dark:text-cream-100">
            {encodedMsg}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={copyMessage}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sand-200 dark:bg-[#182E25] hover:bg-sand-300 dark:hover:bg-forest-800 text-forest-900 dark:text-cream-100 font-semibold text-sm transition-colors border border-sand-300 dark:border-forest-700"
            >
              <Copy className="w-4 h-4" />
              <span>{lang === 'am' ? 'መልእክቱን ገልብጥ' : 'Copy Message'}</span>
            </button>

            <a
              href="tel:+251991589097"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-forest-800 dark:bg-amber-500 hover:bg-forest-700 dark:hover:bg-amber-400 text-cream-50 dark:text-charcoal-900 font-semibold text-sm transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4 text-amber-400 dark:text-charcoal-900" />
              <span>0991 589 097</span>
            </a>

            <button
              onClick={() => setSubmitted(false)}
              className="text-xs text-charcoal-600 dark:text-sand-300 underline block w-full mt-2"
            >
              {lang === 'am' ? 'ሌላ ቦታ ያስይዙ' : 'Make Another Reservation'}
            </button>
          </div>
        </div>
      ) : (
        // Reservation Form
        <div className="bg-white dark:bg-[#13221C] rounded-3xl p-6 sm:p-10 border border-sand-300 dark:border-forest-800 shadow-md">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/70 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-forest-900 dark:text-cream-100 mb-2">
                  {t('reserve.name')} *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={lang === 'am' ? 'ሙሉ ስምዎን ያስገቡ' : 'e.g. Ahmed Mohammed'}
                  className="w-full px-4 py-3 rounded-xl bg-cream-50 dark:bg-[#0B1712] border border-sand-300 dark:border-forest-700 text-charcoal-900 dark:text-cream-50 placeholder:text-charcoal-400 dark:placeholder:text-sand-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-bold text-forest-900 dark:text-cream-100 mb-2">
                  {t('reserve.phone')} *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0991..."
                  className="w-full px-4 py-3 rounded-xl bg-cream-50 dark:bg-[#0B1712] border border-sand-300 dark:border-forest-700 text-charcoal-900 dark:text-cream-50 placeholder:text-charcoal-400 dark:placeholder:text-sand-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Date */}
              <div>
                <label className="block text-sm font-bold text-forest-900 dark:text-cream-100 mb-2">
                  {t('reserve.date')} *
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-cream-50 dark:bg-[#0B1712] border border-sand-300 dark:border-forest-700 text-charcoal-900 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-bold text-forest-900 dark:text-cream-100 mb-2">
                  {t('reserve.time')} *
                </label>
                <input
                  type="time"
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-cream-50 dark:bg-[#0B1712] border border-sand-300 dark:border-forest-700 text-charcoal-900 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>

              {/* Guests */}
              <div>
                <label className="block text-sm font-bold text-forest-900 dark:text-cream-100 mb-2">
                  {t('reserve.guests')} *
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-cream-50 dark:bg-[#0B1712] border border-sand-300 dark:border-forest-700 text-charcoal-900 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map(n => (
                    <option key={n} value={n} className="bg-white dark:bg-[#13221C] text-charcoal-900 dark:text-cream-50">
                      {n} {lang === 'am' ? 'ሰው' : 'People'}
                    </option>
                  ))}
                  <option value="20+" className="bg-white dark:bg-[#13221C] text-charcoal-900 dark:text-cream-50">{lang === 'am' ? 'ከ 20 ሰው በላይ (ትልቅ ቡድን)' : '20+ (Large Group)'}</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-bold text-forest-900 dark:text-cream-100 mb-2">
                {t('reserve.notes')}
              </label>
              <textarea
                name="notes"
                rows="3"
                value={formData.notes}
                onChange={handleChange}
                placeholder={lang === 'am' ? 'ልዩ የቤተሰብ ክፍል፣ የልደት ዝግጅት ወይም ተጨማሪ ፍላጎት ካለዎት ይጥቀሱ...' : 'Family section preference, celebration, special dietary requirements...'}
                className="w-full px-4 py-3 rounded-xl bg-cream-50 dark:bg-[#0B1712] border border-sand-300 dark:border-forest-700 text-charcoal-900 dark:text-cream-50 placeholder:text-charcoal-400 dark:placeholder:text-sand-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
              ></textarea>
            </div>

            {/* Submit Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:flex-1 py-4 px-6 rounded-full bg-emerald-600 hover:bg-emerald-500 text-cream-50 font-bold text-base shadow-md transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 text-emerald-200" />
                <span>{submitting ? 'በመላክ ላይ...' : t('reserve.submitWhatsApp')}</span>
              </button>

              <a
                href="tel:+251991589097"
                className="w-full sm:w-auto py-4 px-6 rounded-full border-2 border-forest-800 dark:border-forest-600 text-forest-800 dark:text-cream-100 hover:bg-sand-200 dark:hover:bg-forest-800 font-bold text-sm sm:text-base transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>0991 589 097</span>
              </a>
            </div>

            <p className="text-xs text-charcoal-600 dark:text-sand-400 text-center pt-2">
              🔒 {lang === 'am' ? 'ይህ ቅጽ በ WhatsApp ቀጥታ ይላካል፤ ለደህንነትዎ ምንም የክፍያ መረጃ አይጠየቅም።' : 'This form generates a pre-filled WhatsApp message. No payment info required.'}
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
