import { NextRequest } from 'next/server'
import { getRoomByCode } from '@/constants/roomConfig'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const roomParam = searchParams.get('room')

  if (!roomParam) {
    // Default OG image for home page
    return new Response(
      `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <rect width="1200" height="630" fill="#000000"/>
        <text x="600" y="200" font-family="monospace" font-size="48" fill="#00ff00" text-anchor="middle">
          MYSTERY.EXE
        </text>
        <text x="600" y="280" font-family="monospace" font-size="24" fill="#00ff00" text-anchor="middle">
          QUANT LOGIC : IT THEME
        </text>
        <text x="600" y="350" font-family="monospace" font-size="18" fill="#00ff00" text-anchor="middle">
          Enter the quantum realm of code
        </text>
      </svg>`,
      {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      }
    )
  }

  const room = getRoomByCode(roomParam)

  if (!room) {
    return new Response('Room not found', { status: 404 })
  }

  // Generate dynamic OG image for room
  return new Response(
    `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#000000"/>
      <rect x="50" y="50" width="1100" height="530" fill="none" stroke="#00ff00" stroke-width="3"/>
      <text x="600" y="150" font-family="monospace" font-size="36" fill="#00ff00" text-anchor="middle">
        ${room.name}
      </text>
      <text x="600" y="200" font-family="monospace" font-size="24" fill="#00ff00" text-anchor="middle">
        ROOM: ${room.department} ${room.room}
      </text>
      <text x="600" y="250" font-family="monospace" font-size="18" fill="#00ff00" text-anchor="middle">
        LEVEL ${room.level} • ${room.clearance}
      </text>
      <text x="600" y="320" font-family="monospace" font-size="16" fill="#00ff00" text-anchor="middle">
        ${room.description}
      </text>
      <text x="600" y="500" font-family="monospace" font-size="14" fill="#00ff00" text-anchor="middle">
        MYSTERY.EXE QUANTUM LOGIC SYSTEM
      </text>
    </svg>`,
    {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    }
  )
}
