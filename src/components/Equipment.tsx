'use client';

import React from 'react';
import { 
  Zap, 
  Anchor, 
  Truck, 
  Factory, 
  Cpu, 
  Info,
  Wrench
} from 'lucide-react';

export const Equipment: React.FC = () => {
  const equipmentList = [
    {
      title: "Industrial Diesel Engines",
      icon: Factory,
      description: "High-capacity diesel engines powering manufacturing plants, factories, and industrial equipment.",
      examples: ["Multi-cylinder diesel blocks", "Turbocharged industrial units", "Heavy duty stationery engines"]
    },
    {
      title: "Power Generator Engines (DG Sets)",
      icon: Zap,
      description: "Prime and standby power generator set engines ranging from 50 kVA up to 1500+ kVA.",
      examples: ["Diesel generator engines", "Continuous standby power sets", "Synchronized power units"]
    },
    {
      title: "Marine Propulsion Engines",
      icon: Anchor,
      description: "Main marine propulsion engines and onboard auxiliary diesel generator systems.",
      examples: ["Commercial vessel engines", "Tugboat & barge main engines", "Marine auxiliary generator engines"]
    },
    {
      title: "Heavy Machinery Engines",
      icon: Truck,
      description: "Diesel engines for earthmoving machinery, excavators, loaders, cranes, and construction equipment.",
      examples: ["Hydraulic excavator engines", "Mobile crane engine units", "Wheel loader power plants"]
    },
    {
      title: "Pumps & Compressor Engines",
      icon: Cpu,
      description: "Stationary engine drives for high-pressure water pumps, fire fighting pumps, and air compressors.",
      examples: ["Dewating pump diesel engines", "High pressure air compressor drives", "Fire pump engines"]
    },
    {
      title: "Commercial & Off-Highway Engines",
      icon: Wrench,
      description: "Diesel powerplants for commercial utility equipment, stone crushers, and agricultural harvesters.",
      examples: ["Crusher plant diesel drives", "Harvester engine units", "Industrial utility engines"]
    }
  ];

  return (
    <section id="equipment" className="py-24 bg-slate-50/60 text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 border border-green-200 text-green-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Wrench className="w-3.5 h-3.5" />
            <span>Applications & Equipment Handled</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Engines & Machinery We Service
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Specialized maintenance capabilities for heavy industrial, marine, and power generator diesel engines.
          </p>
        </div>

        {/* Yellow Capability Disclaimer Banner */}
        <div className="mb-12 p-4 sm:p-5 bg-yellow-50 border border-yellow-200 rounded-2xl flex items-start gap-3.5 max-w-4xl mx-auto shadow-sm">
          <Info className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
            <strong className="text-slate-900 font-bold">Notice:</strong> Actual supported equipment depends on specific engine model capabilities, bore/stroke dimensions, and workshop crane capacity. Please contact our engineering team to verify your engine model.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipmentList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-green-500 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center mb-5 group-hover:bg-green-600 transition-colors">
                    <Icon className="w-6 h-6 text-green-600 group-hover:text-yellow-300 transition-colors" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-green-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Bullet Examples */}
                  <div className="space-y-2 pt-4 border-t border-slate-100">
                    {item.examples.map((ex, i) => (
                      <div key={i} className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600 shrink-0" />
                        <span>{ex}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
