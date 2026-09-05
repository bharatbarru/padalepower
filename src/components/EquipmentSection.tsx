'use client';

import React from 'react';
import Image from 'next/image';
import { Wrench, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/companyConfig';
import { ScrollReveal } from './ScrollReveal';

export const EquipmentSection: React.FC = () => {
  const categories = [
    {
      title: "Industrial Diesel Generators",
      description: "Servicing & overhaul for prime and standby generator sets ranging from 15 kVA up to 2000 kVA.",
      image: "/images/hero_engine_indian.png",
      specs: ["15 kVA - 2000 kVA Capacity", "AMF Panel Servicing", "Resistive Load Testing"]
    },
    {
      title: "Fuel Injection Systems & Pumps",
      description: "High-pressure fuel injection pump bench testing, injector calibration, and common rail overhaul.",
      image: "/images/diagnostics_indian.png",
      specs: ["Pump Calibration Bench", "Ultrasonic Nozzle Cleaning", "Common Rail Diagnostic"]
    },
    {
      title: "Heavy Engine Overhaul Workshop",
      description: "Cylinder head resurfacing, crankshaft grinding, valve lapping, and complete block rebuilds.",
      image: "/images/overhaul_indian.png",
      specs: ["OEM Spec Torque & Clearances", "Cylinder Re-boring", "Gasket & Ring Renewals"]
    }
  ];

  return (
    <section id="equipment" className="py-24 bg-white relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-1/3 w-80 h-80 bg-green-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <ScrollReveal animation="fade-up" delay={100}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 border border-green-200 text-green-800 text-xs font-extrabold uppercase tracking-wider">
              <Wrench className="w-3.5 h-3.5" />
              <span>Workshop Equipment & Capabilities</span>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={200}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Engine Systems & Machinery We Service
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={300}>
            <p className="text-slate-600 text-base sm:text-lg">
              From heavy industrial gensets to precision fuel injection pumps, <span className="text-green-600 font-extrabold">{COMPANY_CONFIG.namePadala}</span> <span className="text-yellow-500 font-extrabold">{COMPANY_CONFIG.nameEPower}</span> maintains high reliability.
            </p>
          </ScrollReveal>
        </div>

        {/* 3 Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((item, idx) => (
            <ScrollReveal key={idx} animation="fade-up" delay={100 + idx * 150}>
              <div 
                className="bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  {/* Image */}
                  <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-green-700 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-slate-600 text-xs leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      {item.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
