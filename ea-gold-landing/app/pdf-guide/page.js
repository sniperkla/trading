'use client'
import { useState, useEffect, Suspense } from 'react'
import {
  X,
  Mail,
  MessageCircle,
  Send,
  Download,
  ExternalLink
} from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { translations } from '../i18n'
import PDFViewer from '../PDFViewer'

function useLang() {
  const [lang, setLang] = useState('en')
  const searchParams = useSearchParams()

  useEffect(() => {
    // First, try to get language from URL parameters
    const urlLang = searchParams.get('lang')
    if (urlLang && ['en', 'th', 'zh', 'hi', 'ru'].includes(urlLang)) {
      setLang(urlLang)
      return
    }

    // Fallback to browser language detection
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
    setLang(getBrowserLang())
  }, [searchParams])

  return lang
}

function PDFGuidePageContent() {
  const router = useRouter()
  const lang = useLang()
  const [copied, setCopied] = useState(false)
  const referralCode = 'BsFPM765'

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Use different PDF for Thai language
  const publicPDFUrl = lang === 'th' ? '/pdfs/th.pdf' : '/pdfs/en.pdf'

  return (
    <>
      {/* Improved PDF Modal */}
      <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center px-2 py-4 sm:p-0">
        <div className="relative w-full max-w-2xl md:max-w-3xl bg-slate-900 rounded-2xl shadow-2xl border border-white/10 flex flex-col max-h-[95vh] mx-auto overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-white/10 bg-slate-900/90 sticky top-0 z-10">
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-400 truncate">
                {translations[lang].vantageGuide}
              </h3>
              {/* Mobile Layout - Stacked */}
              <div className="sm:hidden flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-yellow-300 font-semibold">
                  <span> {translations[lang].yourReferral}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-yellow-400 text-black font-mono px-3 py-2 rounded font-bold text-sm">
                    {referralCode}
                  </span>
                  <button
                    onClick={handleCopyReferral}
                    className="px-3 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded transition-all text-sm"
                  >
                    {copied ? translations[lang].copied : translations[lang].copyReferral}
                  </button>
                </div>
              </div>
              {/* Desktop Layout - Inline */}
              <div className="hidden sm:flex sm:items-center gap-2 text-sm text-yellow-300 font-semibold">
                <span>{translations[lang].yourReferral}</span>
                <span className="bg-yellow-400 text-black font-mono px-2 py-1 rounded">
                  {referralCode}
                </span>
                <button
                  onClick={handleCopyReferral}
                  className="ml-2 px-2 py-1 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded transition-all text-xs"
                >
                  {copied
                    ? translations[lang].copied
                    : translations[lang].copyReferral}
                </button>
              </div>
            </div>
            <button
              onClick={() => router.back()}
              className="p-2 sm:p-3 bg-black/30 hover:bg-yellow-400/20 rounded-full transition-colors focus:outline-none flex-shrink-0 ml-2"
              aria-label="Close PDF Guide"
            >
              <X className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
            </button>
          </div>
          <div className="w-full text-xs sm:text-sm text-yellow-200 text-center font-normal p-2 sm:p-3 bg-black/30">
            {translations[lang].referralNote}
          </div>

          {/* PDF Viewer */}
          <div className="flex-1 w-full overflow-auto flex flex-col items-center justify-center bg-slate-900">
            <PDFViewer
              pdfUrl={publicPDFUrl}
              showPDF={true}
              onClose={() => router.back()}
              lang={lang}
              translations={translations}
            />
          </div>
          {/* Actions Row */}
          <div className="flex flex-col items-center justify-center gap-3 p-3 sm:p-4 border-t border-white/10 bg-slate-900/90">
            <a
              href="https://vigco.co/uyYRJz"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-xl sm:rounded-2xl shadow-lg hover:from-blue-400 hover:to-blue-600 hover:scale-105 transition-all duration-300 text-base sm:text-lg text-center border-2 border-blue-400/60 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              {translations[lang].openAccount}
            </a>
          </div>
          {/* Support Section */}
          <div className="p-3 sm:p-4 border-t border-white/10 bg-slate-900/95">
            <div className="flex flex-col items-center gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 sm:w-7 sm:h-7 text-yellow-300" />
                <span className="font-bold text-yellow-300 text-sm sm:text-md text-center">
                  {translations[lang].supportSection.title}
                </span>
              </div>
            </div>
            <p className="text-gray-200 text-xs sm:text-sm mb-2 text-center sm:text-left">
              <span className="font-semibold text-yellow-200">
                {translations[lang].supportSection.important}
              </span>{' '}
              {translations[lang].supportSection.instruction}
            </p>
            <p className="text-gray-200 text-xs sm:text-sm mb-3 text-center sm:text-left">
              {translations[lang].supportSection.sendVia}{' '}
              <a
                href="mailto:support@eamapa.com"
                className="text-yellow-400 underline break-all"
              >
                support@eamapa.com
              </a>{' '}
              {translations[lang].supportSection.orContact}
            </p>
            <div className="flex flex-col gap-2 items-center w-full">
              {lang === 'th' ? (
                <a
                  href="https://lin.ee/Vv8zh6d5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all duration-300 shadow w-full sm:w-auto min-h-[44px]"
                >
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                  <span>ติดต่อ LINE OA</span>
                </a>
              ) : (
                <a
                  href="https://t.me/mapa_trading_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl transition-all duration-300 shadow w-full sm:w-auto min-h-[44px]"
                >
                  <Send className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                  <span>{translations[lang].supportSection.telegramBtn}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function LoadingFallback() {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
        <p className="text-yellow-400 font-semibold">Loading...</p>
      </div>
    </div>
  )
}

export default function PDFGuidePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PDFGuidePageContent />
    </Suspense>
  )
}
