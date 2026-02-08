'use client'

import { ReactNode } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface ScrollFadeInProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number
  className?: string
}

export default function ScrollFadeIn({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.6,
  className = ''
}: ScrollFadeInProps) {
  const { ref, isVisible } = useScrollAnimation()

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up': return 'translateY(40px)'
        case 'down': return 'translateY(-40px)'
        case 'left': return 'translateX(40px)'
        case 'right': return 'translateX(-40px)'
        case 'none': return 'none'
        default: return 'translateY(40px)'
      }
    }
    return 'translate(0, 0)'
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}s ease ${delay}s, transform ${duration}s ease ${delay}s`,
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  )
}
