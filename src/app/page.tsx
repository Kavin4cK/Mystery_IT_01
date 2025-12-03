'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { VALID_ROOM_CODES } from '@/constants/roomConfig'

export default function Home() {
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const validatePasscode = (code: string): boolean => {
    // Check format: LevelNumber(1-3) + Department(2+ letters) + RoomNumber(2-3 digits)
    const passcodeRegex = /^[123][A-Z]{2,5}\d{2,3}$/

    if (!passcodeRegex.test(code)) {
      return false
    }

    // Extract components
    const level = parseInt(code.charAt(0))
    const department = code.substring(1).replace(/\d+$/, '') // Remove trailing digits
    const roomNumber = code.substring(code.length - (level === 3 ? 2 : 3)) // Level 3 has 2 digits, others have 3

    // Validate level and room combination
    if (level === 1) {
      return VALID_ROOM_CODES.level1.includes(`${department}${roomNumber}`)
    } else if (level === 2) {
      return VALID_ROOM_CODES.level2.includes(`${department}${roomNumber}`)
    } else if (level === 3) {
      return VALID_ROOM_CODES.level3.includes(`${department}${roomNumber}`)
    }

    return false
  }

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (passcode.trim() === '') {
      setError('Please enter a passcode')
      return
    }

    if (validatePasscode(passcode)) {
      // Redirect to room page with passcode as parameter
      router.push(`/room?passcode=${encodeURIComponent(passcode)}`)
    } else {
      setError('ACCESS DENIED - Invalid passcode format or room does not exist')
      setPasscode('')
    }
  }


  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Matrix-style background animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="matrix-bg"></div>
      </div>

      {/* Neon grid lines */}
      <div className="absolute inset-0">
        <div className="neon-grid"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="text-center max-w-4xl mx-auto fade-in">
          {/* Glitchy title */}
          <div className="mb-8 sm:mb-12 lg:mb-16 px-4 fade-in">
            <h1
              className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold glitch-text text-white mb-2 sm:mb-4 tracking-wider hover-lift"
              data-text="MYSTERY.EXE"
            >
              MYSTERY.EXE
            </h1>
            <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-mono text-green-400 mb-2 scanning-text">
              QUANT LOGIC : IT THEME
            </div>
            <div className="w-20 sm:w-24 md:w-32 h-1 bg-green-400 mx-auto pulse-glow"></div>
          </div>

          {/* Passcode entry */}
          <div className="bg-gray-900/80 backdrop-blur-sm neon-border rounded-lg p-4 sm:p-6 lg:p-8 max-w-sm sm:max-w-md mx-auto shadow-2xl w-full fade-in-delay-1">
            <div className="mb-4 sm:mb-6">
              <div className="text-green-400 font-mono text-xs sm:text-sm mb-2 animate-pulse">
                ENTER PASSCODE TO ACCESS THE MATRIX
              </div>
              <div className="text-green-400/70 font-mono text-xs">
                $ sudo access --quantum-logic
              </div>
            </div>

            <form onSubmit={handlePasscodeSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <input
                  type="text"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="e.g., 1EC210, 2EC212"
                  className={`w-full bg-black border-2 rounded px-3 sm:px-4 py-3 sm:py-4 text-green-400 font-mono text-base sm:text-lg focus:outline-none transition-all placeholder-green-400/50 hover-glow ${
                    error ? 'border-red-400' : 'border-green-400/50 focus:border-green-400 focus:neon-glow'
                  }`}
                  autoFocus
                />
                {error && (
                  <div className="text-red-400 font-mono text-xs sm:text-sm mt-2 animate-pulse">
                    {error}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-green-400 hover:bg-green-300 text-black font-bold py-3 sm:py-4 px-4 sm:px-6 rounded font-mono text-base sm:text-lg transition-all duration-200 hover-lift min-h-[44px] sm:min-h-[48px] neon-glow"
              >
                [ ENTER ROOM ]
              </button>
            </form>

            <div className="mt-4 sm:mt-6 text-xs font-mono text-green-400/60 space-y-1">
              <div className="animate-pulse text-xs sm:text-sm">FORMAT: Level(1-3) + Dept + Room</div>
              <div className="text-xs">Level 1: EC210, EC211, EC205, EC204</div>
              <div className="text-xs">Level 2: EC212, EC213, EC203, EC202</div>
              <div className="text-xs">Level 3: FINAL01, FINAL02, FINAL03, FINAL04</div>
            </div>
          </div>

          {/* Terminal-style footer */}
          <div className="mt-8 sm:mt-12 font-mono text-green-400/60 text-xs sm:text-sm fade-in-delay-2">
            <div className="scanning-text">
              {`> System online...`}
            </div>
            <div className="scanning-text" style={{ animationDelay: '1s' }}>
              {`> Quantum processors initialized...`}
            </div>
            <div className="scanning-text" style={{ animationDelay: '2s' }}>
              {`> Awaiting authorization...`}
            </div>
          </div>
        </div>
      </div>

      {/* Corner decorations - Hidden on mobile, visible on larger screens */}
      <div className="hidden sm:block absolute top-4 left-4 text-green-400/30 font-mono text-xs">
        <div>[ROOT@MYSTERY.EXE ~]$</div>
      </div>
      <div className="hidden sm:block absolute top-4 right-4 text-green-400/30 font-mono text-xs">
        <div>STATUS: ONLINE</div>
      </div>
      <div className="hidden sm:block absolute bottom-4 left-4 text-green-400/30 font-mono text-xs">
        <div>SECURITY: ACTIVE</div>
      </div>
      <div className="hidden sm:block absolute bottom-4 right-4 text-green-400/30 font-mono text-xs">
        <div>v1.3.3.7</div>
      </div>
    </div>
  )
}
