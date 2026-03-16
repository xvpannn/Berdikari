import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Robots {
  return [
    {
      url: 'https://berdikariconsultant.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://berdikariconsultant.com/cases',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
}
