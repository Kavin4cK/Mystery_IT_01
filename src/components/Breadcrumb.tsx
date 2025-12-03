'use client'

import { useRouter } from 'next/navigation'
import { getRoomByCode, getRoomLevel } from '@/constants/roomConfig'

interface BreadcrumbItem {
  label: string
  href?: string
  isActive?: boolean
}

interface BreadcrumbProps {
  currentRoom?: string
  showHome?: boolean
}

export function Breadcrumb({ currentRoom, showHome = true }: BreadcrumbProps) {
  const router = useRouter()

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = []

    // Always show Home if requested
    if (showHome) {
      breadcrumbs.push({
        label: 'Home',
        href: '/',
        isActive: !currentRoom
      })
    }

    // Add current room if available
    if (currentRoom) {
      const room = getRoomByCode(currentRoom)
      if (room) {
        // Add level
        breadcrumbs.push({
          label: `Level ${room.level}`,
          isActive: false
        })

        // Add room
        breadcrumbs.push({
          label: `${room.department} ${room.roomNumber}`,
          isActive: true
        })
      }
    }

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  if (breadcrumbs.length === 0) return null

  return (
    <nav className="text-green-400/70 font-mono text-xs sm:text-sm" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((crumb, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-green-400/50">&gt;</span>
            )}
            {crumb.href && !crumb.isActive ? (
              <button
                onClick={() => router.push(crumb.href!)}
                className="text-green-400 hover:text-green-300 transition-colors underline hover:no-underline"
              >
                {crumb.label}
              </button>
            ) : (
              <span className={`${crumb.isActive ? 'text-white font-semibold' : 'text-green-400/70'}`}>
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
