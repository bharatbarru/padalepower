'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe,
  Share2,
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import { COMPANY_CONFIG } from '../config/companyConfig';
import TrustBadges from './TrustBadges';
import { ENGINE_SERVICES } from './Services';

interface FooterProps {
  onOpenAdminModal?: () => void;
  onRequestService: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onRequestService }) => {
  const [legalModalContent, setLegalModalContent] = useState<'privacy' | 'terms' | null>(null);
  const [openSection, setOpenSection] = useState<'company' | 'navigation' | 'services' | 'contact' | null>('company');

  const toggleSection = (section: 'company' | 'navigation' | 'services' | 'contact') => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <footer className="relative overflow-hidden border-t border-slate-800 bg-[#070d18] pt-16 pb-12 text-slate-300 shadow-[0_-20px_60px_rgba(15,23,42,0.2)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(12,155,84,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(244,201,93,0.12),transparent_25%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-5 md:mb-12 md:gap-8">
          <div className="space-y-4 lg:col-span-2">
            <div className="relative h-16 w-64 sm:h-20 sm:w-72">
              <Image
                src="/images/footer_logo.jpg"
                alt="PADALA E-POWER Logo"
                fill
                  sizes="(max-width: 640px) 224px, (max-width: 1024px) 288px, 288px"
                  className="object-contain object-left"
              />
            </div>

            <p className="max-w-md text-xs leading-relaxed text-slate-400 sm:text-sm">
              {COMPANY_CONFIG.shortDescription} Specialized servicing, overhaul engineering, diagnostics, and preventive care for heavy industrial diesel engines.
            </p>

            <TrustBadges />

            <div className="flex items-center gap-3 pt-1">
              <a href={COMPANY_CONFIG.socials.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-700 bg-slate-900 p-2.5 text-slate-400 transition-all hover:-translate-y-0.5 hover:border-green-500 hover:bg-green-600 hover:text-white" title="LinkedIn" aria-label="PADALA E-POWER LinkedIn Profile">
                <Globe className="h-4 w-4" />
              </a>
              <a href={COMPANY_CONFIG.socials.facebook} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-700 bg-slate-900 p-2.5 text-slate-400 transition-all hover:-translate-y-0.5 hover:border-green-500 hover:bg-green-600 hover:text-white" title="Facebook" aria-label="PADALA E-POWER Facebook Page">
                <Share2 className="h-4 w-4" />
              </a>
              <a href={COMPANY_CONFIG.socials.twitter} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-700 bg-slate-900 p-2.5 text-slate-400 transition-all hover:-translate-y-0.5 hover:border-green-500 hover:bg-green-600 hover:text-white" title="Twitter" aria-label="PADALA E-POWER Twitter Profile">
                <ExternalLink className="h-4 w-4" />
              </a>
              <a href={COMPANY_CONFIG.socials.instagram} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-700 bg-slate-900 p-2.5 text-slate-400 transition-all hover:-translate-y-0.5 hover:border-green-500 hover:bg-green-600 hover:text-white" title="Instagram" aria-label="PADALA E-POWER Instagram Profile">
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="border-b border-slate-800 pb-2 text-sm font-extrabold uppercase tracking-[0.14em] text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#home" className="text-slate-400 transition-colors hover:text-yellow-400">Home</a></li>
              <li><a href="#about" className="text-slate-400 transition-colors hover:text-yellow-400">About Us</a></li>
              <li><a href="#services" className="text-slate-400 transition-colors hover:text-yellow-400">Services</a></li>
              <li><a href="#why-us" className="text-slate-400 transition-colors hover:text-yellow-400">Why Choose Us</a></li>
              <li><a href="#process" className="text-slate-400 transition-colors hover:text-yellow-400">Our Process</a></li>
              <li><a href="#equipment" className="text-slate-400 transition-colors hover:text-yellow-400">Equipment</a></li>
              <li><a href="#contact" className="text-slate-400 transition-colors hover:text-yellow-400">Contact Us</a></li>
              <li><a href="#feedback" className="text-slate-400 transition-colors hover:text-yellow-400">Feedback</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="border-b border-slate-800 pb-2 text-sm font-extrabold uppercase tracking-[0.14em] text-white">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              {ENGINE_SERVICES.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <button onClick={onRequestService} className="text-left text-slate-400 transition-colors hover:text-yellow-400">
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="border-b border-slate-800 pb-2 text-sm font-extrabold uppercase tracking-[0.14em] text-white">
              Contact Workshop
            </h4>
            <div className="space-y-3 text-xs font-medium text-slate-400">
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                <span>{COMPANY_CONFIG.address}, {COMPANY_CONFIG.cityStateZip}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-green-500" />
                <span className="font-bold text-slate-200">{COMPANY_CONFIG.phone}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-yellow-500" />
                <span>{COMPANY_CONFIG.email}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3 md:hidden">
          <div className="flex justify-center pb-2">
            <div className="relative h-16 w-56">
              <Image
                src="/images/footer_logo.jpg"
                alt="PADALA E-POWER Logo"
                fill
                sizes="(max-width: 640px) 224px, 288px"
                className="object-contain"
              />
            </div>
          </div>

          {[
            {
              id: 'navigation',
              title: 'Navigation',
              content: (
                <ul className="space-y-2 pb-2 text-xs font-medium">
                  <li><a href="#home" className="text-slate-400 transition-colors hover:text-yellow-400">Home</a></li>
                  <li><a href="#about" className="text-slate-400 transition-colors hover:text-yellow-400">About Us</a></li>
                  <li><a href="#services" className="text-slate-400 transition-colors hover:text-yellow-400">Services</a></li>
                  <li><a href="#why-us" className="text-slate-400 transition-colors hover:text-yellow-400">Why Choose Us</a></li>
                  <li><a href="#contact" className="text-slate-400 transition-colors hover:text-yellow-400">Contact Us</a></li>
                </ul>
              ),
            },
            {
              id: 'services',
              title: 'Our Services',
              content: (
                <ul className="space-y-2 pb-2 text-xs font-medium">
                  {ENGINE_SERVICES.slice(0, 6).map((service) => (
                    <li key={service.id}>
                      <button onClick={onRequestService} className="text-left text-slate-400 transition-colors hover:text-yellow-400">
                        {service.title}
                      </button>
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              id: 'contact',
              title: 'Contact',
              content: (
                <div className="space-y-2.5 pb-2 text-xs font-medium text-slate-400">
                  <p className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    <span>{COMPANY_CONFIG.address}, {COMPANY_CONFIG.cityStateZip}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0 text-green-500" />
                    <span className="font-bold text-slate-200">{COMPANY_CONFIG.phone}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 shrink-0 text-yellow-500" />
                    <span>{COMPANY_CONFIG.email}</span>
                  </p>
                </div>
              ),
            },
          ].map((section) => (
            <div key={section.id} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80">
              <button
                type="button"
                onClick={() => toggleSection(section.id as 'navigation' | 'services' | 'contact')}
                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-extrabold uppercase tracking-wider text-white"
              >
                <span>{section.title}</span>
                <span className="text-lg text-yellow-400">{openSection === section.id ? '−' : '+'}</span>
              </button>

              {openSection === section.id && <div className="border-t border-slate-800 px-4 py-3">{section.content}</div>}
            </div>
          ))}
        </div>

        <div className="mt-5 md:hidden">
          <div className="mb-4 text-center text-xs leading-relaxed text-slate-400">
            {COMPANY_CONFIG.shortDescription} Specialized servicing, overhaul engineering, diagnostics, and preventive care for heavy industrial diesel engines.
          </div>

          <div className="mb-5 flex items-center justify-center gap-3">
            <a href={COMPANY_CONFIG.socials.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-400 transition-colors hover:bg-green-600 hover:text-white" title="LinkedIn" aria-label="PADALA E-POWER LinkedIn Profile">
              <Globe className="h-4 w-4" />
            </a>
            <a href={COMPANY_CONFIG.socials.facebook} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-400 transition-colors hover:bg-green-600 hover:text-white" title="Facebook" aria-label="PADALA E-POWER Facebook Page">
              <Share2 className="h-4 w-4" />
            </a>
            <a href={COMPANY_CONFIG.socials.twitter} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-400 transition-colors hover:bg-green-600 hover:text-white" title="Twitter" aria-label="PADALA E-POWER Twitter Profile">
              <ExternalLink className="h-4 w-4" />
            </a>
            <a href={COMPANY_CONFIG.socials.instagram} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-400 transition-colors hover:bg-green-600 hover:text-white" title="Instagram" aria-label="PADALA E-POWER Instagram Profile">
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 border-t border-slate-900 pt-8 text-center text-[11px] font-medium text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} {COMPANY_CONFIG.name}. All rights reserved.</p>

          <div className="flex items-center justify-center gap-3 sm:justify-end">
            <button onClick={() => setLegalModalContent('privacy')} className="transition-colors hover:text-yellow-400">
              Privacy Policy
            </button>
            <span className="text-slate-600">•</span>
            <button onClick={() => setLegalModalContent('terms')} className="transition-colors hover:text-yellow-400">
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>

      {legalModalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg space-y-4 rounded-3xl border border-slate-800 bg-slate-900 p-6 text-xs text-slate-300 shadow-2xl">
            <h3 className="text-lg font-bold text-white capitalize">{legalModalContent === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}</h3>
            <p className="leading-relaxed text-slate-400">
              Standard technical service terms and privacy guidelines for {COMPANY_CONFIG.name}. Information submitted via service requests or customer feedback forms is stored securely in Firebase Firestore and used solely for operational maintenance scheduling and client feedback review.
            </p>
            <button
              onClick={() => setLegalModalContent(null)}
              className="rounded-xl bg-green-600 px-5 py-2.5 font-bold text-white shadow hover:bg-green-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
