import TradingEALanding from '../page'

export const generateMetadata = () => ({
  title: 'EA MAPA निःशुल्क गोल्ड ट्रेडिंग एआई रोबोट | MT5 के लिए स्वचालित Forex EA',
  description: 'EA MAPA एक निःशुल्क, उन्नत एआई ट्रेडिंग रोबोट है जो सोने (XAUUSD) और फॉरेक्स के लिए है। 100% मुफ्त, कोई पंजीकरण आवश्यक नहीं। MT5 के लिए डाउनलोड करें। कई ब्रोकरों का समर्थन करता है। स्वचालन, जोखिम प्रबंधन और 24/7 प्रदर्शन के साथ अपने ट्रेडिंग को बढ़ाएं।',
  keywords: 'EA MAPA, निःशुल्क EA, गोल्ड ट्रेडिंग रोबोट, Forex EA, MT5, स्वचालित ट्रेडिंग, एआई ट्रेडिंग, XAUUSD, ट्रेडिंग बोट, फ्री फॉरेक्स रोबोट, EA डाउनलोड करें, मल्टी ब्रोकर, जोखिम प्रबंधन, ट्रेडिंग ऑटोमेशन',
  alternates: {
    canonical: 'https://eamapa.com/hi',
    languages: {
      'th': 'https://eamapa.com/th',
      'en': 'https://eamapa.com',
      'zh': 'https://eamapa.com/zh',
      'hi': 'https://eamapa.com/hi',
      'ru': 'https://eamapa.com/ru'
    }
  },
  openGraph: {
    title: 'EA MAPA निःशुल्क गोल्ड ट्रेडिंग एआई रोबोट | MT5 के लिए स्वचालित Forex EA',
    description: 'EA MAPA एक निःशुल्क, उन्नत एआई ट्रेडिंग रोबोट है जो सोने (XAUUSD) और फॉरेक्स के लिए है। 100% मुफ्त, कोई पंजीकरण आवश्यक नहीं।',
    url: 'https://eamapa.com/hi',
    siteName: 'EA MAPA',
    locale: 'hi_IN',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EA MAPA निःशुल्क गोल्ड ट्रेडिंग एआई रोबोट',
    description: 'EA MAPA एक निःशुल्क, उन्नत एआई ट्रेडिंग रोबोट है जो सोने (XAUUSD) और फॉरेक्स के लिए है। 100% मुफ्त, कोई पंजीकरण आवश्यक नहीं।'
  }
})

export default function Page() {
  return <TradingEALanding forcedLang="hi" />
}
