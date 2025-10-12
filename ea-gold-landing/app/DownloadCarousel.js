import { useState } from 'react'
import { translations } from './i18n'
import {
  Download,
  ArrowRight,
  ArrowLeft,
  Star,
  Shield,
  BarChart,
  Zap,
  Clock
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const getCards = (
  lang,
  hoveredMCB,
  hoveredSuperH,
  setHoveredMCB,
  setHoveredSuperH
) => [
  {
    key: 'mcb',
    content: (
      <div
        className="flex flex-col items-center justify-between bg-gradient-to-br from-yellow-400/10 to-purple-600/10 rounded-2xl border border-yellow-400/20 p-6 transition-all duration-300 shadow-lg w-full max-w-[320px] min-w-[260px] h-[480px] mx-auto"
        onMouseEnter={() => setHoveredMCB(true)}
        onMouseLeave={() => setHoveredMCB(false)}
      >
        <div className="w-full flex flex-col items-center">
          <div className="relative mb-2">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center rotate-3">
              <Shield className="w-8 h-8 text-black" />
            </div>
            <span className="absolute -top-2 -right-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white animate-pulse">
              {translations[lang].downloadSection.popular}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white text-center h-10 flex items-center justify-center">
            {translations[lang].downloadSection.mcbTitle}
          </h3>
        </div>
        <div className="flex-1 flex items-center justify-center w-full">
          <p className="text-gray-300 text-center text-base line-clamp-3 h-16">
            {translations[lang].downloadSection.mcbDesc}
          </p>
        </div>
        <div className="w-full flex flex-col gap-2">
          <a
            href="https://mega.nz/file/S5JxACBL#2cqJp4Jz6jU-WqUk84cylTvD1sIy9BoSPqonWzVm2Sw"
            className={`w-full h-12 inline-flex items-center justify-center px-6 text-base font-medium rounded-xl transition-all duration-300 ${
              hoveredMCB
                ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(234,179,8,0.5)]'
                : 'bg-yellow-400/20 text-yellow-400'
            }`}
          >
            <Download
              className={`w-5 h-5 mr-2 ${
                hoveredMCB ? 'transform -translate-y-1' : ''
              }`}
            />
            <span className="truncate">
              {translations[lang].downloadSection.downloadMcb}
            </span>
            <ArrowRight
              className={`ml-2 w-5 h-5 transition-all duration-300 ${
                hoveredMCB
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-2'
              }`}
            />
          </a>
          <a
            href="https://www.myfxbook.com/members/chatcharit/mapa-mcb/11652603"
            className="h-8 text-sm text-gray-400 hover:text-yellow-400 transition-colors flex items-center justify-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BarChart className="w-4 h-4" />
            <span className="truncate">
              {translations[lang].downloadSection.viewPerformance}
            </span>
          </a>
        </div>
        <div className="w-full flex items-center justify-between text-sm text-gray-400 mt-2">
          <div className="flex items-center">
            <div className="flex -space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600"
                />
              ))}
            </div>
            <span className="ml-2 truncate">
              2.5k+ {translations[lang].downloadSection.users}
            </span>
          </div>
          <div className="flex items-center">
            <Star
              className="w-4 h-4 text-yellow-400 mr-1"
              fill="currentColor"
            />
            <span>4.9</span>
          </div>
        </div>
      </div>
    )
  },
  {
    key: 'superh',
    content: (
      <div
        className="flex flex-col items-center justify-between bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-2xl border border-blue-400/20 p-6 transition-all duration-300 shadow-lg w-full max-w-[320px] min-w-[260px] h-[480px] mx-auto"
        onMouseEnter={() => setHoveredSuperH(true)}
        onMouseLeave={() => setHoveredSuperH(false)}
      >
        <div className="w-full flex flex-col items-center">
          <div className="relative mb-2">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center -rotate-3">
              <Zap className="w-8 h-8 text-black" />
            </div>
            <span className="absolute -top-2 -right-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-white animate-pulse">
              {translations[lang].downloadSection.new}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white text-center h-10 flex items-center justify-center">
            {translations[lang].downloadSection.superHTitle}
          </h3>
        </div>
        <div className="flex-1 flex items-center justify-center w-full">
          <p className="text-gray-300 text-center text-base line-clamp-3 h-16">
            {translations[lang].downloadSection.superHDesc}
          </p>
        </div>
        <div className="w-full flex flex-col gap-2">
          <a
            href="https://mega.nz/file/ekBWzI7a#1khNBj5lwMnT_r_kbwAohWAd2FQI_9iutjcFZQFeEt0"
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full h-12 inline-flex items-center justify-center px-6 text-base font-medium rounded-xl transition-all duration-300 ${
              hoveredSuperH
                ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                : 'bg-blue-500/20 text-blue-400'
            }`}
          >
            <Download
              className={`w-5 h-5 mr-2 ${
                hoveredSuperH ? 'transform -translate-y-1' : ''
              }`}
            />
            <span className="truncate">
              {translations[lang].downloadSection.downloadSuperH}
            </span>
            <ArrowRight
              className={`ml-2 w-5 h-5 transition-all duration-300 ${
                hoveredSuperH
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-2'
              }`}
            />
          </a>
          <a
            href="https://www.myfxbook.com/members/chatcharit/mapa-mcb/11652603"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-none h-8 text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center justify-center gap-1"
          >
            <BarChart className="w-4 h-4" />
            <span className="truncate">
              {translations[lang].downloadSection.viewPerformance}
            </span>
          </a>
        </div>
        <div className="w-full flex items-center justify-between text-sm text-gray-400 mt-2">
          <div className="flex items-center">
            <div className="flex -space-x-1">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600"
                />
              ))}
            </div>
            <span className="ml-2 truncate">
              500+ {translations[lang].downloadSection.users}
            </span>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-blue-400 mr-1" fill="currentColor" />
            <span>4.8</span>
          </div>
        </div>
      </div>
    )
  },
  {
    key: 'coming1',
    content: (
      <div className="flex flex-col items-center justify-between bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border border-white/10 p-6 transition-all duration-300 shadow-lg w-full max-w-[320px] min-w-[260px] h-[480px] mx-auto">
        <div className="w-full flex flex-col items-center">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center mb-2">
            <Clock className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-400 text-center h-10 flex items-center justify-center">
            {translations[lang].downloadSection.comingSoon}
          </h3>
        </div>
        <div className="flex-1 flex items-center justify-center w-full">
          <p className="text-gray-500 text-center text-base line-clamp-3 h-16">
            {translations[lang].downloadSection.comingSoonDesc}
          </p>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="h-12" />
          <div className="h-8" />
        </div>
        <div className="w-full flex items-center justify-center mt-2">
          <div className="w-full px-6 py-3 rounded-xl bg-gray-800/50 text-gray-500 text-center cursor-not-allowed">
            {translations[lang].downloadSection.stayTuned}
          </div>
        </div>
      </div>
    )
  },
  {
    key: 'coming2',
    content: (
      <div className="flex flex-col items-center justify-between bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border border-white/10 p-6 transition-all duration-300 shadow-lg w-full max-w-[320px] min-w-[260px] h-[480px] mx-auto">
        <div className="w-full flex flex-col items-center">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center mb-2">
            <Clock className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-400 text-center h-10 flex items-center justify-center">
            {translations[lang].downloadSection.comingSoon}
          </h3>
        </div>
        <div className="flex-1 flex items-center justify-center w-full">
          <p className="text-gray-500 text-center text-base line-clamp-3 h-16">
            {translations[lang].downloadSection.comingSoonDesc}
          </p>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="h-12" />
          <div className="h-8" />
        </div>
        <div className="w-full flex items-center justify-center mt-2">
          <div className="w-full px-6 py-3 rounded-xl bg-gray-800/50 text-gray-500 text-center cursor-not-allowed">
            {translations[lang].downloadSection.stayTuned}
          </div>
        </div>
      </div>
    )
  }
]

export default function DownloadCarousel2({ lang }) {
  const [hoveredMCB, setHoveredMCB] = useState(false)
  const [hoveredSuperH, setHoveredSuperH] = useState(false)
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const cards = getCards(
    lang,
    hoveredMCB,
    hoveredSuperH,
    setHoveredMCB,
    setHoveredSuperH
  )
  const total = cards.length

  const goLeft = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + total) % total)
  }
  const goRight = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % total)
  }

  const prevIdx = (current - 1 + total) % total
  const nextIdx = (current + 1) % total

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      position: 'absolute',
      zIndex: 10
    }),
    center: {
      x: 0,
      opacity: 1,
      position: 'relative',
      zIndex: 20,
      transition: { type: 'spring', stiffness: 400, damping: 30 }
    },
    exit: (dir) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      position: 'absolute',
      zIndex: 10,
      transition: { type: 'spring', stiffness: 400, damping: 30 }
    })
  }

  return (
    <div className="w-full flex flex-col items-center relative">
      <div
        className="w-full max-w-4xl mx-auto flex justify-center items-center"
        style={{ minHeight: 500 }}
      >
        {/* Flex row for previews and main card */}
        <div className="flex w-full justify-center items-center gap-2 sm:gap-6 relative">
          {/* Left preview (hidden on mobile) */}
          <motion.div
            className="hidden sm:flex flex-shrink-0 justify-center items-center"
            style={{ width: 220, pointerEvents: 'none' }}
            initial={{ opacity: 0.8, scale: 0.95, filter: 'blur(0.2px)' }}
            animate={{ opacity: 0.95, scale: 0.98, filter: 'blur(0.2px)' }}
            transition={{ duration: 0.4 }}
          >
            {cards[prevIdx].content}
          </motion.div>
          {/* Carousel controls and main card */}
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <button
                aria-label="Previous"
                onClick={goLeft}
                className="p-2 sm:p-3 rounded-full bg-white/10 hover:bg-yellow-400/80 text-yellow-400 hover:text-black transition disabled:opacity-50 z-20"
                style={{ marginRight: 8 }}
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div
                className="flex-1 flex justify-center items-center relative"
                style={{ minHeight: 480, maxWidth: 340 }}
              >
                <AnimatePresence custom={direction} initial={false}>
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="w-full flex justify-center items-center"
                    style={{ minHeight: 480, maxWidth: 340 }}
                  >
                    {cards[current].content}
                  </motion.div>
                </AnimatePresence>
              </div>
              <button
                aria-label="Next"
                onClick={goRight}
                className="p-2 sm:p-3 rounded-full bg-white/10 hover:bg-yellow-400/80 text-yellow-400 hover:text-black transition disabled:opacity-50 z-20"
                style={{ marginLeft: 8 }}
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
            {/* Dots */}
            <div className="flex gap-2 mt-4 z-20">
              {cards.map((card, idx) => (
                <button
                  key={card.key}
                  onClick={() => setCurrent(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === current
                      ? 'bg-yellow-400 scale-125'
                      : 'bg-gray-500/40 hover:bg-yellow-400'
                  }`}
                  aria-label={`Go to card ${idx + 1}`}
                />
              ))}
            </div>
          </div>
          {/* Right preview (hidden on mobile) */}
          <motion.div
            className="hidden sm:flex flex-shrink-0 justify-center items-center"
            style={{ width: 220, pointerEvents: 'none' }}
            initial={{ opacity: 0.8, scale: 0.95, filter: 'blur(0.2px)' }}
            animate={{ opacity: 0.95, scale: 0.98, filter: 'blur(0.2px)' }}
            transition={{ duration: 0.4 }}
          >
            {cards[nextIdx].content}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
