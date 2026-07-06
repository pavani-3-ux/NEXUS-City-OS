'use client'

import { useEffect, useRef, useState } from 'react'

interface AnalyticsCardProps {
  title: string
  icon: string
  status: 'normal' | 'warning' | 'critical'
  mainMetric: string
  mainValue: string | number
  details: { label: string; value: string | number; unit?: string }[]
  trend?: string
}

const statusColors = {
  normal: { bg: 'from-emerald-500/20', border: 'border-emerald-500/30', dot: 'bg-emerald-500' },
  warning: { bg: 'from-amber-500/20', border: 'border-amber-500/30', dot: 'bg-amber-500' },
  critical: { bg: 'from-coral/20', border: 'border-coral/30', dot: 'bg-coral' },
}

export default function AnalyticsCard({
  title,
  icon,
  status,
  mainMetric,
  mainValue,
  details,
  trend,
}: AnalyticsCardProps) {
  const colors = statusColors[status]
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true)
    })
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div 
      ref={cardRef}
      className={`glass-card p-6 group hover-lift transition-all duration-500 ${
        isVisible ? 'animate-bounce-in' : 'opacity-0'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{icon}</span>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          </div>
          <p className="text-slate-400 text-sm">{mainMetric}</p>
        </div>
        <div className={`w-3 h-3 rounded-full ${colors.dot} animate-pulse`} />
      </div>

      {/* Main Value */}
      <p className="text-3xl font-bold text-cyan-400 mb-6">{mainValue}</p>

      {/* Details Grid */}
      <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
        {details.map((detail, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <span className="text-sm text-slate-400">{detail.label}</span>
            <span className="text-sm font-medium text-slate-200">
              {detail.value}
              {detail.unit && <span className="text-slate-500 ml-1">{detail.unit}</span>}
            </span>
          </div>
        ))}
      </div>

      {/* Trend */}
      {trend && (
        <p className="text-xs text-slate-400 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-500/50" />
          {trend}
        </p>
      )}
    </div>
  )
}
