import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const videos = [
  {
    youtubeId: 'RY5LmZsIYvA', // Replace with actual YouTube video ID
    poster: '/images/promo.png',
    label: 'English Demo',
    title: 'EA MAPA Trading System - English'
  },
  {
    youtubeId: 'YKzepkZ6F_g', // Replace with actual YouTube video ID
    poster: '/images/promo1.png',
    label: 'Thai Demo',
    title: 'EA MAPA Trading System - Thai'
  },
  {
    youtubeId: 'N3RPQ2JgVFw', // Replace with actual YouTube video ID
    poster: '/images/promo1.png',
    label: 'Demo',
    title: 'EA MAPA Trading System - Demo'
  }
]

export default function VideoSlider2() {
  // Determine initial video index based on browser language
  let initialIdx = 0
  if (typeof window !== 'undefined') {
    const lang = (
      navigator.language ||
      navigator.userLanguage ||
      ''
    ).toLowerCase()
    if (lang.startsWith('th')) {
      initialIdx = 1 // Thai video
    } else {
      initialIdx = 0 // English video
    }
  }
  const [current, setCurrent] = useState(initialIdx)

  const goTo = (idx) => {
    setCurrent(idx)
  }

  const prev = () => {
    goTo((current - 1 + videos.length) % videos.length)
  }

  const next = () => {
    goTo((current + 1) % videos.length)
  }

  // Carousel logic
  const prevIdx = (current - 1 + videos.length) % videos.length
  const nextIdx = (current + 1) % videos.length

  return (
    <div className="w-full max-w-7xl mx-auto relative flex flex-col items-center">
      <div className="flex items-center justify-center w-full relative min-h-[480px]">
        {/* Previous Card */}
        <div
          className={`transition-all duration-500 cursor-pointer z-10 scale-95 opacity-70 hover:scale-100 hover:opacity-90 hidden sm:block`}
          style={{ width: '34%', marginRight: '-5%' }}
          onClick={prev}
        >
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-yellow-400/10 bg-gradient-to-br from-slate-800/60 to-slate-900/60">
            <img
              src={videos[prevIdx].poster}
              alt={videos[prevIdx].label}
              className="w-full aspect-video object-cover"
              style={{ minHeight: 200 }}
            />
            <div className="p-3 text-center text-yellow-300 text-base font-semibold">
              {videos[prevIdx].label}
            </div>
          </div>
        </div>

        {/* Main Card (YouTube Video) */}
        <div className="relative z-20 w-full sm:w-[52%] mx-4 scale-100">
          <div className="rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg border-2 border-yellow-400/40">
            {/* YouTube Embed */}
            <div
              className="relative w-full aspect-video bg-black rounded-3xl overflow-hidden"
              style={{ minHeight: 320 }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${videos[current].youtubeId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&enablejsapi=1`}
                title={videos[current].title}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                key={current} // Force re-render when video changes
              />
            </div>

            {/* Video Title Overlay */}
            <div className="absolute top-6 left-6 right-6 z-30">
              <div className="bg-black/70 backdrop-blur-sm rounded-xl px-6 py-3 border border-yellow-400/40">
                <h3 className="text-yellow-400 font-bold text-lg md:text-xl">
                  {videos[current].title}
                </h3>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-yellow-400 rounded-full p-3 transition-all duration-300 hover:scale-110 border border-yellow-400/40 z-30"
              aria-label="Previous video"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-yellow-400 rounded-full p-3 transition-all duration-300 hover:scale-110 border border-yellow-400/40 z-30"
              aria-label="Next video"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </div>
        </div>

        {/* Next Card */}
        <div
          className={`transition-all duration-500 cursor-pointer z-10 scale-95 opacity-70 hover:scale-100 hover:opacity-90 hidden sm:block`}
          style={{ width: '34%', marginLeft: '-5%' }}
          onClick={next}
        >
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-yellow-400/10 bg-gradient-to-br from-slate-800/60 to-slate-900/60">
            <img
              src={videos[nextIdx].poster}
              alt={videos[nextIdx].label}
              className="w-full aspect-video object-cover"
              style={{ minHeight: 200 }}
            />
            <div className="p-3 text-center text-yellow-300 text-base font-semibold">
              {videos[nextIdx].label}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Indicators and Labels */}
      <div className="flex justify-center items-center mt-6 space-x-8">
        {videos.map((video, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`group flex flex-col items-center space-y-2 transition-all duration-300 ${
              current === idx
                ? 'text-yellow-400 scale-105'
                : 'text-gray-400 hover:text-yellow-300'
            }`}
            aria-label={video.label}
          >
            {/* Indicator Dot */}
            <div
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                current === idx
                  ? 'bg-yellow-400 border-yellow-400 shadow-lg shadow-yellow-400/50'
                  : 'bg-transparent border-gray-400 group-hover:border-yellow-300'
              }`}
            />
            {/* Label */}
            <span className="text-sm font-medium">{video.label}</span>
          </button>
        ))}
      </div>

      {/* Additional Info Bar */}
      <div className="mt-4 text-center">
        <p className="text-gray-400 text-sm">
          Watch our EA MAPA trading system in action -{' '}
          {videos[current].label.toLowerCase()}
        </p>
      </div>
    </div>
  )
}
