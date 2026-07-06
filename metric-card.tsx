'use client'

import { useState, useEffect, useRef } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import Image from 'next/image'

interface MetricCardProps {
  title: string
  value: string
  unit?: string
  trend: number
  trendLabel: string
  icon: string
  color: 'blue' | 'cyan' | 'purple' | 'emerald' | 'orange' | 'pink'
  image?: string
  onClick?: () => void
}

const colorMap = {
  blue: {
    bg: 'from-blue-50 to-cyan-50',
    border: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-700',
    gradient: 'from-blue-600 to-cyan-600',
    icon: 'bg-blue-500/10 text-blue-600',
  },
  cyan: {
    bg: 'from-cyan-50 to-blue-50',
    border: 'border-cyan-200',
    badge: 'bg-cyan-100 text-cyan-700',
    gradient: 'from-cyan-600 to-blue-600',
    icon: 'bg-cyan-500/10 text-cyan-600',
  },
  purple: {
    bg: 'from-purple-50 to-pink-50',
    border: 'border-purple-200',
    badge: 'bg-purple-100 text-purple-700',
    gradient: 'from-purple-600 to-pink-600',
    icon: 'bg-purple-500/10 text-purple-600',
  },
  emerald: {
    bg: 'from-emerald-50 to-cyan-50',
    border: 'border-emerald-200',
    badge: 'bg-emerald-100 text-emerald-700',
    gradient: 'from-emerald-600 to-cyan-600',
    icon: 'bg-emerald-500/10 text-emerald-600',
  },
  orange: {
    bg: 'from-orange-50 to-yellow-50',
    border: 'border-orange-200',
    badge: 'bg-orange-100 text-orange-700',
    gradient: 'from-orange-600 to-yellow-600',
    icon: 'bg-orange-500/10 text-orange-600',
  },
  pink: {
    bg: 'from-pink-50 to-red-50',
    border: 'border-pink-200',
    badge: 'bg-pink-100 text-pink-700',
    gradient: 'from-pink-600 to-red-600',
    icon: 'bg-pink-500/10 text-pink-600',
  },
}

export default function MetricCard({
  title,
  value,
  unit,
  trend,
  trendLabel,
  icon,
  color,
  image,
  onClick,
}: MetricCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const colors = colorMap[color]

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
      }
    })
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`group relative rounded-2xl border ${colors.border} bg-gradient-to-br ${colors.bg} overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer shadow-md ${
        isVisible ? 'animate-bounce-in' : 'opacity-0'
      }`}
    >
      {/* Background Image */}
      {image && (
        <div className="absolute inset-0 opacity-20">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Gradient Accent */}
      <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${colors.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>

      {/* Content */}
      <div className="relative p-6 h-full flex flex-col justify-between">
        {/* Top Section */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-sm font-medium text-slate-600 mb-1">{title}</h3>
            <div className="flex items-baseline gap-2">
              <span className={`text-4xl font-bold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                {value}
              </span>
              {unit && <span className="text-slate-500">{unit}</span>}
            </div>
          </div>
          <div className={`${colors.icon} rounded-full p-3 text-xl transition-transform duration-300 group-hover:scale-110`}>
            {icon}
          </div>
        </div>

        {/* Trend */}
        <div className={`flex items-center gap-2 ${colors.badge} rounded-full py-1 px-3 w-fit text-sm font-semibold`}>
          {trend > 0 ? (
            <TrendingUp size={16} />
          ) : (
            <TrendingDown size={16} />
          )}
          <span>{Math.abs(trend)}% {trendLabel}</span>
        </div>
      </div>

      {/* Hover Overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent pointer-events-none animate-fade-in"></div>
      )}
    </div>
  )
}
