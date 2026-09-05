'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Wrench, 
  Clock, 
  Award, 
  Zap, 
  CheckCircle2, 
  Users, 
  ThumbsUp 
} from 'lucide-react';
import { COMPANY_CONFIG } from '../config/companyConfig';
import { ScrollReveal } from './ScrollReveal';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: <Award className="w-6 h-6 text-green-600" />,
      title: "15+ Years Engine Expertise",
      description: "Proven mechanical and electrical engineering track record across Indian industrial diesel generator systems."
    },
    {
      icon: <Wrench className="w-6 h-6 text-green-600" />,
      title: "OEM Spec Tolerances",
      description: "Every engine overhaul strictly adheres to original manufacturer torque, valve clearance, and compression specs."
    },
    {
      icon: <Clock className="w-6 h-6 text-green-600" />,
      title: "24/7 Rapid Emergency Response",
      description: "Dedicated mobile technician team equipped for emergency on-site diagnostic & breakdown support."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-green-600" />,
      title: "Transparent GSTIN Registration",
      description: "Fully verified GSTIN registered business (37JEHPP7644D1Z1) providing transparent tax invoices & warranty."
    },
    {
      icon: <Zap className="w-6 h-6 text-green-600" />,
      title: "Complete Electrical & AMC Care",
      description: "One-stop contract for engine mechanicals, alternators, AVRs, control panels, and periodic fluid changes."
    },
    {
      icon: <ThumbsUp className="w-6 h-6 text-green-600" />,
      title: "High Customer Satisfaction",
      description: "Trusted by factories, commercial complexes, hospitals, and marine clients for zero-downtime reliability."
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-600/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <ScrollReveal animation="fade-up" delay={100}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-950 border border-green-800 text-green-300 text-xs font-extrabold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
              <span>Engineering Excellence</span>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={200}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Why Partner With <span className="text-green-500">{COMPANY_CONFIG.namePadala}</span>{' '}
              <span className="text-yellow-400">{COMPANY_CONFIG.nameEPower}</span>?
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={300}>
            <p className="text-slate-400 text-base sm:text-lg">
              We combine deep mechanical diagnostics with reliable electrical servicing to keep your generator engines running at peak efficiency.
            </p>
          </ScrollReveal>
        </div>

        {/* 6 Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, idx) => (
            <ScrollReveal key={idx} animation="fade-up" delay={100 + (idx % 3) * 150}>
              <div 
                className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80 hover:border-green-500/60 shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-green-950 border border-green-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow">
                  {reason.icon}
                </div>

                <h3 className="text-lg font-extrabold text-white group-hover:text-yellow-300 transition-colors mb-2">
                  {reason.title}
                </h3>

                <p className="text-slate-400 text-xs leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
