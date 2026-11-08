import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function StatusPill({ className = '' }) {
  const { lang, t } = useLanguage();
  const [status, setStatus] = useState({
    isOpen: true,
    currentTime: '12:00',
    closesAt: '22:00',
    opensAt: '08:00'
  });

  const checkStatus = () => {
    try {
      const now = new Date();
      // Africa/Addis_Ababa is UTC+3
      const options = { timeZone: 'Africa/Addis_Ababa', hour12: false, hour: '2-digit', minute: '2-digit' };
      const formatter = new Intl.DateTimeFormat([], options);
      const parts = formatter.format(now).split(':');
      const hour = parseInt(parts[0], 10);
      const min = parseInt(parts[1], 10);
      const totalMins = hour * 60 + min;

      const openMins = 8 * 60;   // 08:00
      const closeMins = 22 * 60; // 22:00

      const isOpen = totalMins >= openMins && totalMins < closeMins;

      setStatus({
        isOpen,
        currentTime: `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`,
        closesAt: '22:00',
        opensAt: '08:00'
      });
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs sm:text-sm font-medium border transition-all ${
        status.isOpen
          ? 'bg-emerald-50 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-700/60'
          : 'bg-rose-50 text-rose-900 border-rose-300 dark:bg-rose-950/60 dark:text-rose-200 dark:border-rose-700/60'
      } ${className}`}
      role="status"
    >
      <span className="relative flex h-2 w-2">
        {status.isOpen && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            status.isOpen ? 'bg-emerald-600' : 'bg-rose-600'
          }`}
        ></span>
      </span>
      <span>
        {status.isOpen
          ? lang === 'am'
            ? `አሁን ክፍት ነው · ${status.closesAt} ይዘጋል`
            : `Open Now · Closes at ${status.closesAt}`
          : lang === 'am'
          ? `አሁን ተዘግቷል · ${status.opensAt} ይከፈታል`
          : `Closed Now · Opens at ${status.opensAt}`}
      </span>
    </div>
  );
}
