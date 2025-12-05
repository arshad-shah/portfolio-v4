// src/components/common/SEO.tsx

import { Helmet } from 'react-helmet-async'
import { SITE_CONFIG } from '@/lib/constants'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  keywords?: readonly string[]
  author?: string
  publishedTime?: string
  modifiedTime?: string
}

/**
 * SEO component for managing meta tags
 * 
 * @example
 * <SEO
 *   title="About Me"
 *   description="Learn more about my background"
 * />
 */
export function SEO({
  title,
  description = SITE_CONFIG.description,
  image = SITE_CONFIG.ogImage,
  url = SITE_CONFIG.url,
  type = 'website',
  keywords = SITE_CONFIG.keywords,
  author = SITE_CONFIG.author,
  publishedTime,
  modifiedTime,
}: SEOProps) {
  const fullTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : SITE_CONFIG.title

  const fullImageUrl = image.startsWith('http')
    ? image
    : `${SITE_CONFIG.url}${image}`

  const fullUrl = url.startsWith('http') ? url : `${SITE_CONFIG.url}${url}`

  return (
    <Helmet prioritizeSeoTags>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      
      {/* Mobile */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={SITE_CONFIG.name} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${SITE_CONFIG.name} - Portfolio`} />
      <meta property="og:site_name" content={SITE_CONFIG.name} />
      <meta property="og:locale" content={SITE_CONFIG.locale} />

      {/* Article specific */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && (
        <meta property="article:author" content={author} />
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Structured Data - Person Schema */}
      {type === 'profile' && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: SITE_CONFIG.name,
            url: SITE_CONFIG.url,
            image: fullImageUrl,
            jobTitle: 'Software Engineer',
            worksFor: {
              '@type': 'Organization',
              name: 'Houghton Mifflin Harcourt',
            },
            alumniOf: 'Technological University Dublin',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Dublin',
              addressCountry: 'IE',
            },
            sameAs: [
              'https://github.com/arshad-shah',
              'https://www.linkedin.com/in/arshadshah',
            ],
          })}
        </script>
      )}

      {/* Structured Data - Website Schema */}
      {type === 'website' && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: SITE_CONFIG.name,
            url: SITE_CONFIG.url,
            description: SITE_CONFIG.description,
            author: {
              '@type': 'Person',
              name: SITE_CONFIG.author,
            },
          })}
        </script>
      )}
    </Helmet>
  )
}