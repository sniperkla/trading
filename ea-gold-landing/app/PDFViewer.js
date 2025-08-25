'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight, ExternalLink, ChevronsLeft, ChevronsRight, ZoomIn, ZoomOut } from 'lucide-react'

// Dynamically import react-pdf to avoid SSR issues
const PDFViewer = dynamic(
  () =>
    import('react-pdf').then((mod) => {
      const { Document, Page, pdfjs } = mod
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
      return function PDFDisplay({ url, lang, translations }) {
        const [numPages, setNumPages] = useState(null)
        const [pageNumber, setPageNumber] = useState(1)
        const [loading, setLoading] = useState(true)
        const [scale, setScale] = useState(1.0)

        function onDocumentLoadSuccess({ numPages }) {
          setNumPages(numPages)
          setLoading(false)
        }

        const goToFirstPage = () => setPageNumber(1)
        const goToLastPage = () => setPageNumber(numPages)
        const goToPreviousPage = () => setPageNumber((p) => Math.max(1, p - 1))
        const goToNextPage = () => setPageNumber((p) => Math.min(numPages, p + 1))
        const zoomIn = () => setScale((s) => Math.min(2.0, s + 0.1))
        const zoomOut = () => setScale((s) => Math.max(0.5, s - 0.1))
        const resetZoom = () => setScale(1.0)

        return (
          <div className="relative">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-yellow-400/20 border-t-yellow-400 rounded-full animate-spin"></div>
              </div>
            )}
            
            {/* Open New Tab Button - Top Right Corner */}
            <div className="sm:hidden absolute top-2 right-2 z-10">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-2 bg-black/60 hover:bg-black/80 text-white rounded transition-all duration-300 shadow-lg"
                title={translations?.[lang]?.openInNewTab || 'Open in New Tab'}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            
            <Document
              file={url}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={null}
              className="max-w-full flex flex-col items-center justify-center"
              style={{ textAlign: 'center' }}
            >
              <Page
                pageNumber={pageNumber}
                loading={null}
                width={Math.min(window.innerWidth - 96, 700) * scale}
                className="max-w-full mx-auto shadow-lg"
                renderAnnotationLayer={false}
                renderTextLayer={false}
                style={{ 
                  display: 'block', 
                  margin: '0 auto',
                  textAlign: 'center'
                }}
              />
              
              {/* Navigation Controls - Top Row */}
              {numPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6 text-white">
                  <button
                    onClick={goToFirstPage}
                    disabled={pageNumber <= 1}
                    className="p-2 bg-gray-600 hover:bg-gray-500 text-white rounded disabled:opacity-50 disabled:bg-gray-700 transition-colors flex items-center justify-center"
                    title="First Page"
                  >
                    <ChevronsLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={goToPreviousPage}
                    disabled={pageNumber <= 1}
                    className="p-2 bg-gray-600 hover:bg-gray-500 text-white rounded disabled:opacity-50 disabled:bg-gray-700 transition-colors flex items-center justify-center"
                    title="Previous Page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="px-3 py-1 bg-black/30 rounded text-sm font-medium min-w-[100px] text-center">
                    {pageNumber} to {numPages}
                  </span>
                  <button
                    onClick={goToNextPage}
                    disabled={pageNumber >= numPages}
                    className="p-2 bg-gray-600 hover:bg-gray-500 text-white rounded disabled:opacity-50 disabled:bg-gray-700 transition-colors flex items-center justify-center"
                    title="Next Page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={goToLastPage}
                    disabled={pageNumber >= numPages}
                    className="p-2 bg-gray-600 hover:bg-gray-500 text-white rounded disabled:opacity-50 disabled:bg-gray-700 transition-colors flex items-center justify-center"
                    title="Last Page"
                  >
                    <ChevronsRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Zoom Controls - Bottom Row */}
              <div className="flex justify-center items-center gap-2 mt-4 text-white">
                <button
                  onClick={zoomOut}
                  disabled={scale <= 0.5}
                  className="p-2 bg-gray-600 hover:bg-gray-500 text-white rounded disabled:opacity-50 disabled:bg-gray-700 transition-colors flex items-center justify-center"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span 
                  className="px-3 py-1 bg-black/30 rounded text-sm font-medium min-w-[80px] text-center cursor-pointer hover:bg-black/40 transition-colors"
                  onClick={resetZoom}
                  title="Reset Zoom"
                >
                  {Math.round(scale * 100)}%
                </span>
                <button
                  onClick={zoomIn}
                  disabled={scale >= 2.0}
                  className="p-2 bg-gray-600 hover:bg-gray-500 text-white rounded disabled:opacity-50 disabled:bg-gray-700 transition-colors flex items-center justify-center"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </Document>
          </div>
        )
      }
    }),
  { ssr: false }
)

export default function PDFViewerWrapper({ pdfUrl, showPDF, onClose, lang, translations }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!showPDF || !mounted) return null

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div className="relative w-full max-w-4xl bg-transparent flex justify-center">
        <div className="relative bg-black/40 backdrop-blur-md rounded-2xl p-6 shadow-2xl w-full max-w-3xl flex flex-col items-center justify-center">
          <PDFViewer url={pdfUrl} lang={lang} translations={translations} />
        </div>
      </div>
    </div>
  )
}
