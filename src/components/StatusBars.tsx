interface StatusBarsProps {
  happiness: number
  hunger: number
  energy: number
}

export default function StatusBars({ happiness, hunger, energy }: StatusBarsProps) {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-pink-200">
      <div className="space-y-3">
        {/* Happiness */}
        <div className="flex items-center gap-3">
          <span className="text-xl w-8 text-center">😊</span>
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-xs font-medium text-pink-600">Happiness</span>
              <span className="text-xs text-pink-400">{Math.round(happiness)}%</span>
            </div>
            <div className="w-full h-3 bg-pink-100 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-yellow-300 to-pink-400"
                style={{ width: `${happiness}%` }}
              />
            </div>
          </div>
        </div>

        {/* Hunger */}
        <div className="flex items-center gap-3">
          <span className="text-xl w-8 text-center">🍖</span>
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-xs font-medium text-pink-600">Fullness</span>
              <span className="text-xs text-pink-400">{Math.round(100 - hunger)}%</span>
            </div>
            <div className="w-full h-3 bg-pink-100 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-orange-300 to-red-400"
                style={{ width: `${100 - hunger}%` }}
              />
            </div>
          </div>
        </div>

        {/* Energy */}
        <div className="flex items-center gap-3">
          <span className="text-xl w-8 text-center">⚡</span>
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-xs font-medium text-pink-600">Energy</span>
              <span className="text-xs text-pink-400">{Math.round(energy)}%</span>
            </div>
            <div className="w-full h-3 bg-pink-100 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-green-300 to-blue-400"
                style={{ width: `${energy}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
