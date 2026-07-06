'use client'

export default function AIInsights() {
  const recommendations = [
    {
      icon: '🚗',
      title: 'Traffic Alert',
      desc: 'Heavy congestion on Broadway',
      severity: 'warning',
    },
    {
      icon: '💨',
      title: 'Air Quality',
      desc: 'AQI rising in Midtown area',
      severity: 'warning',
    },
    {
      icon: '💡',
      title: 'Energy Optimization',
      desc: 'Solar generation at 85% capacity',
      severity: 'normal',
    },
    {
      icon: '🚨',
      title: 'Emergency Notice',
      desc: '3 calls in Manhattan district',
      severity: 'critical',
    },
  ]

  const severityColors = {
    normal: 'border-l-emerald-500 bg-emerald-500/10',
    warning: 'border-l-amber-500 bg-amber-500/10',
    critical: 'border-l-coral bg-coral/10',
  }

  return (
    <div className="glass-card p-6 col-span-full lg:col-span-1 lg:row-span-2">
      <h2 className="text-xl font-bold text-white mb-6">AI Insights & Alerts</h2>

      <div className="space-y-3 mb-6">
        {recommendations.map((rec, idx) => (
          <div
            key={idx}
            className={`border-l-4 rounded-r-lg p-4 backdrop-blur-sm transition-all hover:translate-x-1 duration-200 ${severityColors[rec.severity]}`}
          >
            <div className="flex items-start gap-3">
              <span className="text-lg mt-0.5">{rec.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">{rec.title}</p>
                <p className="text-xs text-slate-400 mt-0.5 truncate">{rec.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-6" />

      {/* Quick Stats */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs text-slate-400 font-medium">System Health</p>
            <p className="text-xs font-bold text-cyan-400">95%</p>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: '95%' }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs text-slate-400 font-medium">Network Load</p>
            <p className="text-xs font-bold text-amber-400">68%</p>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500" style={{ width: '68%' }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs text-slate-400 font-medium">Data Accuracy</p>
            <p className="text-xs font-bold text-emerald-400">99.2%</p>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500" style={{ width: '99.2%' }} />
          </div>
        </div>
      </div>

      {/* AI Assistant Button */}
      <button className="w-full mt-6 px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-300 hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-200 text-sm font-medium hover:glow-cyan">
        🤖 Ask AI Assistant
      </button>
    </div>
  )
}
