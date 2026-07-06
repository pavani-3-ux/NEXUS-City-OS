'use client'

import { Search, Bell, Settings, ChevronDown } from 'lucide-react'

export default function TopNav() {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 glass-card rounded-none border-b border-white/10 z-40 lg:left-64 max-lg:left-0">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left: City Selector */}
        <div className="hidden lg:flex items-center gap-2">
          <button className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2 text-slate-300 hover:text-white">
            <span className="text-lg">🌍</span>
            <span className="text-sm font-medium">New York City</span>
            <ChevronDown size={16} />
          </button>
        </div>

        {/* Middle: Search */}
        <div className="flex-1 max-w-md ml-4">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search city data..."
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-colors"
            />
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-3 ml-4">
          {/* Live Indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-300 font-medium">Live</span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors group">
            <Bell size={18} className="text-slate-300 group-hover:text-white" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-coral rounded-full" />
          </button>

          {/* Settings */}
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-300 hover:text-white">
            <Settings size={18} />
          </button>

          {/* Profile */}
          <button className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded-lg transition-colors group">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <span className="text-xs font-bold text-white">A</span>
            </div>
            <span className="hidden md:inline text-sm text-slate-300 group-hover:text-white">Admin</span>
            <ChevronDown size={16} className="text-slate-500" />
          </button>
        </div>
      </div>
    </header>
  )
}
