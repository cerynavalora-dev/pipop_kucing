interface PipopCatProps {
  mood: string
  animation: string
}

export default function PipopCat({ mood, animation }: PipopCatProps) {
  const getEyes = () => {
    if (animation === 'sleep') return '😴'
    if (animation === 'pet') return '🥰'
    if (mood === 'happy' || mood === 'ecstatic') return '^ ^'
    if (mood === 'sad') return 'T_T'
    if (mood === 'hungry') return '◉ ◉'
    if (mood === 'sleepy') return '- -'
    return '^ ^'
  }

  const getMouth = () => {
    if (animation === 'eat') return '🐟'
    if (mood === 'ecstatic') return 'ω'
    if (mood === 'happy') return 'ω'
    if (mood === 'sad') return '︵'
    if (mood === 'hungry') return '○'
    return 'ω'
  }

  const getBodyClass = () => {
    switch (animation) {
      case 'pet': return 'animate-wiggle'
      case 'eat': return 'animate-bounce-slow'
      case 'play': return 'animate-jump'
      case 'sleep': return 'animate-breathe'
      default: return 'animate-breathe'
    }
  }

  return (
    <div className={`relative transition-all duration-300 ${getBodyClass()}`}>
      {/* Cat body SVG */}
      <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-lg">
        {/* Tail */}
        <path 
          d={animation === 'play' 
            ? "M 160 140 Q 190 100 180 70 Q 175 55 185 45" 
            : "M 160 140 Q 180 120 175 95 Q 170 75 180 60"
          }
          fill="none" 
          stroke="#f9a8d4" 
          strokeWidth="8" 
          strokeLinecap="round"
          className="transition-all duration-300"
        />
        
        {/* Body */}
        <ellipse cx="100" cy="140" rx="55" ry="45" fill="#fbcfe8" />
        <ellipse cx="100" cy="140" rx="55" ry="45" fill="url(#bodyGradient)" />
        
        {/* Head */}
        <circle cx="100" cy="85" r="45" fill="#fbcfe8" />
        <circle cx="100" cy="85" r="45" fill="url(#headGradient)" />
        
        {/* Ears */}
        <path d="M 65 55 L 55 20 L 80 45 Z" fill="#f9a8d4" />
        <path d="M 135 55 L 145 20 L 120 45 Z" fill="#f9a8d4" />
        <path d="M 68 52 L 60 28 L 78 47 Z" fill="#fce7f3" />
        <path d="M 132 52 L 140 28 L 122 47 Z" fill="#fce7f3" />
        
        {/* Blush */}
        <circle cx="72" cy="95" r="8" fill="#f9a8d4" opacity="0.5" />
        <circle cx="128" cy="95" r="8" fill="#f9a8d4" opacity="0.5" />
        
        {/* Eyes */}
        {animation === 'sleep' ? (
          <>
            <path d="M 80 80 Q 85 85 90 80" fill="none" stroke="#4a1942" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 110 80 Q 115 85 120 80" fill="none" stroke="#4a1942" strokeWidth="2.5" strokeLinecap="round" />
          </>
        ) : animation === 'pet' ? (
          <>
            <path d="M 80 83 Q 85 78 90 83" fill="none" stroke="#4a1942" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 110 83 Q 115 78 120 83" fill="none" stroke="#4a1942" strokeWidth="2.5" strokeLinecap="round" />
          </>
        ) : mood === 'sad' ? (
          <>
            <circle cx="85" cy="82" r="5" fill="#4a1942" />
            <circle cx="115" cy="82" r="5" fill="#4a1942" />
            <circle cx="87" cy="80" r="2" fill="white" />
            <circle cx="117" cy="80" r="2" fill="white" />
            {/* Tears */}
            <path d="M 82 88 Q 80 95 82 100" fill="none" stroke="#93c5fd" strokeWidth="2" opacity="0.7" />
            <path d="M 118 88 Q 120 95 118 100" fill="none" stroke="#93c5fd" strokeWidth="2" opacity="0.7" />
          </>
        ) : mood === 'hungry' ? (
          <>
            <circle cx="85" cy="82" r="6" fill="#4a1942" />
            <circle cx="115" cy="82" r="6" fill="#4a1942" />
            <circle cx="87" cy="80" r="2.5" fill="white" />
            <circle cx="117" cy="80" r="2.5" fill="white" />
          </>
        ) : (
          <>
            <path d="M 80 83 Q 85 78 90 83" fill="none" stroke="#4a1942" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 110 83 Q 115 78 120 83" fill="none" stroke="#4a1942" strokeWidth="2.5" strokeLinecap="round" />
          </>
        )}
        
        {/* Nose */}
        <path d="M 97 92 L 100 95 L 103 92 Z" fill="#f472b6" />
        
        {/* Mouth */}
        {animation === 'eat' ? (
          <circle cx="100" cy="100" r="5" fill="#4a1942" opacity="0.7" />
        ) : mood === 'sad' ? (
          <path d="M 93 102 Q 100 98 107 102" fill="none" stroke="#4a1942" strokeWidth="2" strokeLinecap="round" />
        ) : (
          <>
            <path d="M 100 95 Q 95 102 90 100" fill="none" stroke="#4a1942" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 100 95 Q 105 102 110 100" fill="none" stroke="#4a1942" strokeWidth="1.5" strokeLinecap="round" />
          </>
        )}
        
        {/* Whiskers */}
        <line x1="60" y1="88" x2="75" y2="92" stroke="#d4a0c0" strokeWidth="1" />
        <line x1="58" y1="95" x2="75" y2="95" stroke="#d4a0c0" strokeWidth="1" />
        <line x1="60" y1="102" x2="75" y2="98" stroke="#d4a0c0" strokeWidth="1" />
        <line x1="140" y1="88" x2="125" y2="92" stroke="#d4a0c0" strokeWidth="1" />
        <line x1="142" y1="95" x2="125" y2="95" stroke="#d4a0c0" strokeWidth="1" />
        <line x1="140" y1="102" x2="125" y2="98" stroke="#d4a0c0" strokeWidth="1" />
        
        {/* Paws */}
        <ellipse cx="75" cy="175" rx="15" ry="10" fill="#fbcfe8" />
        <ellipse cx="125" cy="175" rx="15" ry="10" fill="#fbcfe8" />
        <ellipse cx="75" cy="175" rx="15" ry="10" fill="url(#pawGradient)" />
        <ellipse cx="125" cy="175" rx="15" ry="10" fill="url(#pawGradient)" />
        
        {/* Paw pads */}
        <circle cx="72" cy="177" r="3" fill="#f9a8d4" />
        <circle cx="78" cy="177" r="3" fill="#f9a8d4" />
        <circle cx="122" cy="177" r="3" fill="#f9a8d4" />
        <circle cx="128" cy="177" r="3" fill="#f9a8d4" />
        
        {/* Gradients */}
        <defs>
          <radialGradient id="bodyGradient" cx="40%" cy="30%">
            <stop offset="0%" stopColor="#fce7f3" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#fbcfe8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="headGradient" cx="40%" cy="30%">
            <stop offset="0%" stopColor="#fce7f3" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#fbcfe8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="pawGradient" cx="50%" cy="30%">
            <stop offset="0%" stopColor="#fce7f3" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fbcfe8" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      
      {/* Sleep Zzz */}
      {animation === 'sleep' && (
        <div className="absolute -top-2 -right-2 text-2xl animate-float">
          💤
        </div>
      )}
      
      {/* Play sparkles */}
      {animation === 'play' && (
        <>
          <div className="absolute top-0 left-0 text-xl animate-ping">✨</div>
          <div className="absolute top-2 right-0 text-xl animate-ping" style={{animationDelay: '0.3s'}}>⭐</div>
        </>
      )}
    </div>
  )
}
