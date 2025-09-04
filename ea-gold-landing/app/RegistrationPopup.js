'use client'
import { X, AlertTriangle, ExternalLink } from 'lucide-react'

export default function RegistrationPopup({
  isOpen,
  onClose,
  onContinue,
  lang,
  translations
}) {
  if (!isOpen) return null

  // Get the appropriate Vantage image based on language
  const getVantageImage = () => {
    const supportedLanguages = ['en', 'th', 'hi', 'zh', 'ru']
    const imageLang = supportedLanguages.includes(lang) ? lang : 'en'
    return `/images/vantage_${imageLang}.png`
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 py-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl border border-red-400/50 overflow-hidden flex flex-col">
        {/* Header with red accent - Fixed at top */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {translations[lang]?.importantNotice || 'Important Notice'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-red-700 hover:bg-red-800 rounded-full transition-colors focus:outline-none flex-shrink-0"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Vantage Image Section - Smaller on mobile */}
            <div className="flex justify-center">
              <div className="relative bg-white/5 border border-yellow-400/20 rounded-xl p-2 sm:p-4 shadow-lg">
                <img
                  src={getVantageImage()}
                  alt={`Vantage Registration - ${lang.toUpperCase()}`}
                  className="w-full h-auto max-w-xs sm:max-w-sm rounded-lg shadow-md"
                  onError={(e) => {
                    e.target.src = '/images/vantage_en.png' // Fallback to English version
                  }}
                />
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-3 sm:p-4">
              <h3 className="font-bold text-red-400 mb-2 sm:mb-3 text-base sm:text-lg">
                {translations[lang]?.registrationRequired ||
                  'Registration Required'}
              </h3>
              <div className="space-y-2 sm:space-y-3 text-gray-200 text-xs sm:text-sm leading-relaxed">
                <p>
                  <span className="font-semibold text-yellow-400">
                    {translations[lang]?.step1 || 'Step 1:'}
                  </span>{' '}
                  {translations[lang]?.mustRegisterFirst ||
                    'You must register with our referral code first before accessing the setup guide.'}
                </p>
                <p>
                  <span className="font-semibold text-yellow-400">
                    {translations[lang]?.step2 || 'Step 2:'}
                  </span>{' '}
                  {translations[lang]?.completeKYC ||
                    'Complete KYC verification on your broker account.'}
                </p>
                <p>
                  <span className="font-semibold text-yellow-400">
                    {translations[lang]?.step3 || 'Step 3:'}
                  </span>{' '}
                  {translations[lang]?.sendAccountNumber ||
                    'Send your account number to activate the bot.'}
                </p>
                <p>
                  <span className="font-semibold text-yellow-400">
                    {translations[lang]?.step4 || 'Step 4:'}
                  </span>{' '}
                  {translations[lang]?.downloadBot ||
                    'Download the bot from the Download section on the website.'}
                </p>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-xl p-3 sm:p-4">
              <h4 className="font-bold text-yellow-400 mb-2 text-sm sm:text-base">
                {translations[lang]?.referralCode || 'Referral Code:'}
              </h4>
              <div className="bg-black/40 rounded-lg p-2 sm:p-3 font-mono text-center">
                <span className="text-xl sm:text-2xl font-bold text-yellow-400">
                  BsFPM765
                </span>
              </div>
              <p className="text-xs text-gray-300 mt-2 text-center">
                {translations[lang]?.dontForgetCode ||
                  "⚠️ Don't forget this code when registering!"}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={onContinue}
                className="w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-xl shadow-lg hover:from-blue-400 hover:to-blue-600 transition-all duration-300 text-sm sm:text-base"
              >
                {translations[lang]?.alreadyRegistered ||
                  "I've Already Registered - Continue to Guide"}
              </button>
            </div>

            <div className="text-xs text-gray-400 text-center space-y-1">
              <p>
                {translations[lang]?.disclaimer1 ||
                  'Trading involves significant risk of loss.'}
              </p>
              <p>
                {translations[lang]?.disclaimer2 ||
                  'Please ensure you understand the risks before proceeding.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
