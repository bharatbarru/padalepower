'use client';

import React, { useState } from 'react';
import { 
  Wrench, 
  Search, 
  Settings, 
  Gauge, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ServiceItem, ServiceCategory } from '../types';
import { COMPANY_CONFIG } from '../config/companyConfig';
import { ScrollReveal } from './ScrollReveal';

export const ENGINE_SERVICES: ServiceItem[] = [
  {
    id: 'generator-amc',
    title: 'Generator AMC Services',
    category: 'maintenance',
    shortDescription: 'Comprehensive annual maintenance contracts (AMC) for industrial diesel generator sets.',
    fullDescription: 'Scheduled preventative servicing, oil filter replacement, coolant checks, battery load testing, and emergency call-out support to prevent unscheduled generator downtime.',
    iconName: 'ShieldCheck',
    features: ['Scheduled Preventative Visits', 'Filter & Fluid Checks', '24/7 Priority Support', 'Emergency Call-outs'],
    recommendedInterval: 'Monthly / Quarterly'
  },
  {
    id: 'engine-overhaul',
    title: 'Engine Overhauling & Repair',
    category: 'overhaul',
    shortDescription: 'Complete mechanical engine dismantling, cylinder re-boring, piston ring replacement & rebuilds.',
    fullDescription: 'Comprehensive overhaul engineering including crankshaft grinding, valve lapping, cylinder head resurfacing, and gasket renewals to restore factory compression.',
    iconName: 'Wrench',
    features: ['Cylinder Head Rebuild', 'Piston & Liner Replacement', 'Crankshaft Grinding', 'Pressure Testing'],
    recommendedInterval: '5,000 Running Hours'
  },
  {
    id: 'electrical-servicing',
    title: 'Electrical & Alternator Servicing',
    category: 'repair',
    shortDescription: 'Alternator rewinding, Automatic Voltage Regulator (AVR) testing & control panel wiring.',
    fullDescription: 'Specialized electrical diagnostics for generator alternators, circuit breaker maintenance, AMF panel wiring, voltage stabilization, and governor adjustments.',
    iconName: 'Zap',
    features: ['Alternator Rewinding', 'AVR Calibration', 'Control Panel Diagnostics', 'AMF Switchboard Wiring'],
    recommendedInterval: '6 Months'
  },
  {
    id: 'fuel-injection-system',
    title: 'Fuel Injection & Pump Repair',
    category: 'repair',
    shortDescription: 'Calibration of diesel fuel injection pumps, injectors, common rail systems & nozzles.',
    fullDescription: 'High-precision bench testing and ultrasonic cleaning of diesel fuel injectors, pressure calibration, and inline/rotary fuel pump refurbishment.',
    iconName: 'Gauge',
    features: ['Pump Calibration', 'Injector Nozzle Replacement', 'Common Rail Testing', 'Ultrasonic Cleaning'],
    recommendedInterval: '2,500 Hours'
  },
  {
    id: 'engine-diagnostics',
    title: 'Diagnostics & Troubleshooting',
    category: 'diagnostics',
    shortDescription: 'Scanner diagnostics, smoke testing, compression testing & vibration analysis.',
    fullDescription: 'Advanced electronic scanner fault code reading, endoscope cylinder inspection, crankcase blow-by measurement, and thermal camera overload inspection.',
    iconName: 'Search',
    features: ['Electronic Scanner Fault Codes', 'Compression Testing', 'Smoke & Exhaust Analysis', 'Vibration Monitoring'],
    recommendedInterval: 'On-Demand / Annual'
  },
  {
    id: 'load-bank-testing',
    title: 'Load Bank & Performance Testing',
    category: 'testing',
    shortDescription: 'Full resistive load bank testing to verify kW rating, cooling capacity & fuel efficiency.',
    fullDescription: 'Simulated load bank testing up to 100% rated capacity to burn off wet stacking carbon deposits, test cooling efficiency, and verify governor voltage recovery.',
    iconName: 'Settings',
    features: ['100% Load Capacity Test', 'Wet Stacking Carbon Removal', 'Governor Response Checks', 'Thermal Imaging'],
    recommendedInterval: 'Annual'
  }
];

interface ServicesProps {
  onRequestService: (serviceTitle?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onRequestService }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');

  const filteredServices = activeCategory === 'all'
    ? ENGINE_SERVICES
    : ENGINE_SERVICES.filter(s => s.category === activeCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wrench': return <Wrench className="w-6 h-6 text-green-600 group-hover:text-yellow-300 transition-colors" />;
      case 'Search': return <Search className="w-6 h-6 text-green-600 group-hover:text-yellow-300 transition-colors" />;
      case 'Settings': return <Settings className="w-6 h-6 text-green-600 group-hover:text-yellow-300 transition-colors" />;
      case 'Gauge': return <Gauge className="w-6 h-6 text-green-600 group-hover:text-yellow-300 transition-colors" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-green-600 group-hover:text-yellow-300 transition-colors" />;
      case 'Zap': return <Zap className="w-6 h-6 text-green-600 group-hover:text-yellow-300 transition-colors" />;
      default: return <Wrench className="w-6 h-6 text-green-600 group-hover:text-yellow-300 transition-colors" />;
    }
  };

  return (
    <section id="services" className="relative overflow-hidden bg-white py-24 sm:py-28">
      <div className="absolute left-0 top-1/3 h-96 w-96 rounded-full bg-green-500/5 blur-3xl" />
      <div className="absolute bottom-10 right-0 h-96 w-96 rounded-full bg-yellow-400/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <ScrollReveal animation="fade-up" delay={100}>
            <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-green-800">
              <Sparkles className="h-3.5 w-3.5 text-yellow-600" />
              <span>Core Technical Capabilities</span>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={200}>
            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Engine & Electrical Maintenance Services
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={300}>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Specialized mechanical overhaul, electrical troubleshooting, AMC packages, and diagnostic solutions delivered by <span className="font-extrabold text-green-600">{COMPANY_CONFIG.namePadala}</span> <span className="font-extrabold text-yellow-500">{COMPANY_CONFIG.nameEPower}</span>.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal animation="fade-up" delay={350} className="mb-12 flex flex-wrap items-center justify-center gap-2">
          {(['all', 'maintenance', 'repair', 'overhaul', 'diagnostics', 'testing'] as ServiceCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.12em] transition-all ${
                activeCategory === cat
                  ? 'border-green-600 bg-green-600 text-white shadow-[0_14px_28px_rgba(12,155,84,0.22)]'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-100'
              }`}
            >
              {cat === 'all' ? 'All Services' : cat}
            </button>
          ))}
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredServices.map((service, idx) => (
            <ScrollReveal key={service.id} animation="fade-up" delay={100 + (idx % 3) * 150}>
              <div className="group flex h-full flex-col justify-between rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-green-200 hover:shadow-[0_24px_50px_rgba(12,155,84,0.12)]">
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 shadow-sm transition-all group-hover:bg-green-600 group-hover:shadow-green-600/20">
                      {getIcon(service.iconName)}
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-700">
                      {service.recommendedInterval}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-extrabold text-slate-900 transition-colors group-hover:text-green-700">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {service.shortDescription}
                    </p>
                  </div>

                  <ul className="space-y-2.5 border-t border-slate-100 pt-4">
                    {service.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-sm text-slate-700">
                        <span className="h-2 w-2 rounded-full bg-green-600" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-5">
                  <button
                    onClick={() => onRequestService(service.title)}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-xs font-extrabold uppercase tracking-[0.12em] text-white transition-all hover:bg-green-600 hover:text-white"
                  >
                    <span>Request Service</span>
                    <ArrowRight className="h-4 w-4 text-yellow-300 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
