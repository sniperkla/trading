'use client'
import React from 'react'
import Head from 'next/head'
import translations from '../i18n'
import TradingEALanding from '../page'

export default function EnglishLanding() {
  const lang = 'en'
  const pageTitle =
    'EA MAPA Free Gold Trading AI Robot | Automated Forex EA for MT5'
  const pageDescription =
    'EA MAPA is a free, advanced AI trading robot for gold (XAUUSD) and forex. 100% free, no registration required. Download for MT5. Supports multiple brokers. Boost your trading with automation, risk management, and 24/7 performance.'
  const pageKeywords =
    'EA MAPA, Free EA, Gold Trading Robot, Forex EA, MT5, Automated Trading, AI Trading, XAUUSD, Trading Bot, Free Forex Robot, Download EA, Multi Broker, Risk Management, Trading Automation'
  const pageUrl = 'https://eamapa.com/en'
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
