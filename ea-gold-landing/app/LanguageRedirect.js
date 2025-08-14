"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LanguageRedirect(lang) {
  const router = useRouter();
  console.log("this is lang"    , lang);
  useEffect(() => {
    const lang = navigator.language || navigator.userLanguage;
    if (lang.startsWith('th')) router.replace('/th');
    else if (lang.startsWith('ru')) router.replace('/ru');
    else if (lang.startsWith('zh')) router.replace('/zh');
    else if (lang.startsWith('hi')) router.replace('/hi');
    else router.replace('/en');
  }, [router]);

  return null; // or a loading spinner
}