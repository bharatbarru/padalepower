'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Phone,
  Menu,
  X,
  Clock,
  Lock,
  MessageCircle,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { COMPANY_CONFIG } from '../config/companyConfig';

interface NavbarProps {
  onOpenAdminModal: () => void;
  onRequestService: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdminModal, onRequestService }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Why Choose Us', href: '#why-us' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-500">
      <div className="bg-[#050b18] text-white py-1.5 px-4 text-xs font-semibold border-b border-white/10">
        <div className="section-shell flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-5 text-slate-200">
            <span className="flex items-center gap-1.5 text-slate-100 font-medium">
              <MapPin className="w-3.5 h-3.5 text-yellow-400" />
              <span>Visakhapatnam, Andhra Pradesh - 530026, India</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300 text-[11px]">
              <Clock className="w-3.5 h-3.5 text-yellow-400" />
              <span>Mon - Sat: 8 AM - 7 PM IST</span>
            </span>
          </div>

          <div className="ml-auto flex items-center gap-3.5">
            <a
              href={`tel:${COMPANY_CONFIG.phoneClean}`}
              className="flex items-center gap-1.5 text-white hover:text-yellow-300 font-bold text-[11px] sm:text-xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-yellow-400" />
              <span>+91 96031 09512</span>
            </a>

            <a
              href={`https://wa.me/${COMPANY_CONFIG.whatsappClean}?text=Hello%20PADALA%20E-POWER,%20I%20need%20generator/engine%20maintenance%20service.`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 rounded-full border border-yellow-400/40 bg-[#043317] px-2.5 py-1 text-[10px] font-bold text-yellow-300 transition-all hover:bg-[#074721]"
            >
              <MessageCircle className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400/20" />
              <span>24/7 WhatsApp</span>
            </a>

            <button
              onClick={onOpenAdminModal}
              className="rounded-md p-1 text-slate-400 transition-all hover:bg-slate-800 hover:text-yellow-400"
              title="Admin Portal Login"
              suppressHydrationWarning
            >
              <Lock className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      <nav
        className={`w-full border-b border-slate-200/80 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#06111f]/90 py-2 shadow-2xl backdrop-blur-xl'
            : 'bg-[#091124]/95 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.12)] backdrop-blur-md'
        }`}
      >
        <div className="section-shell flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a href="#home" className="group flex shrink-0 items-center py-0.5">
            <div className="relative h-[62px] w-[180px] sm:h-[78px] sm:w-[230px] md:h-[92px] md:w-[280px] lg:h-[100px] lg:w-[320px] transition-all duration-300 group-hover:scale-[1.02]">
              <Image
                src="/images/header_logo.jpg"
                alt="PADALA E-POWER Logo"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </a>

          <div className="hidden items-center gap-3 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm sm:text-base font-extrabold uppercase tracking-wide text-slate-100 transition-all transform hover:scale-105 hover:-translate-y-0.5 hover:bg-white/5 hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300/40"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center shrink-0">
            <button
              onClick={onRequestService}
              className="group inline-flex items-center gap-3 rounded-full bg-[#00a651] px-6 py-3 text-sm sm:text-base font-extrabold uppercase tracking-wide text-white shadow-[0_14px_30px_rgba(12,155,84,0.35)] transition-all transform hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[#0a8f4b]"
            >
              <span>Request Service</span>
              <ChevronRight className="h-4 w-4 text-yellow-300 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-xl border border-slate-700 bg-slate-800/80 p-2.5 text-slate-200 transition-all hover:border-yellow-400/60 hover:text-yellow-400"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5 text-yellow-400" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mt-2 border-t border-slate-800 bg-[#050b18] px-4 pb-6 pt-3 shadow-2xl lg:hidden">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl px-3 py-2.5 text-base font-extrabold text-slate-200 transition-all transform hover:translate-x-1 hover:bg-slate-900 hover:text-yellow-400"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="mt-4 space-y-2 border-t border-slate-800 pt-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestService();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#00a651] px-4 py-3 text-base font-extrabold text-white transition-transform hover:scale-105"
              >
                <span>Request Service</span>
                <ChevronRight className="h-4 w-4 text-yellow-300" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminModal();
                }}
                className="flex w-full items-center justify-center gap-1.5 py-2 text-[11px] font-bold text-slate-400 transition-all hover:text-yellow-400"
              >
                <Lock className="h-3.5 w-3.5 text-yellow-400" />
                <span>Admin Login Portal</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
