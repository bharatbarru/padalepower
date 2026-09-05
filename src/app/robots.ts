import { MetadataRoute } from 'next';
import { COMPANY_CONFIG } from '../config/companyConfig';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/admin'],
    },
    sitemap: `${COMPANY_CONFIG.siteUrl}/sitemap.xml`,
  };
}
