'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Award, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  Wrench,
  Gauge,
  Sparkles
} from 'lucide-react';
import { COMPANY_CONFIG } from '../config/companyConfig';
import { ScrollReveal } from './ScrollReveal';

interface AboutSectionProps {
  onRequestServiceModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onRequestServiceModal }) => {
  const brandEngines = [
    'Cummins', 'Kirloskar', 'Perkins', 'Caterpillar', 
    'Ashok Leyland', 'Mahindra Powerol', 'Eicher', 'Volvo Penta'
  ];

  return (
    <section id="about" className="py-24 bg-slate-50 relative overflow-hidden">
      
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-green-500/10 rounded-full filter blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-400/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          
          {/* Left Column: Workshop Facility Image Stack */}
          <div className="lg:col-span-6 relative">
            
            {/* Animated Backdrop Aura Ring */}
            <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-green-600/25 via-yellow-400/25 to-green-600/25 blur-xl opacity-80 animate-pulse pointer-events-none" />

            <ScrollReveal animation="scale-up" duration={800}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/80 bg-white p-2.5 group">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/about_engine_indian.png"
                    alt="PADALA E-POWER Engine Servicing Workshop"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-700"
                  />

                  {/* Shine Overlay Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
                  
                  {/* Live Status Bar */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-bold bg-slate-900/85 backdrop-blur-md p-3 rounded-xl border border-white/20">
                    <span className="flex items-center gap-2 text-yellow-300">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                      </span>
                      <span>Heavy Engine Overhaul Facility Active</span>
                    </span>
                    <span className="font-mono text-slate-300 text-[11px]">Visakhapatnam</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Continuous Floating Badge 1: 15+ Years Experience */}
            <ScrollReveal animation="slide-right" delay={200} className="absolute -bottom-6 -left-4 sm:-left-6 z-20">
              <div className="animate-float bg-slate-950 text-white p-4.5 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-3.5 backdrop-blur-md hover:scale-110 transition-transform">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-700 text-yellow-300 flex items-center justify-center font-black text-xl shadow-lg">
                  15+
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-white">Years Experience</h4>
                  <p className="text-[11px] text-slate-400 font-medium">Engine Maintenance</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Continuous Floating Badge 2: 500+ Gensets Serviced */}
            <ScrollReveal animation="slide-left" delay={400} className="absolute -top-6 -right-4 sm:-right-6 z-20">
              <div className="animate-float-delayed bg-white text-slate-900 p-4 rounded-2xl shadow-2xl border border-slate-200 flex items-center gap-3 hover:scale-110 transition-transform">
                <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center font-extrabold shadow-inner">
                  <ShieldCheck className="w-5 h-5 text-green-600 animate-bounce" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">500+ Gensets</h4>
                  <p className="text-[11px] text-green-700 font-bold">Serviced & Maintained</p>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Right Column: Text & Interactive Animated Feature Cards */}
          <div className="lg:col-span-6 space-y-6">
            
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-100 border border-green-200 text-green-800 text-xs font-extrabold uppercase tracking-wider shadow-sm">
                <Award className="w-3.5 h-3.5 text-yellow-600 animate-spin" style={{ animationDuration: '8s' }} />
                <span>About {COMPANY_CONFIG.name}</span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Engineering Precision for Heavy Industrial Engines
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={300}>
              <p className="text-slate-600 text-base leading-relaxed">
                <strong className="text-green-700">{COMPANY_CONFIG.name}</strong> is a premier engineering workshop dedicated to heavy diesel generator maintenance, fuel injection pump calibration, electrical servicing, and preventative annual contracts (AMCs).
              </p>
            </ScrollReveal>

            {/* Interactive Feature Checklist Cards */}
            <div className="space-y-3 pt-2">
              
              <ScrollReveal animation="fade-up" delay={400}>
                <div className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-green-500 hover:bg-green-50/50 shadow-sm hover:shadow-xl transition-all duration-300 group flex items-start gap-3.5 cursor-pointer transform hover:-translate-y-1 hover:scale-[1.01]">
                  <div className="w-9 h-9 rounded-xl bg-green-100 text-green-700 group-hover:bg-green-600 group-hover:text-white group-hover:rotate-12 transition-all flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-green-800 transition-colors">
                      OEM Spec Mechanical Overhaul
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Piston ring replacements, valve lapping, cylinder head resurfacing, and crankshaft grinding to factory specs.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={500}>
                <div className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-green-500 hover:bg-green-50/50 shadow-sm hover:shadow-xl transition-all duration-300 group flex items-start gap-3.5 cursor-pointer transform hover:-translate-y-1 hover:scale-[1.01]">
                  <div className="w-9 h-9 rounded-xl bg-green-100 text-green-700 group-hover:bg-green-600 group-hover:text-white group-hover:rotate-12 transition-all flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-green-800 transition-colors">
                      Alternator & AVR Electrical Servicing
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Alternator rewinding, Automatic Voltage Regulator (AVR) testing, and control panel wiring diagnostics.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={600}>
                <div className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-green-500 hover:bg-green-50/50 shadow-sm hover:shadow-xl transition-all duration-300 group flex items-start gap-3.5 cursor-pointer transform hover:-translate-y-1 hover:scale-[1.01]">
                  <div className="w-9 h-9 rounded-xl bg-green-100 text-green-700 group-hover:bg-green-600 group-hover:text-white group-hover:rotate-12 transition-all flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Gauge className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-green-800 transition-colors">
                      Fuel Injection & Load Bank Testing
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Fuel pump bench calibration, injector nozzle renewals, and resistive load bank performance validation.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

            </div>

            {/* Action CTA */}
            <ScrollReveal animation="fade-up" delay={700} className="pt-2">
              <button
                onClick={onRequestServiceModal}
                className="bg-green-600 hover:bg-green-700 text-white font-extrabold text-sm px-8 py-4 rounded-xl shadow-lg shadow-green-600/25 hover:shadow-green-600/40 transition-all flex items-center gap-2 group transform hover:-translate-y-1 hover:scale-102"
              >
                <span>Book Workshop Inspection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform text-yellow-300" />
              </button>
            </ScrollReveal>

          </div>

        </div>

        {/* Engine Brands Badge Strip */}
        <ScrollReveal animation="fade-up" delay={800}>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md">
            <p className="text-center text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-4 flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span>Engine Makes & Genset Brands Serviced</span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {brandEngines.map((brand, bIdx) => (
                <span
                  key={bIdx}
                  className="px-4 py-2 bg-slate-50 hover:bg-green-600 hover:text-white text-slate-800 border border-slate-200 hover:border-green-600 text-xs font-bold rounded-xl transition-all duration-300 shadow-sm transform hover:-translate-y-1 hover:scale-105 cursor-default"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
