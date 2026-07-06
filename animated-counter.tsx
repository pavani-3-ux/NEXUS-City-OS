'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedCounterProps {
  value: string | number
  duration?: number
  prefix?: string
  suffix?: string
}

export default function AnimatedCounter({
  value,
  duration = 2000,
  prefix = '',
  suffix = '',
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(value)
  const counterRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current && typeof value === 'number') {
        hasAnimated.current = true

        let startTime: number
        const animate = (currentTime: number) => {
          if (!startTime) startTime = currentTime
          const elapsed = currentTime - startTime
          const progress = Math.min(elapsed / duration, 1)

          const numValue = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9.-]/g, ''))
          const currentValue = Math.floor(numValue * progress)

          setDisplayValue(currentValue)

          if (progress < 1) {
            requestAnimationFrame(animate)
          } else {
            setDisplayValue(value)
          }
        }

        requestAnimationFrame(animate)
      }
    })

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => observer.disconnect()
  }, [value, duration])

  return (
    <div ref={counterRef} className="inline-block">
      {prefix}
      {displayValue}
      {suffix}
    </div>
  )
}
