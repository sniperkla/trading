import React from 'react'

const images = [
	{
		src: '/images/promo1.png',
		link: '#',
	},
	{
		src: '/images/promo2.png',
		link: '#',
	},
	{
		src: '/images/promo3.png',
		link: '#',
	},
	{
		src: '/images/promo.png',
		link: '#',
	},
]

export default function ImageSlider({ lang = 'en', translations = {} }) {
	const [current, setCurrent] = React.useState(0)
	const [animating, setAnimating] = React.useState(false)
	const [direction, setDirection] = React.useState(1)

	// React.useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		setDirection(1)
	// 		setAnimating(true)
	// 		setTimeout(() => {
	// 			setCurrent((prev) => (prev + 1) % images.length)
	// 			setAnimating(false)
	// 		}, 600)
	// 	}, 3000)
	// 	return () => clearInterval(interval)
	// }, [])

	const getIndex = (offset) =>
		(current + offset + images.length) % images.length

	// ฟังก์ชันเลื่อนซ้าย/ขวา
	const handlePrev = () => {
		setDirection(-1)
		setAnimating(true)
		setTimeout(() => {
			setCurrent((prev) => (prev - 1 + images.length) % images.length)
			setAnimating(false)
		}, 600)
	}
	const handleNext = () => {
		setDirection(1)
		setAnimating(true)
		setTimeout(() => {
			setCurrent((prev) => (prev + 1) % images.length)
			setAnimating(false)
		}, 600)
	}

	return (
		<div className="relative w-full max-w-3xl mx-auto rounded-2xl shadow-lg flex items-center justify-center h-80 overflow-hidden">
			<button
				onClick={handlePrev}
				className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold shadow-lg z-30"
				aria-label={translations[lang]?.previousImage || "Previous image"}
				style={{ cursor: 'pointer' }}
			>
				&#8592;
			</button>
			<button
				onClick={handleNext}
				className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold shadow-lg z-30"
				aria-label={translations[lang]?.nextImage || "Next image"}
				style={{ cursor: 'pointer' }}
			>
				&#8594;
			</button>
			<style>{`
        .slider-img {
          transition: transform 0.7s cubic-bezier(0.4,0,0.2,1), opacity 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        .slider-center {
          z-index: 20;
          width: 66%;
          transform: translateX(0) scale(1.1);
          opacity: 1;
          box-shadow: 0 8px 32px 0 rgba(0,0,0,0.2);
        }
        .slider-left {
          z-index: 10;
          width: 33%;
          transform: translateX(-120%) scale(0.9);
          opacity: 0.6;
        }
        .slider-right {
          z-index: 10;
          width: 33%;
          transform: translateX(120%) scale(0.9);
          opacity: 0.6;
        }
        .slider-anim-left {
          transform: translateX(-120%) scale(0.9);
          opacity: 0.6;
        }
        .slider-anim-right {
          transform: translateX(120%) scale(0.9);
          opacity: 0.6;
        }
      `}</style>
			{[-1, 0, 1].map((offset) => {
				const idx = getIndex(offset)
				let className =
					'slider-img absolute top-0 h-56 sm:h-64 flex items-center rounded-xl'
				if (offset === 0) className += ' slider-center'
				if (offset === -1) className += ' slider-left'
				if (offset === 1) className += ' slider-right'
				// Animation
				if (animating && offset === -1 && direction === 1)
					className += ' slider-anim-left'
				if (animating && offset === 1 && direction === 1)
					className += ' slider-anim-right'
				return (
					<a
						key={images[idx].src + current}
						href={images[idx].src}
						target="_blank"
						rel="noopener noreferrer"
						className={className}
						style={{
							pointerEvents: offset === 0 ? 'auto' : 'none',
							background: 'none',
							border: 'none',
							padding: 0,
							margin: 0,
						}}
						tabIndex={offset === 0 ? 0 : -1}
						aria-label={translations[lang]?.viewFullSize || "View full size"}
						title={translations[lang]?.viewFullSize || "View full size"}
					>
						<img
							src={images[idx].src}
							alt="promo"
							className="w-full h-full object-cover rounded-xl"
						/>
					</a>
				)
			})}
			<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
				{images.map((_, idx) => (
					<span
						key={idx}
						className={`block w-3 h-3 rounded-full ${
							idx === current ? 'bg-yellow-400' : 'bg-white/40'
						}`}
					/>
				))}
			</div>
		</div>
	)
}
