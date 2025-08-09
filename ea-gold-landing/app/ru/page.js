import TradingEALanding from '../page'

export const generateMetadata = () => ({
  title: 'EA MAPA - Бесплатный торговый робот для золота | Автоматизированный Forex EA для MT5',
  description: 'EA MAPA — это бесплатный продвинутый торговый робот с ИИ для золота (XAUUSD) и форекса. 100% бесплатно, регистрация не требуется. Скачать для MT5. Поддержка нескольких брокеров. Повышайте эффективность торговли с помощью автоматизации, управления рисками и круглосуточной работы.',
  keywords: 'EA MAPA, Бесплатный EA, Торговый робот для золота, Forex EA, MT5, Автоматизированная торговля, ИИ трейдинг, XAUUSD, Торговый бот, Скачать EA, Мульти-брокер, Управление рисками, Автоматизация торговли',
  alternates: {
    canonical: 'https://eamapa.com/ru',
    languages: {
      'th': 'https://eamapa.com/th',
      'en': 'https://eamapa.com',
      'zh': 'https://eamapa.com/zh',
      'hi': 'https://eamapa.com/hi',
      'ru': 'https://eamapa.com/ru'
    }
  },
  openGraph: {
    title: 'EA MAPA - Бесплатный торговый робот для золота | Автоматизированный Forex EA для MT5',
    description: 'EA MAPA — это бесплатный продвинутый торговый робот с ИИ для золота (XAUUSD) и форекса. 100% бесплатно, регистрация не требуется.',
    url: 'https://eamapa.com/ru',
    siteName: 'EA MAPA',
    locale: 'ru_RU',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EA MAPA - Бесплатный торговый робот для золота',
    description: 'EA MAPA — это бесплатный продвинутый торговый робот с ИИ для золота (XAUUSD) и форекса. 100% бесплатно, регистрация не требуется.'
  }
})

export default function Page() {
  return <TradingEALanding forcedLang="ru" />
}
