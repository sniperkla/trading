'use client'
import { useState, useCallback } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download
} from 'lucide-react'
import './pdf-viewer.css'

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

export default function ReactPDFViewer({ pdfUrl, lang, translations }) {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1.0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  //   const onDocumentLoadSuccess = useCallback(({ numPages }) => {
  //     setNumPages(numPages)
  //     setLoading(false)
  //     setError(null)
  //   }, [])

  //   const onDocumentLoadError = useCallback((error) => {
  //     console.error('PDF Load Error:', error)
  //     setError(error)
  //     setLoading(false)
  //   }, [])

  const goToPrevPage = () => {
    setPageNumber((prevPage) => Math.max(prevPage - 1, 1))
  }

  const goToNextPage = () => {
    setPageNumber((prevPage) => Math.min(prevPage + 1, numPages))
  }

  const zoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.2, 3.0))
  }

  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.2, 0.5))
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = `guide-${lang}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-900/50 rounded-lg">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-yellow-400 font-semibold">
            {translations[lang]?.loadingPDF || 'Loading PDF...'}
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96 bg-red-900/20 border border-red-400/50 rounded-lg">
        <div className="text-center p-6">
          <div className="text-red-400 text-xl mb-2">⚠️</div>
          <p className="text-red-400 font-semibold mb-2">
            {translations[lang]?.pdfLoadError || 'Failed to load PDF'}
          </p>
          <p className="text-gray-300 text-sm">
            {translations[lang]?.tryRefresh || 'Please try refreshing the page'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            {translations[lang]?.refresh || 'Refresh'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-gray-900/50 rounded-lg overflow-hidden">
      {/* PDF Controls */}
      <div className="bg-black/60 p-4 border-b border-gray-700 flex flex-wrap items-center justify-between gap-4">
        {/* Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="p-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-white font-semibold px-3">
            {translations[lang]?.page || 'Page'} {pageNumber}{' '}
            {translations[lang]?.of || 'of'} {numPages}
          </span>

          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="p-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            disabled={scale <= 0.5}
            className="p-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-lg transition-colors"
          >
            <ZoomOut className="w-5 h-5" />
          </button>

          <span className="text-white font-semibold px-3">
            {Math.round(scale * 100)}%
          </span>

          <button
            onClick={zoomIn}
            disabled={scale >= 3.0}
            className="p-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-lg transition-colors"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          <Download className="w-5 h-5" />
          {translations[lang]?.download || 'Download'}
        </button>
      </div>

      {/* PDF Display */}
      <div className="flex justify-center p-4 bg-gray-800/30 overflow-auto">
        <div className="shadow-2xl">
          <Document
            file={pdfUrl}
            loading={
              <div className="flex items-center justify-center h-96">
                <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              className="shadow-lg"
            />
          </Document>
        </div>
      </div>
    </div>
  )
}
