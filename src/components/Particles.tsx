import { Particle } from '../types'

interface ParticlesProps {
  particles: Particle[]
}

export default function Particles({ particles }: ParticlesProps) {
  if (particles.length === 0) return null

  const getEmoji = (type: string) => {
    switch (type) {
      case 'heart': return '💕'
      case 'fish': return '🐟'
      case 'star': return '⭐'
      case 'zzz': return '💤'
      default: return '✨'
    }
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute text-xl animate-float-up"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        >
          {getEmoji(particle.type)}
        </div>
      ))}
    </div>
  )
}
