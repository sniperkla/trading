'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

// Dynamically import react-pdf to avoid SSR issues
const PDFViewer = dynamic(
  () =>
    import('react-pdf').then((mod) => {
      const { Document, Page, pdfjs } = mod
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
      return function PDFDisplay({ url }) {
        const [numPages, setNumPages] = useState(null)
        const [pageNumber, setPageNumber] = useState(1)
        const [loading, setLoading] = useState(true)

        function onDocumentLoadSuccess({ numPages }) {
          setNumPages(numPages)
          setLoading(false)
        }

        return (
          <>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-yellow-400/20 border-t-yellow-400 rounded-full animate-spin"></div>
              </div>
            )}
            <Document
              file={url}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={null}
              className="max-w-full"
            >
              <Page
                pageNumber={pageNumber}
                loading={null}
                width={Math.min(window.innerWidth - 48, 800)}
                className="max-w-full mx-auto"
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
              {numPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-4 text-white">
                  <button
                    onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                    disabled={pageNumber <= 1}
                    className="px-4 py-2 bg-yellow-500/20 rounded-lg disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <p>
                    Page {pageNumber} of {numPages}
                  </p>
                  <button
                    onClick={() =>
                      setPageNumber((p) => Math.min(numPages, p + 1))
                    }
                    disabled={pageNumber >= numPages}
                    className="px-4 py-2 bg-yellow-500/20 rounded-lg disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </Document>
          </>
        )
      }
    }),
  { ssr: false }
)

export default function PDFViewerWrapper({ pdfUrl, showPDF, onClose }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!showPDF || !mounted) return null

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div className="relative w-full max-w-4xl bg-transparent">
        <div className="relative bg-black/40 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
          <PDFViewer url={pdfUrl} />
        </div>
      </div>
    </div>
  )
}
