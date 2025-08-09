import TradingEALanding from '../page'

export const generateMetadata = () => ({
  title: 'EA MAPA Free Gold Trading AI Robot | Automated Forex EA for MT5',
  description: 'EA MAPA is a free, advanced AI trading robot for gold (XAUUSD) and forex. 100% free, no registration required. Download for MT5. Supports multiple brokers. Boost your trading with automation, risk management, and 24/7 performance.',
  keywords: 'EA MAPA, Free EA, Gold Trading Robot, Forex EA, MT5, Automated Trading, AI Trading, XAUUSD, Trading Bot, Free Forex Robot, Download EA, Multi Broker, Risk Management, Trading Automation',
  alternates: {
    canonical: 'https://eamapa.com/en',
    languages: {
      'th': 'https://eamapa.com/th',
      'en': 'https://eamapa.com/en',
      'zh': 'https://eamapa.com/zh',
      'hi': 'https://eamapa.com/hi',
      'ru': 'https://eamapa.com/ru'
    }
  },
  openGraph: {
    title: 'EA MAPA Free Gold Trading AI Robot | Automated Forex EA for MT5',
    description: 'EA MAPA is a free, advanced AI trading robot for gold (XAUUSD) and forex. 100% free, no registration required. Download for MT5. Supports multiple brokers.',
    url: 'https://eamapa.com/en',
    siteName: 'EA MAPA',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EA MAPA Free Gold Trading AI Robot | Automated Forex EA for MT5',
    description: 'EA MAPA is a free, advanced AI trading robot for gold (XAUUSD) and forex. 100% free, no registration required. Download for MT5. Supports multiple brokers.'
  }
})

export default function Page() {
  return <TradingEALanding forcedLang="en" />
}
