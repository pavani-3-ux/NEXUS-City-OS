'use client'

import { X } from 'lucide-react'
import { useState, useEffect } from 'react'

interface DetailModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  icon: string
  value: string
  unit?: string
  trend: number
  trendLabel: string
  color: string
  details: {
    label: string
    value: string
    unit?: string
  }[]
  description: string
}

export default function DetailModal({
  isOpen,
  onClose,
  title,
  icon,
  value,
  unit,
  trend,
  trendLabel,
  color,
  details,
  description,
}: DetailModalProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(isOpen)
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
          isAnimating ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className={`fixed left-1/2 top-1/2 z-50 w-full max-w-2xl transform transition-all duration-300 -translate-x-1/2 -translate-y-1/2 ${
          isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 relative border border-slate-200">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-slate-600" />
          </button>

          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="text-5xl">{icon}</div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
              <p className="text-slate-600 mt-1">{description}</p>
            </div>
          </div>

          {/* Main Metrics */}
          <div className="grid grid-cols-2 gap-6 mb-8 pb-8 border-b border-slate-200">
            {/* Current Value */}
            <div>
              <p className="text-sm font-medium text-slate-600 mb-2">Current Value</p>
              <p className={`text-4xl font-bold ${color}`}>
                {value}
                {unit && <span className="text-sm ml-2">{unit}</span>}
              </p>
            </div>

            {/* Trend */}
            <div>
              <p className="text-sm font-medium text-slate-600 mb-2">Trend</p>
              <p className={`text-3xl font-bold ${trend > 0 ? 'text-orange-500' : 'text-emerald-500'}`}>
                {trend > 0 ? '+' : ''}{trend}% {trendLabel}
              </p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {details.map((detail, idx) => (
              <div key={idx} className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm font-medium text-slate-600 mb-2">{detail.label}</p>
                <p className="text-2xl font-bold text-slate-900">
                  {detail.value}
                  {detail.unit && <span className="text-sm ml-1">{detail.unit}</span>}
                </p>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-all duration-300">
              Export Report
            </button>
            <button className={`px-6 py-3 text-white rounded-lg font-semibold transition-all duration-300 ${color} hover:shadow-lg`}>
              Configure Alert
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
