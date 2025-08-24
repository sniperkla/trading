'use client'

import React, { useState, useEffect, useRef } from 'react'
import MCBCarousel from './MCBCarousel'
import translations from './i18n'
import VideoSlider2 from './VideoSlider2'
import DownloadCarousel2 from './DownloadCarousel'
import PDFViewer from './PDFViewerWrapper'
import {
  ChevronDown,
  TrendingUp,
  Shield,
  Zap,
  Users,
  Star,
  Download,
  Menu,
  X,
  CheckCircle,
  BarChart3,
  Globe,
  Award,
  FileText,
  Volume2,
  CheckCircle2Icon,
  MessageCircle, // <-- add this
  Facebook, // <-- add this
  Send,
  Mail // <-- add this
} from 'lucide-react'
function useLang() {
  const [lang, setLang] = useState('en')
  useEffect(() => {
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
  }, [])
  return lang
}

function useVisibleSection() {
  const [isVisible, setIsVisible] = useState({})
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }))
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])
  return isVisible
}

export default function TradingEALanding({ forcedLang }) {
  const lang = forcedLang || useLang()

  const [showPDFGuide, setShowPDFGuide] = useState(false)
  const [copied, setCopied] = useState(false)
  const [fullscreenPDF, setFullscreenPDF] = useState(false) // <-- add this
  const referralCode = 'BsFPM765'

  // Email copy state and handler for contact section
  const [emailCopied, setEmailCopied] = useState(false)
  const handleCopyEmail = async (e) => {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText('support@eamapa.com')
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 1500)
    } catch (err) {
      setEmailCopied(false)
    }
  }

  // Bot Instruction Tabs State
  const [activeBot, setActiveBot] = useState('MCB')

  // Bot instruction content
  const botInstructions = {
    MCB: (
      <div className="bg-black/40 rounded-xl p-6 border border-yellow-400/30 text-lg text-white text-center">
        <div className="text-2xl font-bold text-yellow-300 mb-2">
          {translations[lang].botInstructionMCB.name}
        </div>
        <div>
          {translations[lang].botInstructionMCB.desc1}{' '}
          <span className="font-bold text-yellow-400">
            {translations[lang].botInstructionMCB.amount}
          </span>{' '}
          <span className="text-xs text-gray-300">CENT/USD</span>{' '}
          {translations[lang].botInstructionMCB.desc2}{' '}
          <span className="font-bold text-yellow-400">
            {translations[lang].botInstructionMCB.lot}
          </span>
        </div>
        <div>
          {translations[lang].botInstructionMCB.profit}{' '}
          <span className="font-bold text-green-400">
            {translations[lang].botInstructionMCB.percent}
          </span>{' '}
          {translations[lang].botInstructionMCB.perDay}
        </div>
      </div>
    ),
    SUPERT: (
      <div className="bg-black/40 rounded-xl p-6 border border-yellow-400/30 text-lg text-white text-center">
        <div className="text-2xl font-bold text-yellow-300 mb-2">
          {translations[lang].botInstructionSupert.name}
        </div>
        <div>
          {translations[lang].botInstructionSupert.desc1}{' '}
          <span className="font-bold text-yellow-400">
            {translations[lang].botInstructionSupert.amount}
          </span>{' '}
          <span className="text-xs text-gray-300">CENT/USD</span>{' '}
          {translations[lang].botInstructionSupert.desc2}{' '}
          <span className="font-bold text-yellow-400">
            {translations[lang].botInstructionSupert.lot}
          </span>
        </div>
        <div>
          {translations[lang].botInstructionSupert.profit}{' '}
          <span className="font-bold text-green-400">
            {translations[lang].botInstructionSupert.percent}
          </span>{' '}
          {translations[lang].botInstructionSupert.perDay}
        </div>
      </div>
    ),
    RUNTIME: (
      <div className="bg-black/40 rounded-xl p-6 border border-yellow-400/30 text-lg text-white text-center">
        <div className="text-2xl font-bold text-yellow-300 mb-2">
          {translations[lang].botInstructionRuntime.name}
        </div>
        <div className="text-yellow-400 text-xl">
          {translations[lang].botInstructionComingSoon}
        </div>
      </div>
    ),
    SUPERSW: (
      <div className="bg-black/40 rounded-xl p-6 border border-yellow-400/30 text-lg text-white text-center">
        <div className="text-2xl font-bold text-yellow-300 mb-2">
          {translations[lang].botInstructionSupersw.name}
        </div>
        <div className="text-yellow-400 text-xl">
          {translations[lang].botInstructionComingSoon}
        </div>
      </div>
    )
  }

  // BotInstructionTabs component
  function BotInstructionTabs() {
    const bots = [
      {
        key: 'MCB',
        label: translations[lang].botInstructionMCB.name,
        desc: `${translations[lang].botInstructionMCB.desc1} ${translations[lang].botInstructionMCB.amount} ${translations[lang].botInstructionMCB.desc2} ${translations[lang].botInstructionMCB.lot} | ${translations[lang].botInstructionMCB.profit} ${translations[lang].botInstructionMCB.percent} ${translations[lang].botInstructionMCB.perDay}`
      },
      {
        key: 'SUPERT',
        label: translations[lang].botInstructionSupert.name,
        desc: translations[lang].botInstructionComingSoon
      },
      {
        key: 'RUNTIME',
        label: translations[lang].botInstructionRuntime.name,
        desc: translations[lang].botInstructionComingSoon
      },
      {
        key: 'SUPERSW',
        label: translations[lang].botInstructionSupersw.name,
        desc: translations[lang].botInstructionComingSoon
      }
    ]
    return (
      <div>
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {bots.map((bot) => (
            <button
              key={bot.key}
              onClick={() => setActiveBot(bot.key)}
              className={`px-6 py-2 rounded-full font-bold border-2 transition-all duration-200 text-lg focus:outline-none
                ${
                  activeBot === bot.key
                    ? 'bg-yellow-400 text-black border-yellow-400 shadow-lg scale-105'
                    : 'bg-black/40 text-yellow-300 border-yellow-400/40 hover:bg-yellow-400/20 hover:text-yellow-400'
                }
              `}
            >
              {bot.label}
            </button>
          ))}
        </div>
        <div>{botInstructions[activeBot]}</div>
      </div>
    )
  }

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000) // รีเซ็ตหลัง 2 วิ
  }

  // Use different PDF for Thai language
  const publicPDFUrl = lang === 'th' ? '/pdfs/th.pdf' : '/pdfs/en.pdf'

  const isVisible = useVisibleSection() // ใช้ custom hook

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const stats = [
    { number: '50K+', label: translations[lang].activeTraders, icon: Users },
    {
      number: '98.7%',
      label: translations[lang].successRate,
      icon: TrendingUp
    },
    { number: '24/7', label: translations[lang].autoTrading, icon: Zap },
    { number: '100%', label: translations[lang].freeForeverShort, icon: Award }
  ]

  const features = [
    {
      icon: BarChart3,
      title: translations[lang].advancedAI,
      description: translations[lang].aiDesc
    },
    {
      icon: Shield,
      title: translations[lang].riskManagement,
      description: translations[lang].riskDesc
    },
    {
      icon: Globe,
      title: translations[lang].multiBroker,
      description: translations[lang].multiBrokerDesc
    },
    {
      icon: Zap,
      title: translations[lang].fastExecution,
      description: translations[lang].fastExecutionDesc
    }
  ]

  const testimonials = [
    {
      name: translations[lang].testi1Name,
      role: translations[lang].testi1Role,
      rating: 5,
      text: translations[lang].testi1Text
    },
    {
      name: translations[lang].testi2Name,
      role: translations[lang].testi2Role,
      rating: 5,
      text: translations[lang].testi2Text
    },
    {
      name: translations[lang].testi3Name,
      role: translations[lang].testi3Role,
      rating: 5,
      text: translations[lang].testi3Text
    }
  ]

  const sections = [
    { id: 'features', label: translations[lang].features },
    { id: 'stats', label: translations[lang].performance },
    { id: 'testimonials', label: translations[lang].reviews },
    { id: 'download', label: translations[lang].download },
    { id: 'instruction', label: translations[lang].instruction },
    { id: 'contact', label: translations[lang].contact }
  ]
  // --- ContactSidebar component ---

  return (
    <>
      {/* <ContactSidebar lang={lang} translations={translations} /> */}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
        {/* Animated SVG Background */}
        <svg
          className="fixed inset-0 w-full h-full z-0 pointer-events-none"
          style={{ opacity: 0.18 }}
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="goldGlow" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="purpleWave" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <circle cx="80%" cy="20%" r="300" fill="url(#goldGlow)">
            <animate
              attributeName="r"
              values="300;340;300"
              dur="6s"
              repeatCount="indefinite"
            />
          </circle>
          <ellipse cx="20%" cy="80%" rx="220" ry="80" fill="url(#purpleWave)">
            <animate
              attributeName="rx"
              values="220;260;220"
              dur="8s"
              repeatCount="indefinite"
            />
          </ellipse>
          <ellipse
            cx="50%"
            cy="50%"
            rx="180"
            ry="60"
            fill="#fff8e1"
            fillOpacity="0.08"
          >
            <animate
              attributeName="ry"
              values="60;90;60"
              dur="7s"
              repeatCount="indefinite"
            />
          </ellipse>
        </svg>
        {/* Navigation */}
        {/* <nav className="relative z-50 p-4 sm:p-6">
            <div className="container mx-auto flex justify-between items-center px-0 max-w-7xl">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-black" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                  EA MAPA
                </span>
              </div>

              <div className="hidden md:flex flex-wrap gap-x-6 gap-y-2">
                <a
                  href="#features"
                  className="hover:text-yellow-400 transition-colors"
                >
                  {translations[lang].features}
                </a>
                <a
                  href="#stats"
                  className="hover:text-yellow-400 transition-colors"
                >
                  {translations[lang].performance}
                </a>
                <a
                  href="#whychoose"
                  className="hover:text-yellow-400 transition-colors"
                >
                  {translations[lang].reviews}
                </a>
                <a
                  href="#download"
                  className="hover:text-yellow-400 transition-colors"
                >
                  {translations[lang].download}
                </a>
                <a
                  href="#instruction"
                  className="hover:text-yellow-400 transition-colors"
                >
                  {translations[lang].instruction}
                </a>
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-white/10 backdrop-blur-sm focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-7 h-7" />
                ) : (
                  <Menu className="w-7 h-7" />
                )}
              </button>
            </div>

            {isMenuOpen && (
              <div className="md:hidden absolute top-full left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-t border-white/10 rounded-b-2xl shadow-xl max-h-[80vh] overflow-y-auto animate-fadeIn">
                <div className="flex flex-col items-center py-4 gap-2">
                  <a
                    href="#features"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-base font-bold py-2 px-6 rounded-full hover:bg-yellow-400/10 hover:text-yellow-400 transition-colors w-11/12 text-center"
                  >
                    {translations[lang].features}
                  </a>
                  <a
                    href="#stats"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-base font-bold py-2 px-6 rounded-full hover:bg-yellow-400/10 hover:text-yellow-400 transition-colors w-11/12 text-center"
                  >
                    {translations[lang].performance}
                  </a>
                  <a
                    href="#testimonials"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-base font-bold py-2 px-6 rounded-full hover:bg-yellow-400/10 hover:text-yellow-400 transition-colors w-11/12 text-center"
                  >
                    {translations[lang].reviews}
                  </a>
                  <a
                    href="#download"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-base font-bold py-2 px-6 rounded-full hover:bg-yellow-400/10 hover:text-yellow-400 transition-colors w-11/12 text-center"
                  >
                    {translations[lang].download}
                  </a>
                  <a
                    href="#instruction"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-base font-bold py-2 px-6 rounded-full hover:bg-yellow-400/10 hover:text-yellow-400 transition-colors w-11/12 text-center"
                  >
                    {translations[lang].instruction}
                  </a>
                </div>
              </div>
            )}
          </nav> */}
        <ScrollSpyDropdown
          sections={sections}
          translations={translations}
          lang={lang}
          isVisible={isVisible}
        />

        {showPDFGuide && (
          <>
            {/* Improved PDF Modal */}
            <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center px-2 py-4 sm:p-0">
              <div className="relative w-full max-w-2xl md:max-w-3xl bg-slate-900 rounded-2xl shadow-2xl border border-white/10 flex flex-col max-h-[95vh] mx-auto overflow-hidden">
                {/* Referral Note Above PDF */}

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10 bg-slate-900/90 sticky top-0 z-10">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-yellow-400">
                      {translations[lang].vantageGuide}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-yellow-300 font-semibold">
                      {translations[lang].yourReferral}
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
                    {/* Removed duplicate referral note above the code */}
                  </div>
                  <button
                    onClick={() => setShowPDFGuide(false)}
                    className="p-2 sm:p-3 bg-black/30 hover:bg-yellow-400/20 rounded-full transition-colors focus:outline-none"
                    aria-label="Close PDF Guide"
                  >
                    <X className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </button>
                </div>
                <div className="w-full text-xs text-yellow-200 text-center font-normal p-2 bg-black/30">
                  {translations[lang].referralNote}
                </div>
                {/* PDF Viewer */}
                <div className="flex-1 w-full overflow-auto flex flex-col items-center justify-center bg-slate-900">
                  <PDFViewer
                    pdfUrl={publicPDFUrl}
                    showPDF={true}
                    onClose={() => setShowPDFGuide(false)}
                    lang={lang}
                    translations={translations}
                  />
                </div>
                {/* Actions Row (Desktop) */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 p-4 border-t border-white/10 bg-slate-900/90">
                  <a
                    href="https://vigco.co/uyYRJz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-2xl shadow-lg hover:from-blue-400 hover:to-blue-600 hover:scale-105 transition-all duration-300 text-lg text-center mb-2 sm:mb-0 border-2 border-blue-400/60 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    style={{ fontSize: '1.35rem', letterSpacing: '0.02em' }}
                  >
                    {translations[lang].openAccount}
                  </a>
                </div>
                {/* Support Section */}
                <div className="p-4 border-t border-white/10 bg-slate-900/95">
                  <div className="flex flex-col sm:flex-row items-center gap-3 mb-2">
                    <Mail className="w-7 h-7 text-yellow-300" />
                    <span className="font-bold text-yellow-300 text-md">
                      {translations[lang].supportSection.title}
                    </span>
                  </div>
                  <p className="text-gray-200 text-xs mb-2">
                    <span className="font-semibold text-yellow-200">
                      {translations[lang].supportSection.important}
                    </span>{' '}
                    {translations[lang].supportSection.instruction}
                  </p>
                  <p className="text-gray-200 text-xs mb-2">
                    {translations[lang].supportSection.sendVia}{' '}
                    <a
                      href="mailto:support@eamapa.com"
                      className="text-yellow-400 underline"
                    >
                      support@eamapa.com
                    </a>{' '}
                    {translations[lang].supportSection.orContact}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-2 sm:gap-4 w-full sm:w-auto mt-2">
                    {lang === 'th' ? (
                      <a
                        href="https://lin.ee/Vv8zh6d5"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all duration-300 shadow"
                      >
                        <MessageCircle className="w-6 h-6" />
                        ติดต่อ LINE OA
                      </a>
                    ) : (
                      <a
                        href="https://t.me/mapa_trading_bot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl transition-all duration-300 shadow"
                      >
                        <Send className="w-6 h-6" />
                        {translations[lang].supportSection.telegramBtn}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Fullscreen PDF for mobile */}
            {fullscreenPDF && (
              <div className="fixed inset-0 z-[999] bg-black flex flex-col">
                <div className="flex justify-end p-2">
                  <button
                    onClick={() => setFullscreenPDF(false)}
                    className="p-2 bg-black/60 rounded-full hover:bg-yellow-400/20 transition"
                  >
                    <X className="w-8 h-8 text-white" />
                  </button>
                </div>
                <iframe
                  src={`https://docs.google.com/gview?url=${encodeURIComponent(
                    publicPDFUrl
                  )}&embedded=true`}
                  width="100%"
                  height="100%"
                  style={{ border: 'none', flex: 1, minHeight: '80vh' }}
                  title="PDF Fullscreen"
                  className="w-full h-full"
                />
                {/* Support section with responsive text size */}
                <div className="bg-black/80 px-2 py-1 text-center flex flex-col items-center gap-1 text-xs sm:text-sm">
                  <span className="font-semibold">
                    {translations[lang].supportSection.title}
                  </span>
                  <span>
                    <a
                      href="mailto:support@eamapa.com"
                      className="underline text-yellow-300"
                    >
                      support@eamapa.com
                    </a>
                    {' · '}
                    <a
                      href={
                        lang === 'th'
                          ? 'https://lin.ee/Vv8zh6d5'
                          : 'https://t.me/mapa_trading_bot'
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-yellow-300"
                    >
                      {lang === 'th' ? 'LINE OA' : 'Telegram'}
                    </a>
                  </span>
                </div>
              </div>
            )}
          </>
        )}

        {/* Hero Section */}
        {/* Hero Section */}
        <section
          id="hero"
          className="relative z-10 container mx-auto px-6 pt-20 pb-10 max-w-7xl overflow-hidden"
        >
          <div className="text-center max-w-5xl mx-auto relative">
            {/* Animated background elements */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-700"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div
              className={`transform transition-all duration-1000 ${
                isVisible.hero
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="relative">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight filter drop-shadow-lg">
                  <span className="bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent animate-gradient-x">
                    {translations[lang].freeEA}
                  </span>
                  <br />
                  <span className="text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text">
                    {translations[lang].tradingAI}
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                  {translations[lang].automate}
                  <span className="text-yellow-400 font-semibold animate-pulse">
                    {' '}
                    {translations[lang].freeForever}
                  </span>
                </p>

                {/* Quick stats */}
                <div className="flex flex-wrap justify-center gap-6 mt-12">
                  <div className="bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full border border-yellow-400/30 flex items-center gap-2">
                    <Users className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-100">
                      50K+ {translations[lang]?.activeUsers || 'Active Users'}
                    </span>
                  </div>
                  <div className="bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full border border-yellow-400/30 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-100">
                      98.7% {translations[lang]?.successRate || 'Success Rate'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Demo Section - Separate from Hero */}
        <section id="video-demo" className="relative z-10 py-4">
          <div className="container mx-auto px-6 flex flex-col items-center max-w-5xl">
            <VideoSlider2 />
          </div>
        </section>

        {/* Broker Guide Section - Redesigned */}
        <section id="broker-guide" className="relative z-10 py-20">
          <div className="container mx-auto px-6 text-center max-w-6xl">
            {/* Animated background elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
              <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent animate-gradient-x">
                  {translations[lang].getBrokerReady}
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                {translations[lang].setupGuide}
              </p>
              {/* Referral Code Section */}
              <div className="p-4 relative max-w-2xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-yellow-300/20 to-yellow-400/20 rounded-3xl blur-xl group-hover:scale-105 transition-transform duration-300"></div>
                <button
                  onClick={handleCopyReferral}
                  className="relative w-full flex flex-col items-center justify-center focus:outline-none group bg-black/60 backdrop-blur-md p-8 rounded-3xl border border-yellow-400/30"
                >
                  <div className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent mb-4">
                    {translations[lang].useReferral}
                  </div>
                  <div className="text-yellow-200 text-center font-medium text-lg mb-2">
                    {translations[lang].referralNote}
                  </div>
                  <div className="text-3xl md:text-5xl font-mono font-black text-yellow-400 tracking-wider mb-4 group-hover:scale-110 transition-transform duration-300">
                    {referralCode}
                  </div>
                  {copied && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-bounce">
                      {translations[lang].copied}
                    </div>
                  )}
                </button>
              </div>
              {/* Steps Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* Step 1 (was Step 2) */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-2xl blur-xl group-hover:scale-105 transition-transform duration-300"></div>
                  <div className="relative bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-yellow-400/30 hover:scale-105 transition-all duration-300 min-h-[340px] flex flex-col">
                    <div className="flex flex-col flex-1">
                      <div className="bg-yellow-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <span className="text-2xl font-bold text-yellow-400">
                          1
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-yellow-400 mb-3">
                        {translations[lang].viewGuide || 'View Setup Guide'}
                      </h3>
                      <p className="text-gray-300 mb-4 flex-1">
                        {translations[lang].viewGuideDesc ||
                          'Follow our detailed setup instructions'}
                      </p>
                      <div className="mt-auto">
                        <button
                          onClick={() => setShowPDFGuide(true)}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-black/60 border-2 border-yellow-400 text-yellow-400 font-bold rounded-xl hover:bg-yellow-400 hover:text-black hover:scale-105 transition-all duration-300"
                        >
                          <FileText className="w-5 h-5" />
                          {translations[lang].viewSetupGuide}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Step 2 (was Step 1) */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-2xl blur-xl group-hover:scale-105 transition-transform duration-300"></div>
                  <div className="relative bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-blue-400/30 hover:scale-105 transition-all duration-300 min-h-[340px] flex flex-col">
                    <div className="flex flex-col flex-1">
                      <div className="bg-blue-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <span className="text-2xl font-bold text-blue-400">
                          2
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-blue-400 mb-3">
                        {translations[lang].registerAccount ||
                          'Register Account'}
                      </h3>
                      <p className="text-gray-300 mb-4 flex-1">
                        {translations[lang].registerDesc ||
                          'Create your Vantage trading account with our referral code'}
                      </p>
                      <div className="text-xs text-yellow-300 text-center mb-2">
                        {translations[lang].step2Note}
                      </div>
                      {/*
                        <div className="mt-auto">
                          <a
                            href="https://vigco.co/uyYRJz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-blue-400 hover:to-blue-500 hover:scale-105 transition-all duration-300 shadow-lg"
                          >
                            <Users className="w-5 h-5" />
                            {translations[lang].registerVantage}
                          </a>
                        </div>
                        */}
                    </div>
                  </div>
                </div>
                {/* Step 3 */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-2xl blur-xl group-hover:scale-105 transition-transform duration-300"></div>
                  <div className="relative bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-green-400/30 hover:scale-105 transition-all duration-300 min-h-[340px] flex flex-col">
                    <div className="flex flex-col flex-1">
                      <div className="bg-green-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <span className="text-2xl font-bold text-green-400">
                          3
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-green-400 mb-3">
                        {translations[lang].getSupport || 'Get Support'}
                      </h3>
                      <p className="text-gray-300 mb-4 flex-1">
                        {translations[lang].getSupportDesc ||
                          'Need help? Our support team is ready to assist'}
                      </p>
                      <div className="mt-auto">
                        <a
                          href={
                            lang === 'th'
                              ? 'https://lin.ee/Vv8zh6d5'
                              : 'https://t.me/mapa_trading_bot'
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:from-green-400 hover:to-green-500 hover:scale-105 transition-all duration-300 shadow-lg"
                        >
                          {lang === 'th' ? (
                            <MessageCircle className="w-5 h-5" />
                          ) : (
                            <Send className="w-5 h-5" />
                          )}
                          {lang === 'th' ? 'LINE Support' : 'Telegram Support'}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="relative z-10 py-20 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-md"
        >
          <div className="container mx-auto px-4 max-w-2xl flex flex-col items-center">
            <div className="w-full bg-white/5 border border-yellow-400/20 rounded-2xl shadow-xl p-8 flex flex-col items-center">
              <h2 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent tracking-wide">
                {translations[lang].contact || 'Contact Us'}
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded-full mb-6"></div>
              <p className="text-lg text-gray-200 mb-8 text-center max-w-xl">
                {translations[lang].contactDesc ||
                  'Connect with us on your favorite platform!'}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 w-full mb-8">
                <a
                  href="https://lin.ee/Vv8zh6d5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-lg hover:from-green-400 hover:to-green-500 hover:scale-105 transition-all duration-300 text-lg"
                >
                  <MessageCircle className="w-6 h-6" />
                  {translations[lang].line || 'LINE'}
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61578827489685"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:from-blue-500 hover:to-blue-600 hover:scale-105 transition-all duration-300 text-lg"
                >
                  <Facebook className="w-6 h-6" />
                  {translations[lang].facebook || 'Facebook'}
                </a>
                <a
                  href="https://t.me/mapa_trading_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:from-cyan-400 hover:to-cyan-500 hover:scale-105 transition-all duration-300 text-lg"
                >
                  <Send className="w-6 h-6" />
                  {translations[lang].telegram || 'Telegram'}
                </a>
              </div>
              <div className="w-full flex flex-col items-center mt-2">
                <div className="flex items-center gap-3 text-base text-gray-100 font-medium bg-black/30 border border-yellow-400/10 rounded-xl px-5 py-3 shadow-inner">
                  <Mail className="w-5 h-5 text-yellow-300" />
                  <span>Email:</span>
                  <button
                    onClick={handleCopyEmail}
                    className="text-yellow-300 underline hover:text-yellow-400 transition-colors focus:outline-none"
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      margin: 0,
                      cursor: 'pointer'
                    }}
                    type="button"
                  >
                    support@eamapa.com
                  </button>
                </div>
                {emailCopied && (
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
            </div>
          </div>
        </section>

        {/* Continue with ImageSlider and buttons */}
        <section className="relative z-10 pb-20">
          <div className="container mx-auto px-6 text-center max-w-5xl">
            <div className="mb-8">
              <YouTubeWithUnmute />
            </div>

            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-xl hover:from-yellow-300 hover:to-yellow-500 transform hover:scale-105 transition-all duration-300 shadow-2xl">
                  <span className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    {translations[lang].downloadFreeEA}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                </button>
              
              </div> */}

            <div className="flex justify-center">
              <ChevronDown className="w-8 h-8 text-yellow-400 animate-bounce" />
            </div>
          </div>
        </section>
        {/* Stats Section */}
        <section
          id="stats"
          className="relative z-10 py-12 sm:py-20 bg-black/20 backdrop-blur-sm"
        >
          <div className="container mx-auto px-2 sm:px-6 max-w-6xl">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <div
                    key={index}
                    className={`text-center transform transition-all duration-700 delay-${
                      index * 100
                    } ${
                      isVisible.stats
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-10 opacity-0'
                    } group hover:scale-105 transition-transform duration-300`}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full transform group-hover:scale-110 transition-transform duration-300"></div>
                      <div className="relative inline-flex p-3 sm:p-4 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 mb-2 sm:mb-4 shadow-lg group-hover:shadow-yellow-400/50 transition-shadow duration-300">
                        <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-black" />
                      </div>
                    </div>
                    <div className="relative">
                      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2">
                        <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                          {stat.number}
                        </span>
                      </div>
                      <div className="text-gray-300 text-sm sm:text-base font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* EA MAPA MCB Carousel Section */}
        <section
          id=""
          className="relative z-10 py-20 bg-black/30 backdrop-blur-sm"
        >
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                {translations[lang].mcbSectionTitle ||
                  'เหตุผลที่นักเทรดควรใช้ EA MAPA'}
              </h2>
            </div>
            {/* Carousel */}
            <MCBCarousel
              translations={translations}
              lang={lang}
              icon={CheckCircle2Icon}
            />
          </div>
        </section>

        {/* MAPA Bot Instructions Section */}
        <section
          id="instruction"
          className="relative z-10 py-20 bg-black/20 backdrop-blur-sm"
        >
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                {translations[lang].botInstructionTitle}
              </h2>
            </div>
            <BotInstructionTabs />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="relative z-10 py-12 sm:py-20">
          <div className="container mx-auto px-2 sm:px-6 max-w-6xl">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {translations[lang].whyChoose}
              </h2>
              <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto">
                Our cutting-edge technology gives you the competitive edge in
                gold trading
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div
                    key={index}
                    className={`group p-5 sm:p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-yellow-400/30 transition-all duration-500 transform hover:scale-105 ${
                      isVisible.features
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-10 opacity-0'
                    } hover:bg-gradient-to-br hover:from-yellow-400/10 hover:to-yellow-600/10`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full transform group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
                        <div className="relative p-3 sm:p-4 rounded-xl bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 group-hover:from-yellow-400 group-hover:to-yellow-600 transition-all duration-500 shadow-lg group-hover:shadow-yellow-400/50">
                          <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-400 group-hover:text-black transform group-hover:scale-110 transition-transform duration-500" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white group-hover:text-yellow-400 transition-colors duration-300 bg-gradient-to-r from-white to-white group-hover:from-yellow-400 group-hover:to-yellow-200 bg-clip-text">
                          {feature.title}
                        </h3>
                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base group-hover:text-gray-200 transition-colors duration-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="download" className="relative z-10 py-20">
          <div className="container mx-auto px-6 text-center max-w-4xl">
            <div
              className={`max-w-4xl mx-auto transform transition-all duration-1000 ${
                isVisible.download
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                {translations[lang].startTrading}
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {translations[lang].join} {translations[lang].freeEA}{' '}
                {translations[lang].robot}.{translations[lang].noHiddenFees} -{' '}
                {translations[lang].justPureTradingPower}
              </p>
              <DownloadCarousel2 lang={lang} />
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mt-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>{translations[lang].instantDownload}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>{translations[lang].noRegister}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>{translations[lang].support}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>{translations[lang].forever}</span>
                </div>
              </div>
              <div className="p-6">
                <DownloadCarousel lang={lang} />
              </div>
            </div>
          </div>
        </section>
        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="relative z-10 py-12 sm:py-20 bg-black/20 backdrop-blur-sm"
        >
          <div className="container mx-auto px-2 sm:px-6 max-w-6xl">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {translations[lang].trusted}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 transform transition-all duration-700 delay-${
                    index * 200
                  } ${
                    isVisible.testimonials
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-10 opacity-0'
                  }`}
                >
                  <div className="flex gap-1 mb-2 sm:mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-2 sm:mb-4 leading-relaxed text-sm sm:text-base">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <div className="font-bold text-white text-base sm:text-lg">
                      {testimonial.name}
                    </div>
                    <div className="text-yellow-400 text-xs sm:text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Footer */}
        <footer className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-12 max-w-4xl">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-5 h-5 text-black" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent tracking-wide">
                  EA MAPA
                </span>
              </div>
              <p className="text-gray-400 mb-6">
                Empowering traders worldwide with cutting-edge automation
                technology
              </p>
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-400">
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  {translations[lang].privacy}
                </a>
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  {translations[lang].terms}
                </a>
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  {translations[lang].contact}
                </a>
              </div>
              <div className="mt-8 pt-8 border-t border-white/10 text-gray-500 text-sm">
                © 2025 EA MAPA. All rights reserved. Trading involves risk.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
// --- YouTubeWithUnmute component ---
function YouTubeWithUnmute() {
  const iframeRef = useRef(null)
  // const [muted, setMuted] = useState(true)
  // const [showButton, setShowButton] = useState(true)

  // Send mute command on mount
  // useEffect(() => {
  //   const mute = () => {
  //     if (iframeRef.current) {
  //       iframeRef.current.contentWindow.postMessage(
  //         JSON.stringify({ event: 'command', func: 'mute', args: [] }),
  //         '*'
  //       )
  //     }
  //   }
  //   // Wait a bit for iframe to load
  //   const timeout = setTimeout(mute, 1000)
  //   return () => clearTimeout(timeout)
  // }, [])

  // Unmute handler
  // const handleUnmute = () => {
  //   if (iframeRef.current) {
  //     iframeRef.current.contentWindow.postMessage(
  //       JSON.stringify({ event: 'command', func: 'unMute', args: [] }),
  //       '*'
  //     )
  //     setMuted(false)
  //     setShowButton(false)
  //   }
  // }

  return (
    <div className="relative w-full max-w-3xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-yellow-400">
      <iframe
        ref={iframeRef}
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/Wf9GD5oJbfw?enablejsapi=1"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full"
      ></iframe>
      {/* {showButton && (
        <button
          onClick={handleUnmute}
          className="absolute bottom-4 right-4 bg-black/70 text-yellow-300 px-6 py-3 rounded-full text-lg font-bold shadow-lg border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black transition-all z-10"
        >
          🔊 Unmute
        </button>
      )} */}
    </div>
  )
}

function ScrollSpyDropdown({ sections, translations, lang, isVisible }) {
  const [open, setOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)
  const dropdownRef = useRef(null)

  // Enhanced sticky effect with hide on scroll down
  useEffect(() => {
    const handleScroll = () => {
      if (!dropdownRef.current) return

      const currentScrollPos = window.scrollY
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)
      setPrevScrollPos(currentScrollPos)
      setIsSticky(currentScrollPos > 120)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos])

  // Close dropdown on scroll (mobile)
  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    window.addEventListener('scroll', close)
    return () => window.removeEventListener('scroll', close)
  }, [open])

  // Smooth scroll for anchor links
  const handleClick = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setOpen(false)
    }
  }

  return (
    <div
      ref={dropdownRef}
      className={`z-50 mb-4 w-full transition-all duration-300 ${
        isSticky
          ? 'fixed left-0 right-0 bg-black/80 shadow-lg border-b border-yellow-400'
          : 'relative bg-transparent'
      } transform ${visible ? 'translate-y-0' : '-translate-y-full'} ${
        isSticky ? 'top-0' : ''
      }`}
      style={{ backdropFilter: isSticky ? 'blur(8px)' : undefined }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Redesigned Mobile Dropdown Button */}
        <div className="md:hidden flex justify-between items-center py-2">
          <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
            EA MAPA
          </span>
          <button
            className={`flex items-center gap-2 px-3 py-2 rounded-full border-2 border-yellow-400 bg-black/80 text-yellow-300 font-bold shadow-lg transition-all duration-200 focus:outline-none ${
              open ? 'bg-yellow-400 text-black' : 'hover:bg-yellow-400/20'
            }`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Open navigation"
          >
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${
                open ? 'rotate-180' : ''
              }`}
            />
            <span className="ml-1">{translations[lang]?.menu || 'Menu'}</span>
          </button>
        </div>
        {/* Dropdown Menu */}
        <div
          className={`${
            open ? 'block' : 'hidden'
          } absolute left-0 right-0 mt-2 bg-black/95 border border-yellow-400 rounded-xl shadow-xl transition-all duration-200 md:static md:block md:bg-transparent md:border-none md:shadow-none md:rounded-none`}
        >
          <div className="flex flex-col md:flex-row md:gap-x-6 md:justify-end">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => handleClick(e, section.id)}
                className={`px-4 py-3 rounded-lg font-bold transition-colors text-base text-center md:text-left
                  ${
                    isVisible[section.id]
                      ? 'bg-yellow-400 text-black'
                      : 'hover:bg-yellow-400/10 hover:text-yellow-400 text-yellow-300'
                  }
                `}
              >
                {section.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// --- DownloadCarousel component ---
function DownloadCarousel({ lang }) {
  const t =
    translations[lang]?.downloadCarousel || translations.en.downloadCarousel
  const [active, setActive] = useState('MCB')

  const items = [
    {
      key: 'MCB',
      label: t.MCB.label,
      content: (
        <div className="bg-black/40 rounded-xl p-6 border border-yellow-400/30 text-lg text-white text-left max-w-xl mx-auto">
          <div className="text-2xl font-bold text-yellow-300 mb-2">
            {t.MCB.title}
          </div>
          <div className="flex justify-center mb-4">
            <img
              src="/images/mcbdemo.jpg"
              alt="MCB Demo"
              className="rounded-xl shadow-lg max-h-64 object-contain cursor-pointer transition hover:scale-105"
              onClick={() => window.open('/images/mcbdemo.jpg', '_blank')}
            />
          </div>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-bold text-yellow-400">
                {t.MCB.minInvestment}
              </span>
              <br />
              <span className="font-mono text-yellow-300">
                {t.MCB.minInvestmentValue}{' '}
                <span className="text-xs text-gray-300">CENT/USD</span>
              </span>
            </li>
            <li>
              <span className="font-bold text-yellow-400">{t.MCB.note}</span>
            </li>
            <li>
              <span className="font-bold text-yellow-400">
                {t.MCB.lotSetting}
              </span>
              <br />
              <span className="font-mono text-yellow-300">
                {t.MCB.lotStart}
              </span>
              <br />
              <span className="font-mono text-yellow-300">{t.MCB.lotPlus}</span>
            </li>
            <li>
              <span className="font-bold text-yellow-400">
                {t.MCB.lotRelation}
              </span>
              <br />
              {t.MCB.lotRelationDesc}
              <br />
              {t.MCB.lotExamples.map((ex, i) => (
                <span key={i}>
                  {ex}
                  <br />
                </span>
              ))}
            </li>
            <li>
              <span className="font-bold text-yellow-400">
                {t.MCB.important}
              </span>
              <br />
              {t.MCB.importantDesc}
            </li>
          </ul>
          {/* <div className="mt-6 flex flex-col items-center gap-4">
            <a
              href="https://www.myfxbook.com/members/chatcharit/mapa-mcb/11652603"
              className="px-8 py-4 bg-gradient-to-r from-green-400 to-green-600 text-black font-bold rounded-xl hover:from-green-300 hover:to-green-500 transform hover:scale-105 transition-all duration-300 shadow-2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Myfxbook
            </a>
            <a
              href="https://zippyshare.day/Ekl62zz1UIpNztR/file"
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-xl hover:from-yellow-300 hover:to-yellow-500 transform hover:scale-105 transition-all duration-300 shadow-2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.MCB.download}
            </a>
          </div> */}
        </div>
      )
    },
    // --- New item for SuperH ---
    {
      key: 'SUPER H',
      label: 'Super H',
      content: (
        <div className="bg-black/40 rounded-xl p-6 border border-yellow-400/30 text-lg text-white text-left max-w-xl mx-auto">
          <div className="text-2xl font-bold text-yellow-300 mb-2">Super H</div>
          <div className="flex justify-center mb-4">
            <img
              src="/images/superhdemo.jpg"
              alt="SuperH Demo"
              className="rounded-xl shadow-lg max-h-64 object-contain cursor-pointer transition hover:scale-105"
              onClick={() => window.open('/images/superhdemo.jpg', '_blank')}
            />
          </div>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-bold text-yellow-400">
                {t.SUPERH?.minInvestment || 'งบทุนขั้นต่ำ:'}
              </span>
              <br />
              <span className="font-mono text-yellow-300">
                {t.SUPERH?.minInvestmentValue || '12,000'}{' '}
                <span className="text-xs text-gray-300">CENT/USD</span>
              </span>
            </li>
            <li>
              <span className="font-bold text-yellow-400">
                {t.SUPERH?.lot || 'ล๊อทขั้นต่ำ:'}
              </span>
              <br />
              <span className="font-mono text-yellow-300">
                {t.SUPERH?.lotValue || '0.01'}
              </span>
            </li>
            <li>
              <span className="font-bold text-yellow-400">
                {t.SUPERH?.profit || 'ผลตอบแทนเฉลี่ย:'}
              </span>
              <br />
              <span className="font-mono text-green-400">
                {t.SUPERH?.profitValue || '0.3%'}
              </span>
            </li>
          </ul>
          {/* <div className="mt-6 flex flex-col items-center gap-4">
            <a
              href="https://zippyshare.day/rrcNCeO0f8eDS10/file"
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-xl hover:from-yellow-300 hover:to-yellow-500 transform hover:scale-105 transition-all duration-300 shadow-2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.SUPERH?.download || 'Download SuperH'}
            </a>
          </div> */}
        </div>
      )
    },
    {
      key: 'COMING',
      label: t.coming.label,
      content: (
        <div className="bg-black/40 rounded-xl p-6 border border-yellow-400/30 text-lg text-white text-center">
          <div className="text-2xl font-bold text-yellow-300 mb-2">
            {t.coming.title}
          </div>
          <div className="text-yellow-400 text-xl mt-4">{t.coming.desc}</div>
        </div>
      )
    }
  ]
  return (
    <div>
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => setActive(item.key)}
            className={`px-6 py-2 rounded-full font-bold border-2 transition-all duration-200 text-lg focus:outline-none
              ${
                active === item.key
                  ? 'bg-yellow-400 text-black border-yellow-400 shadow-lg scale-105'
                  : 'bg-black/40 text-yellow-300 border-yellow-400/40 hover:bg-yellow-400/20 hover:text-yellow-400'
              }
            `}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div>{items.find((i) => i.key === active).content}</div>
    </div>
  )
}
