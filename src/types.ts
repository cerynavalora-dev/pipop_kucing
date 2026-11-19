export interface GameState {
  happiness: number
  hunger: number
  energy: number
  love: number
  mood: 'happy' | 'sad' | 'hungry' | 'sleepy' | 'ecstatic'
  isPlaying: boolean
  showMiniGame: boolean
  message: string
  lastAction: string
  level: number
  xp: number
}

export interface Particle {
  id: number
  type: string
  x: number
  y: number
}
