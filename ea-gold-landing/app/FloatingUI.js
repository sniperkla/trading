'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import LanguageSwitcher from './LanguageSwitcher'
import { MessageCircle, Facebook, Send, Mail } from 'lucide-react'
import translations, { DEFAULT_LANG, SUPPORTED } from './i18n'

export default function FloatingUI() {
  const pathname = usePathname()
  // Hide on /register and /[lang]/register
  const isRegisterPage =
    pathname === '/register' || /^\/[a-z]{2}\/register$/.test(pathname)

  if (isRegisterPage) return null

  // Extract language from pathname - this will be reactive to route changes
  const getLangFromPathname = () => {
    const langMatch = pathname.match(/^\/(en|th|zh|hi|ru)/)
    if (langMatch && SUPPORTED.includes(langMatch[1])) {
      return langMatch[1]
    }
    
    // Fallback to browser language detection
    if (typeof window !== 'undefined') {
      const browserLang = (window.navigator.language || window.navigator.userLanguage || 'en').slice(0, 2)
      return SUPPORTED.includes(browserLang) ? browserLang : DEFAULT_LANG
    }
    
    return DEFAULT_LANG
  }

  const lang = getLangFromPathname()

  // Email copy popup state (shared for both desktop and mobile)
  const [copied, setCopied] = React.useState(false)
  const email = 'support@eamapa.com'
  const handleCopyEmail = async (e) => {
    if (e) e.preventDefault()
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      setCopied(false)
    }
  }
  return (
    <>
      {/* Language Switcher: bottom left on all screens */}
      <div className="fixed bottom-6 left-6 z-50">
        <LanguageSwitcher />
      </div>
      {/* Desktop: vertical contact sidebar; Mobile: floating button */}
      <div>
        {/* Desktop sidebar */}
        <div className="hidden lg:flex flex-col gap-3 fixed top-1/3 right-6 z-50 bg-white/10 border border-yellow-400/30 rounded-2xl shadow-2xl p-5 backdrop-blur-md min-w-[200px]">
          <a
            href="https://lin.ee/Vv8zh6d5"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow hover:from-green-400 hover:to-green-500 hover:scale-105 transition-all duration-300 text-base"
          >
            <MessageCircle className="w-5 h-5" />
            {translations[lang]?.line || 'LINE'}
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61578827489685"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow hover:from-blue-500 hover:to-blue-600 hover:scale-105 transition-all duration-300 text-base"
          >
            <Facebook className="w-5 h-5" />
            {translations[lang]?.facebook || 'Facebook'}
          </a>
          <a
            href="https://t.me/mapa_trading_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold rounded-xl shadow hover:from-cyan-400 hover:to-cyan-500 hover:scale-105 transition-all duration-300 text-base"
          >
            <Send className="w-5 h-5" />
            {translations[lang]?.telegram || 'Telegram'}
          </a>
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-xl shadow hover:from-yellow-300 hover:to-yellow-400 hover:scale-105 transition-all duration-300 text-base focus:outline-none"
            aria-label="Copy Email"
            type="button"
          >
            <Mail className="w-5 h-5 text-yellow-700" />
            {translations[lang]?.contact || 'Email'}
          </button>
        </div>
        {/* Mobile floating button */}
        <div
          className="fixed z-50 flex flex-col items-end gap-4 lg:hidden"
          style={{ top: '50%', right: '1.5rem', transform: 'translateY(-50%)' }}
        >
          <ContactSidebarMobile
            lang={lang}
            translations={translations}
            onCopyEmail={handleCopyEmail}
          />
        </div>
        {/* Copied popup - unified theme with main contact section */}
        {copied && (
          <div className="fixed left-1/2 bottom-28 z-[9999] -translate-x-1/2 bg-gradient-to-br from-yellow-400 to-yellow-600 text-black font-bold px-8 py-4 rounded-2xl shadow-2xl border-2 border-yellow-200 text-lg flex items-center gap-2 animate-fadeIn">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            {translations[lang]?.copied || 'Copied!'}
          </div>
        )}
      </div>
    </>
  )

  // Mobile-only contact sidebar as a floating expandable button
  function ContactSidebarMobile({ lang, translations, onCopyEmail }) {
    const [open, setOpen] = React.useState(false)
    // Collapse on outside click
    React.useEffect(() => {
      if (!open) return
      function handle(e) {
        if (!e.target.closest('.contact-sidebar-mobile-root')) setOpen(false)
      }
      document.addEventListener('mousedown', handle)
      document.addEventListener('touchstart', handle)
      return () => {
        document.removeEventListener('mousedown', handle)
        document.removeEventListener('touchstart', handle)
      }
    }, [open])
    return (
      <div className="relative contact-sidebar-mobile-root">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-xl border-4 border-white/30 focus:outline-none hover:scale-110 transition-transform"
          aria-label="Contact"
        >
          <Mail className="w-7 h-7 text-black" />
        </button>
        {open && (
          <div className="absolute bottom-16 right-0 flex flex-col gap-3 bg-white/95 border border-yellow-400/30 rounded-2xl shadow-2xl p-5 backdrop-blur-md animate-fadeIn min-w-[200px]">
            <a
              href="https://lin.ee/Vv8zh6d5"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow hover:from-green-400 hover:to-green-500 transition-all duration-300 text-base"
            >
              <MessageCircle className="w-5 h-5" />
              {translations[lang]?.line || 'LINE'}
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61578827489685"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow hover:from-blue-500 hover:to-blue-600 transition-all duration-300 text-base"
            >
              <Facebook className="w-5 h-5" />
              {translations[lang]?.facebook || 'Facebook'}
            </a>
            <a
              href="https://t.me/mapa_trading_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold rounded-xl shadow hover:from-cyan-400 hover:to-cyan-500 transition-all duration-300 text-base"
            >
              <Send className="w-5 h-5" />
              {translations[lang]?.telegram || 'Telegram'}
            </a>
            <button
              onClick={onCopyEmail}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-xl shadow hover:from-yellow-300 hover:to-yellow-400 hover:scale-105 transition-all duration-300 text-base focus:outline-none"
              aria-label="Copy Email"
              type="button"
            >
              <Mail className="w-5 h-5 text-yellow-700" />
              {translations[lang]?.contact || 'Email'}
            </button>
          </div>
        )}
      </div>
    )
  }
}
