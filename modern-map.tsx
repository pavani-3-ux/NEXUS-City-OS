'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { MapPin, Zap } from 'lucide-react'

interface Location {
  id: number
  name: string
  x: number
  y: number
  type: 'traffic' | 'energy' | 'safety' | 'air'
  status: 'normal' | 'warning' | 'critical'
}

export default function ModernMap() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)

  const locations: Location[] = [
    { id: 1, name: 'Downtown Traffic', x: 35, y: 30, type: 'traffic', status: 'warning' },
    { id: 2, name: 'Energy Station Alpha', x: 65, y: 25, type: 'energy', status: 'normal' },
    { id: 3, name: 'Air Quality Monitor', x: 50, y: 60, type: 'air', status: 'normal' },
    { id: 4, name: 'Emergency Center', x: 75, y: 70, type: 'safety', status: 'critical' },
    { id: 5, name: 'Transit Hub', x: 25, y: 75, type: 'traffic', status: 'normal' },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
      }
    })
    if (mapRef.current) observer.observe(mapRef.current)
    return () => observer.disconnect()
  }, [])

  const statusColors = {
    normal: 'bg-emerald-500',
    warning: 'bg-orange-500',
    critical: 'bg-red-500',
  }

  const typeIcons = {
    traffic: '🚗',
    energy: '⚡',
    safety: '🚨',
    air: '💨',
  }

  return (
    <div
      ref={mapRef}
      className={`card-modern p-6 transition-all duration-500 ${
        isVisible ? 'animate-bounce-in' : 'opacity-0'
      }`}
    >
      <h2 className="text-2xl font-bold text-slate-900 mb-6">City Overview Map</h2>

      {/* Map Container */}
      <div className="relative w-full h-96 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl overflow-hidden border border-slate-200">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" className="w-full h-full">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Location Markers */}
        {locations.map((location) => (
          <div key={location.id}>
            {/* Pulse Animation */}
            <div
              className={`absolute w-8 h-8 rounded-full ${statusColors[location.status]} opacity-30 animate-ping`}
              style={{
                left: `${location.x}%`,
                top: `${location.y}%`,
                transform: 'translate(-50%, -50%)',
                animationDuration: '2s',
              }}
            ></div>

            {/* Marker */}
            <button
              onClick={() => setSelectedLocation(location)}
              className={`absolute w-8 h-8 rounded-full ${statusColors[location.status]} flex items-center justify-center text-white text-sm font-bold cursor-pointer transition-all duration-200 hover:scale-125 shadow-lg`}
              style={{
                left: `${location.x}%`,
                top: `${location.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              title={location.name}
            >
              {typeIcons[location.type]}
            </button>
          </div>
        ))}

        {/* Info Panel */}
        {selectedLocation && (
          <div className="absolute bottom-4 right-4 bg-white rounded-xl shadow-xl p-4 w-72 animate-slide-up border border-slate-200">
            <button
              onClick={() => setSelectedLocation(null)}
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 text-xl"
            >
              ×
            </button>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{selectedLocation.name}</h3>
            <p className="text-sm text-slate-600 mb-3">{selectedLocation.type.toUpperCase()}</p>
            <div className="flex items-center gap-2 mb-3">
              <span className={`w-3 h-3 rounded-full ${statusColors[selectedLocation.status]}`}></span>
              <span className="text-sm font-medium text-slate-700 capitalize">
                Status: {selectedLocation.status}
              </span>
            </div>
            <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
              View Details
            </button>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: '🚗', label: 'Traffic' },
          { icon: '⚡', label: 'Energy' },
          { icon: '💨', label: 'Air Quality' },
          { icon: '🚨', label: 'Safety' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-sm text-slate-600">
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
