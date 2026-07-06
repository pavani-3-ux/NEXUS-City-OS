'use client'

import { useState } from 'react'
import ModernNav from '@/components/modern-nav'
import ModernHero from '@/components/modern-hero'
import MetricCard from '@/components/metric-card'
import ModernMap from '@/components/modern-map'
import DetailModal from '@/components/detail-modal'
import { Activity } from 'lucide-react'

export default function Page() {
  const [selectedMetric, setSelectedMetric] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const metrics = [
    {
      id: 'traffic',
      title: 'Traffic Density',
      value: '68',
      unit: '%',
      trend: 12.5,
      trendLabel: 'up',
      icon: '🚗',
      color: 'blue',
      image: '/metric-traffic.png',
      description: 'Current traffic congestion level across the city',
      details: [
        { label: 'Avg Speed', value: '12', unit: 'mph' },
        { label: 'Active Routes', value: '2,847' },
        { label: 'Congestion Level', value: 'High' },
      ],
    },
    {
      id: 'energy',
      title: 'Energy Grid Load',
      value: '3.2',
      unit: 'GW',
      trend: 2.8,
      trendLabel: 'up',
      icon: '⚡',
      color: 'orange',
      image: '/metric-energy.png',
      description: 'Real-time energy consumption and grid status',
      details: [
        { label: 'Capacity', value: '5.1', unit: 'GW' },
        { label: 'Renewable', value: '38', unit: '%' },
        { label: 'Grid Health', value: 'Stable' },
      ],
    },
    {
      id: 'air',
      title: 'Air Quality Index',
      value: '78',
      unit: 'AQI',
      trend: -5.2,
      trendLabel: 'down',
      icon: '💨',
      color: 'emerald',
      image: '/metric-air.png',
      description: 'Ambient air quality measurements across monitoring stations',
      details: [
        { label: 'PM2.5', value: '42', unit: 'µg/m³' },
        { label: 'No2', value: '28', unit: 'ppb' },
        { label: 'Status', value: 'Moderate' },
      ],
    },
    {
      id: 'population',
      title: 'Population',
      value: '8.3',
      unit: 'M',
      trend: 2.4,
      trendLabel: 'up',
      icon: '👥',
      color: 'cyan',
      description: 'Current city population and growth metrics',
      details: [
        { label: 'Growth Rate', value: '2.4', unit: '%' },
        { label: 'Density', value: '4,200', unit: '/km²' },
        { label: 'Workforce', value: '3.1M' },
      ],
    },
    {
      id: 'safety',
      title: 'Public Safety',
      value: '847',
      unit: 'Incidents',
      trend: 15.2,
      trendLabel: 'up',
      icon: '🚨',
      color: 'pink',
      image: '/metric-safety.png',
      description: 'Emergency response and incident tracking',
      details: [
        { label: 'Response Time', value: '4.2', unit: 'min' },
        { label: 'Active Cases', value: '12' },
        { label: 'Resolution Rate', value: '94', unit: '%' },
      ],
    },
    {
      id: 'water',
      title: 'Water Usage',
      value: '1.2',
      unit: 'B gal',
      trend: 3.1,
      trendLabel: 'up',
      icon: '💧',
      color: 'purple',
      description: 'Daily water consumption and quality metrics',
      details: [
        { label: 'Quality Score', value: '99.2', unit: '%' },
        { label: 'Pressure', value: '68', unit: 'psi' },
        { label: 'Leakage', value: '2.1', unit: '%' },
      ],
    },
  ]

  const activities = [
    { time: '2 mins ago', title: 'Traffic incident reported', description: 'Downtown Main Street - Cleared', status: 'resolved' },
    { time: '15 mins ago', title: 'Energy spike detected', description: 'Grid load exceeded 85%', status: 'warning' },
    { time: '1 hour ago', title: 'Air quality alert', description: 'PM2.5 levels elevated in North Zone', status: 'alert' },
    { time: '3 hours ago', title: 'Safety drill completed', description: 'All emergency centers operational', status: 'success' },
    { time: '5 hours ago', title: 'System update deployed', description: 'Smart City Dashboard v2.1.0', status: 'success' },
  ]

  const handleMetricClick = (metric: any) => {
    setSelectedMetric(metric)
    setIsModalOpen(true)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Navigation */}
      <ModernNav />

      {/* Hero Section */}
      <ModernHero />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Metrics Grid */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold text-slate-900">Key Metrics</h2>
              <p className="text-slate-600 mt-2">Real-time city performance indicators</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metrics.map((metric) => (
              <MetricCard
                key={metric.id}
                title={metric.title}
                value={metric.value}
                unit={metric.unit}
                trend={metric.trend}
                trendLabel={metric.trendLabel}
                icon={metric.icon}
                color={metric.color as any}
                image={metric.image}
                onClick={() => handleMetricClick(metric)}
              />
            ))}
          </div>
        </section>

        {/* Map Section */}
        <section className="mb-16">
          <ModernMap />
        </section>

        {/* Activity Feed */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">Recent Activity</h2>
          <div className="space-y-4">
            {activities.map((activity, idx) => (
              <div
                key={idx}
                className="card-modern p-6 flex items-start gap-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-bounce-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-2 ${
                  activity.status === 'resolved' ? 'bg-emerald-500' :
                  activity.status === 'warning' ? 'bg-orange-500' :
                  activity.status === 'alert' ? 'bg-red-500' :
                  'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{activity.title}</h3>
                  <p className="text-slate-600 text-sm mt-1">{activity.description}</p>
                  <p className="text-slate-400 text-xs mt-2">{activity.time}</p>
                </div>
                <Activity size={20} className="text-slate-400 flex-shrink-0" />
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-12 text-white text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Want to Learn More?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Access detailed analytics, configure alerts, and manage your smart city infrastructure from one unified platform.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
            Get Started with Premium
          </button>
        </section>
      </div>

      {/* Detail Modal */}
      {selectedMetric && (
        <DetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selectedMetric.title}
          icon={selectedMetric.icon}
          value={selectedMetric.value}
          unit={selectedMetric.unit}
          trend={selectedMetric.trend}
          trendLabel={selectedMetric.trendLabel}
          color={`text-${selectedMetric.color}-600`}
          details={selectedMetric.details}
          description={selectedMetric.description}
        />
      )}
    </main>
  )
}
