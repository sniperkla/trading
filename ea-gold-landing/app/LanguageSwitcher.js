'use client'

import { useState, useRef, useEffect } from 'react'
import { SUPPORTED } from './i18n'
import { usePathname, useRouter } from 'next/navigation'

const FLAGS = {
  en: '/images/flags/en.png',
  th: '/images/flags/th.png',
  zh: '/images/flags/zh.png',
  hi: '/images/flags/hi.png',
  ru: '/images/flags/ru.png'
}

const LANG_LABELS = {
  en: 'English',
  th: 'ไทย',
  zh: '中文',
  hi: 'हिन्दी',
  ru: 'Русский'
}

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const pathname = usePathname()
  const router = useRouter()

  // Extract language from pathname
  const langMatch = pathname.match(/^\/(en|th|zh|hi|ru)/)
  let currentLang = langMatch ? langMatch[1] : null
  const pathWithoutLang = pathname.replace(/^\/(en|th|zh|hi|ru)/, '')

  const getBrowserLang = () => {
    if (typeof window === 'undefined') return 'en'
    const lang = navigator.language || navigator.userLanguage || 'en'
    if (lang.startsWith('th')) return 'th'
    if (lang.startsWith('en')) return 'en'
    if (lang.startsWith('zh')) return 'zh'
    if (lang.startsWith('hi')) return 'hi'
    if (lang.startsWith('ru')) return 'ru'
    return 'en'
  }

  // Detect browser language if not in URL
  useEffect(() => {
    if (!currentLang) {
      if (typeof window !== 'undefined') {
        const browserLang = (
          navigator.language ||
          navigator.userLanguage ||
          'en'
        ).slice(0, 2)
        const supportedLang = SUPPORTED.includes(browserLang)
          ? browserLang
          : 'en'
        router.replace(`/${supportedLang}${pathname}`)
      }
    }
    // eslint-disable-next-line
  }, [pathname])

  if (!currentLang) currentLang = getBrowserLang()

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Floating button with dropdown
  return (
    <div
      ref={ref}
      className="fixed z-50 bottom-6 right-6"
      style={{ minWidth: 56 }}
    >
      <button
        className="flex items-center gap-2 px-3 py-2 bg-white/90 hover:bg-yellow-200 rounded-full shadow-lg border border-gray-200 transition"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
      >
        <img
          src={FLAGS[currentLang] || FLAGS.en}
          alt={currentLang}
          className="w-6 h-6 rounded-full border"
        />
        <span className="font-semibold text-gray-800 hidden md:inline">
          {LANG_LABELS[currentLang] || currentLang}
        </span>
        <svg
          className="w-4 h-4 ml-1 text-gray-500"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 bottom-full mb-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 w-40 animate-fade-in">
          {SUPPORTED.map((lang) => (
            <button
              key={lang}
              className={`flex items-center w-full px-4 py-2 gap-2 hover:bg-yellow-100 transition text-left ${
                lang === currentLang ? 'font-bold bg-yellow-50' : ''
              }`}
              onClick={() => {
                setOpen(false)
                router.push(`/${lang}${pathWithoutLang}`)
              }}
            >
              <img
                src={FLAGS[lang]}
                alt={lang}
                className="w-5 h-5 rounded-full border"
              />
              <span>{LANG_LABELS[lang]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
