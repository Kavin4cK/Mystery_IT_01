'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getRoomByCode, getRoomMapping, getNextRoom, isFinalRoom } from '@/constants/roomConfig'
import { useNavigation } from '@/contexts/NavigationContext'
import { Breadcrumb } from '@/components/Breadcrumb'

interface RoomPageClientProps {
  passcode: string
}

export default function RoomPageClient({ passcode }: RoomPageClientProps) {
  const router = useRouter()
  const { setCurrentRoom } = useNavigation()
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  // Get room data
  const roomData = getRoomByCode(passcode)

  // If room data is not available, redirect (fallback)
  useEffect(() => {
    if (!roomData) {
      router.push('/')
      return
    }

    setCurrentRoom(passcode)
    setImageLoading(true)
    setImageError(false)
  }, [passcode, roomData, router, setCurrentRoom])

  if (!roomData) {
    return null
  }

  // Function to construct image path from passcode
  const getImagePath = (code: string): string => {
    return `/clues/${code}.jpg`
  }

  // Function to handle image loading
  const handleImageLoad = () => {
    setImageLoading(false)
    setImageError(false)
  }

  // Function to handle image error
  const handleImageError = () => {
    console.warn(`Failed to load image: ${getImagePath(passcode)}`)
    setImageLoading(false)
    setImageError(true)
  }

  // Function to handle passcode copying
  const handleCopyPasscode = async (code: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code)
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = code
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        const successful = document.execCommand('copy')
        document.body.removeChild(textArea)

        if (successful) {
          setCopySuccess(true)
          setTimeout(() => setCopySuccess(false), 2000)
        }
      }
    } catch (err) {
      console.error('Failed to copy passcode:', err)
    }
  }

  const nextRoom = getNextRoom(passcode)

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden fade-in">
      {/* Matrix-style background animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="matrix-bg"></div>
      </div>

      {/* Neon grid lines */}
      <div className="absolute inset-0">
        <div className="neon-grid"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className="flex-shrink-0 p-4 sm:p-6 border-b border-green-400/30">
          <div className="max-w-6xl mx-auto">
            <Breadcrumb currentRoom={passcode} />
          </div>
        </div>

        {/* Header with Room and Level info */}
        <header className="flex-shrink-0 p-4 sm:p-6 border-b border-green-400/30 fade-in">
          <div className="max-w-6xl mx-auto">
            {/* Mobile: stacked layout, Desktop: side by side */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold glitch-text text-white text-center sm:text-left" data-text={`ROOM: ${roomData.department} ${roomData.room}`}>
                ROOM: {roomData.department} {roomData.room}
              </div>
              <div className="text-lg sm:text-xl md:text-2xl text-cyan-400 font-bold text-center sm:text-right">
                LEVEL: {roomData.level}
              </div>
            </div>

            {/* Status bar */}
            <div className="mt-3 sm:mt-4">
              <div className="bg-gray-900/80 border border-green-400/50 rounded px-3 sm:px-4 py-2">
                <div className="text-green-400 font-mono text-xs sm:text-sm text-center sm:text-left">
                  <span className="text-red-400">{roomData.clearance}</span> | {roomData.description}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area with large image display */}
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 fade-in-delay-1">
          <div className="max-w-4xl w-full">
            {/* Large centered image area */}
            <div className="bg-gray-900/50 backdrop-blur-sm border-2 border-green-400/50 rounded-lg p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6">
              <div className="aspect-video sm:aspect-[16/10] bg-gray-800 border border-green-400/30 rounded-lg flex items-center justify-center relative overflow-hidden">
                {imageLoading && !imageError && (
                  <div className="text-center z-10 px-4">
                    <div className="animate-spin w-8 h-8 sm:w-12 sm:h-12 border-4 border-green-400 border-t-transparent rounded-full mx-auto mb-2 sm:mb-4"></div>
                    <div className="text-green-400 font-mono text-sm sm:text-lg animate-pulse">
                      LOADING CLUE IMAGE...
                    </div>
                    <div className="text-green-400/60 font-mono text-xs sm:text-sm mt-1 sm:mt-2">
                      {roomData.name}
                    </div>
                  </div>
                )}

                {imageError ? (
                  <div className="text-center z-10 px-4">
                    <div className="text-4xl sm:text-6xl mb-2 sm:mb-4 opacity-50">📷</div>
                    <div className="text-red-400 font-mono text-sm sm:text-lg animate-pulse bg-red-400/10 p-3 rounded">
                      CLUE IMAGE UNAVAILABLE
                    </div>
                    <div className="text-green-400/60 font-mono text-xs sm:text-sm mt-2">
                      The clue image for {roomData.name} could not be loaded.
                    </div>
                    <div className="text-green-400/40 font-mono text-xs mt-2 bg-gray-800/50 p-2 rounded">
                      Expected file: <code className="text-cyan-400">{passcode}.jpg</code>
                    </div>
                    <div className="text-yellow-400/70 font-mono text-xs mt-3">
                      This may be due to network issues or missing image file.
                      Try refreshing the page or contact system administrator.
                    </div>
                  </div>
                ) : (
                  <Image
                    src={getImagePath(passcode)}
                    alt={`Clue for ${roomData.name}`}
                    fill
                    className="object-cover rounded-lg"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  />
                )}

                {/* Scan lines effect - only show when image is loaded */}
                {!imageLoading && !imageError && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="scan-lines"></div>
                  </div>
                )}
              </div>

              {/* Image controls */}
              <div className="mt-4 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <button
                  className="bg-green-400 hover:bg-green-300 text-black font-bold py-3 px-4 sm:py-2 sm:px-6 rounded font-mono text-sm transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] sm:min-h-[40px] neon-glow"
                  disabled={imageLoading || imageError}
                >
                  [ ANALYZE CLUE ]
                </button>
                <button
                  className="bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-3 px-4 sm:py-2 sm:px-6 rounded font-mono text-sm transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] sm:min-h-[40px] neon-glow"
                  disabled={imageLoading || imageError}
                >
                  [ SAVE IMAGE ]
                </button>
              </div>

              {/* Image status indicator */}
              <div className="mt-4 text-center">
                <div className="text-green-400/70 font-mono text-xs">
                  {imageLoading && !imageError && (
                    <span className="animate-pulse">STATUS: LOADING...</span>
                  )}
                  {!imageLoading && !imageError && (
                    <span className="text-green-400">STATUS: IMAGE LOADED ✓</span>
                  )}
                  {imageError && (
                    <span className="text-red-400">STATUS: IMAGE UNAVAILABLE ✗</span>
                  )}
                </div>
              </div>
            </div>

            {/* Clue Mapping Display */}
            <div className="bg-gray-900/80 backdrop-blur-sm neon-border rounded-lg p-4 sm:p-6 fade-in-delay-2">
              <div className="text-center mb-4">
                <div className="text-cyan-400 font-bold text-base sm:text-lg font-mono animate-pulse">
                  CLUE ANALYSIS
                </div>
                <div className="w-24 sm:w-32 h-1 bg-cyan-400 mx-auto mt-2 animate-pulse"></div>
              </div>

              {/* Next Passcode Display - Only show if there's a next room */}
              {(() => {
                if (nextRoom && !isFinalRoom(passcode)) {
                  return (
                    <div className="mb-6 p-4 sm:p-6 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 border-2 border-yellow-400/60 rounded-lg shadow-lg neon-glow">
                      <div className="text-center">
                        <div className="text-yellow-400 font-mono text-xs sm:text-sm mb-2 sm:mb-3 animate-pulse flex items-center justify-center">
                          <span className="mr-1 sm:mr-2">🔑</span>
                          NEXT PASSCODE TO ENTER
                          <span className="ml-1 sm:ml-2">🔑</span>
                        </div>
                        <div
                          className="text-yellow-400 font-mono text-2xl sm:text-3xl lg:text-4xl font-bold tracking-widest cursor-pointer select-all hover:bg-yellow-400/20 p-3 sm:p-4 rounded-lg transition-all duration-200 border border-yellow-400/30 hover:border-yellow-400/60 hover-glow"
                          onClick={() => handleCopyPasscode(nextRoom)}
                          title="Click to copy passcode"
                        >
                          {nextRoom}
                        </div>
                        <div className="text-yellow-400/80 font-mono text-xs mt-2 sm:mt-3 flex items-center justify-center">
                          {copySuccess ? (
                            <span className="text-green-400 animate-pulse">✓ COPIED TO CLIPBOARD</span>
                          ) : (
                            <>
                              <span className="mr-1">👆</span>
                              Click to copy • Use at main terminal
                              <span className="ml-1">⌨️</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              })()}

              {(() => {
                const clueMapping = getRoomMapping(passcode)
                if (clueMapping && nextRoom) {
                  const nextRoomData = getRoomByCode(nextRoom)
                  const isNextRoomFinal = isFinalRoom(nextRoom)

                  return (
                    <div className="space-y-4">
                      {/* Current Location */}
                      <div className="text-center border-b border-green-400/30 pb-3">
                        <div className="text-green-400 font-mono text-sm mb-1">
                          CURRENT LOCATION
                        </div>
                        <div className="text-white font-mono text-base">
                          {roomData.department} {roomData.room} - {roomData.name}
                        </div>
                      </div>

                      {/* Clue Destination */}
                      <div className="text-center">
                        <div className="text-cyan-400 font-mono text-sm mb-2 animate-pulse">
                          CLUE DESTINATION
                        </div>
                        <div className="text-green-400 font-mono text-lg">
                          {isNextRoomFinal ? nextRoomData?.name : `${nextRoom.replace(/(\d)([A-Z]{2,5})(\d{2,3})/, '$2 $3')} - Level ${nextRoom.charAt(0)}`}
                        </div>
                        <div className="text-green-400/70 font-mono text-sm mt-1">
                          {isNextRoomFinal ? nextRoomData?.description : `Advanced ${nextRoom.charAt(0) === '2' ? 'Level 2' : 'Theme'} Facility`}
                        </div>
                      </div>

                      {/* Navigation Hint */}
                      <div className="text-center border-t border-green-400/30 pt-3">
                        <div className="text-cyan-400/70 font-mono text-xs mb-2">
                          NAVIGATION HINT
                        </div>
                        <div className="text-green-400 font-mono text-sm italic bg-green-400/5 p-3 rounded">
                          "{clueMapping.hint}"
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="text-center pt-2">
                        <button
                          onClick={() => router.push(`/room?passcode=${nextRoom}`)}
                          className="bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-3 px-8 rounded font-mono text-sm transition-all duration-200 hover-lift min-h-[44px] neon-glow"
                        >
                          [ FOLLOW THE CLUE ]
                        </button>
                      </div>
                    </div>
                  )
                }

                return (
                  <div className="text-center">
                    <div className="text-yellow-400 font-mono text-lg animate-pulse">
                      NO CLUE MAPPING FOUND
                    </div>
                    <div className="text-green-400/70 font-mono text-sm mt-2">
                      This room may be an endpoint or mapping data is unavailable.
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
        </main>

        {/* Footer with navigation breadcrumbs */}
        <footer className="flex-shrink-0 p-4 sm:p-6 border-t border-green-400/30 fade-in-delay-3">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              {/* Breadcrumb navigation */}
              <div className="text-green-400/70 font-mono text-xs sm:text-sm text-center sm:text-left">
                <span className="text-green-400">MAINFRAME</span> &gt;
                <span className="text-cyan-400 ml-2">LEVEL {roomData.level}</span> &gt;
                <span className="text-white ml-2">{roomData.department} {roomData.room}</span>
              </div>

              {/* Navigation buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => router.push('/')}
                  className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-4 sm:py-2 sm:px-6 rounded font-mono text-sm transition-all duration-200 hover-lift min-h-[44px] sm:min-h-[40px] neon-glow border-2 border-red-400"
                >
                  [ RETURN TO HOME ]
                </button>
                <button className="bg-green-400 hover:bg-green-300 text-black font-bold py-3 px-4 sm:py-2 sm:px-6 rounded font-mono text-sm transition-all duration-200 hover-lift min-h-[44px] sm:min-h-[40px] neon-glow">
                  [ NEXT ROOM ]
                </button>
              </div>
            </div>

            {/* Footer status */}
            <div className="mt-4 text-center text-green-400/50 font-mono text-xs">
              MYSTERY.EXE QUANTUM LOGIC SYSTEM | ROOM ACCESS GRANTED | SESSION ACTIVE
            </div>
          </div>
        </footer>

        {/* Corner indicators - Hidden on mobile */}
        <div className="hidden sm:block absolute top-4 left-4 text-green-400/30 font-mono text-xs">
          <div>ROOM: {roomData.department}{roomData.room}</div>
        </div>
        <div className="hidden sm:block absolute top-4 right-4 text-green-400/30 font-mono text-xs">
          <div>LEVEL: {roomData.level}</div>
        </div>
        <div className="hidden sm:block absolute bottom-4 left-4 text-green-400/30 font-mono text-xs">
          <div>STATUS: ACTIVE</div>
        </div>
        <div className="hidden sm:block absolute bottom-4 right-4 text-green-400/30 font-mono text-xs">
          <div>CLEARANCE: {roomData.clearance}</div>
        </div>
      </div>
    </div>
  )
}
