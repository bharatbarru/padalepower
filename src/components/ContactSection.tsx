'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ExternalLink,
  FileText
} from 'lucide-react';
import { COMPANY_CONFIG } from '../config/companyConfig';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-slate-50 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 border border-green-200 text-green-800 text-xs font-extrabold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Workshop & Direct Contact</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact <span className="text-green-600">{COMPANY_CONFIG.namePadala}</span>{' '}
            <span className="text-yellow-500">{COMPANY_CONFIG.nameEPower}</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg">
            Have a generator engine issue or require AMC servicing? Call us directly or reach us on WhatsApp or email below.
          </p>
        </div>

        {/* 1. Main 2-Column Grid: Workshop Details Card & Google Maps Embed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto mb-12">
          
          {/* Workshop Address Card with GSTIN */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md flex flex-col justify-between space-y-6">
            
            <div className="flex items-center gap-3.5">
              <div className="relative w-[180px] sm:w-[220px] h-14 sm:h-16 shrink-0 bg-[#091124] p-1.5 rounded-xl border border-slate-800 shadow-inner">
                <Image
                  src="/images/contact_logo.jpg"
                  alt="PADALA E-POWER Logo"
                  fill
                  sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, 220px"
                  className="object-contain object-left p-1"
                />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  <span className="text-green-600">{COMPANY_CONFIG.namePadala}</span>{' '}
                  <span className="text-yellow-500">{COMPANY_CONFIG.nameEPower}</span>
                </h3>
              </div>
            </div>

            {/* Full Business Details INCLUDING GSTIN */}
            <div className="space-y-4 pt-4 border-t border-slate-100 text-sm">
              
              {/* Official GSTIN Details */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-yellow-50 border border-yellow-200 text-yellow-950">
                <FileText className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-yellow-800">GSTIN Registration:</span>
                  <strong className="text-base font-mono font-extrabold text-slate-900">{COMPANY_CONFIG.gstin}</strong>
                </div>
              </div>

              {/* Official Workshop Address */}
              <div className="flex items-start gap-3 text-slate-700">
                <MapPin className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-xs uppercase font-bold text-slate-500">Official Workshop Address:</strong>
                  <span className="font-bold text-slate-900 block mt-0.5">{COMPANY_CONFIG.address}</span>
                  <span className="text-slate-600 block">{COMPANY_CONFIG.cityStateZip}</span>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-3 text-slate-700">
                <Clock className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-xs uppercase font-bold text-slate-500">Working Hours:</strong>
                  <span>{COMPANY_CONFIG.businessHours.weekdays}</span>
                  <span className="block text-xs text-green-700 font-bold mt-1">{COMPANY_CONFIG.businessHours.emergency}</span>
                </div>
              </div>

            </div>

            {/* Google Maps Action Button */}
            <div className="pt-2">
              <a
                href={COMPANY_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-extrabold text-xs px-5 py-3.5 rounded-2xl shadow-md transition-colors"
              >
                <MapPin className="w-4 h-4 text-yellow-300" />
                <span>Open Location in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Google Maps Embedded View */}
          <div className="bg-white p-3 rounded-3xl border border-slate-200 shadow-md flex flex-col justify-between relative overflow-hidden min-h-[380px]">
            <div className="w-full h-full rounded-2xl overflow-hidden relative flex-1">
              <iframe
                title="PADALA E-POWER Workshop Location"
                src={COMPANY_CONFIG.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full rounded-2xl min-h-[340px]"
              />
              
              <a
                href={COMPANY_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 bg-slate-900/90 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow backdrop-blur-sm hover:bg-green-600 transition-colors flex items-center gap-1.5"
              >
                <span>Navigate</span>
                <ExternalLink className="w-3.5 h-3.5 text-yellow-300" />
              </a>
            </div>
          </div>

        </div>

        {/* 2. Action Buttons Row - Perfectly matched typography & font sizes across all 3 boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          
          {/* Box 1: Call Us Button */}
          <a
            href={`tel:${COMPANY_CONFIG.phoneClean}`}
            className="flex items-center justify-center gap-3 bg-white hover:bg-green-50 border-2 border-green-600 text-green-700 p-4 rounded-2xl shadow-md hover:shadow-lg transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-green-600 text-yellow-300 flex items-center justify-center shrink-0 shadow">
              <Phone className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="block text-xs font-bold text-slate-500 uppercase">Call Workshop</span>
              <strong className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-green-700">
                {COMPANY_CONFIG.phone}
              </strong>
            </div>
          </a>

          {/* Box 2: WhatsApp Button - Matched 2-line font size layout */}
          <a
            href={`https://wa.me/${COMPANY_CONFIG.whatsappClean}?text=Hello%20PADALA%20E-POWER,%20I%20need%20generator/engine%20maintenance%20service.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-[#00a651] hover:bg-[#008c44] text-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 shadow">
              <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.009 3.685 3.752-.983zm11.455-6.726c-.307-.154-1.815-.897-2.097-1-.282-.103-.488-.154-.694.154-.205.308-.796 1.001-.976 1.206-.18.206-.36.231-.668.077-.308-.154-1.301-.48-2.479-1.531-.917-.818-1.536-1.829-1.716-2.137-.18-.308-.019-.475.135-.628.138-.138.308-.36.462-.539.154-.18.205-.308.308-.514.103-.206.051-.385-.026-.539-.077-.154-.694-1.673-.951-2.29-.25-.6-.505-.518-.694-.527h-.591c-.205 0-.539.077-.821.385-.282.308-1.078 1.054-1.078 2.574 0 1.52 1.104 2.986 1.258 3.192.154.206 2.176 3.324 5.272 4.66 2.577 1.114 3.102.892 3.667.839.565-.053 1.815-.742 2.072-1.46.257-.718.257-1.334.18-1.46-.077-.126-.282-.205-.589-.359z"/>
              </svg>
            </div>
            <div className="text-left">
              <span className="block text-xs font-bold text-green-100 uppercase">WhatsApp Chat</span>
              <strong className="text-sm sm:text-base font-extrabold text-white">
                CHAT ON WHATSAPP
              </strong>
            </div>
          </a>

          {/* Box 3: Mail Us Button */}
          <a
            href={`mailto:${COMPANY_CONFIG.email}`}
            className="flex items-center justify-center gap-3 bg-white hover:bg-yellow-50 border-2 border-yellow-400 text-slate-900 p-4 rounded-2xl shadow-md hover:shadow-lg transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-yellow-400 text-slate-950 flex items-center justify-center shrink-0 shadow">
              <Mail className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="block text-xs font-bold text-slate-500 uppercase">Mail Workshop</span>
              <strong className="text-sm font-extrabold text-slate-900 group-hover:text-yellow-600">
                {COMPANY_CONFIG.email}
              </strong>
            </div>
          </a>

        </div>

      </div>
    </section>
  );
};
