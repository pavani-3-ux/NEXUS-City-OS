'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function ModernHero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative w-full overflow-hidden">
      {/* Hero Banner with Image */}
      <div className="relative h-96 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/hero-banner.png"
            alt="Smart City"
            fill
            className="object-cover opacity-80"
            priority
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/60 via-cyan-500/40 to-purple-600/60"></div>

        {/* Content */}
        <div className={`relative h-full flex flex-col justify-center items-center text-center px-4 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Smart City Intelligence
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl drop-shadow-md">
            Real-time monitoring and analytics for urban management
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
            Get Started <ArrowRight size={20} />
          </button>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-12 w-full justify-center">
          {[
            { number: '8.3M', label: 'Population' },
            { number: '78', label: 'Air Quality' },
            { number: '94%', label: 'Safety' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`text-center text-white drop-shadow-lg transition-all duration-1000 ${
                isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
              style={{ transitionDelay: `${(idx + 1) * 200}ms` }}
            >
              <div className="text-3xl font-bold">{stat.number}</div>
              <div className="text-sm text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
