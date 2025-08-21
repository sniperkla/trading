import { useState } from 'react'
import { translations } from './i18n'

import {
  Download,
  Sparkles,
  ArrowRight,
  Star,
  Shield,
  BarChart,
  Zap,
  Clock
} from 'lucide-react'

export default function DownloadCarousel2({ lang }) {
  const [hoveredMCB, setHoveredMCB] = useState(false)
  const [hoveredSuperH, setHoveredSuperH] = useState(false)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* MCB Card */}
      <div
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-400/10 to-purple-600/10 border-2 border-yellow-400/20 p-6 transition-all duration-300 hover:scale-105 flex flex-col min-h-[420px]"
        onMouseEnter={() => setHoveredMCB(true)}
        onMouseLeave={() => setHoveredMCB(false)}
      >
        {/* Floating Effect Icons - no changes */}
        <div className="absolute inset-0 pointer-events-none">
          {/* <Sparkles
            className={`absolute top-4 right-4 w-5 h-5 text-yellow-400 transition-all duration-500 ${
              hoveredMCB ? 'animate-ping' : 'opacity-50'
            }`}
          /> */}
          <Star
            className={`absolute bottom-4 left-4 w-5 h-5 text-yellow-400 transition-all duration-500 ${
              hoveredMCB ? 'animate-spin-slow' : 'opacity-50'
            }`}
          />
        </div>

        {/* MCB Logo/Icon - fixed height */}
        <div className="mb-4 relative h-[64px]">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center transform rotate-3">
            <Shield className="w-8 h-8 text-black" />
          </div>
          <div className="absolute -top-2 -right-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white animate-pulse">
              {translations[lang].downloadSection.popular}
            </span>
          </div>
        </div>

        {/* Content wrapper with flex grow */}
        <div className="flex flex-col flex-1">
          <h3 className="text-2xl font-bold text-white mb-2">
            {translations[lang].downloadSection.mcbTitle}
          </h3>
          {/* Description with min-height to ensure consistency */}
          <p className="text-gray-300 mb-6 flex-grow min-h-[80px]">
            {translations[lang].downloadSection.mcbDesc}
          </p>

          {/* Actions wrapper - fixed to bottom */}
          <div className="mt-auto space-y-3">
            <a
              href="https://zippyshare.day/Ekl62zz1UIpNztR/file"
              className={`group relative w-full inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-xl transition-all duration-300 ${
                hoveredMCB
                  ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(234,179,8,0.5)]'
                  : 'bg-yellow-400/20 text-yellow-400'
              }`}
            >
              <Download
                className={`w-5 h-5 mr-2 transition-transform duration-300 ${
                  hoveredMCB ? 'transform -translate-y-1' : ''
                }`}
              />
              {translations[lang].downloadSection.downloadMcb}
            </a>

            <a
              href="https://www.myfxbook.com/members/chatcharit/mapa-mcb/11652603"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-yellow-400 transition-colors flex items-center justify-center gap-1"
            >
              <BarChart className="w-4 h-4" />
              {translations[lang].downloadSection.viewPerformance}
            </a>

            {/* Stats with fixed height */}
            <div className="mt-4 h-[24px] flex items-center justify-between text-sm text-gray-400">
              <div className="flex items-center">
                <div className="flex -space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600"
                    />
                  ))}
                </div>
                <span className="ml-2">
                  2.5k+ {translations[lang].downloadSection.users}
                </span>
              </div>
              <div className="flex items-center">
                <Star
                  className="w-4 h-4 text-yellow-400 mr-1"
                  fill="currentColor"
                />
                4.9
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Super H Card - Apply same structure */}
      <div
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-400/10 to-purple-600/10 border-2 border-blue-400/20 p-6 transition-all duration-300 hover:scale-105 flex flex-col min-h-[420px]"
        onMouseEnter={() => setHoveredSuperH(true)}
        onMouseLeave={() => setHoveredSuperH(false)}
      >
        {/* Super H Floating Effect Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {/* <Zap
            className={`absolute top-4 right-4 w-5 h-5 text-blue-400 transition-all duration-500 ${
              hoveredSuperH ? 'animate-ping' : 'opacity-50'
            }`}
          /> */}
          <Star
            className={`absolute bottom-4 left-4 w-5 h-5 text-blue-400 transition-all duration-500 ${
              hoveredSuperH ? 'animate-spin-slow' : 'opacity-50'
            }`}
          />
        </div>
        {/* Super H Logo/Icon */}
        <div className="mb-4 relative h-[64px]">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center transform -rotate-3">
            <Zap className="w-8 h-8 text-black" />
          </div>
          <div className="absolute -top-2 -right-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-white animate-pulse">
              {translations[lang].downloadSection.new}
            </span>
          </div>
        </div>
        {/* Content wrapper */}
        <div className="flex flex-col flex-1">
          <h3 className="text-2xl font-bold text-white mb-2">
            {translations[lang].downloadSection.superHTitle}
          </h3>
          <p className="text-gray-300 mb-6 flex-grow min-h-[80px]">
            {translations[lang].downloadSection.superHDesc}
          </p>

          <div className="mt-auto space-y-3">
            <a
              href="https://zippyshare.day/rrcNCeO0f8eDS10/file"
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative w-full inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-xl transition-all duration-300 ${
                hoveredSuperH
                  ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                  : 'bg-blue-500/20 text-blue-400'
              }`}
            >
              <Download
                className={`w-5 h-5 mr-2 transition-transform duration-300 ${
                  hoveredSuperH ? 'transform -translate-y-1' : ''
                }`}
              />
              {translations[lang].downloadSection.downloadSuperH}
              <ArrowRight
                className={`absolute right-4 w-5 h-5 transition-all duration-300 ${
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
              className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center justify-center gap-1"
            >
              <BarChart className="w-4 h-4" />
              {translations[lang].downloadSection.viewPerformance}
            </a>

            <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
              <div className="flex items-center">
                <div className="flex -space-x-1">
                  {[...Array(2)].map((_, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600"
                    />
                  ))}
                </div>
                <span className="ml-2">
                  500+ {translations[lang].downloadSection.users}
                </span>
              </div>
              <div className="flex items-center">
                <Star
                  className="w-4 h-4 text-blue-400 mr-1"
                  fill="currentColor"
                />
                4.8
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Cards */}
      {[1, 2].map((_, index) => (
        <div
          key={index}
          className="rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 p-6 flex flex-col min-h-[420px]"
        >
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center mb-4">
            <Clock className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-400 mb-2">
            {translations[lang].downloadSection.comingSoon}
          </h3>
          <p className="text-gray-500 mb-6 flex-grow">
            {translations[lang].downloadSection.comingSoonDesc}
          </p>
          <div className="mt-auto w-full px-6 py-3 rounded-xl bg-gray-800/50 text-gray-500 text-center cursor-not-allowed">
            {translations[lang].downloadSection.stayTuned}
          </div>
        </div>
      ))}
    </div>
  )
}
