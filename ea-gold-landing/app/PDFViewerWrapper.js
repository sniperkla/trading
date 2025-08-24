'use client'

import EnhancedPDFViewer from './EnhancedPDFViewer'

// A simple wrapper for the PDF viewer
export default function PDFViewerWrapper({ pdfUrl, showPDF, onClose, lang, translations }) {
  if (!showPDF) return null
  
  // Render the PDF viewer
  return (
    <EnhancedPDFViewer
      pdfUrl={pdfUrl}
      showPDF={showPDF}
      onClose={onClose}
      lang={lang}
      translations={translations}
    />
  )
}
