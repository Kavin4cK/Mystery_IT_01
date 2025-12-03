'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { VALID_ROOM_CODES, ALL_ROOMS, getRoomByCode } from '@/constants/roomConfig'
import { useNavigation } from '@/contexts/NavigationContext'
import dynamic from 'next/dynamic'

// Lazy load breadcrumb component
const Breadcrumb = dynamic(() => import('@/components/Breadcrumb'), {
  loading: () => <div className="h-4 bg-gray-800 animate-pulse rounded"></div>,
  ssr: false
})

export default function Home() {
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { getVisitHistory, getCompletionPercentage, isRoomVisited, setCurrentRoom } = useNavigation()

  const validatePasscode = (code: string): { isValid: boolean; error?: string } => {
    // Check if code is empty
    if (!code.trim()) {
      return { isValid: false, error: 'Please enter a passcode to access the facility.' }
    }

    // Check length
    if (code.length < 5 || code.length > 8) {
      return {
        isValid: false,
        error: 'Invalid passcode length. Passcodes should be 5-8 characters long (e.g., 1EC210).'
      }
    }

    // Check format: LevelNumber(1-3) + Department(2+ letters) + RoomNumber(2-3 digits)
    const passcodeRegex = /^[123][A-Z]{2,5}\d{2,3}$/

    if (!passcodeRegex.test(code)) {
      // Provide specific format guidance
      if (!/^[123]/.test(code)) {
        return {
          isValid: false,
          error: 'Passcode must start with a level number (1, 2, or 3). Example: 1EC210'
        }
      }
      if (!/[A-Z]{2,5}/.test(code.substring(1))) {
        return {
          isValid: false,
          error: 'Passcode must contain 2-5 department letters after the level number. Example: 1EC210'
        }
      }
      if (!/\d{2,3}$/.test(code)) {
        return {
          isValid: false,
          error: 'Passcode must end with 2-3 room numbers. Example: 1EC210'
        }
      }
      return {
        isValid: false,
        error: 'Invalid passcode format. Use format: Level(1-3) + Dept(XX-XXXXX) + Room(XX-XXX). Example: 1EC210'
      }
    }

    // Extract components
    const level = parseInt(code.charAt(0))
    const department = code.substring(1).replace(/\d+$/, '') // Remove trailing digits
    const roomNumber = code.substring(code.length - (level === 3 ? 2 : 3)) // Level 3 has 2 digits, others have 3

    // Validate level and room combination
    let validRooms: string[] = []
    if (level === 1) {
      validRooms = VALID_ROOM_CODES.level1
    } else if (level === 2) {
      validRooms = VALID_ROOM_CODES.level2
    } else if (level === 3) {
      validRooms = VALID_ROOM_CODES.level3
    }

    if (!validRooms.includes(`${department}${roomNumber}`)) {
      const levelNames = { 1: 'Level 1', 2: 'Level 2', 3: 'Level 3' }
      return {
        isValid: false,
        error: `${levelNames[level as keyof typeof levelNames]} room "${department}${roomNumber}" does not exist. Check the facility map for valid room codes.`
      }
    }

    return { isValid: true }
  }

  const handlePasscodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      const validation = validatePasscode(passcode)

      if (!validation.isValid) {
        setError(validation.error || 'Invalid passcode')
        setPasscode('')
        return
      }

      // Success feedback
      setSuccess('ACCESS GRANTED - Entering facility...')

      // Update navigation context
      setCurrentRoom(passcode)

      // Small delay for success feedback
      await new Promise(resolve => setTimeout(resolve, 800))

      // Redirect to room page with passcode as parameter
      router.push(`/room?passcode=${encodeURIComponent(passcode)}`)
    } catch (err) {
      console.error('Passcode submission error:', err)
      setError('System error occurred. Please try again.')
      setPasscode('')
    } finally {
      setIsLoading(false)
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
      <div className="relative z-10 min-h-screen p-4">
        {/* Breadcrumb Navigation */}
        <div className="max-w-6xl mx-auto pt-4 fade-in">
          <Breadcrumb showHome={false} />
        </div>

        <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
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
                  onChange={(e) => {
                    setPasscode(e.target.value)
                    setError('')
                    setSuccess('')
                  }}
                  placeholder="e.g., 1EC210, 2EC212"
                  className={`w-full bg-black border-2 rounded px-3 sm:px-4 py-3 sm:py-4 text-green-400 font-mono text-base sm:text-lg focus:outline-none transition-all placeholder-green-400/50 hover-glow ${
                    error ? 'border-red-400 focus:border-red-400' :
                    success ? 'border-green-400 focus:border-green-400' :
                    'border-green-400/50 focus:border-green-400 focus:neon-glow'
                  }`}
                  autoFocus
                  disabled={isLoading}
                />
                {error && (
                  <div className="text-red-400 font-mono text-xs sm:text-sm mt-2 animate-pulse bg-red-400/10 p-2 rounded">
                    ⚠️ {error}
                  </div>
                )}
                {success && (
                  <div className="text-green-400 font-mono text-xs sm:text-sm mt-2 animate-pulse bg-green-400/10 p-2 rounded">
                    ✓ {success}
                  </div>
                )}
                {isLoading && (
                  <div className="text-cyan-400 font-mono text-xs sm:text-sm mt-2 animate-pulse">
                    <div className="animate-spin w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full inline-block mr-2"></div>
                    Validating passcode...
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || !passcode.trim()}
                className={`w-full font-bold py-3 sm:py-4 px-4 sm:px-6 rounded font-mono text-base sm:text-lg transition-all duration-200 min-h-[44px] sm:min-h-[48px] ${
                  isLoading || !passcode.trim()
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-green-400 hover:bg-green-300 text-black hover-lift neon-glow'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-black border-t-transparent rounded-full inline-block mr-2"></div>
                    ACCESSING...
                  </>
                ) : (
                  '[ ENTER ROOM ]'
                )}
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

        {/* Mission Status Dashboard */}
        {getVisitHistory().length > 0 && (
          <div className="max-w-4xl mx-auto mt-8 fade-in-delay-3">
            <div className="bg-gray-900/80 backdrop-blur-sm border border-cyan-400/50 rounded-lg p-4 sm:p-6">
              <div className="text-center mb-4">
                <div className="text-cyan-400 font-bold text-lg font-mono animate-pulse">
                  MISSION STATUS
                </div>
                <div className="w-32 h-1 bg-cyan-400 mx-auto mt-2 animate-pulse"></div>
              </div>

              {/* Completion Progress */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-green-400 font-mono text-sm">Exploration Progress</span>
                  <span className="text-cyan-400 font-mono text-sm">{getCompletionPercentage()}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-400 to-cyan-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${getCompletionPercentage()}%` }}
                  ></div>
                </div>
              </div>

              {/* Visited Rooms Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {ALL_ROOMS.map((room) => (
                  <div
                    key={room.code}
                    className={`p-2 rounded border font-mono text-xs text-center transition-all ${
                      isRoomVisited(room.code)
                        ? 'bg-green-400/20 border-green-400 text-green-400'
                        : 'bg-gray-800/50 border-gray-600 text-gray-400'
                    }`}
                  >
                    <div className="font-bold">{room.code}</div>
                    <div className="text-xs opacity-75 truncate">{room.name.split(' ')[0]}</div>
                    {isRoomVisited(room.code) && (
                      <div className="text-green-400 mt-1">✓</div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center text-green-400/60 font-mono text-xs">
                {getVisitHistory().length} of 12 rooms explored
              </div>
            </div>
          </div>
        )}
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
