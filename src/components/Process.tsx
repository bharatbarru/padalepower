
"use client";

import React, { useRef, useState, useEffect } from 'react';
import {
  ClipboardList,
  Search,
  Wrench,
  CheckCircle,
  CheckCheck
} from 'lucide-react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const Process: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Service Request',
      description:
        'Submit your request online or via phone with engine specifications, location, and issue details.',
      icon: ClipboardList
    },
    {
      number: '02',
      title: 'Inspection & Diagnosis',
      description:
        'Electronic diagnostic scanning, compression testing, and endoscopic cylinder bore analysis.',
      icon: Search
    },
    {
      number: '03',
      title: 'Service / Repair',
      description:
        'Precision engine maintenance, cylinder head rebuilding, or complete overhaul with OEM parts.',
      icon: Wrench
    },
    {
      number: '04',
      title: 'Testing & Quality Check',
      description:
        'Dynamometer load testing, thermal imaging check, vibration audit, and pressure leak verification.',
      icon: CheckCircle
    },
    {
      number: '05',
      title: 'Customer Handover',
      description:
        'Delivery with comprehensive technical report, maintenance recommendations, and signoff.',
      icon: CheckCheck
    }
  ];

  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const stepsContainerRef = useRef<HTMLDivElement | null>(null);
  const [current, setCurrent] = useState(0);

  const goTo = (index: number) => {
    const safe = Math.max(0, Math.min(steps.length - 1, index));
    setCurrent(safe);
    const el = stepRefs.current[safe];
    const container = stepsContainerRef.current;
    if (container && el) {
      // scroll the right-hand container so the target element is visible
      const top = (el as HTMLElement).offsetTop - (container as HTMLElement).offsetTop - 24;
      container.scrollTo({ top, behavior: 'smooth' });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Intersection observer to toggle visible class and update `current` index
  useEffect(() => {
    const container = stepsContainerRef.current;
    if (!container) return;

    const options: IntersectionObserverInit = {
      root: container,
      rootMargin: '0px',
      threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;
        const idx = Number(el.dataset.index);
        if (entry.isIntersecting) {
          el.classList.add('opacity-100', 'translate-y-0');
          el.classList.remove('opacity-0', 'translate-y-6');
          setCurrent(idx);
        } else {
          el.classList.remove('opacity-100', 'translate-y-0');
          el.classList.add('opacity-0', 'translate-y-6');
        }
      });
    }, options);

    stepRefs.current.forEach((r) => {
      if (r) observer.observe(r);
    });

    return () => {
      observer.disconnect();
    };
  }, [steps.length]);

  return (
    <section id="process" className="py-24 bg-slate-50 text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 border border-green-200 text-green-800 text-xs font-extrabold uppercase tracking-wider mb-3">
            <Wrench className="w-3.5 h-3.5" />
            <span>Structured Service Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our 5-Step Engine Servicing Process
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Systematic engineering process from initial diagnosis to dynamometer load testing and signoff.
          </p>
        </div>

        {/* New Interactive Stepper Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:min-h-[620px]">
          {/* Left: large sticky image */}
          <div className="col-span-1 hidden md:flex items-center justify-center">
            <div className="w-full max-w-[520px] sticky top-28">
              <Image
                src="/images/machine.avif"
                alt="Service timeline"
                width={520}
                height={600}
                sizes="(min-width: 768px) 520px"
                className="object-cover rounded-3xl shadow-2xl border border-slate-100"
              />
            </div>
          </div>

          {/* Right: interactive single-card stepper */}
          <div className="col-span-1 flex flex-col gap-6 justify-center min-h-[420px]">
            <div className="relative flex items-center justify-center w-full">
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200 min-h-[360px] w-full max-w-[620px] flex items-center justify-center">
                <div className="flex items-center gap-6 w-full my-auto">
                  <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shrink-0">
                    {steps[current].number}
                  </div>

                  <div className="flex-1 py-2">
                    <h3 className="text-2xl font-extrabold text-slate-900">{steps[current].title}</h3>
                    <p className="mt-3 text-slate-600 text-base max-w-2xl leading-relaxed">{steps[current].description}</p>
                    <div className="mt-6 flex items-center gap-4">
                      <button
                        onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
                        aria-label="Previous step"
                      >
                        <ArrowLeft className="w-4 h-4" /> Prev
                      </button>

                      <button
                        onClick={() => setCurrent((c) => Math.min(steps.length - 1, c + 1))}
                        className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700"
                        aria-label="Next step"
                      >
                        Next <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            {/* Only the image (left) and single active card (right) are shown — thumbnails and progress buttons removed per request */}
              </div> {/* close .relative */}
            </div> {/* close right column */}
          </div> {/* close grid */}
      </div> {/* close container */}
    </section>
  );
};
