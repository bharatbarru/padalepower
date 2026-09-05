import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://padalaepower.com';
  const lastModified = new Date();

  return [
    { url: baseUrl, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/#about`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/#services`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/#why-us`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/#process`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/#equipment`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/#contact`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/#feedback`, lastModified, changeFrequency: 'weekly', priority: 0.6 },
  ];}
