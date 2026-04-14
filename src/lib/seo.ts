// SEO utility functions for structured data

export const siteUrl = "https://www.umbrellamovers.com";
export const socialImage = "https://storage.googleapis.com/gpt-engineer-file-uploads/0WuDfy6XM0SZ3H7EU34wZ5PlK1N2/social-images/social-1763924433289-IMG_0737.jpeg";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generate JSON-LD BreadcrumbList schema
 * @param items Array of breadcrumb items (name and url pairs)
 * @returns JSON-LD structured data object for BreadcrumbList
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

/**
 * Generate JSON-LD Organization schema for Umbrella Movers
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#organization`,
    "name": "Umbrella Movers",
    "description": "Las Vegas' highest-rated woman-owned moving company. Licensed (CPCN 3364), insured, 300+ 5-star reviews.",
    "url": siteUrl,
    "telephone": "702-533-2853",
    "email": "umbrellamovers@gmail.com",
    "image": socialImage,
    "logo": `${siteUrl}/images/email-logo-header.png`,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3111 So. Valley View Blvd. Suite E-109",
      "addressLocality": "Las Vegas",
      "addressRegion": "NV",
      "postalCode": "89102",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 36.1251,
      "longitude": -115.1889
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "300",
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      "https://www.facebook.com/umbrellamovers",
      "https://www.instagram.com/umbrellamovers",
      "https://www.yelp.com/biz/umbrella-movers-las-vegas"
    ]
  };
}
