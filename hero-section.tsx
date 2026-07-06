'use client'

export default function HeroSection() {
  const healthScore = 95

  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Hero */}
        <div className="lg:col-span-2">
          <div className="glass-card p-8">
            <div className="space-y-2 mb-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Smart City<br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Intelligence Platform
                </span>
              </h1>
              <p className="text-slate-400 text-lg">
                Real-time monitoring and analytics for urban infrastructure
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div>
                <p className="text-slate-500 text-sm mb-1">Connected Sensors</p>
                <p className="text-2xl font-bold text-cyan-400">12,847</p>
              </div>
              <div>
                <p className="text-slate-500 text-sm mb-1">Data Points / Min</p>
                <p className="text-2xl font-bold text-cyan-400">2.3M</p>
              </div>
              <div>
                <p className="text-slate-500 text-sm mb-1">System Uptime</p>
                <p className="text-2xl font-bold text-emerald-400">99.97%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Health Score Card */}
        <div className="glass-card p-8 flex flex-col items-center justify-center">
          <p className="text-slate-400 text-sm mb-4">City Health Score</p>
          
          {/* Animated Circle Progress */}
          <div className="relative w-32 h-32 mb-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              {/* Background circle */}
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="8"
              />
              {/* Progress circle */}
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="8"
                strokeDasharray={`${(healthScore / 100) * 340} 340`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
              </defs>
            </svg>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-cyan-400">{healthScore}</span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
          </div>

          <p className="text-sm text-emerald-400 font-medium">✓ All Systems Optimal</p>
        </div>
      </div>
    </section>
  )
}
