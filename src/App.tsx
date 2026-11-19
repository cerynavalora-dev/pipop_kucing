import { useState, useEffect, useCallback } from 'react'
import PipopCat from './components/PipopCat'
import StatusBars from './components/StatusBars'
import ActionButtons from './components/ActionButtons'
import MiniGame from './components/MiniGame'
import Particles from './components/Particles'
import { GameState } from './types'

function App() {
  const [gameState, setGameState] = useState<GameState>({
    happiness: 70,
    hunger: 30,
    energy: 80,
    love: 0,
    mood: 'happy',
    isPlaying: false,
    showMiniGame: false,
    message: 'Hi! I\'m Pipop! Let\'s be friends! 🐱',
    lastAction: '',
    level: 1,
    xp: 0,
  })

  const [particles, setParticles] = useState<Array<{id: number, type: string, x: number, y: number}>>([])
  const [catAnimation, setCatAnimation] = useState('')
  const [showHearts, setShowHearts] = useState(false)

  // Decrease stats over time
  useEffect(() => {
    const interval = setInterval(() => {
      setGameState(prev => {
        const newHunger = Math.min(100, prev.hunger + 0.5)
        const newEnergy = Math.max(0, prev.energy - 0.3)
        const newHappiness = Math.max(0, prev.happiness - 0.2)
        
        let mood: GameState['mood'] = 'happy'
        if (newHunger > 70) mood = 'hungry'
        else if (newEnergy < 20) mood = 'sleepy'
        else if (newHappiness < 30) mood = 'sad'
        else if (newHappiness > 80 && newHunger < 30) mood = 'ecstatic'
        
        return { ...prev, hunger: newHunger, energy: newEnergy, happiness: newHappiness, mood }
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const addXP = useCallback((amount: number) => {
    setGameState(prev => {
      const newXP = prev.xp + amount
      const xpNeeded = prev.level * 100
      if (newXP >= xpNeeded) {
        return { ...prev, xp: newXP - xpNeeded, level: prev.level + 1, message: `Level up! Pipop is now level ${prev.level + 1}! 🎉` }
      }
      return { ...prev, xp: newXP }
    })
  }, [])

  const spawnParticles = (type: string) => {
    const newParticles = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      type,
      x: Math.random() * 60 + 20,
      y: Math.random() * 30 + 30,
    }))
    setParticles(newParticles)
    setTimeout(() => setParticles([]), 1500)
  }

  const handlePet = () => {
    setGameState(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 15),
      love: prev.love + 1,
      message: 'Purr... purr... I love being petted! 💕',
      lastAction: 'pet',
    }))
    setCatAnimation('pet')
    setShowHearts(true)
    spawnParticles('heart')
    addXP(10)
    setTimeout(() => { setCatAnimation(''); setShowHearts(false) }, 1500)
  }

  const handleFeed = () => {
    if (gameState.hunger < 10) {
      setGameState(prev => ({ ...prev, message: 'I\'m not hungry right now! 😸' }))
      return
    }
    setGameState(prev => ({
      ...prev,
      hunger: Math.max(0, prev.hunger - 30),
      happiness: Math.min(100, prev.happiness + 5),
      message: 'Yummy! That fish was delicious! 🐟',
      lastAction: 'feed',
    }))
    setCatAnimation('eat')
    spawnParticles('fish')
    addXP(15)
    setTimeout(() => setCatAnimation(''), 1500)
  }

  const handlePlay = () => {
    if (gameState.energy < 15) {
      setGameState(prev => ({ ...prev, message: 'I\'m too tired to play... let me rest 😴' }))
      return
    }
    setGameState(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 20),
      energy: Math.max(0, prev.energy - 15),
      hunger: Math.min(100, prev.hunger + 10),
      message: 'Wheee! Playing is so fun! 🎾',
      lastAction: 'play',
    }))
    setCatAnimation('play')
    spawnParticles('star')
    addXP(20)
    setTimeout(() => setCatAnimation(''), 1500)
  }

  const handleSleep = () => {
    setGameState(prev => ({
      ...prev,
      energy: Math.min(100, prev.energy + 40),
      message: 'Zzz... sweet dreams... 💤',
      lastAction: 'sleep',
    }))
    setCatAnimation('sleep')
    spawnParticles('zzz')
    addXP(5)
    setTimeout(() => setCatAnimation(''), 2000)
  }

  const handleMiniGame = () => {
    if (gameState.energy < 20) {
      setGameState(prev => ({ ...prev, message: 'I need more energy for the mini game! 😿' }))
      return
    }
    setGameState(prev => ({ ...prev, showMiniGame: true }))
  }

  const handleMiniGameComplete = (score: number) => {
    const happinessGain = Math.min(30, score * 5)
    const xpGain = score * 10
    setGameState(prev => ({
      ...prev,
      showMiniGame: false,
      happiness: Math.min(100, prev.happiness + happinessGain),
      energy: Math.max(0, prev.energy - 20),
      message: score > 5 ? 'Amazing game! You\'re so good! 🌟' : 'That was fun! Let\'s play again! 🎮',
    }))
    addXP(xpGain)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-50 to-purple-100 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl opacity-20 animate-bounce">🌸</div>
        <div className="absolute top-20 right-20 text-3xl opacity-20 animate-pulse">✨</div>
        <div className="absolute bottom-20 left-20 text-3xl opacity-20 animate-bounce" style={{animationDelay: '0.5s'}}>🌷</div>
        <div className="absolute bottom-10 right-10 text-4xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}>💫</div>
        <div className="absolute top-1/2 left-5 text-2xl opacity-15 animate-bounce" style={{animationDelay: '0.3s'}}>🎀</div>
        <div className="absolute top-1/3 right-10 text-2xl opacity-15 animate-pulse" style={{animationDelay: '0.7s'}}>🩷</div>
      </div>

      {/* Title */}
      <div className="text-center mb-4 relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 via-pink-500 to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
          Pipop
        </h1>
        <p className="text-pink-400 text-sm mt-1 font-medium">Your cute pink cat friend! 🐱</p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="bg-pink-200 text-pink-700 px-3 py-1 rounded-full text-xs font-bold">
            Level {gameState.level}
          </span>
          <div className="w-32 h-2 bg-pink-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full transition-all duration-500"
              style={{ width: `${(gameState.xp / (gameState.level * 100)) * 100}%` }}
            />
          </div>
          <span className="text-pink-400 text-xs">{gameState.xp}/{gameState.level * 100} XP</span>
        </div>
      </div>

      {/* Main game area */}
      <div className="relative z-10 w-full max-w-md">
        {/* Status bars */}
        <StatusBars happiness={gameState.happiness} hunger={gameState.hunger} energy={gameState.energy} />

        {/* Cat display */}
        <div className="relative flex justify-center my-6">
          <div className="relative">
            <PipopCat mood={gameState.mood} animation={catAnimation} />
            {showHearts && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="text-2xl animate-ping">💕</span>
              </div>
            )}
          </div>
          <Particles particles={particles} />
        </div>

        {/* Message bubble */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 mb-4 shadow-lg border border-pink-200 text-center">
          <p className="text-pink-700 font-medium text-sm">{gameState.message}</p>
        </div>

        {/* Action buttons */}
        <ActionButtons
          onPet={handlePet}
          onFeed={handleFeed}
          onPlay={handlePlay}
          onSleep={handleSleep}
          onMiniGame={handleMiniGame}
        />

        {/* Love counter */}
        <div className="text-center mt-4">
          <span className="text-pink-400 text-sm">
            💖 Love Points: {gameState.love}
          </span>
        </div>
      </div>

      {/* Mini Game Modal */}
      {gameState.showMiniGame && (
        <MiniGame onComplete={handleMiniGameComplete} />
      )}
    </div>
  )
}

export default App
