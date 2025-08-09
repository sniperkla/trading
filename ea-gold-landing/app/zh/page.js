
'use client'
import React from 'react'
import Head from 'next/head'
import translations from '../i18n'
import TradingEALanding from '../page'

export default function ChineseLanding() {
  const lang = 'zh'
  const pageTitle = 'EA MAPA 免费黄金交易AI机器人 | MT5自动化外汇EA'
  const pageDescription = 'EA MAPA 是一款免费的高级AI黄金（XAUUSD）和外汇交易机器人。100%免费，无需注册。MT5专用。支持多家经纪商。通过自动化、风险管理和全天候性能提升您的交易。'
  const pageKeywords = 'EA MAPA, 免费EA, 黄金交易机器人, 外汇EA, MT5, 自动化交易, AI交易, XAUUSD, 交易机器人, 免费外汇机器人, 下载EA, 多经纪商, 风险管理, 交易自动化'
  const pageUrl = 'https://eamapa.com/zh'
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
        <link rel="alternate" hrefLang="x-default" href="https://eamapa.com/en" />
      </Head>
      <TradingEALanding forcedLang={lang} />
    </>
  )
}
