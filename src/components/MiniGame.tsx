import { useState, useEffect, useCallback } from 'react'

interface MiniGameProps {
  onComplete: (score: number) => void
}

interface Fish {
  id: number
  x: number
  y: number
  speed: number
  type: 'normal' | 'golden' | 'bomb'
}

export default function MiniGame({ onComplete }: MiniGameProps) {
  const [fishes, setFishes] = useState<Fish[]>([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(15)
  const [gameActive, setGameActive] = useState(true)
  const [catchEffect, setCatchEffect] = useState<{id: number, x: number, y: number, type: string} | null>(null)

  // Spawn fish
  useEffect(() => {
    if (!gameActive) return
    const interval = setInterval(() => {
      const rand = Math.random()
      let type: 'normal' | 'golden' | 'bomb' = 'normal'
      if (rand > 0.9) type = 'bomb'
      else if (rand > 0.75) type = 'golden'
      
      const newFish: Fish = {
        id: Date.now() + Math.random(),
        x: Math.random() * 80 + 10,
        y: -10,
        speed: Math.random() * 2 + 1.5,
        type,
      }
      setFishes(prev => [...prev, newFish])
    }, 800)
    return () => clearInterval(interval)
  }, [gameActive])

  // Move fish
  useEffect(() => {
    if (!gameActive) return
    const interval = setInterval(() => {
      setFishes(prev => prev
        .map(f => ({ ...f, y: f.y + f.speed }))
        .filter(f => f.y < 110)
      )
    }, 50)
    return () => clearInterval(interval)
  }, [gameActive])

  // Timer
  useEffect(() => {
    if (!gameActive) return
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [gameActive])

  // Auto complete
  useEffect(() => {
    if (!gameActive && timeLeft === 0) {
      setTimeout(() => onComplete(score), 1500)
    }
  }, [gameActive, timeLeft, score, onComplete])

  const catchFish = useCallback((fish: Fish) => {
    if (!gameActive) return
    
    setCatchEffect({ id: Date.now(), x: fish.x, y: fish.y, type: fish.type })
    setTimeout(() => setCatchEffect(null), 500)
    
    if (fish.type === 'bomb') {
      setScore(prev => Math.max(0, prev - 2))
    } else if (fish.type === 'golden') {
      setScore(prev => prev + 3)
    } else {
      setScore(prev => prev + 1)
    }
    
    setFishes(prev => prev.filter(f => f.id !== fish.id))
  }, [gameActive])

  const getFishEmoji = (type: string) => {
    switch (type) {
      case 'golden': return '🌟'
      case 'bomb': return '💣'
      default: return '🐟'
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-b from-blue-100 to-cyan-100 rounded-3xl p-6 w-full max-w-sm shadow-2xl border-2 border-blue-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="bg-white/80 rounded-xl px-3 py-1">
            <span className="text-sm font-bold text-blue-600">🐟 {score}</span>
          </div>
          <h3 className="text-lg font-bold text-blue-700">Catch Fish!</h3>
          <div className="bg-white/80 rounded-xl px-3 py-1">
            <span className="text-sm font-bold text-blue-600">⏱ {timeLeft}s</span>
          </div>
        </div>

        {/* Game area */}
        <div className="relative w-full h-64 bg-gradient-to-b from-blue-200/50 to-blue-300/50 rounded-2xl overflow-hidden border border-blue-200">
          {/* Water effect */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-blue-300/30 rounded-b-2xl" />
          
          {/* Fishes */}
          {fishes.map(fish => (
            <button
              key={fish.id}
              onClick={() => catchFish(fish)}
              className="absolute text-2xl cursor-pointer hover:scale-125 transition-transform transform active:scale-90"
              style={{ left: `${fish.x}%`, top: `${fish.y}%` }}
            >
              {getFishEmoji(fish.type)}
            </button>
          ))}

          {/* Catch effect */}
          {catchEffect && (
            <div
              className="absolute text-xl animate-ping"
              style={{ left: `${catchEffect.x}%`, top: `${catchEffect.y}%` }}
            >
              {catchEffect.type === 'bomb' ? '💥' : '✨'}
            </div>
          )}

          {/* Game over overlay */}
          {!gameActive && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl">
              <p className="text-2xl font-bold text-blue-700 mb-2">Time's Up!</p>
              <p className="text-lg text-blue-500">You caught {score} fish! 🐟</p>
              {score > 5 && <p className="text-sm text-pink-500 mt-1">Amazing! Pipop is so happy! 🎉</p>}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-3 text-center">
          <p className="text-xs text-blue-500">
            🐟 +1 point | 🌟 +3 points | 💣 -2 points
          </p>
        </div>
      </div>
    </div>
  )
}
