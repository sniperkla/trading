'use client'
import React from 'react'
import Head from 'next/head'
import translations from '../i18n'
import TradingEALanding from '../page'

export default function RussianLanding() {
  const lang = 'ru'
  const pageTitle =
    'EA MAPA Бесплатный торговый робот для золота | Автоматизированный Forex EA для MT5'
  const pageDescription =
    'EA MAPA — это бесплатный продвинутый торговый робот с ИИ для золота (XAUUSD) и форекса. 100% бесплатно, регистрация не требуется. Скачать для MT5. Поддержка нескольких брокеров. Повышайте эффективность торговли с помощью автоматизации, управления рисками и круглосуточной работы.'
  const pageKeywords =
    'EA MAPA, Бесплатный EA, Торговый робот для золота, Forex EA, MT5, Автоматизированная торговля, ИИ трейдинг, XAUUSD, Торговый бот, Скачать EA, Мульти-брокер, Управление рисками, Автоматизация торговли'
  const pageUrl = 'https://eamapa.com/ru'
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
