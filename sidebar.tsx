'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navItems = [
  { icon: '📊', label: 'Dashboard', active: true },
  { icon: '🚗', label: 'Traffic Intelligence' },
  { icon: '💨', label: 'Air Quality' },
  { icon: '💧', label: 'Water Systems' },
  { icon: '⚡', label: 'Energy Grid' },
  { icon: '🌤️', label: 'Weather Intelligence' },
  { icon: '🚨', label: 'Emergency Operations' },
  { icon: '📍', label: 'Crime Analytics' },
  { icon: '🚌', label: 'Public Transport' },
  { icon: '👥', label: 'Citizen Services' },
  { icon: '🏗️', label: 'Infrastructure' },
  { icon: '🤖', label: 'AI Assistant' },
  { icon: '📈', label: 'Reports' },
  { icon: '⚙️', label: 'Settings' },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 hover:bg-white/10 rounded-lg transition-all duration-200 hover:scale-110"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 glass-card rounded-none border-r border-white/10 transition-all duration-500 lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl shadow-cyan-500/10' : '-translate-x-full'
        } overflow-y-auto z-40`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">SC</span>
            </div>
            <div>
              <h1 className="text-sm font-bold text-white leading-tight">Smart City</h1>
              <p className="text-xs text-slate-400">Intelligence</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group hover:scale-105 origin-left ${
                item.active
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-500/20 glow-animated'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
              style={{
                animationDelay: item.active ? `${idx * 50}ms` : undefined,
              }}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
              {item.active && (
                <div className="ml-auto w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-gradient-to-t from-slate-900/50 to-transparent">
          <button className="w-full px-4 py-3 rounded-lg text-sm text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors">
            🔐 Log Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
