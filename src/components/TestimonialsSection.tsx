'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Star, Quote, CheckCircle2, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { CustomerFeedback } from '../types';
import { fetchApprovedTestimonials } from '../services/dataService';

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<CustomerFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await fetchApprovedTestimonials();
        setTestimonials(data);
      } catch (err) {
        console.error('Failed to load testimonials:', err);
      } finally {
        setLoading(false);
      }
    };
    loadTestimonials();
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (testimonials.length === 0 ? 0 : (prev + 1) % testimonials.length));
  }, [testimonials.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (testimonials.length === 0 ? 0 : (prev - 1 + testimonials.length) % testimonials.length));
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonials.length < 2) return;

    const timer = window.setInterval(() => {
      goToNext();
    }, 5000);

    return () => window.clearInterval(timer);
  }, [goToNext, testimonials.length]);

  if (loading) {
    return (
      <section className="bg-white py-16 text-center text-xs text-slate-500">
        Loading verified customer testimonials...
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="relative border-t border-slate-100 bg-white py-16 text-slate-900 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-green-700">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Verified Customer Reviews</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            What Our Engine Clients Say
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Real feedback from clients who have experienced our technical engine maintenance & overhauling services.
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-[24px] bg-slate-50 p-2 md:p-3">
            <div
              className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((item, idx) => (
                <div key={item.id || idx} className="w-full flex-shrink-0 px-1 md:px-2">
                  <div className="relative flex min-h-[260px] flex-col justify-between rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition-all duration-300 md:min-h-[300px] md:p-6 lg:min-h-[280px]">
                    <Quote className="pointer-events-none absolute right-4 top-4 h-8 w-8 text-slate-100 md:right-5 md:h-9 md:w-9" />

                    <div className="flex flex-1 flex-col items-center justify-center text-center md:items-start md:text-left">
                      <p className="max-w-xl text-sm italic leading-relaxed text-slate-700 md:text-base lg:text-lg">
                        “{item.feedback}”
                      </p>

                      <div className="mt-4 flex items-center justify-center gap-1 md:justify-start">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 border-t border-slate-100 pt-4 text-center md:text-left">
                      <h4 className="flex items-center justify-center gap-1.5 text-sm font-bold text-slate-900 md:justify-start">
                        <span>{item.name}</span>
                        <span title="Verified Customer">
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                        </span>
                      </h4>
                      <p className="mt-1 text-[11px] font-bold text-green-700 md:text-xs">{item.service}</p>
                      <div className="mt-2 text-[10px] font-mono text-slate-400">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goToPrevious}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:border-green-500 hover:text-green-700"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={goToNext}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:border-green-500 hover:text-green-700"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to testimonial ${index + 1}`}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    currentIndex === index ? 'w-8 bg-green-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
