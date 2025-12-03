import { MetadataRoute } from 'next'
import { ALL_ROOMS } from '@/constants/roomConfig'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mystery-exe.vercel.app'

  // Home page
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]

  // Room pages - lower priority since they require passcodes
  ALL_ROOMS.forEach((room) => {
    routes.push({
      url: `${baseUrl}/room?passcode=${room.code}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    })
  })

  return routes
}
