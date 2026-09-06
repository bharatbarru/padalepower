'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Award, Wrench, Clock, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/companyConfig';

interface HeroProps {
  onRequestService: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRequestService }) => {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-white pb-20 pt-10 sm:pt-14 lg:pb-28 lg:pt-16">
      <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top_left,_rgba(12,155,84,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(244,201,93,0.12),transparent_25%)]" />
      <div className="animate-glow absolute left-12 top-16 h-64 w-64 rounded-full bg-green-500/10 blur-3xl" />
      <div className="animate-float absolute right-10 top-24 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />

      <div className="section-shell relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-8 text-center lg:col-span-7 lg:text-left">
            <div className="inline-flex items-center justify-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-green-700 lg:justify-start">
              <Zap className="h-3.5 w-3.5 fill-yellow-400 text-yellow-500" />
              <span>{COMPANY_CONFIG.tagline}</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-black text-slate-900 sm:text-5xl lg:text-6xl">
                <span className="block">Welcome to</span>
                <span className="mt-2 block whitespace-nowrap text-green-600">
                  {COMPANY_CONFIG.namePadala}{' '}
                  <span className="text-yellow-500">{COMPANY_CONFIG.nameEPower}</span>
                </span>
              </h1>

              <h2 className="text-2xl font-extrabold text-slate-800 sm:text-3xl lg:text-4xl">
                Reliable Engine & Electrical Maintenance
              </h2>
            </div>

            <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 lg:mx-0 lg:text-lg">
              Professional generator maintenance, electrical servicing, inspection, overhaul, and AMC solutions designed to keep your business powered efficiently every day.
            </p>

            <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row lg:justify-start">
              <button
                onClick={onRequestService}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-600 px-8 py-4 text-base font-extrabold text-white shadow-[0_18px_38px_rgba(12,155,84,0.32)] transition-all hover:-translate-y-0.5 hover:bg-green-700 sm:w-auto"
              >
                <span>Request a Service</span>
                <ArrowRight className="h-5 w-5 text-yellow-300 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#contact"
                className="inline-flex w-full items-center justify-center rounded-full bg-yellow-400 px-8 py-4 text-base font-extrabold text-slate-950 shadow-[0_12px_25px_rgba(244,201,93,0.28)] transition-all hover:-translate-y-0.5 hover:bg-yellow-300 sm:w-auto"
              >
                Contact Us
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-8 sm:grid-cols-4">
              {[
                { icon: ShieldCheck, label: 'Professional Service' },
                { icon: Award, label: 'Experienced Technicians' },
                { icon: Wrench, label: 'Quality Workmanship' },
                { icon: Clock, label: 'Reliable Support' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 text-left">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600 shadow-sm">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-green-200/30 via-transparent to-yellow-200/25 blur-2xl" />
            <div className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white p-3 shadow-soft">
              <div className="relative overflow-hidden rounded-[24px]">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px]">
                  <Image
                    src="/images/hero.jpeg"
                    alt="PADALA E-POWER Industrial Generator Engine Servicing Facility in Visakhapatnam"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 bg-white/90 p-4 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-600 shadow-lg shadow-green-600/25">
                    <CheckCircle2 className="h-6 w-6 text-yellow-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">
                      <span className="text-green-600">PADALA</span>{' '}
                      <span className="text-yellow-500">E-POWER</span>
                    </h4>
                    <p className="text-[11px] text-slate-500">Generator & Electrical AMC Solutions</p>
                  </div>
                </div>
                <div className="rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-green-700">
                  Trusted
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
