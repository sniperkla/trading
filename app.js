import React, { useState, useEffect } from 'react'
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
  Award
} from 'lucide-react'

export default function TradingEALanding() {
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
    { number: '50K+', label: 'Active Traders', icon: Users },
    { number: '98.7%', label: 'Success Rate', icon: TrendingUp },
    { number: '24/7', label: 'Auto Trading', icon: Zap },
    { number: '100%', label: 'Free Forever', icon: Award }
  ]

  const features = [
    {
      icon: BarChart3,
      title: 'Advanced AI Algorithm',
      description:
        'Powered by machine learning to analyze gold market patterns and execute profitable trades automatically.'
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description:
        'Built-in stop-loss and take-profit mechanisms to protect your capital and maximize returns.'
    },
    {
      icon: Globe,
      title: 'Multi-Broker Support',
      description:
        'Compatible with MT4/MT5 platforms and works with all major forex brokers worldwide.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast Execution',
      description:
        'Execute trades in milliseconds with our optimized algorithm for maximum profit potential.'
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
              EA Gold Pro
            </span>
          </div>

          <div className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="hover:text-yellow-400 transition-colors"
            >
              Features
            </a>
            <a
              href="#stats"
              className="hover:text-yellow-400 transition-colors"
            >
              Performance
            </a>
            <a
              href="#testimonials"
              className="hover:text-yellow-400 transition-colors"
            >
              Reviews
            </a>
            <a
              href="#download"
              className="hover:text-yellow-400 transition-colors"
            >
              Download
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
                Features
              </a>
              <a
                href="#stats"
                className="block hover:text-yellow-400 transition-colors"
              >
                Performance
              </a>
              <a
                href="#testimonials"
                className="block hover:text-yellow-400 transition-colors"
              >
                Reviews
              </a>
              <a
                href="#download"
                className="block hover:text-yellow-400 transition-colors"
              >
                Download
              </a>
            </div>
          </div>
        )}
      </nav>

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
                Free EA Gold
              </span>
              <br />
              <span className="text-white">Trading Robot</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Automate your gold trading with our advanced AI-powered Expert
              Advisor.
              <span className="text-yellow-400 font-semibold">
                {' '}
                100% Free, Forever.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-xl hover:from-yellow-300 hover:to-yellow-500 transform hover:scale-105 transition-all duration-300 shadow-2xl">
                <span className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Free EA
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              </button>

              <button className="px-8 py-4 border-2 border-yellow-400 text-yellow-400 font-bold rounded-xl hover:bg-yellow-400 hover:text-black transition-all duration-300">
                Watch Demo
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
            {stats.map((stat, index) => (
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
                  <stat.icon className="w-8 h-8 text-yellow-400" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Why Choose EA Gold Pro?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our cutting-edge technology gives you the competitive edge in gold
              trading
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
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
                    <feature.icon className="w-6 h-6 text-yellow-400 group-hover:text-black" />
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
            ))}
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
              Trusted by Traders Worldwide
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Professional Trader',
                rating: 5,
                text: 'This EA has completely transformed my trading results. The AI algorithm is incredibly accurate!'
              },
              {
                name: 'Mike Chen',
                role: 'Investment Manager',
                rating: 5,
                text: "I've been using EA Gold Pro for 6 months. Consistent profits and excellent risk management."
              },
              {
                name: 'Alex Rodriguez',
                role: 'Forex Trader',
                rating: 5,
                text: 'Finally, a free EA that actually works! The setup was easy and results speak for themselves.'
              }
            ].map((testimonial, index) => (
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
                  {[...Array(testimonial.rating)].map((_, i) => (
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
              Start Trading Gold Like a Pro
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Join thousands of successful traders using our free EA Gold robot.
              No hidden fees, no subscriptions - just pure trading power.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="group relative px-12 py-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold text-xl rounded-2xl hover:from-yellow-300 hover:to-yellow-500 transform hover:scale-105 transition-all duration-300 shadow-2xl">
                <span className="flex items-center gap-3">
                  <Download className="w-6 h-6" />
                  Get Your Free EA Now
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Instant Download</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>No Registration Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>100% Free Forever</span>
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
                EA Gold Pro
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering traders worldwide with cutting-edge automation
              technology
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-yellow-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                Support
              </a>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                Contact
              </a>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10 text-gray-500 text-sm">
              © 2025 EA Gold Pro. All rights reserved. Trading involves risk.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
