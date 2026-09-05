'use client';

import React, { useState } from 'react';
import { Star, MessageSquare, CheckCircle2, AlertCircle, Loader2, Wrench } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitCustomerFeedback } from '../services/dataService';
import { triggerOwnerNotification } from '../services/notificationService';
import { ENGINE_SERVICES } from './Services';

export const FeedbackSection: React.FC = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [service, setService] = useState(ENGINE_SERVICES[0].title);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [testimonialPermission, setTestimonialPermission] = useState(true);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) return setErrorMsg('Please enter your name.');
    if (!contact.trim()) return setErrorMsg('Please enter your contact email or phone.');
    if (!feedbackText.trim()) return setErrorMsg('Please share your feedback comments.');

    setLoading(true);

    try {
      const payload = {
        name: name.trim(),
        contact: contact.trim(),
        service,
        rating,
        feedback: feedbackText.trim(),
        testimonialPermission
      };

      const feedbackId = await submitCustomerFeedback(payload);
      
      triggerOwnerNotification('feedback', { ...payload, id: feedbackId, status: 'pending', createdAt: new Date().toISOString() });

      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.8 }
        });
      } catch {
        // Fallback
      }

      setSuccessMsg(true);
      setLoading(false);
      
      // Reset
      setName('');
      setContact('');
      setFeedbackText('');
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg('Failed to submit feedback. Please try again.');
      setLoading(false);
    }
  };

  return (
    <section id="feedback" className="py-24 bg-slate-50/60 text-slate-900 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 border border-green-200 text-green-800 text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Customer Experience</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            We Value Your Feedback
          </h2>
          <p className="mt-4 text-slate-600 text-base">
            Your feedback helps us improve our engine servicing quality and deliver an exceptional experience to every customer.
          </p>
        </div>

        {/* Feedback Card Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
          
          {successMsg ? (
            <div className="text-center py-10 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 border border-green-200 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Thank You for Your Feedback!</h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                Your comments have been received. We review all feedback to ensure our Indian engine engineering services meet the highest standards.
              </p>
              <button
                onClick={() => setSuccessMsg(false)}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl text-xs shadow"
              >
                Submit Another Review
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Star Rating Interactive Selector */}
              <div className="text-center space-y-2 pb-6 border-b border-slate-100">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  How would you rate your service experience?
                </label>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (hoverRating || rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-slate-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-xs font-bold text-green-700">
                  {rating === 5 && "5 - Outstanding Service"}
                  {rating === 4 && "4 - Very Good"}
                  {rating === 3 && "3 - Satisfactory"}
                  {rating === 2 && "2 - Needs Improvement"}
                  {rating === 1 && "1 - Unsatisfactory"}
                </p>
              </div>

              {/* Name & Contact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name <span className="text-green-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Anand Menon"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-green-600 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email or Phone <span className="text-green-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="e.g. +91 98765 43210 or email"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-green-600 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none transition-colors"
                  />
                </div>

              </div>

              {/* Service Received */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Engine Service Received <span className="text-green-600">*</span>
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-green-600 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none transition-colors"
                >
                  {ENGINE_SERVICES.map(s => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                  <option value="General Engine Inspection">General Engine Inspection</option>
                </select>
              </div>

              {/* Comments */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Comments & Experience <span className="text-green-600">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Share details about our technical team's performance, diagnostic accuracy, or engine overhaul quality..."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-green-600 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none transition-colors"
                />
              </div>

              {/* Permission Checkbox */}
              <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  id="testimonialPermission"
                  checked={testimonialPermission}
                  onChange={(e) => setTestimonialPermission(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-green-600 rounded cursor-pointer"
                />
                <label htmlFor="testimonialPermission" className="text-xs text-slate-700 font-medium cursor-pointer select-none">
                  I agree that my feedback may be published as a customer testimonial on this website after owner review.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-extrabold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-yellow-300" />
                    <span>Submitting Feedback...</span>
                  </>
                ) : (
                  <span>Submit Feedback</span>
                )}
              </button>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
