// app/[lang]/layout.js
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { SUPPORTED, DEFAULT_LANG, translations } from './i18n'
import LanguageSwitcher from './LanguageSwitcher'

export const runtime = 'nodejs'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export function generateStaticParams() {
  return SUPPORTED.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }) {
  const base = 'https://eamapa.com' // <- change if different
  const lang = SUPPORTED.includes(params?.lang) ? params.lang : DEFAULT_LANG
  const meta = translations[lang]?.meta || translations[DEFAULT_LANG].meta

  const canonical = `${base}/${lang === 'en' ? '' : lang}`.replace(/\/$/, '')

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    metadataBase: new URL(base),
    alternates: {
      canonical,
      languages: {
        en: `${base}/`,
        th: `${base}/th`,
        zh: `${base}/zh`,
        hi: `${base}/hi`,
        ru: `${base}/ru`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      siteName: 'EA MAPA',
      type: 'website',
      locale: lang, // e.g. "hi" is fine; use "hi_IN" if you prefer
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
    robots: { index: true, follow: true },
  }
}

export default function RootLayout({ children, params }) {
  // Get current language from params
  const currentLang = SUPPORTED.includes(params?.lang) ? params.lang : DEFAULT_LANG

  const baseUrl = 'https://eamapa.com' // define baseUrl here for <link> tags

  return (
    <html lang={currentLang}>
      <head>
        {/* Hreflang tags for SEO */}
        <link rel="alternate" hrefLang="en" href={`${baseUrl}/`} />
        {SUPPORTED.filter(lang => lang !== 'en').map((lang) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={`${baseUrl}/${lang}`} />
        ))}
        {/* x-default for fallback */}
        <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/`} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Place LanguageSwitcher at the top level so it's always visible */}
        <LanguageSwitcher currentLang={currentLang} />
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
