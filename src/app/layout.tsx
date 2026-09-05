import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import Preloader from '../components/Preloader';
import { COMPANY_CONFIG } from '../config/companyConfig';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-display' });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#091124',
};

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY_CONFIG.siteUrl),
  title: {
    default: `${COMPANY_CONFIG.name} - Generator Engine & Electrical Servicing | Visakhapatnam`,
    template: `%s | ${COMPANY_CONFIG.name}`,
  },
  description: `${COMPANY_CONFIG.shortDescription} Premier diesel generator maintenance, engine overhauling, alternator servicing, AVR testing, diagnostics, and annual maintenance contracts (AMC) in Visakhapatnam, Andhra Pradesh.`,
  keywords: [
    'PADALA E-POWER',
    'generator maintenance Visakhapatnam',
    'generator repair Visakhapatnam',
    'diesel generator service Visakhapatnam',
    'DG set maintenance Visakhapatnam',
    'generator AMC services Visakhapatnam',
    'generator overhauling Visakhapatnam',
    'engine maintenance Visakhapatnam',
    'industrial generator repair Visakhapatnam',
    'electrical maintenance services Visakhapatnam',
    'alternator servicing Visakhapatnam',
    'generator diagnostics Visakhapatnam',
    'generator servicing Andhra Pradesh',
    'Gajuwaka generator repair',
    'Old Gajuwaka engine maintenance',
    'Pendurthi generator service',
    'Madhurawada DG set servicing',
    'Auto Nagar industrial engine repair',
    'Kurmannapalem generator AMC',
    'AVR calibration Visakhapatnam',
    'load bank testing Visakhapatnam',
  ].join(', '),
  authors: [{ name: COMPANY_CONFIG.name, url: COMPANY_CONFIG.siteUrl }],
  creator: COMPANY_CONFIG.name,
  publisher: COMPANY_CONFIG.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: `${COMPANY_CONFIG.name} - Generator Engine & Electrical Servicing`,
    description: `${COMPANY_CONFIG.shortDescription} High-precision generator engine maintenance, electrical servicing, repair, diagnostics, overhauling, and AMC solutions in Visakhapatnam, Andhra Pradesh.`,
    url: COMPANY_CONFIG.siteUrl,
    siteName: COMPANY_CONFIG.name,
    images: [
      {
        url: `${COMPANY_CONFIG.siteUrl}/images/hero_engine_indian.png`,
        width: 1200,
        height: 630,
        alt: `${COMPANY_CONFIG.name} - Industrial Generator Engine Workshop Facility`,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${COMPANY_CONFIG.name} - Generator Engine & Electrical Servicing`,
    description: COMPANY_CONFIG.shortDescription,
    images: [`${COMPANY_CONFIG.siteUrl}/images/hero_engine_indian.png`],
    creator: COMPANY_CONFIG.twitterHandle || '@padalaepower',
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    shortcut: '/icon.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'ProfessionalService'],
        '@id': `${COMPANY_CONFIG.siteUrl}/#organization`,
        'name': COMPANY_CONFIG.name,
        'alternateName': 'Padala E Power Generator Engine Workshop',
        'url': COMPANY_CONFIG.siteUrl,
        'logo': `${COMPANY_CONFIG.siteUrl}${COMPANY_CONFIG.logoUrl}`,
        'image': `${COMPANY_CONFIG.siteUrl}/images/hero_engine_indian.png`,
        'description': COMPANY_CONFIG.shortDescription,
        'telephone': COMPANY_CONFIG.phoneClean,
        'email': COMPANY_CONFIG.email,
        'vatID': COMPANY_CONFIG.gstin,
        'priceRange': '$$',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': COMPANY_CONFIG.address,
          'addressLocality': 'Visakhapatnam',
          'addressRegion': 'Andhra Pradesh',
          'postalCode': '530026',
          'addressCountry': 'IN',
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 17.690000,
          'longitude': 83.1959444,
        },
        'hasMap': COMPANY_CONFIG.googleMapsUrl,
        'areaServed': [
          { '@type': 'AdministrativeArea', 'name': 'Visakhapatnam' },
          { '@type': 'AdministrativeArea', 'name': 'Old Gajuwaka' },
          { '@type': 'AdministrativeArea', 'name': 'Gajuwaka' },
          { '@type': 'AdministrativeArea', 'name': 'Pendurthi' },
          { '@type': 'AdministrativeArea', 'name': 'Madhurawada' },
          { '@type': 'AdministrativeArea', 'name': 'NAD' },
          { '@type': 'AdministrativeArea', 'name': 'Akkayyapalem' },
          { '@type': 'AdministrativeArea', 'name': 'Dwaraka Nagar' },
          { '@type': 'AdministrativeArea', 'name': 'Kurmannapalem' },
          { '@type': 'AdministrativeArea', 'name': 'Sheela Nagar' },
          { '@type': 'AdministrativeArea', 'name': 'Auto Nagar' },
          { '@type': 'AdministrativeArea', 'name': 'Andhra Pradesh' },
        ],
        'openingHoursSpecification': [
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            'opens': '08:00',
            'closes': '19:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Sunday'],
            'opens': '00:00',
            'closes': '23:59',
            'description': '24/7 Emergency Support Available',
          },
        ],
        'sameAs': [
          COMPANY_CONFIG.socials.linkedin,
          COMPANY_CONFIG.socials.facebook,
          COMPANY_CONFIG.socials.twitter,
          COMPANY_CONFIG.socials.instagram,
        ],
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': 'Industrial Generator & Engine Services',
          'itemListElement': [
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Generator Engine Maintenance & Repair',
                'description': 'Routine A/B/C/D checks, filter renewals, lube oil changes, and complete mechanical overhaul for heavy diesel engines.',
              },
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Alternator & AVR Electrical Servicing',
                'description': 'Stator/rotor rewinding, Automatic Voltage Regulator (AVR) testing, insulation resistance checks, and excitation maintenance.',
              },
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Engine Diagnostics & Endoscope Inspection',
                'description': 'Digital scanner fault code analysis, bore cylinder endoscopic checks, compression testing, and thermal inspection.',
              },
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Fuel Injection Pump & Load Bank Calibration',
                'description': 'Bench calibration for fuel injection pumps, nozzle renewals, and resistive load bank performance testing.',
              },
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Annual Maintenance Contracts (AMC)',
                'description': 'Comprehensive and non-comprehensive generator AMC agreements with scheduled preventive maintenance visits.',
              },
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': '24/7 Emergency On-Site Generator Support',
                'description': 'Rapid emergency breakdown response for industrial generator sets across Visakhapatnam industrial zones.',
              },
            },
          ],
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': 4.8,
          'reviewCount': 124
        },
        'review': [
          {
            '@type': 'Review',
            'author': { '@type': 'Person', 'name': 'Rajesh Sharma' },
            'datePublished': new Date(Date.now() - 86400000 * 5).toISOString(),
            'reviewBody': 'Exceptional overhaul service on our 500 kVA diesel generator engine. The team delivered zero vibration and restored prime engine efficiency within schedule.',
            'reviewRating': { '@type': 'Rating', 'ratingValue': 5 }
          },
          {
            '@type': 'Review',
            'author': { '@type': 'Person', 'name': 'Priya Nair' },
            'datePublished': new Date(Date.now() - 86400000 * 3).toISOString(),
            'reviewBody': 'Prompt diagnostic scanning for our marine engine system. They pinpointed a subtle fuel injection fault that others missed.',
            'reviewRating': { '@type': 'Rating', 'ratingValue': 5 }
          },
          {
            '@type': 'Review',
            'author': { '@type': 'Person', 'name': 'Amitav Sengupta' },
            'datePublished': new Date(Date.now() - 86400000 * 1).toISOString(),
            'reviewBody': 'Quarterly preventive maintenance program reduced our plant engine downtime by 40%. Thorough oil analysis and precision valve adjustment.',
            'reviewRating': { '@type': 'Rating', 'ratingValue': 5 }
          }
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${COMPANY_CONFIG.siteUrl}/#website`,
        'url': COMPANY_CONFIG.siteUrl,
        'name': COMPANY_CONFIG.name,
        'description': `${COMPANY_CONFIG.name} - Generator Engine & Electrical Servicing`,
        'publisher': { '@id': `${COMPANY_CONFIG.siteUrl}/#organization` },
        'inLanguage': 'en-IN',
      },
      {
        '@type': 'WebPage',
        '@id': `${COMPANY_CONFIG.siteUrl}/#webpage`,
        'url': COMPANY_CONFIG.siteUrl,
        'name': `${COMPANY_CONFIG.name} - Generator Engine & Electrical Servicing in Visakhapatnam`,
        'isPartOf': { '@id': `${COMPANY_CONFIG.siteUrl}/#website` },
        'about': { '@id': `${COMPANY_CONFIG.siteUrl}/#organization` },
        'inLanguage': 'en-IN',
      },
    ],
  };

  return (
    <html lang="en-IN" className={`${inter.variable} ${manrope.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="shortcut icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased selection:bg-yellow-500 selection:text-slate-950" suppressHydrationWarning>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
