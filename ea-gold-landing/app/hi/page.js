'use client'
import React from 'react'
import Head from 'next/head'
import translations from '../i18n'
import TradingEALanding from '../page'

export default function HindiLanding() {
  const lang = 'hi'
  const pageTitle =
    'EA MAPA निःशुल्क गोल्ड ट्रेडिंग एआई रोबोट | MT5 के लिए स्वचालित Forex EA'
  const pageDescription =
    'EA MAPA एक निःशुल्क, उन्नत एआई ट्रेडिंग रोबोट है जो सोने (XAUUSD) और फॉरेक्स के लिए है। 100% मुफ्त, कोई पंजीकरण आवश्यक नहीं। MT5 के लिए डाउनलोड करें। कई ब्रोकरों का समर्थन करता है। स्वचालन, जोखिम प्रबंधन और 24/7 प्रदर्शन के साथ अपने ट्रेडिंग को बढ़ाएं।'
  const pageKeywords =
    'EA MAPA, निःशुल्क EA, गोल्ड ट्रेडिंग रोबोट, Forex EA, MT5, स्वचालित ट्रेडिंग, एआई ट्रेडिंग, XAUUSD, ट्रेडिंग बोट, फ्री फॉरेक्स रोबोट, EA डाउनलोड करें, मल्टी ब्रोकर, जोखिम प्रबंधन, ट्रेडिंग ऑटोमेशन'
  const pageUrl = 'https://eamapa.com/hi'
  const pageImage = 'https://eamapa.com/images/page.png'

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageImage} />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />
        {/* Hreflang for SEO */}
        <link rel="alternate" hrefLang="th" href="https://eamapa.com/th" />
        <link rel="alternate" hrefLang="en" href="https://eamapa.com/en" />
        <link rel="alternate" hrefLang="ru" href="https://eamapa.com/ru" />
        <link rel="alternate" hrefLang="hi" href="https://eamapa.com/hi" />
        <link rel="alternate" hrefLang="zh" href="https://eamapa.com/zh" />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://eamapa.com/en"
        />
      </Head>
      <TradingEALanding forcedLang={lang} />
    </>
  )
}
