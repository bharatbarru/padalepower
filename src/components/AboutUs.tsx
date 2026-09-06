'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Cpu, CheckCircle2, Wrench, AlertTriangle } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/companyConfig';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-slate-50/60 text-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 border border-green-200 text-green-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Wrench className="w-3.5 h-3.5" />
            <span>About Our Engineering Firm</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Dedicated Engine Maintenance & Technical Expertise
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            {COMPANY_CONFIG.shortDescription}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Image Asset */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl p-2 group">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden">
                <Image
                  src="/images/about.JPG"
                  alt="PADALA E-POWER Generator Engine Maintenance Technicians Team in Visakhapatnam Workshop"
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 bg-white">
                <p className="text-xs font-bold text-green-700 uppercase tracking-wider">
                  Engineering Standards & Safety Compliance
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  Our mechanical service team adheres to rigorous OEM inspection guidelines and heavy machinery safety standards.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Key Pillars */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-600 text-white flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-yellow-300" />
                </div>
                <span>Technical Expertise & Diagnostics</span>
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We specialize in comprehensive engine maintenance for industrial diesel engines, marine propulsion systems, power generator sets, and heavy construction equipment. Using electronic diagnostic scanners and endoscope inspection, we identify root causes before executing repairs.
              </p>
            </div>

            {/* 4 Core Principles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 text-green-700 font-bold text-sm mb-1">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span>Commitment to Quality</span>
                </div>
                <p className="text-slate-600 text-xs leading-normal">
                  Strict tolerance checks, OEM component replacement, and precise torque specifications on every overhaul.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 text-green-700 font-bold text-sm mb-1">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Customer Satisfaction</span>
                </div>
                <p className="text-slate-600 text-xs leading-normal">
                  Clear technical reports, transparent breakdown analysis, and dedicated post-service assistance.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 text-green-700 font-bold text-sm mb-1">
                  <AlertTriangle className="w-4 h-4 text-green-600" />
                  <span>Safety & Reliability</span>
                </div>
                <p className="text-slate-600 text-xs leading-normal">
                  Zero-compromise workshop safety protocols ensuring durable, vibration-free engine performance.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 text-green-700 font-bold text-sm mb-1">
                  <Wrench className="w-4 h-4 text-green-600" />
                  <span>Preventive Approach</span>
                </div>
                <p className="text-slate-600 text-xs leading-normal">
                  Predictive maintenance schedules aimed at catching wear early and extending engine lifecycle.
                </p>
              </div>

            </div>

            {/* Business Info Placeholder Callout */}
            <div className="p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-green-800">Workshop & Service Center: </span>
                <span className="text-slate-700">{COMPANY_CONFIG.cityStateZip}</span>
              </div>
              <a href="#contact" className="text-green-700 font-bold underline hover:text-green-800">
                View Hours
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
