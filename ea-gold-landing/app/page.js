'use client'

import React, { useState, useEffect, useRef } from 'react'
import MCBCarousel from './MCBCarousel'

import translations from './i18n'
import VideoSlider2 from './VideoSlider2'
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
  CheckCircle2Icon
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

export default function TradingEALanding() {
  const lang = useLang() // ใช้ custom hook

  const [showPDFGuide, setShowPDFGuide] = useState(false)
  const [copied, setCopied] = useState(false)
  const referralCode = 'BsFPM765'

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
        <div className="text-yellow-400 text-xl">
          {translations[lang].botInstructionComingSoon}
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
  const publicPDFUrl =
    lang === 'th'
      ? 'https://eamapa.com/pdfs/th.pdf'
      : 'https://eamapa.com/pdfs/en.pdf'

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
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
      <nav className="relative z-50 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
              EA MAPA
            </span>
          </div>

          <div className="hidden md:flex space-x-8">
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
            className="md:hidden p-2 rounded-lg bg-white/10 backdrop-blur-sm"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/10">
            <div className="p-6 space-y-4">
              <a
                href="#features"
                className="block hover:text-yellow-400 transition-colors"
              >
                {translations[lang].features}
              </a>
              <a
                href="#stats"
                className="block hover:text-yellow-400 transition-colors"
              >
                {translations[lang].performance}
              </a>
              <a
                href="#testimonials"
                className="block hover:text-yellow-400 transition-colors"
              >
                {translations[lang].reviews}
              </a>
              <a
                href="#download"
                className="block hover:text-yellow-400 transition-colors"
              >
                {translations[lang].download}
              </a>
              <a
                href="#instruction"
                className="block hover:text-yellow-400 transition-colors"
              >
                {translations[lang].instruction}
              </a>
            </div>
          </div>
        )}
      </nav>
      {showPDFGuide && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
          <div className="w-full h-full bg-slate-900 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900">
              <h3 className="text-2xl font-bold text-yellow-400">
                {translations[lang].vantageGuide}
              </h3>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
                {/* แสดงรหัสแนะนำ */}
                <div className="text-center sm:text-left text-sm text-yellow-300 font-semibold">
                  {translations[lang].yourReferral}{' '}
                  <span className="bg-yellow-400 text-black font-mono px-2 py-1 rounded">
                    {referralCode}
                  </span>
                  <div className="text-xs mt-1 text-yellow-200 font-normal">
                    {translations[lang].referralNote}
                  </div>
                </div>
                {/* ปุ่มคัดลอกรหัส */}
                <button
                  onClick={handleCopyReferral}
                  className="w-full sm:w-auto px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-all text-sm text-center"
                >
                  {copied
                    ? translations[lang].copied
                    : translations[lang].copyReferral}
                </button>
                {/* ปุ่มสมัคร */}
                <a
                  href="https://vigco.co/uyYRJz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors text-sm text-center"
                >
                  {translations[lang].openAccount}
                </a>
                {/* ปุ่มปิด */}
                <button
                  onClick={() => setShowPDFGuide(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
            {/* PDF Viewer - Google Docs */}
            <div className="flex-1 w-full">
              <iframe
                src={`https://docs.google.com/gview?url=${encodeURIComponent(
                  publicPDFUrl
                )}&embedded=true`}
                width="100%"
                height="100%"
                className="w-full h-full border-none"
                title="Vantage PDF Guide"
              />
            </div>
          </div>
        </div>
      )}
      {/* Hero Section */}
      {/* Hero Section */}
      <section id="hero" className="relative z-10 container mx-auto px-6 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible.hero
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0'
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                {translations[lang].freeEA}
              </span>
              <br />
              <span className="text-white">{translations[lang].tradingAI}</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              {translations[lang].automate}
              <span className="text-yellow-400 font-semibold">
                {' '}
                {translations[lang].freeForever}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Video Demo Section - Separate from Hero */}
      <section id="video-demo" className="relative z-10 py-4">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <VideoSlider2 />
        </div>
      </section>

      {/* Broker Guide Section */}
      <section id="broker-guide" className="relative z-10 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {translations[lang].getBrokerReady}
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {translations[lang].setupGuide}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://vigco.co/uyYRJz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-blue-400 hover:to-blue-500 transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              <Users className="w-6 h-6" />
              {translations[lang].registerVantage}
            </a>
            <button
              onClick={() => setShowPDFGuide(true)}
              className="inline-flex  items-center gap-3 px-8 py-4 border-2 border-yellow-400 text-yellow-400 font-bold rounded-xl hover:bg-yellow-400 hover:text-black transition-all duration-300"
            >
              <FileText className="w-6 h-6" />
              {translations[lang].viewSetupGuide}
            </button>
          </div>
          {/* แสดงรหัสแนะนำ */}
          <div className="flex flex-col items-center justify-center w-full mt-6 mb-2">
            <button
              onClick={handleCopyReferral}
              className="w-full max-w-lg flex flex-col items-center justify-center focus:outline-none group"
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                margin: 0
              }}
              aria-label={translations[lang].copyReferral}
            >
              <div className="text-2xl md:text-3xl font-extrabold text-yellow-400 bg-black/80 px-6 py-4 rounded-2xl shadow-xl border-4 border-yellow-300 tracking-widest text-center select-all group-hover:bg-yellow-400/30 transition w-full">
                {translations[lang].useReferral}{' '}
                <span className="text-3xl md:text-4xl font-mono font-black underline decoration-yellow-400">
                  {referralCode}
                </span>
              </div>
              <div className="mt-2 text-yellow-200 text-center font-semibold text-base md:text-lg bg-yellow-400/10 px-3 py-2 rounded-lg border border-yellow-300/40 shadow">
                {translations[lang].referralNote}
              </div>
              {copied && (
                <span className="mt-2 text-green-400 text-lg font-bold animate-pulse">
                  {translations[lang].copied}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>
      {/* Continue with ImageSlider and buttons */}
      <section className="relative z-10 pb-20">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-8">
            <YouTubeWithUnmute />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-xl hover:from-yellow-300 hover:to-yellow-500 transform hover:scale-105 transition-all duration-300 shadow-2xl">
              <span className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                {translations[lang].downloadFreeEA}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
            </button>
            {/* 
            <button className="px-8 py-4 border-2 border-yellow-400 text-yellow-400 font-bold rounded-xl hover:bg-yellow-400 hover:text-black transition-all duration-300">
              {translations[lang].watchDemo}
            </button> */}
          </div>

          <div className="flex justify-center">
            <ChevronDown className="w-8 h-8 text-yellow-400 animate-bounce" />
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section
        id="stats"
        className="relative z-10 py-20 bg-black/20 backdrop-blur-sm"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
                  }`}
                >
                  <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 mb-4">
                    <IconComponent className="w-8 h-8 text-yellow-400" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* EA MAPA MCB Carousel Section */}
      <section
        id="whychoose"
        className="relative z-10 py-20 bg-black/30 backdrop-blur-sm"
      >
        <div className="container mx-auto px-6">
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
      <section id="features" className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {translations[lang].whyChoose}
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our cutting-edge technology gives you the competitive edge in gold
              trading
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className={`group p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-yellow-400/30 transition-all duration-300 transform hover:scale-105 ${
                    isVisible.features
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-10 opacity-0'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 group-hover:from-yellow-400 group-hover:to-yellow-600 transition-all duration-300">
                      <IconComponent className="w-6 h-6 text-yellow-400 group-hover:text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-yellow-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
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
      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="relative z-10 py-20 bg-black/20 backdrop-blur-sm"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {translations[lang].trusted}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 transform transition-all duration-700 delay-${
                  index * 200
                } ${
                  isVisible.testimonials
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0'
                }`}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-yellow-400 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section id="download" className="relative z-10 py-20">
        <div className="container mx-auto px-6 text-center">
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

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="group relative px-12 py-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold text-xl rounded-2xl hover:from-yellow-300 hover:to-yellow-500 transform hover:scale-105 transition-all duration-300 shadow-2xl">
                <span className="flex items-center gap-3">
                  <Download className="w-6 h-6" />
                  {translations[lang].getYourFreeEA}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
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
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-black" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                EA MAPA
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering traders worldwide with cutting-edge automation
              technology
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
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
        src="https://www.youtube.com/embed/Wf9GD5oJbfw?enablejsapi=1&mute=1&autoplay=1"
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
