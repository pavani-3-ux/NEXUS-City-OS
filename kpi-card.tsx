'use client'

import { useEffect, useRef, useState } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import AnimatedCounter from './animated-counter'

interface KPICardProps {
  icon: string
  label: string
  value: string | number
  unit?: string
  trend?: number
  trendType?: 'up' | 'down' | 'stable'
  color: 'cyan' | 'blue' | 'emerald' | 'purple' | 'amber' | 'coral'
}

const colorMap = {
  cyan: {
    gradient: 'from-cyan-500/20 to-cyan-600/10',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    accent: 'from-cyan-400 to-blue-400',
    glow: 'shadow-cyan-500/20',
  },
  blue: {
    gradient: 'from-blue-500/20 to-blue-600/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    accent: 'from-blue-400 to-cyan-400',
    glow: 'shadow-blue-500/20',
  },
  emerald: {
    gradient: 'from-emerald-500/20 to-emerald-600/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    accent: 'from-emerald-400 to-teal-400',
    glow: 'shadow-emerald-500/20',
  },
  purple: {
    gradient: 'from-purple-500/20 to-purple-600/10',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    accent: 'from-purple-400 to-pink-400',
    glow: 'shadow-purple-500/20',
  },
  amber: {
    gradient: 'from-amber-500/20 to-amber-600/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    accent: 'from-amber-400 to-orange-400',
    glow: 'shadow-amber-500/20',
  },
  coral: {
    gradient: 'from-coral/20 to-coral/10',
    border: 'border-coral/30',
    text: 'text-coral',
    accent: 'from-coral to-orange-400',
    glow: 'shadow-coral/20',
  },
}

export default function KPICard({
  icon,
  label,
  value,
  unit,
  trend,
  trendType = 'up',
  color,
}: KPICardProps) {
  const colors = colorMap[color]
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

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
      className={`group relative rounded-[20px] overflow-hidden hover-lift transition-all duration-500 ${
        isVisible ? 'animate-bounce-in' : 'opacity-0'
      }`}
    >
      {/* Gradient Border Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colors.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[20px] p-[1px]`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 rounded-[19px]" />
      </div>

      {/* Card Content */}
      <div
        className={`relative h-full bg-gradient-to-br ${colors.gradient} border ${colors.border} rounded-[20px] p-6 transition-all duration-300 backdrop-blur-xl`}
      >
        {/* Icon */}
        <div className="mb-4 text-4xl">{icon}</div>

        {/* Label */}
        <p className="text-slate-400 text-sm font-medium mb-2">{label}</p>

        {/* Value with Sparkline */}
        <div className="mb-4">
          <p className={`text-3xl font-bold ${colors.text} leading-tight`}>
            {value}
            {unit && <span className="text-lg ml-1 text-slate-400">{unit}</span>}
          </p>
        </div>

        {/* Trend Indicator */}
        {trend !== undefined && (
          <div className="flex items-center gap-2">
            {trendType === 'up' ? (
              <>
                <TrendingUp size={16} className="text-emerald-400" />
                <span className="text-sm text-emerald-400 font-medium">{trend}% up</span>
              </>
            ) : trendType === 'down' ? (
              <>
                <TrendingDown size={16} className="text-coral" />
                <span className="text-sm text-coral font-medium">{trend}% down</span>
              </>
            ) : (
              <>
                <Minus size={16} className="text-slate-500" />
                <span className="text-sm text-slate-500 font-medium">Stable</span>
              </>
            )}
          </div>
        )}

        {/* Shimmer Effect on Hover */}
        <div className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `linear-gradient(45deg, transparent 30%, rgba(6, 182, 212, 0.2) 50%, transparent 70%)`,
            backgroundSize: '200% 200%',
            animation: 'shimmer 2s infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  )
}
