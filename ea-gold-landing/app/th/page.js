import TradingEALanding from '../page'

export const generateMetadata = () => ({
  title: 'EA MAPA ฟรีบอทเทรดทองอัตโนมัติ | หุ่นยนต์เทรด Forex สำหรับ MT5',
  description: 'EA MAPA คือบอทเทรดทองและฟอเร็กซ์อัตโนมัติด้วย AI ขั้นสูง ฟรี 100% ไม่ต้องสมัครสมาชิก ดาวน์โหลดใช้งานได้ทันที รองรับหลายโบรกเกอร์ เพิ่มศักยภาพการเทรดของคุณด้วยระบบอัตโนมัติและการจัดการความเสี่ยงตลอด 24 ชั่วโมง.',
  keywords: 'EA MAPA, ฟรี EA, บอทเทรดทอง, หุ่นยนต์เทรดฟอเร็กซ์, MT5, เทรดอัตโนมัติ, AI เทรด, XAUUSD, บอทเทรด, ดาวน์โหลด EA, หลายโบรกเกอร์, จัดการความเสี่ยง, ระบบเทรดอัตโนมัติ',
  alternates: {
    canonical: 'https://eamapa.com/th',
    languages: {
      'th': 'https://eamapa.com/th',
      'en': 'https://eamapa.com',
      'zh': 'https://eamapa.com/zh',
      'hi': 'https://eamapa.com/hi',
      'ru': 'https://eamapa.com/ru'
    }
  },
  openGraph: {
    title: 'EA MAPA ฟรีบอทเทรดทองอัตโนมัติ | หุ่นยนต์เทรด Forex สำหรับ MT5',
    description: 'EA MAPA คือบอทเทรดทองและฟอเร็กซ์อัตโนมัติด้วย AI ขั้นสูง ฟรี 100% ไม่ต้องสมัครสมาชิก ดาวน์โหลดใช้งานได้ทันที รองรับหลายโบรกเกอร์',
    url: 'https://eamapa.com/th',
    siteName: 'EA MAPA',
    locale: 'th_TH',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EA MAPA ฟรีบอทเทรดทองอัตโนมัติ | หุ่นยนต์เทรด Forex สำหรับ MT5',
    description: 'EA MAPA คือบอทเทรดทองและฟอเร็กซ์อัตโนมัติด้วย AI ขั้นสูง ฟรี 100% ไม่ต้องสมัครสมาชิก ดาวน์โหลดใช้งานได้ทันที รองรับหลายโบรกเกอร์'
  }
})

export default function Page() {
  return <TradingEALanding forcedLang="th" />
}
