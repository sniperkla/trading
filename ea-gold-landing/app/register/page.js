"use client";
import { useState } from "react";
import translations from "../i18n";
import { Users } from "lucide-react";

export default function RegisterPDFPage() {
  const [copied, setCopied] = useState(false);
  // Detect browser language on first load
  const initialLang =
    typeof window !== "undefined"
      ? navigator.language.startsWith("th")
        ? "th"
        : "en"
      : "en";
  const [lang, setLang] = useState(initialLang);

  const referralCode = "BsFPM765";

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get the correct PDF URL based on language
  const pdfName = lang === "th" ? "th.pdf" : "en.pdf";
  const publicPDFUrl = `https://eamapa.com/pdfs/${pdfName}`;

  return (
    <main className="min-h-screen flex flex-col bg-[#18181b]">
      {/* Header */}
      <div className="w-full max-w-2xl mx-auto bg-black/80 rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 border border-yellow-400 flex flex-col gap-3 sm:gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-1 sm:mb-2 text-center sm:text-left">
          {translations[lang]?.vantageGuide || "Vantage PDF Guide"}
        </h2>
        {/* Language Switcher */}
        <div className="flex gap-2 mb-2 justify-center">
          <button
            onClick={() => setLang("en")}
            className={`px-3 py-1 rounded-lg font-bold text-xs sm:text-sm ${
              lang === "en"
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLang("th")}
            className={`px-3 py-1 rounded-lg font-bold text-xs sm:text-sm ${
              lang === "th"
                ? "bg-green-500 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            ไทย
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <div className="text-center sm:text-left text-xs sm:text-sm text-yellow-300 font-semibold">
            {translations[lang]?.yourReferral || "Your Referral"}{" "}
            <span className="bg-yellow-400 text-black font-mono px-2 py-1 rounded text-xs sm:text-sm">
              {referralCode}
            </span>
            <div className="text-xs mt-1 text-yellow-200 font-normal">
              {translations[lang]?.referralNote ||
                "Use this code when registering."}
            </div>
          </div>
          <button
            onClick={handleCopyReferral}
            className="w-full sm:w-auto px-3 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-all text-xs sm:text-sm text-center"
          >
            {copied
              ? translations[lang]?.copied || "Copied!"
              : translations[lang]?.copyReferral || "Copy Referral"}
          </button>
          {/* Open Account Button */}
          <a
            href="https://vigco.co/uyYRJz"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-3 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors text-xs sm:text-sm text-center flex items-center justify-center gap-2"
          >
            <Users className="w-5 h-5" />
            {translations[lang]?.openAccount || "Open Account"}
          </a>
        </div>
      </div>
      {/* PDF Viewer */}
      <div className="flex-1 w-full">
        <iframe
          src={`https://docs.google.com/gview?url=${encodeURIComponent(
            publicPDFUrl
          )}&embedded=true`}
          width="100%"
          height="100%"
          style={{ border: "none", minHeight: "80vh" }}
          title="PDF Viewer"
          className="bg-[#18181b]"
        />
      </div>
    </main>
  );
}