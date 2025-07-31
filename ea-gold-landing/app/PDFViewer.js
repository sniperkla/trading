export default function PDFViewerIframe({ pdfUrl, showPDF, onClose }) {
  if (!showPDF) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="bg-slate-900 rounded-2xl max-w-6xl max-h-[95vh] overflow-hidden border border-white/10 flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 p-4 border-b border-white/10 flex justify-between items-center">
          <h3 className="text-xl font-bold text-yellow-400">
            Vantage Registration Guide
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* PDF iframe */}
        <div className="flex-1">
          <iframe
            src={pdfUrl}
            width="100%"
            height="600px"
            title="PDF Viewer"
            className="border-none"
          />
        </div>
      </div>
    </div>
  )
}
