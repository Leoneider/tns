import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/'],
    },
    host: 'https://www.transportadorestns.com',
    sitemap: 'https://www.transportadorestns.com/sitemap.xml',
  }
}
