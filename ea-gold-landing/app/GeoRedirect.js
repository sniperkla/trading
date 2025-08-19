"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SUPPORTED, DEFAULT_LANG } from './i18n';

export default function GeoRedirect() {
  const pathname = usePathname();

  useEffect(() => {
    // Only redirect if we're on the root path
    if (pathname !== '/') return;

    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const countryToLang = {
          'TH': 'th',
          'RU': 'ru',
          'IN': 'hi',
          'CN': 'zh',
          'HK': 'zh',
          'TW': 'zh',
        };

        const detectedLang = countryToLang[data.country_code] || 'en';
        window.location.href = `/${detectedLang}`;
      })
      .catch(() => {
        window.location.href = `/${DEFAULT_LANG}`;
      });
  }, [pathname]);

  return null;
}