'use client';

import React from 'react';
import { X, CheckCircle2, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem;
  onClose: () => void;
  onRequestService: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onRequestService
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Engine Servicing Details</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {service.title}
          </h3>
        </div>

        {/* Full Description */}
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {service.fullDescription}
        </p>

        {/* Key Features List */}
        <div className="space-y-3 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
          <h4 className="text-xs font-bold text-green-800 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span>Scope of Work Included</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {service.features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Interval */}
        <div className="flex items-center gap-2 text-xs text-slate-600 bg-yellow-50 p-3.5 rounded-xl border border-yellow-200">
          <Clock className="w-4 h-4 text-yellow-600 shrink-0" />
          <span><strong className="text-slate-900">Recommended Service Interval:</strong> {service.recommendedInterval}</span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => onRequestService(service.title)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Request This Service Now</span>
            <ArrowRight className="w-4 h-4 text-yellow-300" />
          </button>
          
          <button
            onClick={onClose}
            className="py-3.5 px-6 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 font-bold rounded-xl text-center text-sm"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
