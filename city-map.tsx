'use client'

import { Zap, AlertTriangle, Cloud } from 'lucide-react'

export default function CityMap() {
  return (
    <div className="glass-card p-6 col-span-full lg:col-span-2">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-2">City Overview</h2>
        <p className="text-slate-400 text-sm">Real-time monitoring and incident tracking</p>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-white/10 mb-6">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 animated-grid opacity-50" />

        {/* Map SVG - Simplified NYC shape */}
        <svg className="w-full h-full" viewBox="0 0 400 300">
          {/* Water */}
          <rect x="0" y="0" width="400" height="300" fill="#07111f" opacity="0.8" />
          
          {/* Land area - simplified city boundary */}
          <path
            d="M 60 80 L 180 60 L 200 80 L 220 70 L 300 90 L 320 150 L 340 180 L 280 220 L 200 240 L 120 200 L 80 160 Z"
            fill="rgba(6, 182, 212, 0.15)"
            stroke="rgba(6, 182, 212, 0.4)"
            strokeWidth="2"
          />

          {/* Road network */}
          <g stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1.5" fill="none">
            <line x1="150" y1="60" x2="150" y2="240" />
            <line x1="60" y1="150" x2="340" y2="150" />
            <line x1="100" y1="80" x2="280" y2="200" />
          </g>

          {/* Traffic hotspots - red pulsing circles */}
          <g>
            {[
              { x: 150, y: 120, intensity: 'high' },
              { x: 220, y: 160, intensity: 'medium' },
            ].map((spot, idx) => (
              <circle
                key={idx}
                cx={spot.x}
                cy={spot.y}
                r={spot.intensity === 'high' ? 25 : 18}
                fill={spot.intensity === 'high' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(251, 146, 60, 0.3)'}
                stroke={spot.intensity === 'high' ? '#ef4444' : '#fb923c'}
                strokeWidth="2"
                className="animate-pulse"
              />
            ))}
          </g>

          {/* Air Quality zones - gradient circles */}
          <circle cx="100" cy="200" r="20" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="1.5" />

          {/* Emergency markers - pulsing stars */}
          <g fill="#ef4444" opacity="0.8">
            <polygon points="280,100 285,110 295,112 288,118 290,128 280,123 270,128 272,118 265,112 275,110" />
          </g>

          {/* Legend background */}
          <rect x="10" y="250" width="150" height="45" fill="rgba(15, 25, 41, 0.8)" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" rx="8" />
        </svg>

        {/* Overlay Controls */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-xs text-slate-300 hover:bg-white/20 transition-colors">
            ✚ Zoom In
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-xs text-slate-300 hover:bg-white/20 transition-colors">
            ✕ Zoom Out
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-coral animate-pulse" />
          <span className="text-xs text-slate-400">High Traffic</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-xs text-slate-400">Medium Traffic</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-xs text-slate-400">Good AQI</span>
        </div>
        <div className="flex items-center gap-2">
          <polygon points="6,3 7,5 9,5 7,6 8,9 6,7 4,7 5,6 3,5 5,5" fill="#ef4444" className="opacity-70" />
          <span className="text-xs text-slate-400">Emergency</span>
        </div>
      </div>
    </div>
  )
}
