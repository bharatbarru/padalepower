'use client';

import React from 'react';
import { 
  ClipboardCheck, 
  Search, 
  Wrench, 
  CheckCircle2, 
  ArrowRight,
  Settings
} from 'lucide-react';
import { COMPANY_CONFIG } from '../config/companyConfig';
import { ScrollReveal } from './ScrollReveal';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      step: "01",
      icon: <ClipboardCheck className="w-6 h-6 text-green-600" />,
      title: "Inspection & Scanner Diagnostic",
      description: "On-site arrival, electronic fault scanner diagnostic, cylinder compression test, and visual inspection of oil, coolant & belts."
    },
    {
      step: "02",
      icon: <Search className="w-6 h-6 text-green-600" />,
      title: "Fault Analysis & Detailed Quote",
      description: "Identifying worn components, valve lapping requirements, or injector calibration needs with clear cost estimates."
    },
    {
      step: "03",
      icon: <Wrench className="w-6 h-6 text-green-600" />,
      title: "Precision Servicing & Parts Replacement",
      description: "Executing mechanical overhauls, filter/fluid changes, alternator rewinding, and genuine spare parts installation."
    },
    {
      step: "04",
      icon: <CheckCircle2 className="w-6 h-6 text-green-600" />,
      title: "Load Bank Testing & Handover",
      description: "Performance verification under full electrical load, checking voltage stability, carbon clearing & client sign-off."
    }
  ];

  return (
    <section id="process" className="py-24 bg-slate-50 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-green-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <ScrollReveal animation="fade-up" delay={100}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 border border-green-200 text-green-800 text-xs font-extrabold uppercase tracking-wider">
              <Settings className="w-3.5 h-3.5" />
              <span>Standard Workshop Protocol</span>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={200}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our 4-Step Maintenance Workflow
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={300}>
            <p className="text-slate-600 text-base sm:text-lg">
              How <span className="text-green-600 font-extrabold">{COMPANY_CONFIG.namePadala}</span> <span className="text-yellow-500 font-extrabold">{COMPANY_CONFIG.nameEPower}</span> delivers reliable engine servicing from initial inspection to load test handover.
            </p>
          </ScrollReveal>
        </div>

        {/* 4 Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <ScrollReveal key={idx} animation="fade-up" delay={100 + idx * 150}>
              <div 
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center shadow-sm">
                      {item.icon}
                    </div>
                    <span className="text-2xl font-black text-slate-200 group-hover:text-green-600 transition-colors font-mono">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 mb-2 group-hover:text-green-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
