'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface NavigationContextType {
  visitedRooms: Set<string>
  currentRoom: string | null
  markRoomVisited: (roomCode: string) => void
  setCurrentRoom: (roomCode: string | null) => void
  getVisitHistory: () => string[]
  isRoomVisited: (roomCode: string) => boolean
  getCompletionPercentage: () => number
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

interface NavigationProviderProps {
  children: ReactNode
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [visitedRooms, setVisitedRooms] = useState<Set<string>>(new Set())
  const [currentRoom, setCurrentRoomState] = useState<string | null>(null)

  const markRoomVisited = (roomCode: string) => {
    setVisitedRooms(prev => new Set([...prev, roomCode]))
  }

  const setCurrentRoom = (roomCode: string | null) => {
    setCurrentRoomState(roomCode)
    if (roomCode) {
      markRoomVisited(roomCode)
    }
  }

  const getVisitHistory = (): string[] => {
    return Array.from(visitedRooms)
  }

  const isRoomVisited = (roomCode: string): boolean => {
    return visitedRooms.has(roomCode)
  }

  const getCompletionPercentage = (): number => {
    // Total rooms: 8 standard rooms + 4 final rooms = 12 total
    const totalRooms = 12
    return Math.round((visitedRooms.size / totalRooms) * 100)
  }

  return (
    <NavigationContext.Provider
      value={{
        visitedRooms,
        currentRoom,
        markRoomVisited,
        setCurrentRoom,
        getVisitHistory,
        isRoomVisited,
        getCompletionPercentage
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}
