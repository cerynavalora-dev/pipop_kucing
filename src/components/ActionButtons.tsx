interface ActionButtonsProps {
  onPet: () => void
  onFeed: () => void
  onPlay: () => void
  onSleep: () => void
  onMiniGame: () => void
}

export default function ActionButtons({ onPet, onFeed, onPlay, onSleep, onMiniGame }: ActionButtonsProps) {
  return (
    <div className="grid grid-cols-3 gap-3 mb-3">
      <button
        onClick={onPet}
        className="bg-gradient-to-br from-pink-300 to-pink-400 hover:from-pink-400 hover:to-pink-500 text-white rounded-xl p-3 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200 flex flex-col items-center gap-1"
      >
        <span className="text-2xl">🤚</span>
        <span className="text-xs font-bold">Pet</span>
      </button>
      
      <button
        onClick={onFeed}
        className="bg-gradient-to-br from-orange-300 to-orange-400 hover:from-orange-400 hover:to-orange-500 text-white rounded-xl p-3 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200 flex flex-col items-center gap-1"
      >
        <span className="text-2xl">🐟</span>
        <span className="text-xs font-bold">Feed</span>
      </button>
      
      <button
        onClick={onPlay}
        className="bg-gradient-to-br from-purple-300 to-purple-400 hover:from-purple-400 hover:to-purple-500 text-white rounded-xl p-3 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200 flex flex-col items-center gap-1"
      >
        <span className="text-2xl">🎾</span>
        <span className="text-xs font-bold">Play</span>
      </button>
      
      <button
        onClick={onSleep}
        className="bg-gradient-to-br from-blue-300 to-blue-400 hover:from-blue-400 hover:to-blue-500 text-white rounded-xl p-3 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200 flex flex-col items-center gap-1"
      >
        <span className="text-2xl">💤</span>
        <span className="text-xs font-bold">Sleep</span>
      </button>
      
      <button
        onClick={onMiniGame}
        className="bg-gradient-to-br from-green-300 to-green-400 hover:from-green-400 hover:to-green-500 text-white rounded-xl p-3 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200 flex flex-col items-center gap-1 col-span-2"
      >
        <span className="text-2xl">🎮</span>
        <span className="text-xs font-bold">Catch Fish Game!</span>
      </button>
    </div>
  )
}
