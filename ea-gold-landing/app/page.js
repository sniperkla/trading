'use client'

import React, { useState, useEffect } from 'react'
import ImageSlider from './ImageSlider'
import translations from './i18n'
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
  FileText
} from 'lucide-react'
import PDFViewer from './PDFViewer'

export default function TradingEALanding() {
  const [expandedStep, setExpandedStep] = useState(null)
  const [showPDFGuide, setShowPDFGuide] = useState(false)
  const [copied, setCopied] = useState(false)
  const referralCode = 'BsFPM765'

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000) // รีเซ็ตหลัง 2 วิ
  }
  const publicPDFUrl = 'https://eamapa.com/pdfs/vantage-guide.pdf' // ✅ เปลี่ยนให้เป็น URL จริงที่ออนไลน์แล้ว

  const [lang, setLang] = useState('en') // default เป็นอังกฤษ
  useEffect(() => {
    const getBrowserLang = () => {
      if (typeof window === 'undefined') return 'en'
      const lang = navigator.language || navigator.userLanguage || 'en'
      if (lang.startsWith('th')) return 'th'
      if (lang.startsWith('en')) return 'en'
      if (lang.startsWith('zh')) return 'zh'
      if (lang.startsWith('hi')) return 'hi'
      if (lang.startsWith('ru')) return 'ru'
      return 'en' // ถ้าไม่ตรงกับที่รองรับ ให้เป็นอังกฤษ
    }
    setLang(getBrowserLang())
  }, [])

  const [isMenuOpen, setIsMenuOpen] = useState(false)
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
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>
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
              href="#testimonials"
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
                Vantage Registration Guide
              </h3>

              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
                {/* แสดงรหัสแนะนำ */}
                <div className="text-center sm:text-left text-sm text-yellow-300 font-semibold">
                  รหัสแนะนำของคุณ:{' '}
                  <span className="bg-yellow-400 text-black font-mono px-2 py-1 rounded">
                    {referralCode}
                  </span>
                  <div className="text-xs mt-1 text-yellow-200 font-normal">
                    * ห้ามลืมใส่รหัสนี้ตอนสมัคร มิฉะนั้นจะไม่ได้รับสิทธิพิเศษ
                  </div>
                </div>

                {/* ปุ่มคัดลอกรหัส */}
                <button
                  onClick={handleCopyReferral}
                  className="w-full sm:w-auto px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-all text-sm text-center"
                >
                  {copied ? 'คัดลอกแล้ว ✅' : 'คัดลอกรหัสแนะนำ'}
                </button>

                {/* ปุ่มสมัคร */}
                <a
                  href="https://vigco.co/uyYRJz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors text-sm text-center"
                >
                  สมัครเปิดบัญชี
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
      <section id="hero" className="relative z-10 container mx-auto px-6 py-20">
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
            <section id="broker-guide" className="relative z-10 py-20">
              <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Get Your Broker Account Ready
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Follow our complete setup guide to get trading in minutes
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href="https://vigco.co/uyYRJz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-blue-400 hover:to-blue-500 transform hover:scale-105 transition-all duration-300 shadow-2xl"
                  >
                    <Users className="w-6 h-6" />
                    Register with Vantage Now
                  </a>

                  <button
                    onClick={() => setShowPDFGuide(true)}
                    className="inline-flex items-center gap-3 px-8 py-4 border-2 border-yellow-400 text-yellow-400 font-bold rounded-xl hover:bg-yellow-400 hover:text-black transition-all duration-300"
                  >
                    <FileText className="w-6 h-6" />
                    View Setup Guide (PDF)
                  </button>
                </div>

                <p className="text-sm text-gray-400 mt-4">
                  Use referral code:{' '}
                  <span className="text-yellow-400 font-mono font-bold">
                    BsFPM765
                  </span>
                </p>
              </div>
            </section>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              {translations[lang].automate}
              <span className="text-yellow-400 font-semibold">
                {' '}
                {translations[lang].freeForever}
              </span>
            </p>

            <div className="mb-8">
              <ImageSlider />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-xl hover:from-yellow-300 hover:to-yellow-500 transform hover:scale-105 transition-all duration-300 shadow-2xl">
                <span className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  {translations[lang].downloadFreeEA}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              </button>

              <button className="px-8 py-4 border-2 border-yellow-400 text-yellow-400 font-bold rounded-xl hover:bg-yellow-400 hover:text-black transition-all duration-300">
                {translations[lang].watchDemo}
              </button>
            </div>

            <div className="flex justify-center">
              <ChevronDown className="w-8 h-8 text-yellow-400 animate-bounce" />
            </div>
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
