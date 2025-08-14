// app/layout.js
import { Geist, Geist_Mono } from 'next/font/google'
import { headers } from 'next/headers'
import './globals.css'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import Script from 'next/script'


// Ensure Node runtime (Negotiator is Node-only)
export const runtime = 'nodejs'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

const SUPPORTED = ['en', 'th', 'zh', 'hi', 'ru']
const DEFAULT_LANG = 'en'

async function negotiateLanguage() {
  const hdrs = await headers()
  const accept = hdrs.get('accept-language') ?? DEFAULT_LANG
  const negotiator = new Negotiator({ headers: { 'accept-language': accept } })  
  const requested = negotiator.languages()
  return match(requested, SUPPORTED, DEFAULT_LANG)
}

const titles = {
  th: 'EA MAPA ฟรีบอทเทรดทองอัตโนมัติ | หุ่นยนต์เทรด Forex สำหรับ MT5',
  en: 'EA MAPA - Free Gold Trading AI Robot | Automated Forex EA for MT5',
  zh: 'EA MAPA 免费黄金交易AI机器人 | MT5自动化外汇EA',
  hi: 'EA MAPA निःशुल्क गोल्ड ट्रेडिंग एआई रोबोट | MT5 के लिए स्वचालित Forex EA',
  ru: 'EA MAPA - Бесплатный торговый робот для золота | Автоматизированный Forex EA для MT5'
}

const descriptions = {
  th: 'EA MAPA คือบอทเทรดทองและฟอเร็กซ์อัตโนมัติ ใช้ฟรี 100% ไม่ต้องลงทะเบียน รองรับ MT5 หลายโบรกเกอร์ จัดการความเสี่ยงและทำงาน 24/7',
  en: 'EA MAPA is a free, advanced AI trading robot for gold (XAUUSD) and forex. 100% free, no registration required. Download for MT5. Supports multiple brokers. Boost your trading with automation, risk management, and 24/7 performance.',
  zh: 'EA MAPA 是免费的黄金（XAUUSD）与外汇智能交易机器人。100% 免费、无需注册，支持 MT5 多家券商，自动化与风险管理助力 24/7 交易。',
  hi: 'EA MAPA एक मुफ्त, उन्नत एआई ट्रेडिंग रोबोट है (XAUUSD/Forex) — 100% मुफ्त, बिना पंजीकरण। MT5 के लिए उपलब्ध, मल्टी-ब्रोकर सपोर्ट, ऑटोमेशन और 24/7 परफॉर्मेंस।',
  ru: 'EA MAPA — бесплатный продвинутый торговый робот для золота (XAUUSD) и форекс. 100% бесплатно, без регистрации. MT5, поддержка нескольких брокеров, автоматизация и 24/7 работа.'
}

export async function generateMetadata() {
  const lang = negotiateLanguage(headers())
  const titleDefault = titles[lang]
  const description = descriptions[lang]

  return {
    metadataBase: new URL('https://eamapa.com'),
    title: { default: titleDefault },
    description,
    keywords:
      'EA MAPA, Free EA, Gold Trading Robot, Forex EA, MT5, Automated Trading, AI Trading, XAUUSD, Trading Bot, Free Forex Robot, Download EA, Multi Broker, Risk Management, Trading Automation',
    viewport: 'width=device-width, initial-scale=1',
    robots: 'index, follow',
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      url: '/',
      siteName: 'EA MAPA',
      title: titleDefault,
      description,
      locale: lang,
      images: [
        {
          url: '/images/page.png',
          width: 1200,
          height: 630,
          alt: 'EA MAPA Preview'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: titleDefault,
      description,
      images: ['/images/page.png']
    }
  }
}

export default async function RootLayout({ children }) {
  const lang = await negotiateLanguage()
  console.log(`Using language: ${lang}`)

  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BDMFE7PZPL"
          strategy="afterInteractive"
        />
        <Script id="ga-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BDMFE7PZPL', { send_page_view: true });
          `}
        </Script>
      </body>
    </html>
  )
}
