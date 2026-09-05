"use client";

import React from 'react';
import { ShieldCheck, Award, Star, Users } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2 rounded-full bg-white/6 px-3 py-2 text-xs font-bold text-slate-100">
        <ShieldCheck className="w-4 h-4 text-green-400" />
        <span>24/7 Emergency Support</span>
      </div>

      <div className="flex items-center gap-2 rounded-full bg-white/6 px-3 py-2 text-xs font-bold text-slate-100">
        <Award className="w-4 h-4 text-yellow-400" />
        <span>Certified Technicians</span>
      </div>

      <div className="flex items-center gap-2 rounded-full bg-white/6 px-3 py-2 text-xs font-bold text-slate-100">
        <Star className="w-4 h-4 text-green-400" />
        <span>4.8/5 Average Rating</span>
      </div>

      <div className="flex items-center gap-2 rounded-full bg-white/6 px-3 py-2 text-xs font-bold text-slate-100">
        <Users className="w-4 h-4 text-slate-200" />
        <span>Trusted by 1,200+ Clients</span>
      </div>
    </div>
  );
};

export default TrustBadges;
