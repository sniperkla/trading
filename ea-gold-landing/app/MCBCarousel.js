import React, { useState } from 'react'
import { CheckCircle2Icon } from 'lucide-react'
export default function MCBCarousel({ translations, lang, icon }) {
  const [index, setIndex] = useState(0)
  const mcbList = translations[lang].mcbSectionList
  //   const mcbList2 = translations[lang].mcbSectionList || [
  //     '🟢 ทำงานอัตโนมัติ 24 ชม.\nไม่ต้องเฝ้าหน้าจอ EA ทำงานต่อเนื่องทุกสถานการณ์',
  //     '🟢 เทรด 2 ฝั่งอย่างชาญฉลาด (Hedging)\nลดความเสี่ยงจากตลาดผันผวน ด้วยระบบซื้อขายสลับฝั่งแบบมีแบบแผน',
  //     '🟢 ปิดไม้ด้วยระบบจับคู่ (Matching Logic)\nไม่ปล่อยไม้ลอยตัว ลดโอกาสติดลบสะสม',
  //     '🟢 ปรับลอตตามสถานการณ์อัตโนมัติ\nเพิ่ม-ลดลอตอย่างเหมาะสม ช่วยฟื้นพอร์ตและปิดกำไรไว',
  //     '🟢 ลดอารมณ์ในการเทรด\nไม่ต้องลุ้น ไม่ต้องกลัว ไม่ต้องลังเล EA ตัดสินใจตามแผนให้คุณ'
  //   ]
  const cards = [
    {
      title: translations[lang].mcbSectionDesc,
      content: (
        <>
          {/* MCB Bot Instruction */}
          {/* <div className="mb-6 p-4 rounded-xl border border-yellow-400/40 bg-black/30 text-center text-base md:text-lg text-white">
            <div className="font-bold text-yellow-300 text-xl mb-1">
              {translations[lang].botInstructionMCB.name}
            </div>
            <div>
              {translations[lang].botInstructionMCB.desc1}{' '}
              <span className="font-bold text-yellow-400">
                {translations[lang].botInstructionMCB.amount}
              </span>{' '}
              {translations[lang].botInstructionMCB.desc2}{' '}
              <span className="font-bold text-yellow-400">
                {translations[lang].botInstructionMCB.lot}
              </span>
            </div>
            <div>
              {translations[lang].botInstructionMCB.profit}{' '}
              <span className="font-bold text-green-400">
                {translations[lang].botInstructionMCB.percent}
              </span>{' '}
              {translations[lang].botInstructionMCB.perDay}
            </div>
          </div> */}
          {mcbList.map((item, idx) => (
            <div
              key={idx}
              className="pt-4 flex items-start gap-3 mb-6 text-lg md:text-xl text-white/90"
            >
              <span className="text-green-400 text-2xl select-none">
                <CheckCircle2Icon className="w-8 h-8" />
              </span>
              <span className="whitespace-pre-line">{item}</span>
            </div>
          ))}
        </>
      )
    },
    {
      title: 'EA MAPA SUPER H',
      content: (
        <div className="text-3xl text-gray-300 py-20 text-center">
          Coming Soon
        </div>
      )
    },
    {
      title: 'EA MAPA RUNTIME',
      content: (
        <div className="text-3xl text-gray-300 py-20 text-center">
          Coming Soon
        </div>
      )
    },
    {
      title: 'EA MAPA SUPER SW',
      content: (
        <div className="text-3xl text-gray-300 py-20 text-center">
          Coming Soon
        </div>
      )
    }
  ]

  const goTo = (i) => setIndex((i + cards.length) % cards.length)

  // Helper to get card index with wrap
  const getCard = (i) => cards[(i + cards.length) % cards.length]

  // For preview: previous and next card indices
  const prevIdx = (index - 1 + cards.length) % cards.length
  const nextIdx = (index + 1) % cards.length

  return (
    <div className="relative max-w-6xl mx-auto">
      <div className="flex items-center justify-center mb-6 gap-2 md:gap-8">
        {/* Preview Previous */}
        <div
          className="hidden md:flex flex-col items-center justify-center basis-1/4 max-w-md opacity-70 scale-100 transition-all duration-300 cursor-pointer hover:opacity-90"
          onClick={() => goTo(prevIdx)}
        >
          <div className="px-4 py-6 border border-yellow-400/30 rounded-2xl bg-black/30 min-h-[180px] flex flex-col items-center justify-center text-center">
            <div className="text-xl font-bold text-yellow-200 truncate max-w-[240px]">
              {getCard(prevIdx).title}
            </div>
            <div className="text-gray-300 text-base line-clamp-2 max-w-[220px] mt-3">
              {/* Show only a short preview of content */}
              {typeof getCard(prevIdx).content === 'string'
                ? getCard(prevIdx).content.slice(0, 80)
                : ''}
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="flex-1 min-w-0 max-w-2xl bg-black/40 rounded-2xl shadow-lg p-2 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <button
              aria-label="prev"
              onClick={() => goTo(index - 1)}
              className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-yellow-400/80 hover:bg-yellow-500 text-black text-xl md:text-2xl font-bold shadow-lg transition-all duration-200 border-2 border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-200"
            >
              &#8592;
            </button>
            <div className="flex-1 px-2">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-300 text-center">
                {cards[index].title}
              </h3>
              <div>{cards[index].content}</div>
            </div>
            <button
              aria-label="next"
              onClick={() => goTo(index + 1)}
              className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-yellow-400/80 hover:bg-yellow-500 text-black text-xl md:text-2xl font-bold shadow-lg transition-all duration-200 border-2 border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-200"
            >
              &#8594;
            </button>
          </div>
        </div>

        {/* Preview Next */}
        <div
          className="hidden md:flex flex-col items-center justify-center basis-1/4 max-w-md opacity-70 scale-100 transition-all duration-300 cursor-pointer hover:opacity-90"
          onClick={() => goTo(nextIdx)}
        >
          <div className="px-4 py-6 border border-yellow-400/30 rounded-2xl bg-black/30 min-h-[180px] flex flex-col items-center justify-center text-center">
            <div className="text-xl font-bold text-yellow-200 truncate max-w-[240px]">
              {getCard(nextIdx).title}
            </div>
            <div className="text-gray-300 text-base line-clamp-2 max-w-[220px] mt-3">
              {typeof getCard(nextIdx).content === 'string'
                ? getCard(nextIdx).content.slice(0, 80)
                : ''}
            </div>
          </div>
        </div>
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-2">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-3 h-3 rounded-full border-2 border-yellow-400 transition ${
              i === index ? 'bg-yellow-400' : 'bg-transparent'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
