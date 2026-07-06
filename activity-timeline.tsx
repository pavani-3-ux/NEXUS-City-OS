'use client'

import { useEffect, useRef, useState } from 'react'

interface TimelineEvent {
  time: string
  icon: string
  title: string
  description: string
  type: 'normal' | 'warning' | 'critical'
}

export default function ActivityTimeline() {
  const events: TimelineEvent[] = [
    {
      time: '14:32',
      icon: '🚗',
      title: 'Traffic Congestion',
      description: 'Heavy congestion detected on 5th Avenue',
      type: 'warning',
    },
    {
      time: '14:15',
      icon: '💨',
      title: 'Air Quality Update',
      description: 'PM2.5 levels increased in Midtown',
      type: 'warning',
    },
    {
      time: '14:08',
      icon: '⚡',
      title: 'Energy Peak',
      description: 'Peak power consumption at 2.3GW',
      type: 'normal',
    },
    {
      time: '13:45',
      icon: '🚨',
      title: 'Emergency Response',
      description: '3 emergency calls processed and routed',
      type: 'critical',
    },
    {
      time: '13:22',
      icon: '💧',
      title: 'Water System',
      description: 'Main valve pressure normalized',
      type: 'normal',
    },
  ]

  const typeColors = {
    normal: 'border-emerald-500/30 bg-emerald-500/10',
    warning: 'border-amber-500/30 bg-amber-500/10',
    critical: 'border-coral/30 bg-coral/10',
  }

  const typeDotColors = {
    normal: 'bg-emerald-500',
    warning: 'bg-amber-500',
    critical: 'bg-coral',
  }

  const [isVisible, setIsVisible] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true)
    })
    if (timelineRef.current) observer.observe(timelineRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="col-span-full" ref={timelineRef}>
      <div className={`glass-card p-6 transition-all duration-500 ${
        isVisible ? 'animate-slide-right' : 'opacity-0 translate-x-10'
      }`}>
        <h2 className="text-xl font-bold text-white mb-6">Activity Timeline</h2>

        {/* Timeline */}
        <div className="space-y-4">
          {events.map((event, idx) => (
            <div 
              key={idx} 
              className="flex gap-4 opacity-0 animate-fade-in"
              style={{
                animationDelay: `${isVisible ? idx * 100 : 0}ms`,
                animation: isVisible ? `fade-in 0.5s ease-out ${idx * 100}ms forwards` : 'none',
              }}
            >
              {/* Timeline line and dot */}
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${typeDotColors[event.type]} animate-pulse`} />
                {idx !== events.length - 1 && (
                  <div className="w-0.5 h-12 bg-gradient-to-b from-white/20 to-white/5 my-2" />
                )}
              </div>

              {/* Event Content */}
              <div className={`flex-1 p-4 rounded-lg border ${typeColors[event.type]} backdrop-blur-sm group hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-200`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{event.icon}</span>
                      <p className="text-sm font-semibold text-white">{event.title}</p>
                    </div>
                    <p className="text-xs text-slate-400">{event.description}</p>
                  </div>
                  <p className="text-xs text-slate-500 whitespace-nowrap font-mono">{event.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <button className="w-full mt-6 px-4 py-3 rounded-lg hover:bg-white/5 border border-white/10 text-sm text-slate-400 hover:text-slate-200 transition-colors">
          View Full History
        </button>
      </div>
    </section>
  )
}
