'use client'

import { useEffect, useState } from 'react'
import { X, Download, Maximize2 } from 'lucide-react'

export default function SimplePDFViewer({ pdfUrl, showPDF, onClose, lang, translations }) {
  const [mounted, setMounted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [useGoogleViewer, setUseGoogleViewer] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    const mobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    setIsMobile(mobile)
    
    // Use Google Docs viewer for iOS devices by default
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    if (isIOS) {
      setUseGoogleViewer(true)
    }
    
    // Log for debugging
    console.log('SimplePDFViewer mounted, PDF URL:', pdfUrl, { mobile, isIOS })
  }, [pdfUrl])

  if (!showPDF || !mounted) return null
  
  const toggleFullscreen = () => setIsFullscreen(prev => !prev)

  // Fullscreen mode
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-3 bg-black/90 border-b border-white/10">
            <h3 className="text-lg font-bold text-yellow-400">PDF Guide</h3>
            <div className="flex items-center gap-2">
              <a href={pdfUrl} download className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Download className="w-5 h-5 text-white" />
              </a>
              <button onClick={toggleFullscreen} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
          
          {/* PDF Content - Simple iframe */}
          <div className="flex-1 overflow-auto">
            <iframe
              src={useGoogleViewer ? 
                `https://docs.google.com/viewer?url=${encodeURIComponent(window.location.origin + pdfUrl)}&embedded=true` : 
                pdfUrl}
              className="w-full h-full border-none"
              title="PDF Fullscreen"
            />
          </div>
        </div>
      </div>
    )
  }

  // Regular mode
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div className="relative w-full max-w-4xl bg-transparent">
        {/* Controls */}
        <div className="flex justify-between items-center mb-4 p-3 bg-black/40 rounded-xl backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="text-white/80 text-sm">
              {isMobile ? '📱 Mobile PDF' : '💻 PDF Viewer'}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button onClick={toggleFullscreen} 
              className="flex items-center gap-1 px-3 py-2 bg-yellow-500/20 hover:bg-yellow-500/40 text-yellow-200 font-medium rounded-lg transition-all">
              <Maximize2 className="w-4 h-4" />
              {isMobile ? '' : 'Fullscreen'}
            </button>
            <a href={pdfUrl} download className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Download className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>
        
        {/* PDF Content - Simple iframe */}
        <div className="relative bg-black/40 backdrop-blur-md rounded-2xl p-6 shadow-2xl overflow-hidden" 
             style={{ minHeight: isMobile ? '60vh' : '70vh' }}>
          <iframe
            src={useGoogleViewer ? 
              `https://docs.google.com/viewer?url=${encodeURIComponent(window.location.origin + pdfUrl)}&embedded=true` : 
              pdfUrl}
            className="w-full h-full border-none"
            style={{ minHeight: isMobile ? '50vh' : '60vh' }}
            title="PDF Viewer"
          />
          
          {/* Viewer toggle button */}
          <button
            onClick={() => setUseGoogleViewer(prev => !prev)}
            className="absolute bottom-2 right-2 text-xs px-2 py-1 bg-black/40 hover:bg-black/60 text-gray-300 rounded-lg"
          >
            {useGoogleViewer ? 'Try Native Viewer' : 'Try Google Viewer'}
          </button>
        </div>
        
        {/* Footer */}
        <div className="mt-4 text-center text-sm text-gray-400">
          {isMobile ? (
            <p>📱 Tap fullscreen for better viewing</p>
          ) : (
            <p>💻 Use fullscreen mode for best experience</p>
          )}
        </div>
      </div>
    </div>
  )
}
