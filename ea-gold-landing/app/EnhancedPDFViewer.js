'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState, useRef } from 'react'
import {
  X,
  Download,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ArrowLeft,
  ArrowRight,
  ArrowLeftToLine,
  ArrowRightToLine,
  Printer
} from 'lucide-react'

// Dynamically import react-pdf to avoid SSR issues
const PDFViewer = dynamic(
  () =>
    import('react-pdf').then((mod) => {
      const { Document, Page, pdfjs } = mod
      
      // Fix for version mismatch - use the exact same version
      // Get the actual version number from pdfjs
      const pdfWorkerVersion = pdfjs.version
      console.log(`PDF.js version: ${pdfWorkerVersion}`)
      
      // Set worker with matching version
      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfWorkerVersion}/pdf.worker.min.js`

      return function PDFDisplay({ url, isFullscreen, lang, translations, ...props }) {
        const [numPages, setNumPages] = useState(null)
        const [pageNumber, setPageNumber] = useState(1)
        const [loading, setLoading] = useState(true)
        const [scale, setScale] = useState(1)
        const [error, setError] = useState(null)
        const viewerContainerRef = useRef(null)
        const [containerWidth, setContainerWidth] = useState(800)
        const [isMobile, setIsMobile] = useState(false)

        // Set container width and check if mobile
        useEffect(() => {
          const checkSize = () => {
            const mobile = window.innerWidth < 768
            setIsMobile(mobile)

            if (viewerContainerRef.current) {
              // Get available width (accounting for padding)
              const availableWidth = viewerContainerRef.current.clientWidth - (mobile ? 24 : 32)
              
              // Calculate appropriate width
              let width;
              if (isFullscreen) {
                // For fullscreen mode
                width = Math.min(window.innerWidth - 32, 1000)
              } else if (mobile) {
                // For mobile mode (smaller than available to account for scrollbars)
                width = Math.min(availableWidth - 16, 400)
              } else {
                // For desktop mode
                width = Math.min(availableWidth, 800)
              }
              
              setContainerWidth(width)
            }
          }

          checkSize()
          window.addEventListener('resize', checkSize)
          return () => window.removeEventListener('resize', checkSize)
        }, [isFullscreen])

        function onDocumentLoadSuccess({ numPages }) {
          setNumPages(numPages)
          setLoading(false)
          setError(null)
        }

        function onDocumentLoadError(err) {
          console.error('PDF load error:', err)
          setLoading(false)
          
          // Check specifically for version mismatch errors
          const errorMessage = err.message || 'Unknown error'
          const isVersionError = errorMessage.includes('API version') && errorMessage.includes('Worker version')
          
          if (isVersionError) {
            // Try to extract versions for better error message
            const apiMatch = errorMessage.match(/API version "([^"]+)"/)
            const workerMatch = errorMessage.match(/Worker version "([^"]+)"/)
            const apiVersion = apiMatch ? apiMatch[1] : 'unknown'
            const workerVersion = workerMatch ? workerMatch[1] : 'unknown'
            
            setError(`PDF.js version mismatch: API ${apiVersion} ≠ Worker ${workerVersion}. Try Simple Viewer instead.`)
            
            // Force a switch to simple viewer after a short delay if it's a version error
            setTimeout(() => {
              window.parent.postMessage({type: 'USE_SIMPLE_PDF_VIEWER'}, '*')
            }, 4000)
          } else {
            setError(`Could not load PDF: ${errorMessage}`)
          }
        }

        // Zoom controls
        const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3))
        const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.6))
        const resetZoom = () => setScale(1)

        return (
          <div ref={viewerContainerRef} className="w-full overflow-y-auto" style={{ 
              maxHeight: isMobile ? 'calc(80vh - 80px)' : 'auto',
              WebkitOverflowScrolling: 'touch' // Improve iOS scrolling
            }}>
            {loading && (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-12 h-12 border-4 border-yellow-400/20 border-t-yellow-400 rounded-full animate-spin"></div>
                <p className="mt-4 text-white/80">{props.translations?.[props.lang || 'en']?.pdfLoading || "Loading PDF..."}</p>
              </div>
            )}

            {error && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                  <X className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-red-400 text-lg font-medium mb-2">
                  {props.translations?.[props.lang || 'en']?.errorLoadingPDF || "Error Loading PDF"}
                </h3>
                <p className="text-white/70 max-w-md mb-4">{error}</p>
                <p className="text-white/60 max-w-md mb-6 text-sm">
                  {props.translations?.[props.lang || 'en']?.pdfVersionError || "This may be due to a PDF.js version mismatch. Try one of the alternatives below."}
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/40 text-yellow-100 rounded-lg transition-all"
                  >
                    {props.translations?.[props.lang || 'en']?.openPDFDirectly || "Open PDF Directly"}
                  </a>
                  <button
                    onClick={() => window.parent.postMessage({type: 'USE_SIMPLE_PDF_VIEWER'}, '*')}
                    className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/40 text-blue-100 rounded-lg transition-all"
                  >
                    {props.translations?.[props.lang || 'en']?.useSimpleViewer || "Use Simple Viewer"}
                  </button>
                </div>
              </div>
            )}

            {/* Add fallback timer to prevent permanent loading */}
            {loading && (
              <iframe 
                src={url}
                style={{ 
                  display: 'none',
                  width: '1px', 
                  height: '1px',
                  opacity: 0,
                  position: 'absolute',
                  pointerEvents: 'none'
                }}
                title="PDF Preload"
                onLoad={() => {
                  // If still loading after iframe loads, force loading to end
                  setTimeout(() => {
                    if (loading) {
                      console.log('Using fallback loading completion')
                      setLoading(false)
                    }
                  }, 3000)
                }}
              />
            )}

            {!loading && !error && (
              <>
                <Document
                  file={url}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={null}
                  className="max-w-full"
                >
                  <Page
                    key={`page_${pageNumber}`}
                    pageNumber={pageNumber}
                    loading={null}
                    width={containerWidth * scale}
                    scale={scale}
                    className="max-w-full mx-auto shadow-lg"
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    canvasBackground={isMobile ? 'transparent' : '#f0f0f0'}
                    style={{
                      // Better mobile rendering
                      maxWidth: '100%',
                      height: 'auto',
                    }}
                  />

                  {/* PDF Controls */}
                  <div className="flex flex-col gap-4 mt-6">
                    {/* Page Navigation */}
                    {numPages > 1 && (
                      <div className="flex justify-center items-center gap-2 text-white">
                        <button
                          onClick={() => setPageNumber(1)}
                          disabled={pageNumber <= 1}
                          className="p-2 bg-yellow-500/20 hover:bg-yellow-500/40 rounded-lg disabled:opacity-50 transition-all"
                          title={props.translations?.[props.lang || 'en']?.firstPage || "First Page"}
                        >
                          <ArrowLeftToLine className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            setPageNumber((p) => Math.max(1, p - 1))
                          }
                          disabled={pageNumber <= 1}
                          className="p-2 bg-yellow-500/20 hover:bg-yellow-500/40 rounded-lg disabled:opacity-50 transition-all"
                          title={props.translations?.[props.lang || 'en']?.previousPage || "Previous Page"}
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>

                        <div className="px-3 min-w-[90px] text-center">
                          <span className="text-yellow-100">
                            {pageNumber} {props.translations?.[props.lang || 'en']?.pageOf || "/"} {numPages}
                          </span>
                        </div>

                        <button
                          onClick={() =>
                            setPageNumber((p) => Math.min(numPages, p + 1))
                          }
                          disabled={pageNumber >= numPages}
                          className="p-2 bg-yellow-500/20 hover:bg-yellow-500/40 rounded-lg disabled:opacity-50 transition-all"
                          title={props.translations?.[props.lang || 'en']?.nextPage || "Next Page"}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setPageNumber(numPages)}
                          disabled={pageNumber >= numPages}
                          className="p-2 bg-yellow-500/20 hover:bg-yellow-500/40 rounded-lg disabled:opacity-50 transition-all"
                          title={props.translations?.[props.lang || 'en']?.lastPage || "Last Page"}
                        >
                          <ArrowRightToLine className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Zoom Controls */}
                    <div className="flex justify-center items-center gap-2 text-white">
                      <button
                        onClick={zoomOut}
                        disabled={scale <= 0.6}
                        className="p-2 bg-gray-700/40 hover:bg-gray-700/60 rounded-lg disabled:opacity-50 transition-all"
                        title={props.translations?.[props.lang || 'en']?.zoomOut || "Zoom Out"}
                      >
                        <ZoomOut className="w-4 h-4" />
                      </button>

                      <button
                        onClick={resetZoom}
                        className="px-3 py-1 text-xs bg-gray-700/40 hover:bg-gray-700/60 rounded-lg transition-all"
                        title={props.translations?.[props.lang || 'en']?.resetZoom || "Reset Zoom"}
                      >
                        {Math.round(scale * 100)}%
                      </button>

                      <button
                        onClick={zoomIn}
                        disabled={scale >= 3}
                        className="p-2 bg-gray-700/40 hover:bg-gray-700/60 rounded-lg disabled:opacity-50 transition-all"
                        title={props.translations?.[props.lang || 'en']?.zoomIn || "Zoom In"}
                      >
                        <ZoomIn className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Document>
              </>
            )}
          </div>
        )
      }
    }),
  { ssr: false }
)

export default function EnhancedPDFViewerWrapper({
  pdfUrl,
  showPDF,
  onClose,
  lang,
  translations
}) {
  const [mounted, setMounted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(mobile)
    }
    
    // Check initially and on orientation change
    checkMobile()
    window.addEventListener('resize', checkMobile)
    window.addEventListener('orientationchange', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('orientationchange', checkMobile)
    }
  }, [])

  if (!showPDF || !mounted) return null

  const toggleFullscreen = () => setIsFullscreen((prev) => !prev)

  // Fullscreen mode
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-3 bg-black/90 border-b border-white/10 shrink-0">
            <h3 className="text-lg font-bold text-yellow-400">
              {translations?.[lang || 'en']?.pdfGuide || "PDF Guide"} {lang && `(${lang.toUpperCase()})`}
            </h3>
            <div className="flex items-center gap-2">
              <a
                href={pdfUrl}
                download
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title={translations?.[lang || 'en']?.downloadPDF || "Download PDF"}
              >
                <Download className="w-5 h-5 text-white" />
              </a>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title={translations?.[lang || 'en']?.openInNewTab || "Open in New Tab"}
              >
                <Printer className="w-5 h-5 text-white" />
              </a>
              <button
                onClick={toggleFullscreen}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title={translations?.[lang || 'en']?.exitFullscreen || "Exit Fullscreen"}
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* PDF Content */}
          <div className="flex-1 overflow-y-auto p-4" style={{ WebkitOverflowScrolling: 'touch' }}>
            <PDFViewer url={pdfUrl} isFullscreen={true} lang={lang} translations={translations} />
          </div>
        </div>
      </div>
    )
  }

  // Regular mode
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-4xl bg-transparent" style={{ 
        maxHeight: isMobile ? '85vh' : 'auto',
        overflowY: isMobile ? 'auto' : 'visible',
        WebkitOverflowScrolling: 'touch'
      }}>
        {/* Controls */}
        <div className="flex justify-between items-center mb-4 p-3 bg-black/40 rounded-xl backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="text-white/80 text-sm">
              {isMobile ? `📱 ${translations?.[lang || 'en']?.mobile || "Mobile"}` : `💻 ${translations?.[lang || 'en']?.desktop || "Desktop"}`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleFullscreen}
              className="flex items-center gap-1 px-3 py-2 bg-yellow-500/20 hover:bg-yellow-500/40 text-yellow-200 font-medium rounded-lg transition-all"
            >
              <Maximize2 className="w-4 h-4" />
              {isMobile ? '' : translations?.[lang || 'en']?.fullscreen || 'Fullscreen'}
            </button>
            <a
              href={pdfUrl}
              download
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title={translations?.[lang || 'en']?.downloadPDF || "Download PDF"}
            >
              <Download className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative bg-black/40 backdrop-blur-md rounded-2xl p-6 shadow-2xl overflow-hidden" 
             style={{ 
               maxHeight: isMobile ? 'calc(70vh - 60px)' : 'auto',
             }}>
          <div className="overflow-y-auto" style={{ 
              WebkitOverflowScrolling: 'touch',
              maxHeight: isMobile ? '100%' : 'auto'
            }}>
            <PDFViewer url={pdfUrl} isFullscreen={false} lang={lang} translations={translations} />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex flex-col items-center gap-2">
          <p className="text-center text-sm text-gray-400">
            {isMobile ? (
              <span>📱 {translations?.[lang || 'en']?.tapToFullscreen || "Tap the fullscreen button for better viewing"}</span>
            ) : (
              <span>💻 {translations?.[lang || 'en']?.useZoomControls || "Use zoom controls to adjust PDF size"}</span>
            )}
          </p>
          
          {/* PDF Help */}
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-2 py-1 bg-gray-700/40 hover:bg-gray-700/60 text-gray-300 rounded"
          >
            {translations?.[lang || 'en']?.openPDFTab || "Open PDF in new tab"}
          </a>
        </div>
      </div>
    </div>
  )
}
