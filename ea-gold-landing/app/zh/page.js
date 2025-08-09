
import TradingEALanding from '../page'

export const generateMetadata = () => ({
  title: 'EA MAPA 免费黄金交易AI机器人 | MT5自动化外汇EA',
  description: 'EA MAPA 是一款免费的高级AI黄金（XAUUSD）和外汇交易机器人。100%免费，无需注册。MT5专用。支持多家经纪商。通过自动化、风险管理和全天候性能提升您的交易。',
  keywords: 'EA MAPA, 免费EA, 黄金交易机器人, 外汇EA, MT5, 自动化交易, AI交易, XAUUSD, 交易机器人, 免费外汇机器人, 下载EA, 多经纪商, 风险管理, 交易自动化',
  alternates: {
    canonical: 'https://eamapa.com/zh',
    languages: {
      'th': 'https://eamapa.com/th',
      'en': 'https://eamapa.com',
      'zh': 'https://eamapa.com/zh',
      'hi': 'https://eamapa.com/hi',
      'ru': 'https://eamapa.com/ru'
    }
  },
  openGraph: {
    title: 'EA MAPA 免费黄金交易AI机器人 | MT5自动化外汇EA',
    description: 'EA MAPA 是一款免费的高级AI黄金（XAUUSD）和外汇交易机器人。100%免费，无需注册。MT5专用。',
    url: 'https://eamapa.com/zh',
    siteName: 'EA MAPA',
    locale: 'zh_CN',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EA MAPA 免费黄金交易AI机器人',
    description: 'EA MAPA 是一款免费的高级AI黄金（XAUUSD）和外汇交易机器人。100%免费，无需注册。'
  }
})

export default function Page() {
  return <TradingEALanding forcedLang="zh" />
}
